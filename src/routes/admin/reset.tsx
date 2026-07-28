import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { adminCopy, MIN_PASSWORD_LENGTH } from "@/lib/admin-copy";

export const Route = createFileRoute("/admin/reset")({
  // The recovery session arrives in the URL fragment, so this page is client-only.
  ssr: false,
  component: () => (
    <LanguageProvider>
      <ResetPage />
    </LanguageProvider>
  ),
  head: () => ({
    meta: [
      { title: "Reset hasła — Aspire Team" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Ustaw nowe hasło do panelu Aspire Team." },
    ],
  }),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="section-dark section-abyss flex min-h-screen items-center bg-abyss px-5 py-16 text-parchment">
      <div className="mx-auto w-full max-w-sm">{children}</div>
    </main>
  );
}

const fieldClass =
  "w-full rounded-sm border border-parchment/20 bg-abyss/60 px-3 py-2 text-sm outline-none focus:border-gold";

function ResetPage() {
  const { lang } = useLanguage();
  const c = adminCopy[lang === "en" ? "en" : "pl"];

  const [state, setState] = useState<"checking" | "ready" | "invalid" | "done">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // supabase-js parses the recovery fragment on load and emits PASSWORD_RECOVERY.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setState((prev) => (prev === "done" ? prev : "ready"));
    });
    supabase.auth.getSession().then(({ data }) => {
      setState((prev) => (prev === "done" ? prev : data.session ? "ready" : "invalid"));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state === "checking") {
    return <Shell><p className="text-parchment/60">{c.checking}</p></Shell>;
  }

  if (state === "invalid") {
    return (
      <Shell>
        <p className="eyebrow text-gold">{c.eyebrow}</p>
        <h1 className="font-display mt-2 text-3xl">{c.resetTitle}</h1>
        <p className="mt-4 text-sm text-parchment/75">{c.linkInvalid}</p>
        <a
          href="/admin?reset=1"
          className="mt-6 inline-block text-sm text-gold underline-offset-4 hover:underline"
        >
          {c.requestNew}
        </a>
      </Shell>
    );
  }

  if (state === "done") {
    return <Shell><p className="text-parchment/70">{c.success}</p></Shell>;
  }

  return (
    <Shell>
      <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{c.eyebrow}</p>
      <h1 className="font-display mt-2 text-3xl">{c.resetTitle}</h1>
      <form
        className="mt-8 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          if (password.length < MIN_PASSWORD_LENGTH) {
            setError(c.tooShort);
            return;
          }
          if (password !== confirm) {
            setError(c.mismatch);
            return;
          }
          setBusy(true);
          const { error: updateError } = await supabase.auth.updateUser({ password });
          setBusy(false);
          if (updateError) {
            setError(
              /expired|invalid|session/i.test(updateError.message) ? c.linkInvalid : c.updateFailed,
            );
            return;
          }
          setState("done");
          // The recovery session is already a signed-in session — go straight to the panel.
          window.setTimeout(() => window.location.replace("/admin"), 800);
        }}
      >
        <label className="block space-y-1.5">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
            {c.newPassword}
          </span>
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
            {c.confirmPassword}
          </span>
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={fieldClass}
          />
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-gold px-5 py-2 text-sm font-medium text-abyss disabled:opacity-60"
        >
          {busy ? c.saving : c.setPassword}
        </button>
      </form>
    </Shell>
  );
}
