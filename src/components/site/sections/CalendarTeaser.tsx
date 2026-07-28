import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import type { Regatta } from "@/lib/regattas";
import {
  classLabel,
  formatRange,
  locationLine,
  parseDay,
  regattaName,
} from "@/lib/calendar-format";
import { Reveal } from "../Reveal";

const PREVIEW_COUNT = 3;

/** Homepage preview of the next few regattas; the full schedule lives at /calendar. */
export function CalendarTeaser() {
  const { t, lang } = useLanguage();
  const c = t.calendar;
  const [rows, setRows] = useState<Regatta[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const today = new Date().toISOString().slice(0, 10);
    // Public data by design: the anon client reads under a `using (true)` SELECT policy.
    supabase
      .from("regattas")
      .select("*")
      .neq("status", "cancelled")
      .gte("end_date", today)
      .order("start_date", { ascending: true })
      .limit(PREVIEW_COUNT)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setFailed(true);
        else setRows(data ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="calendar" className="section-dark section-abyss py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{c.teaser.eyebrow}</p>
              <h2 className="font-display mt-4 text-4xl text-parchment md:text-5xl">
                {c.teaser.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-steel">{c.teaser.intro}</p>
            </div>

            <Link
              to="/calendar"
              className="group inline-flex shrink-0 items-center gap-3 border border-gold/60 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-abyss"
            >
              {c.teaser.cta}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          {failed ? (
            <p className="py-8 text-steel">{c.error}</p>
          ) : rows === null ? (
            <div aria-busy="true" aria-live="polite" className="grid gap-6 md:grid-cols-3">
              <span className="sr-only">{c.loading}</span>
              {Array.from({ length: PREVIEW_COUNT }, (_, i) => (
                <div key={i} className="border border-border p-6">
                  <div className="h-3 w-24 animate-pulse bg-parchment/10" />
                  <div className="mt-4 h-6 w-3/4 animate-pulse bg-parchment/10" />
                  <div className="mt-3 h-3 w-1/2 animate-pulse bg-parchment/[0.07]" />
                </div>
              ))}
            </div>
          ) : rows.length === 0 ? (
            <p className="py-8 text-steel">{c.teaser.empty}</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-3">
              {rows.map((r, i) => (
                <li
                  key={r.id}
                  className="flex h-full flex-col border border-border p-6 transition-colors hover:border-gold/50"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                    {formatRange(r.start_date, r.end_date, lang, c)}
                  </p>
                  <h3 className="font-display mt-3 text-xl text-parchment">
                    {regattaName(r, lang)}
                  </h3>
                  <p className="mt-2 text-sm text-steel">{locationLine(r)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="border border-gold/40 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                      {classLabel(r.boat_class, c)}
                    </span>
                    {i === 0 ? (
                      <span className="border border-parchment/25 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-silver">
                        {c.nextUp}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
