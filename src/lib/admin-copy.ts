/**
 * Back-office copy (PL/EN) for the admin sign-in and password recovery flows.
 * Kept separate from the marketing dictionary in `src/i18n/translations.ts`.
 */

export const PRODUCTION_ORIGIN = "https://aspireteam.pl";

/** Where Supabase should send the user after they click the recovery link. */
export function resetRedirectUrl(): string {
  if (typeof window === "undefined") return `${PRODUCTION_ORIGIN}/admin/reset`;
  const host = window.location.hostname;
  // Previews and local dev keep their own origin so the flow stays testable.
  const isNonProduction =
    host === "localhost" || host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com");
  return `${isNonProduction ? window.location.origin : PRODUCTION_ORIGIN}/admin/reset`;
}

/** Minimum delay between two password-reset requests from the same browser. */
export const RESET_RATE_LIMIT_MS = 60_000;
const RESET_RATE_LIMIT_KEY = "aspire:lastResetRequestAt";

export function resetRateLimitRemaining(now = Date.now()): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(RESET_RATE_LIMIT_KEY);
  const last = raw ? Number(raw) : 0;
  if (!Number.isFinite(last) || last <= 0) return 0;
  return Math.max(0, RESET_RATE_LIMIT_MS - (now - last));
}

export function markResetRequested(now = Date.now()): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RESET_RATE_LIMIT_KEY, String(now));
}

export const MIN_PASSWORD_LENGTH = 12;

export const adminCopy = {
  pl: {
    eyebrow: "Aspire Team",
    backOffice: "Panel",
    email: "E-mail",
    password: "Hasło",
    signIn: "Zaloguj się",
    signingIn: "Logowanie…",
    signInError: "Logowanie nie powiodło się. Sprawdź e-mail i hasło.",
    accessNote: "Dostęp nadaje zespół. Konta nie można założyć tutaj.",
    forgot: "Nie pamiętasz hasła?",
    resetTitle: "Reset hasła",
    resetIntro: "Podaj adres e-mail przypisany do konta.",
    sendLink: "Wyślij link",
    sending: "Wysyłanie…",
    // Identical response for every address — never reveal whether a account exists.
    resetSent: "Jeśli konto istnieje, wysłaliśmy link.",
    resetThrottled: (s: number) => `Odczekaj ${s} s przed kolejną próbą.`,
    backToSignIn: "Wróć do logowania",
    newPassword: "Nowe hasło",
    confirmPassword: "Powtórz hasło",
    setPassword: "Ustaw hasło",
    saving: "Zapisywanie…",
    tooShort: `Hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków.`,
    mismatch: "Hasła nie są takie same.",
    linkInvalid: "Link wygasł lub został już użyty.",
    requestNew: "Poproś o nowy link",
    updateFailed: "Nie udało się zmienić hasła. Spróbuj ponownie.",
    checking: "Sprawdzanie linku…",
    success: "Hasło zmienione. Przechodzimy do panelu…",
  },
  en: {
    eyebrow: "Aspire Team",
    backOffice: "Back office",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    signInError: "Sign-in failed. Check your email and password.",
    accessNote: "Access is granted by the team. Accounts cannot be created here.",
    forgot: "Forgot your password?",
    resetTitle: "Reset password",
    resetIntro: "Enter the email address linked to the account.",
    sendLink: "Send link",
    sending: "Sending…",
    resetSent: "If an account exists, we've sent a link.",
    resetThrottled: (s: number) => `Please wait ${s}s before trying again.`,
    backToSignIn: "Back to sign in",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    setPassword: "Set password",
    saving: "Saving…",
    tooShort: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    mismatch: "Passwords don't match.",
    linkInvalid: "This link has expired or was already used.",
    requestNew: "Request a new link",
    updateFailed: "Could not change the password. Please try again.",
    checking: "Checking link…",
    success: "Password changed. Taking you to the panel…",
  },
} as const;

export type AdminCopy = (typeof adminCopy)["pl"];
