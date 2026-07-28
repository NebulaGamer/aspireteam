/**
 * Server-only helpers for the invite-only admin team management.
 *
 * Every function here assumes it runs on the server with the service role.
 * Nothing in this file may be imported from client-reachable modules at
 * module scope — `.server.ts` is blocked from client bundles by the build.
 */

import { NOREPLY_FROM_ADDRESS } from "./partnership-email.server";

/** Where an invited admin lands to choose their own password. */
export const ADMIN_INVITE_REDIRECT = "https://aspireteam.pl/admin/reset";

/** Max invites a single admin may send per hour. Enforced server-side. */
export const INVITE_RATE_LIMIT = 5;
export const INVITE_RATE_WINDOW_MS = 60 * 60 * 1000;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function normaliseEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (email.length < 3 || email.length > 255 || !EMAIL_RE.test(email)) return null;
  return email;
}

type AdminClient = Awaited<
  typeof import("@/integrations/supabase/client.server")
>["supabaseAdmin"];

export type AuthUserSummary = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

/**
 * The team is 2-5 people; a couple of pages of users is more than enough and
 * avoids pulling the whole auth table.
 */
export async function listAuthUsers(admin: AdminClient): Promise<AuthUserSummary[]> {
  const out: AuthUserSummary[] = [];
  for (let page = 1; page <= 5; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    for (const u of data.users) {
      out.push({
        id: u.id,
        email: (u.email ?? "").toLowerCase(),
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
      });
    }
    if (data.users.length < 200) break;
  }
  return out;
}

export async function findAuthUserByEmail(
  admin: AdminClient,
  email: string,
): Promise<AuthUserSummary | null> {
  const users = await listAuthUsers(admin);
  return users.find((u) => u.email === email) ?? null;
}

export async function writeAudit(
  admin: AdminClient,
  entry: {
    actor_user_id: string;
    action: "invite_sent" | "role_granted" | "role_revoked";
    target_email: string;
    details?: Record<string, unknown>;
  },
): Promise<void> {
  const { error } = await admin.from("admin_audit_log").insert({
    actor_user_id: entry.actor_user_id,
    action: entry.action,
    target_email: entry.target_email,
    details: entry.details ?? {},
  });
  // The audit log must never block the operation it records, but a failure to
  // write history is serious enough to be loud in the logs.
  if (error) console.error("[admin-team] audit write failed:", error.message);
}

/** Returns true when the actor is over the hourly invite allowance. */
export async function isInviteRateLimited(
  admin: AdminClient,
  actorUserId: string,
): Promise<boolean> {
  const since = new Date(Date.now() - INVITE_RATE_WINDOW_MS).toISOString();
  const { count, error } = await admin
    .from("admin_audit_log")
    .select("id", { count: "exact", head: true })
    .eq("actor_user_id", actorUserId)
    .eq("action", "invite_sent")
    .gte("created_at", since);
  if (error) {
    console.error("[admin-team] rate-limit check failed:", error.message);
    return false;
  }
  return (count ?? 0) >= INVITE_RATE_LIMIT;
}

/**
 * Tells an existing account holder they were granted back-office access.
 * Fail-soft: a missing RESEND_API_KEY must never break the grant itself.
 */
export async function notifyAccessGranted(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[admin-team] RESEND_API_KEY is not configured — role granted, notification email skipped.",
    );
    return;
  }

  const html = [
    `<div style="background:#0A1628;padding:32px;font-family:Arial,sans-serif;color:#F5F2EC">`,
    `<p style="letter-spacing:.28em;text-transform:uppercase;font-size:11px;color:#C9A227;margin:0">Aspire Team</p>`,
    `<h1 style="font-family:Georgia,serif;font-weight:500;margin:8px 0 16px">Masz dostęp do panelu</h1>`,
    `<p style="font-size:14px;line-height:1.6;margin:0 0 24px">Twoje konto otrzymało uprawnienia administratora do kalendarza regat Aspire Team. Zaloguj się swoim dotychczasowym hasłem.</p>`,
    `<a href="https://aspireteam.pl/admin" style="display:inline-block;background:#C9A227;color:#0A1628;text-decoration:none;padding:12px 24px;font-size:14px;font-weight:600">Otwórz panel</a>`,
    `</div>`,
  ].join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: NOREPLY_FROM_ADDRESS,
        to: [email],
        subject: "Aspire Team — dostęp do panelu",
        html,
      }),
    });
    if (!response.ok) {
      console.error(
        `[admin-team] Resend request failed [${response.status}]: ${await response.text()}`,
      );
    }
  } catch (err) {
    console.error("[admin-team] Resend request threw:", err);
  }
}
