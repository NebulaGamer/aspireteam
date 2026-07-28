import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { adminCopy } from "@/lib/admin-copy";
import {
  getAdminTeam,
  inviteAdmin,
  revokeAdmin,
  type AuditEntry,
  type TeamMember,
  type TeamResult,
} from "@/lib/admin-team.functions";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin/team")({
  // Session lives in localStorage — panel screens are client-rendered only.
  ssr: false,
  component: () => (
    <LanguageProvider>
      <TeamPage />
    </LanguageProvider>
  ),
  head: () => ({
    meta: [
      { title: "Zespół — Aspire Team" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Zarządzanie dostępem do panelu Aspire Team." },
    ],
  }),
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="section-dark section-abyss min-h-screen bg-abyss px-5 py-16 text-parchment">
      <div className="mx-auto w-full max-w-4xl">{children}</div>
    </main>
  );
}

function TeamPage() {
  const { lang } = useLanguage();
  const c = adminCopy[lang === "en" ? "en" : "pl"];
  const locale = lang === "en" ? "en-GB" : "pl-PL";

  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [log, setLog] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pendingRevoke, setPendingRevoke] = useState<TeamMember | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, next) => {
      setSession(next);
      setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminTeam();
      setMembers(data.members);
      setLog(data.log);
    } catch {
      setMessage({ ok: false, text: c.resultMsg.forbidden });
    }
    setLoading(false);
  }, [c]);

  useEffect(() => {
    if (session) void load();
  }, [session, load]);

  const show = (r: TeamResult) =>
    setMessage({ ok: r.ok, text: c.resultMsg[r.code] });

  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(locale);
  const fmtDateTime = (iso: string) => new Date(iso).toLocaleString(locale);

  if (!ready) return <Shell><p className="text-parchment/60">{c.loading}</p></Shell>;

  if (!session) {
    return (
      <Shell>
        <p className="text-parchment/70">{c.resultMsg.forbidden}</p>
        <Link to="/admin" className="mt-4 inline-block text-sm text-gold hover:underline">
          {c.signIn}
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{c.eyebrow}</p>
          <h1 className="font-display mt-1 text-3xl">{c.teamTitle}</h1>
          <p className="mt-2 max-w-lg text-sm text-parchment/60">{c.teamIntro}</p>
        </div>
        <Link
          to="/admin"
          className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
        >
          {c.backToCalendar}
        </Link>
      </header>

      {message ? (
        <p className={`mt-6 text-sm ${message.ok ? "text-gold" : "text-red-400"}`}>{message.text}</p>
      ) : null}

      <form
        className="mt-8 flex flex-wrap items-end gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMessage(null);
          const result = await inviteAdmin({ data: { email } });
          setBusy(false);
          show(result);
          if (result.ok) {
            setEmail("");
            void load();
          }
        }}
      >
        <label className="min-w-[16rem] flex-1 space-y-1.5">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-parchment/60">
            {c.inviteLabel}
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-parchment/20 bg-abyss/60 px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-sm bg-gold px-5 py-2 text-sm font-medium text-abyss disabled:opacity-60"
        >
          {busy ? c.inviting : c.invite}
        </button>
      </form>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-parchment/20 text-left text-[11px] uppercase tracking-[0.16em] text-parchment/55">
              <th className="py-3 pr-4">{c.colEmail}</th>
              <th className="py-3 pr-4">{c.colAdded}</th>
              <th className="py-3 pr-4">{c.colLastSignIn}</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const isSelf = m.userId === session.user.id;
              return (
                <tr key={m.userId} className="border-b border-parchment/10">
                  <td className="py-3 pr-4">
                    {m.email}
                    {isSelf ? <span className="ml-2 text-gold">{c.you}</span> : null}
                  </td>
                  <td className="py-3 pr-4 text-parchment/70">{fmtDate(m.addedAt)}</td>
                  <td className="py-3 pr-4 text-parchment/70">
                    {m.lastSignInAt ? fmtDateTime(m.lastSignInAt) : c.never}
                  </td>
                  <td className="py-3 text-right">
                    {isSelf || members.length <= 1 ? null : (
                      <button
                        onClick={() => setPendingRevoke(m)}
                        className="text-red-400 underline-offset-4 hover:underline"
                      >
                        {c.revoke}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {!loading && members.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-parchment/50">
                  {c.auditEmpty}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-parchment/45">{c.revokeNote}</p>

      <section className="mt-14">
        <h2 className="font-display text-xl">{c.auditTitle}</h2>
        <ul className="mt-4 space-y-2 text-sm text-parchment/70">
          {log.map((e) => (
            <li key={e.id} className="border-b border-parchment/10 pb-2">
              {c.auditAction[e.action](e.targetEmail, e.actorEmail ?? c.someone)}
              <span className="ml-2 text-xs text-parchment/40">{fmtDateTime(e.createdAt)}</span>
            </li>
          ))}
          {log.length === 0 ? <li className="text-parchment/45">{c.auditEmpty}</li> : null}
        </ul>
      </section>

      {pendingRevoke ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.revokeTitle}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5"
        >
          <div className="w-full max-w-md rounded-sm border border-parchment/20 bg-abyss p-6">
            <h2 className="font-display text-xl">{c.revokeTitle}</h2>
            <p className="mt-3 text-sm text-parchment/75">{c.revokeBody(pendingRevoke.email)}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={async () => {
                  const target = pendingRevoke;
                  setPendingRevoke(null);
                  setMessage(null);
                  const result = await revokeAdmin({ data: { userId: target.userId } });
                  show(result);
                  void load();
                }}
                className="rounded-sm bg-red-500 px-4 py-2 text-sm font-medium text-white"
              >
                {c.confirmRevoke}
              </button>
              <button
                onClick={() => setPendingRevoke(null)}
                className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
              >
                {c.cancel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}
