import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { RegattaForm } from "@/components/admin/RegattaForm";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  adminCopy,
  markResetRequested,
  resetRateLimitRemaining,
  resetRedirectUrl,
} from "@/lib/admin-copy";
import {
  BOAT_CLASSES,
  formatDateRange,
  toFormValues,
  toPayload,
  type Regatta,
  type RegattaFormValues,
} from "@/lib/regattas";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin/")({
  // The session lives in localStorage, so this back office is client-rendered only.
  ssr: false,
  component: () => (
    <LanguageProvider>
      <AdminPage />
    </LanguageProvider>
  ),

  head: () => ({
    meta: [
      { title: "Admin — Aspire Team" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Back office for the Aspire Team regatta calendar." },
    ],
  }),
});

const classLabel = (value: string) =>
  BOAT_CLASSES.find((b) => b.value === value)?.label ?? value;

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Listener first, then getSession — otherwise a refresh can bounce the user out.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return <Shell><p className="text-parchment/60">Loading…</p></Shell>;
  }

  return session ? <AdminArea session={session} /> : <LoginPanel />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="section-dark section-abyss min-h-screen bg-abyss px-5 py-16 text-parchment">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </main>
  );
}

const fieldClass =
  "w-full rounded-sm border border-parchment/20 bg-abyss/60 px-3 py-2 text-sm outline-none focus:border-gold";

function LoginPanel() {
  const { lang } = useLanguage();
  const c = adminCopy[lang === "en" ? "en" : "pl"];

  const [mode, setMode] = useState<"signIn" | "reset">(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reset")
      ? "reset"
      : "signIn",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const requestReset = async () => {
    setError(null);
    const waitMs = resetRateLimitRemaining();
    if (waitMs > 0) {
      setError(c.resetThrottled(Math.ceil(waitMs / 1000)));
      return;
    }
    setBusy(true);
    // Result is deliberately ignored: the confirmation must be identical whether
    // or not the address is registered (no account enumeration).
    await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: resetRedirectUrl(),
    });
    markResetRequested();
    setBusy(false);
    setNotice(c.resetSent);
  };

  return (
    <Shell>
      <div className="mx-auto max-w-sm">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{c.eyebrow}</p>
        <h1 className="font-display mt-2 text-3xl">
          {mode === "signIn" ? c.backOffice : c.resetTitle}
        </h1>

        {mode === "reset" ? (
          <>
            <p className="mt-3 text-sm text-parchment/65">{c.resetIntro}</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                void requestReset();
              }}
            >
              <label className="block space-y-1.5">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
                  {c.email}
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </label>
              {error ? <p className="text-sm text-red-400">{error}</p> : null}
              {notice ? <p className="text-sm text-parchment/80">{notice}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm bg-gold px-5 py-2 text-sm font-medium text-abyss disabled:opacity-60"
              >
                {busy ? c.sending : c.sendLink}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setMode("signIn");
                setError(null);
                setNotice(null);
              }}
              className="mt-5 text-xs text-parchment/55 underline-offset-4 hover:text-gold hover:underline"
            >
              {c.backToSignIn}
            </button>
          </>
        ) : (
          <>
            <form
              className="mt-8 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setError(null);
                const { error: signInError } = await supabase.auth.signInWithPassword({
                  email: email.trim(),
                  password,
                });
                if (signInError) setError(c.signInError);
                setBusy(false);
              }}
            >
              <label className="block space-y-1.5">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
                  {c.email}
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
                  {c.password}
                </span>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                />
              </label>
              {error ? <p className="text-sm text-red-400">{error}</p> : null}
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm bg-gold px-5 py-2 text-sm font-medium text-abyss disabled:opacity-60"
              >
                {busy ? c.signingIn : c.signIn}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError(null);
                setNotice(null);
              }}
              className="mt-4 text-xs text-parchment/55 underline-offset-4 hover:text-gold hover:underline"
            >
              {c.forgot}
            </button>
            <p className="mt-6 text-xs text-parchment/45">{c.accessNote}</p>
          </>
        )}
      </div>
    </Shell>
  );
}


function AdminArea({ session }: { session: Session }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [regattas, setRegattas] = useState<Regatta[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ id: string | null; values?: RegattaFormValues } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Regatta | null>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    supabase
      .rpc("has_role", { _user_id: session.user.id, _role: "admin" })
      .then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session.user.id]);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("regattas")
      .select("*")
      .order("start_date", { ascending: false });
    if (error) setLoadError("Could not load the calendar.");
    else {
      setLoadError(null);
      setRegattas(data ?? []);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  if (isAdmin === null) {
    return <Shell><p className="text-parchment/60">Checking access…</p></Shell>;
  }

  if (!isAdmin) {
    return (
      <Shell>
        <h1 className="font-display text-3xl">No access</h1>
        <p className="mt-3 max-w-md text-parchment/70">
          This account ({session.user.email}) doesn’t have admin access to the regatta calendar.
          Ask the team to grant it, or sign in with a different account.
        </p>
        <button
          onClick={signOut}
          className="mt-6 rounded-sm border border-parchment/25 px-5 py-2 text-sm text-parchment/80"
        >
          Sign out
        </button>
      </Shell>
    );
  }

  const save = async (values: RegattaFormValues) => {
    setSaving(true);
    setSaveError(null);
    const payload = toPayload(values);
    const { error } = editing?.id
      ? await supabase.from("regattas").update(payload).eq("id", editing.id)
      : await supabase.from("regattas").insert(payload);
    setSaving(false);
    if (error) {
      setSaveError(error.message);
      return;
    }
    setEditing(null);
    void load();
  };

  const remove = async (regatta: Regatta) => {
    const { error } = await supabase.from("regattas").delete().eq("id", regatta.id);
    setPendingDelete(null);
    if (error) setLoadError("Could not delete that event.");
    else void load();
  };

  return (
    <Shell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Aspire Team</p>
          <h1 className="font-display mt-1 text-3xl">Regatta calendar</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSaveError(null);
              setEditing({ id: null });
            }}
            className="rounded-sm bg-gold px-4 py-2 text-sm font-medium text-abyss"
          >
            Add regatta
          </button>
          <Link
            to="/admin/team"
            className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
          >
            {adminCopy[lang === "en" ? "en" : "pl"].team}
          </Link>

          <button
            onClick={signOut}
            className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
          >
            Sign out
          </button>
        </div>
      </header>

      <p className="mt-6 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-parchment/85">
        Changes here are live on the public site immediately.
      </p>

      {loadError ? <p className="mt-4 text-sm text-red-400">{loadError}</p> : null}

      {editing ? (
        <section className="mt-8 rounded-sm border border-parchment/15 p-5 sm:p-7">
          <h2 className="font-display mb-6 text-2xl">
            {editing.id ? "Edit regatta" : "New regatta"}
          </h2>
          <RegattaForm
            key={editing.id ?? "new"}
            initial={editing.values}
            submitting={saving}
            serverError={saveError}
            onCancel={() => setEditing(null)}
            onSubmit={save}
          />
        </section>
      ) : null}

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-parchment/20 text-left text-[11px] uppercase tracking-[0.16em] text-parchment/55">
              <th className="py-3 pr-4">Dates</th>
              <th className="py-3 pr-4">Event</th>
              <th className="py-3 pr-4">Venue</th>
              <th className="py-3 pr-4">Class</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Aspire</th>
              <th className="py-3 pr-4">Pos.</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {regattas.map((r) => (
              <tr key={r.id} className="border-b border-parchment/10 align-top">
                <td className="py-3 pr-4 whitespace-nowrap text-parchment/75">
                  {formatDateRange(r.start_date, r.end_date)}
                </td>
                <td className="py-3 pr-4">
                  <div>{r.name_en}</div>
                  <div className="text-parchment/50">{r.name_pl}</div>
                  {r.series ? <div className="text-xs text-gold/80">{r.series}</div> : null}
                </td>
                <td className="py-3 pr-4 text-parchment/70">
                  {r.venue}
                  <div className="text-xs text-parchment/45">{r.country_code}</div>
                </td>
                <td className="py-3 pr-4 text-parchment/70">{classLabel(r.boat_class)}</td>
                <td className="py-3 pr-4 text-parchment/70">{r.status}</td>
                <td className="py-3 pr-4 text-parchment/70">{r.participation}</td>
                <td className="py-3 pr-4 text-parchment/70">{r.result_position ?? "—"}</td>
                <td className="py-3 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSaveError(null);
                      setEditing({ id: r.id, values: toFormValues(r) });
                    }}
                    className="mr-3 text-gold underline-offset-4 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPendingDelete(r)}
                    className="text-red-400 underline-offset-4 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {regattas.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-parchment/50">
                  No regattas yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {pendingDelete ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
        >
          <div className="w-full max-w-md rounded-sm border border-parchment/20 bg-abyss p-6">
            <h2 className="font-display text-xl">Delete this event?</h2>
            <p className="mt-3 text-sm text-parchment/75">
              “{pendingDelete.name_en}” ({formatDateRange(pendingDelete.start_date, pendingDelete.end_date)})
              will be removed from the public calendar. This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => void remove(pendingDelete)}
                className="rounded-sm bg-red-500 px-4 py-2 text-sm font-medium text-white"
              >
                Delete
              </button>
              <button
                onClick={() => setPendingDelete(null)}
                className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}
