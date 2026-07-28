import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type TeamMember = {
  userId: string;
  email: string;
  addedAt: string;
  lastSignInAt: string | null;
};

export type AuditEntry = {
  id: string;
  action: "invite_sent" | "role_granted" | "role_revoked";
  targetEmail: string;
  actorEmail: string | null;
  createdAt: string;
};

export type TeamResult =
  | { ok: true; code: "invited" | "granted_existing" | "revoked" }
  | {
      ok: false;
      code:
        | "forbidden"
        | "invalid_email"
        | "already_admin"
        | "rate_limited"
        | "cannot_revoke_self"
        | "last_admin"
        | "error";
    };

export const getAdminTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ members: TeamMember[]; log: AuditEntry[] }> => {
    const { callerIsAdmin, listAuthUsers } = await import("@/lib/admin-team.server");
    if (!(await callerIsAdmin(context.supabase, context.userId))) {
      throw new Error("Forbidden");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: roles }, users, { data: log }] = await Promise.all([
      supabaseAdmin.from("user_roles").select("user_id, created_at").eq("role", "admin"),
      listAuthUsers(supabaseAdmin),
      supabaseAdmin
        .from("admin_audit_log")
        .select("id, action, target_email, actor_user_id, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    const byId = new Map(users.map((u) => [u.id, u]));

    const members: TeamMember[] = (roles ?? []).map((r) => {
      const u = byId.get(r.user_id);
      return {
        userId: r.user_id,
        email: u?.email ?? "—",
        addedAt: r.created_at,
        lastSignInAt: u?.last_sign_in_at ?? null,
      };
    });
    members.sort((a, b) => a.addedAt.localeCompare(b.addedAt));

    return {
      members,
      log: (log ?? []).map((e) => ({
        id: e.id,
        action: e.action as AuditEntry["action"],
        targetEmail: e.target_email,
        actorEmail: byId.get(e.actor_user_id)?.email ?? null,
        createdAt: e.created_at,
      })),
    };
  });

export const inviteAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data, context }): Promise<TeamResult> => {
    const {
      ADMIN_INVITE_REDIRECT,
      callerIsAdmin,
      findAuthUserByEmail,
      isInviteRateLimited,
      normaliseEmail,
      notifyAccessGranted,
      writeAudit,
    } = await import("@/lib/admin-team.server");

    // Caller identity comes from the validated bearer token only.
    if (!(await callerIsAdmin(context.supabase, context.userId))) {
      return { ok: false, code: "forbidden" };
    }

    const email = normaliseEmail(data?.email);
    if (!email) return { ok: false, code: "invalid_email" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (await isInviteRateLimited(supabaseAdmin, context.userId)) {
      return { ok: false, code: "rate_limited" };
    }

    try {
      const existing = await findAuthUserByEmail(supabaseAdmin, email);

      if (existing) {
        const { data: role } = await supabaseAdmin
          .from("user_roles")
          .select("id")
          .eq("user_id", existing.id)
          .eq("role", "admin")
          .maybeSingle();
        if (role) return { ok: false, code: "already_admin" };

        // Existing account: grant the role only. Never create a duplicate
        // account and never touch their password.
        const { error } = await supabaseAdmin
          .from("user_roles")
          .insert({ user_id: existing.id, role: "admin" });
        if (error) throw error;

        await writeAudit(supabaseAdmin, {
          actor_user_id: context.userId,
          action: "role_granted",
          target_email: email,
          details: { existing_account: true },
        });
        await notifyAccessGranted(email);
        return { ok: true, code: "granted_existing" };
      }

      // No account yet: the Admin API creates it and emails an invite link.
      // The invitee sets their own password — we never generate one.
      const { data: invited, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        { redirectTo: ADMIN_INVITE_REDIRECT },
      );
      if (inviteError || !invited?.user) throw inviteError ?? new Error("invite failed");

      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: invited.user.id, role: "admin" });
      if (roleError) throw roleError;

      await writeAudit(supabaseAdmin, {
        actor_user_id: context.userId,
        action: "invite_sent",
        target_email: email,
        details: { new_account: true },
      });
      await writeAudit(supabaseAdmin, {
        actor_user_id: context.userId,
        action: "role_granted",
        target_email: email,
        details: { new_account: true },
      });
      return { ok: true, code: "invited" };
    } catch (err) {
      // Log detail server-side; the caller gets a generic code so nothing
      // leaks about who is or isn't registered.
      console.error("[admin-team] invite failed:", err);
      return { ok: false, code: "error" };
    }
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data, context }): Promise<TeamResult> => {
    const { callerIsAdmin, writeAudit } = await import("@/lib/admin-team.server");

    if (!(await callerIsAdmin(context.supabase, context.userId))) {
      return { ok: false, code: "forbidden" };
    }

    const targetId = typeof data?.userId === "string" ? data.userId : "";
    if (!targetId) return { ok: false, code: "error" };

    // Guard 1: no self-revoke — prevents an admin locking themselves out.
    if (targetId === context.userId) return { ok: false, code: "cannot_revoke_self" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      // Guard 2: never drop to zero admins, or the back office becomes
      // permanently unreachable. A database trigger backs this up.
      const { count } = await supabaseAdmin
        .from("user_roles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      if ((count ?? 0) <= 1) return { ok: false, code: "last_admin" };

      const { data: target } = await supabaseAdmin.auth.admin.getUserById(targetId);
      const targetEmail = target?.user?.email?.toLowerCase() ?? "—";

      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", targetId)
        .eq("role", "admin");
      if (error) {
        if (error.message?.includes("last_admin_protected")) {
          return { ok: false, code: "last_admin" };
        }
        throw error;
      }

      await writeAudit(supabaseAdmin, {
        actor_user_id: context.userId,
        action: "role_revoked",
        target_email: targetEmail,
        details: { account_retained: true },
      });
      return { ok: true, code: "revoked" };
    } catch (err) {
      console.error("[admin-team] revoke failed:", err);
      return { ok: false, code: "error" };
    }
  });
