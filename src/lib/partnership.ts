/**
 * Partnership enquiry submission.
 *
 * STUB: currently resolves after a short delay. To wire this to the database
 * and email, replace the body of `submitPartnershipEnquiry` with a call to a
 * server function — the signature and return shape stay the same, so no UI
 * changes are needed.
 */

export type PartnershipEnquiry = {
  company: string;
  person: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitPartnershipEnquiry(
  enquiry: PartnershipEnquiry,
): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (import.meta.env.DEV) {
    console.info("[stub] partnership enquiry", { ...enquiry, email: "[redacted]" });
  }
  return { ok: true };
}
