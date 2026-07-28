import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import type { Regatta } from "@/lib/regattas";
import { nextUpId, parseDay, seasonsFrom } from "@/lib/calendar-format";
import { useIsMobile } from "@/hooks/use-mobile";
import { Reveal } from "../Reveal";
import { AgendaView } from "../calendar/AgendaView";
import { MonthView } from "../calendar/MonthView";

const VIEW_STORAGE_KEY = "aspire.calendar.view";
type View = "agenda" | "month";

export function CalendarSection() {
  const { t } = useLanguage();
  const c = t.calendar;
  const isMobile = useIsMobile();

  // Route-agnostic: the section lives on /calendar but keeps its filters in the URL.
  const search = useSearch({ strict: false }) as { cls?: string; season?: string };
  const navigate = useNavigate();

  const classFilter = search.cls ?? "all";
  const seasonFilter = search.season ?? "all";

  const setFilter = (key: "cls" | "season", value: string) =>
    navigate({
      to: ".",
      search: (prev: Record<string, string | undefined>) => ({
        ...prev,
        [key]: value === "all" ? undefined : value,
      }),
      replace: true,
      resetScroll: false,
    });


  const [view, setView] = useState<View>("agenda");
  const [rows, setRows] = useState<Regatta[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(VIEW_STORAGE_KEY);
    if (stored === "agenda" || stored === "month") setView(stored);
  }, []);

  const chooseView = (next: View) => {
    setView(next);
    window.localStorage.setItem(VIEW_STORAGE_KEY, next);
  };

  useEffect(() => {
    let active = true;
    // Public data by design: the anon client reads under a `using (true)` SELECT policy.
    supabase
      .from("regattas")
      .select("*")
      .order("start_date", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setFailed(true);
        else setRows(data ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  const seasons = useMemo(() => seasonsFrom(rows ?? []), [rows]);

  const filtered = useMemo(() => {
    return (rows ?? []).filter((r) => {
      if (classFilter !== "all" && r.boat_class !== classFilter) return false;
      if (seasonFilter !== "all" && String(parseDay(r.start_date).getFullYear()) !== seasonFilter)
        return false;
      return true;
    });
  }, [rows, classFilter, seasonFilter]);

  const nextId = useMemo(() => nextUpId(filtered), [filtered]);

  // The month grid is unreadable in a 375px column — fall back to the agenda.
  const effectiveView: View = isMobile ? "agenda" : view;

  return (
    <section id="calendar" className="section-dark section-abyss py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 className="font-display mt-4 text-4xl text-parchment md:text-5xl">{c.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-steel">{c.intro}</p>
            </div>

            <div
              role="group"
              aria-label={c.viewLabel}
              className="hidden shrink-0 border border-border md:flex"
            >
              {(["agenda", "month"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => chooseView(v)}
                  aria-pressed={view === v}
                  className={`px-5 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                    view === v
                      ? "bg-gold text-abyss"
                      : "text-silver hover:text-gold"
                  }`}
                >
                  {c.views[v]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10 flex flex-col gap-4">
          <Chips
            label={c.filters.class}
            value={classFilter}
            allLabel={c.filters.all}
            options={[
              { value: "five_five", label: c.filters.five },
              { value: "cape31", label: c.filters.cape },
            ]}
            onChange={(v) => setFilter("cls", v)}
          />
          {seasons.length > 1 ? (
            <Chips
              label={c.filters.season}
              value={seasonFilter}
              allLabel={c.filters.all}
              options={seasons.map((y) => ({ value: String(y), label: String(y) }))}
              onChange={(v) => setFilter("season", v)}
            />
          ) : null}
        </Reveal>

        <Reveal delay={140} className="mt-12">
          {failed ? (
            <p className="py-12 text-steel">{c.error}</p>
          ) : rows === null ? (
            <Skeleton label={c.loading} />
          ) : effectiveView === "month" ? (
            <MonthView rows={filtered} />
          ) : (
            <AgendaView rows={filtered} nextId={nextId} />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Chips({
  label,
  value,
  allLabel,
  options,
  onChange,
}: {
  label: string;
  value: string;
  allLabel: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-3">
      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-steel">{label}</span>
      {[{ value: "all", label: allLabel }, ...options].map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          className={`border px-4 py-1.5 text-xs tracking-[0.1em] transition-colors ${
            value === opt.value
              ? "border-gold bg-gold text-abyss"
              : "border-gold/30 text-silver hover:border-gold hover:text-gold"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Skeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">{label}</span>
      <div className="space-y-6">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="border-b border-border pb-6">
            <div className="h-3 w-32 animate-pulse bg-parchment/10" />
            <div className="mt-3 h-6 w-2/3 animate-pulse bg-parchment/10" />
            <div className="mt-3 h-3 w-1/3 animate-pulse bg-parchment/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
