import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { SubmitResult } from "./partnership";

/**
 * Server-side handling of a partnership enquiry:
 *  1. validate the payload again (never trust the browser),
 *  2. insert into `partnership_enquiries` (anon INSERT is allowed by RLS),
 *  3. notify the team by email — failures here never fail the submission.
 */

// Server-side schema. Mirrors the browser validation but is the authoritative one.
const enquirySchema = z.object({
  company: z.string().trim().min(1).max(100),
  person: z.string().trim().min(1).max(100),
  email: z.string().trim().min(3).max(255).email(),
  phone: z.string().trim().max(30).optional().default(""),
  interest: z.string().trim().min(1).max(60),
  message: z.string().trim().min(1).max(1000),
  locale: z.enum(["pl", "en"]),
  // Honeypot: must always be empty. Bots fill hidden inputs, humans can't see them.
  website: z.string().max(0).optional().default(""),
});

export const submitPartnershipEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<SubmitResult> => {
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      return { ok: false, error: "invalid" };
    }
    const enquiry = parsed.data;

    // Honeypot tripped — pretend everything is fine, store nothing.
    if (enquiry.website.length > 0) {
      return { ok: true };
    }

    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      console.error("[partnership] missing Supabase environment configuration");
      return { ok: false, error: "failed" };
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("partnership_enquiries").insert({
      company_name: enquiry.company,
      contact_name: enquiry.person,
      email: enquiry.email,
      phone: enquiry.phone || null,
      interest: enquiry.interest,
      message: enquiry.message,
      locale: enquiry.locale,
    });

    if (error) {
      console.error("[partnership] insert failed:", error.message);
      return { ok: false, error: "failed" };
    }

    // Best-effort notification. Never blocks or fails the saved enquiry.
    try {
      const { notifyTeam } = await import("./partnership-email.server");
      await notifyTeam(enquiry);
    } catch (err) {
      console.error("[partnership] notification failed:", err);
    }

    return { ok: true };
  });
