/**
 * Partnership enquiry — shared types and client-side rate limiting.
 *
 * The actual write happens server-side in `partnership.functions.ts`
 * (validation, database insert, email notification).
 */

export type PartnershipEnquiry = {
  company: string;
  person: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: "invalid" | "failed" };

/** Minimum delay between two submissions from the same browser. */
export const RATE_LIMIT_MS = 60_000;
const RATE_LIMIT_KEY = "aspire:lastEnquiryAt";

/** Milliseconds left before this visitor may submit again (0 when allowed). */
export function rateLimitRemaining(now = Date.now()): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(RATE_LIMIT_KEY);
  const last = raw ? Number(raw) : 0;
  if (!Number.isFinite(last) || last <= 0) return 0;
  return Math.max(0, RATE_LIMIT_MS - (now - last));
}

export function markSubmitted(now = Date.now()): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RATE_LIMIT_KEY, String(now));
}
