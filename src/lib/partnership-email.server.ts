/**
 * Team notification email for new partnership enquiries (Resend).
 *
 * Deliberately fail-soft: if RESEND_API_KEY is not configured, or Resend
 * returns an error, we log and return — the enquiry is already stored in the
 * database and the visitor must still see a success confirmation.
 */

// TODO: update this address when the team has a dedicated partnerships inbox.
export const PARTNERSHIP_NOTIFICATION_EMAIL = "kontakt@aspireteam.pl";

/** Single verified sender used for every outbound email (app + auth). */
export const NOREPLY_FROM_ADDRESS = "Aspire Team <no-reply@aspireteam.pl>";

const FROM_ADDRESS = NOREPLY_FROM_ADDRESS;


type EnquiryPayload = {
  company: string;
  person: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  locale: "pl" | "en";
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function notifyTeam(enquiry: EnquiryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[partnership] RESEND_API_KEY is not configured — enquiry saved, notification email skipped.",
    );
    return;
  }

  const rows: Array<[string, string]> = [
    ["Company", enquiry.company],
    ["Contact", enquiry.person],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "—"],
    ["Interest", enquiry.interest],
    ["Language", enquiry.locale.toUpperCase()],
  ];

  const html = [
    `<h2 style="font-family:Georgia,serif">New partnership enquiry</h2>`,
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">`,
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    `</table>`,
    `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>`,
  ].join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [PARTNERSHIP_NOTIFICATION_EMAIL],
        reply_to: enquiry.email,
        subject: `Partnership enquiry — ${enquiry.company}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        `[partnership] Resend request failed [${response.status}]: ${await response.text()}`,
      );
    }
  } catch (err) {
    console.error("[partnership] Resend request threw:", err);
  }
}
