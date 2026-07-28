import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { adminCopy } from "@/lib/admin-copy";
import { enquiryCopy } from "@/lib/enquiries-copy";
import {
  deleteEnquiry,
  listEnquiries,
  setEnquiryStatus,
  type Enquiry,
  type EnquiryStatus,
} from "@/lib/enquiries.functions";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin/enquiries")({
  // Session lives in localStorage — panel screens are client-rendered only.
  ssr: false,
  component: () => (
    <LanguageProvider>
      <EnquiriesPage />
    </LanguageProvider>
  ),
  head: () => ({
    meta: [
      { title: "Zapytania — Aspire Team" },
      // Personal data: never indexed, never followed.
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Zapytania partnerskie Aspire Team." },
    ],
  }),
});

/** Filter presets. Archived is hidden by default — triage lives in the first two. */
const DEFAULT_STATUSES: EnquiryStatus[] = ["new", "contacted"];
const ALL_STATUSES: EnquiryStatus[] = ["new", "contacted", "archived"];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="section-dark section-abyss min-h-screen bg-abyss px-4 py-12 text-parchment sm:px-5 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">{children}</div>
    </main>
  );
}

function EnquiriesPage() {
  const { lang } = useLanguage();
  const key = lang === "en" ? "en" : "pl";
  const c = enquiryCopy[key];
  const a = adminCopy[key];
  const locale = key === "en" ? "en-GB" : "pl-PL";

  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const [rows, setRows] = useState<Enquiry[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Enquiry | null>(null);

  // Filter state is kept in memory only — never in the URL, since these
  // screens deal with personal data.
  const [statuses, setStatuses] = useState<EnquiryStatus[]>(DEFAULT_STATUSES);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

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

  // Debounce the search box so typing doesn't hammer the server.
  useEffect(() => {
    const id = window.setTimeout(() => setSearch(searchInput), 300);
    return () => window.clearTimeout(id);
  }, [searchInput]);

  const load = useCallback(
    async (offset = 0) => {
      setLoading(true);
      setError(null);
      try {
        const page = await listEnquiries({ data: { statuses, search, offset } });
        setRows((prev) => (offset === 0 ? page.rows : [...prev, ...page.rows]));
        setHasMore(page.hasMore);
        setNewCount(page.newCount);
      } catch {
        setError(c.forbidden);
      }
      setLoading(false);
    },
    [statuses, search, c],
  );

  useEffect(() => {
    if (session) void load(0);
  }, [session, load]);

  const toggleStatus = (s: EnquiryStatus) =>
    setStatuses((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s].sort(),
    );

  const changeStatus = async (row: Enquiry, status: EnquiryStatus) => {
    setBusyId(row.id);
    const result = await setEnquiryStatus({ data: { id: row.id, status } });
    setBusyId(null);
    if (!result.ok) {
      setError(c.error);
      return;
    }
    setNewCount((n) => n + (status === "new" ? 1 : row.status === "new" ? -1 : 0));
    // Drop the row when it no longer matches the active filters.
    setRows((prev) =>
      prev
        .map((r) => (r.id === row.id ? { ...r, status } : r))
        .filter((r) => statuses.length === 0 || statuses.includes(r.status)),
    );
  };

  const confirmDelete = async () => {
    const target = pendingDelete;
    if (!target) return;
    setPendingDelete(null);
    setBusyId(target.id);
    const result = await deleteEnquiry({ data: { id: target.id } });
    setBusyId(null);
    if (!result.ok) {
      setError(c.error);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== target.id));
    if (target.status === "new") setNewCount((n) => Math.max(0, n - 1));
  };

  const filtersActive = useMemo(
    () => search.length > 0 || statuses.length !== ALL_STATUSES.length,
    [search, statuses],
  );

  if (!ready) {
    return (
      <Shell>
        <p className="text-parchment/60">{c.loading}</p>
      </Shell>
    );
  }

  if (!session) {
    return (
      <Shell>
        <p className="text-parchment/70">{c.forbidden}</p>
        <Link to="/admin" className="mt-4 inline-block text-sm text-gold hover:underline">
          {a.signIn}
        </Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{a.eyebrow}</p>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl">{c.title}</h1>
          <p className="mt-2 max-w-lg text-sm text-parchment/60">{c.intro}</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/admin"
            className="rounded-sm border border-parchment/25 px-4 py-2 text-sm text-parchment/80"
          >
            {c.back}
          </Link>
        </div>
      </header>

      <div className="mt-8 space-y-4">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={c.search}
          aria-label={c.search}
          className="w-full rounded-sm border border-parchment/20 bg-abyss/60 px-3 py-2.5 text-sm outline-none placeholder:text-parchment/35 focus:border-gold"
        />
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((s) => {
            const on = statuses.includes(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggleStatus(s)}
                className={`rounded-full border px-3.5 py-1.5 text-xs tracking-wide transition-colors ${
                  on
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-parchment/20 text-parchment/55 hover:border-parchment/40"
                }`}
              >
                {c.filters[s]}
                {s === "new" && newCount > 0 ? (
                  <span className="ml-1.5 text-gold">{newCount}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {error ? <p className="mt-5 text-sm text-red-400">{error}</p> : null}

      {loading && rows.length === 0 ? (
        <p className="mt-10 text-sm text-parchment/55">{c.loading}</p>
      ) : null}

      {!loading && rows.length === 0 ? (
        <div className="mt-12 rounded-sm border border-parchment/15 px-6 py-14 text-center">
          <span aria-hidden="true" className="mx-auto block h-2 w-2 rotate-45 bg-gold/70" />
          <h2 className="font-display mt-6 text-xl">{c.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-parchment/55">
            {filtersActive ? c.emptyFiltered : c.emptyBody}
          </p>
        </div>
      ) : null}

      <ul className="mt-8 space-y-3">
        {rows.map((row) => (
          <EnquiryCard
            key={row.id}
            row={row}
            copy={c}
            locale={locale}
            open={expanded === row.id}
            busy={busyId === row.id}
            onToggle={() => setExpanded((id) => (id === row.id ? null : row.id))}
            onStatus={(s) => void changeStatus(row, s)}
            onDelete={() => setPendingDelete(row)}
          />
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          disabled={loading}
          onClick={() => void load(rows.length)}
          className="mx-auto mt-8 block rounded-sm border border-parchment/25 px-5 py-2.5 text-sm text-parchment/80 disabled:opacity-60"
        >
          {loading ? c.loading : c.loadMore}
        </button>
      ) : null}

      {pendingDelete ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.deleteTitle}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
        >
          <div className="w-full max-w-md rounded-sm border border-parchment/20 bg-abyss p-6">
            <h2 className="font-display text-xl">{c.deleteTitle}</h2>
            <p className="mt-3 text-sm text-parchment/75">
              {c.deleteBody(pendingDelete.companyName)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => void confirmDelete()}
                className="rounded-sm bg-red-500 px-4 py-2 text-sm font-medium text-white"
              >
                {c.confirmDelete}
              </button>
              <button
                onClick={() => setPendingDelete(null)}
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

const STATUS_PILL: Record<EnquiryStatus, string> = {
  new: "border-gold/60 bg-gold/15 text-gold",
  contacted: "border-parchment/30 text-parchment/70",
  archived: "border-parchment/15 text-parchment/40",
};

function EnquiryCard({
  row,
  copy,
  locale,
  open,
  busy,
  onToggle,
  onStatus,
  onDelete,
}: {
  row: Enquiry;
  copy: (typeof enquiryCopy)["pl"];
  locale: string;
  open: boolean;
  busy: boolean;
  onToggle: () => void;
  onStatus: (s: EnquiryStatus) => void;
  onDelete: () => void;
}) {
  const received = new Date(row.createdAt).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  // Subject follows the language the visitor wrote in, not the panel language.
  const mailto = `mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(
    enquiryCopy[row.locale].replySubject,
  )}`;

  return (
    <li className={`rounded-sm border border-parchment/15 ${busy ? "opacity-60" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:px-5"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide ${STATUS_PILL[row.status]}`}
          >
            {copy.status[row.status]}
          </span>
          <span className="rounded-sm border border-parchment/20 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-parchment/55">
            {row.locale}
          </span>
          <span className="rounded-sm bg-parchment/10 px-2 py-0.5 text-[11px] text-parchment/70">
            {copy.interest[row.interest] ?? row.interest}
          </span>
        </div>
        <div>
          <p className="font-display text-lg leading-snug break-words">{row.companyName}</p>
          <p className="mt-1 text-sm text-parchment/60 break-words">
            {row.contactName} · {received}
          </p>
        </div>
      </button>

      {open ? (
        <div className="border-t border-parchment/12 px-4 py-5 text-sm sm:px-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label={copy.fieldCompany}>{row.companyName}</Field>
            <Field label={copy.fieldPerson}>{row.contactName}</Field>
            <Field label={copy.fieldEmail}>
              <a href={mailto} className="text-gold underline-offset-4 hover:underline break-all">
                {row.email}
              </a>
            </Field>
            <Field label={copy.fieldPhone}>
              {row.phone ? (
                <a
                  href={`tel:${row.phone.replace(/[^+\d]/g, "")}`}
                  className="text-gold underline-offset-4 hover:underline"
                >
                  {row.phone}
                </a>
              ) : (
                <span className="text-parchment/40">—</span>
              )}
            </Field>
            <Field label={copy.fieldInterest}>{copy.interest[row.interest] ?? row.interest}</Field>
            <Field label={copy.fieldReceived}>{received}</Field>
            <Field label={copy.fieldLocale}>{row.locale.toUpperCase()}</Field>
          </dl>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-parchment/50">
              {copy.fieldMessage}
            </p>
            <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-parchment/85">
              {row.message}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {row.status !== "contacted" ? (
              <Action onClick={() => onStatus("contacted")}>{copy.markContacted}</Action>
            ) : null}
            {row.status !== "archived" ? (
              <Action onClick={() => onStatus("archived")}>{copy.archive}</Action>
            ) : null}
            {row.status !== "new" ? (
              <Action onClick={() => onStatus("new")}>{copy.reopen}</Action>
            ) : null}
            <button
              type="button"
              onClick={onDelete}
              className="rounded-sm border border-red-500/50 px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10"
            >
              {copy.remove}
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.18em] text-parchment/50">{label}</dt>
      <dd className="mt-1 break-words text-parchment/85">{children}</dd>
    </div>
  );
}

function Action({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-sm border border-parchment/25 px-3.5 py-2 text-xs text-parchment/80 hover:border-gold hover:text-gold"
    >
      {children}
    </button>
  );
}
