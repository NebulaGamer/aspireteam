import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Partnership enquiry back office.
 *
 * Every function here runs as the signed-in user (RLS), so the admin-only
 * SELECT/UPDATE/DELETE policies on `partnership_enquiries` are the actual
 * authorisation boundary — a non-admin session simply sees nothing.
 *
 * These rows contain personal data. Nothing in here logs enquiry contents.
 */

export const ENQUIRY_PAGE_SIZE = 25;

export type EnquiryStatus = "new" | "contacted" | "archived";

export type Enquiry = {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string;
  status: EnquiryStatus;
  locale: "pl" | "en";
};

export type EnquiryPage = {
  rows: Enquiry[];
  hasMore: boolean;
  newCount: number;
};

type Row = {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string;
  status: string;
  locale: string;
};

const toEnquiry = (r: Row): Enquiry => ({
  id: r.id,
  createdAt: r.created_at,
  companyName: r.company_name,
  contactName: r.contact_name,
  email: r.email,
  phone: r.phone,
  interest: r.interest,
  message: r.message,
  status: (["new", "contacted", "archived"].includes(r.status) ? r.status : "new") as EnquiryStatus,
  locale: r.locale === "en" ? "en" : "pl",
});

/** Escape PostgREST `or(...)` filter metacharacters in a free-text search term. */
const sanitiseSearch = (raw: unknown): string => {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, 100).replace(/[,()*\\]/g, " ").trim();
};

export const listEnquiries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { statuses?: string[]; search?: string; offset?: number }) => data ?? {},
  )
  .handler(async ({ data, context }): Promise<EnquiryPage> => {
    const statuses = (Array.isArray(data?.statuses) ? data.statuses : []).filter(
      (s): s is EnquiryStatus => s === "new" || s === "contacted" || s === "archived",
    );
    const offset = Number.isFinite(data?.offset) ? Math.max(0, Math.trunc(data!.offset!)) : 0;
    const search = sanitiseSearch(data?.search);

    let query = context.supabase
      .from("partnership_enquiries")
      .select(
        "id, created_at, company_name, contact_name, email, phone, interest, message, status, locale",
      )
      .order("created_at", { ascending: false })
      // One extra row tells us whether a "load more" is worth offering.
      .range(offset, offset + ENQUIRY_PAGE_SIZE);

    if (statuses.length > 0) query = query.in("status", statuses);
    if (search) {
      query = query.or(
        `company_name.ilike.%${search}%,contact_name.ilike.%${search}%,email.ilike.%${search}%`,
      );
    }

    const [{ data: rows, error }, { count }] = await Promise.all([
      query,
      context.supabase
        .from("partnership_enquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
    ]);

    if (error) {
      // Never echo row contents — only the failure itself.
      console.error("[enquiries] list failed:", error.message);
      throw new Error("Forbidden");
    }

    const all = (rows ?? []) as Row[];
    return {
      rows: all.slice(0, ENQUIRY_PAGE_SIZE).map(toEnquiry),
      hasMore: all.length > ENQUIRY_PAGE_SIZE,
      newCount: count ?? 0,
    };
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: EnquiryStatus }) => data)
  .handler(async ({ data, context }): Promise<{ ok: boolean }> => {
    const status = data?.status;
    if (!data?.id || !["new", "contacted", "archived"].includes(status)) {
      return { ok: false };
    }
    // Only `status` is sent — a database trigger rejects any attempt to
    // rewrite what the person actually submitted.
    const { error } = await context.supabase
      .from("partnership_enquiries")
      .update({ status })
      .eq("id", data.id);
    if (error) {
      console.error("[enquiries] status update failed:", error.message);
      return { ok: false };
    }
    return { ok: true };
  });

export const deleteEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }): Promise<{ ok: boolean }> => {
    if (!data?.id) return { ok: false };
    // Permanent, and intended for data-erasure requests.
    const { error } = await context.supabase
      .from("partnership_enquiries")
      .delete()
      .eq("id", data.id);
    if (error) {
      console.error("[enquiries] delete failed:", error.message);
      return { ok: false };
    }
    return { ok: true };
  });

export const countNewEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<number> => {
    const { count, error } = await context.supabase
      .from("partnership_enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new");
    if (error) return 0;
    return count ?? 0;
  });
