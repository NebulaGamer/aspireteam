import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Regatta } from "@/lib/regattas";
import {
  addDays,
  classLabel,
  dayKey,
  formatRange,
  locationLine,
  mondayIndex,
  monthLabel,
  parseDay,
  regattaName,
  regattaNotes,
  startOfToday,
} from "@/lib/calendar-format";

const DAY_MS = 86_400_000;

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / DAY_MS);
}

type Bar = { regatta: Regatta; colStart: number; span: number; lane: number };

function barsForWeek(weekStart: Date, rows: Regatta[]): Bar[] {
  const weekEnd = addDays(weekStart, 6);
  const overlapping = rows
    .filter((r) => parseDay(r.start_date) <= weekEnd && parseDay(r.end_date) >= weekStart)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));

  const laneEnds: number[] = [];
  return overlapping.map((r) => {
    const colStart = Math.max(0, diffDays(parseDay(r.start_date), weekStart));
    const colEnd = Math.min(6, diffDays(parseDay(r.end_date), weekStart));
    let lane = laneEnds.findIndex((end) => end < colStart);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = colEnd;
    return { regatta: r, colStart, span: colEnd - colStart + 1, lane };
  });
}

function classBar(boatClass: string, cancelled: boolean): string {
  const base = cancelled ? "opacity-50 line-through" : "";
  return boatClass === "cape31"
    ? `border border-parchment/35 bg-parchment/10 text-parchment ${base}`
    : `border border-gold/60 bg-gold/85 text-abyss ${base}`;
}

export function MonthView({ rows }: { rows: Regatta[] }) {
  const { t, lang } = useLanguage();
  const c = t.calendar;
  const today = startOfToday();

  const initial = useMemo(() => {
    const upcoming = rows.find((r) => parseDay(r.end_date) >= today);
    const anchor = upcoming ? parseDay(upcoming.start_date) : rows[0] ? parseDay(rows[0].start_date) : today;
    return new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cursor, setCursor] = useState<Date>(initial);
  const [selected, setSelected] = useState<Regatta | null>(null);

  // Keep the visible month inside the filtered data when filters change.
  useEffect(() => {
    if (rows.length === 0) return;
    const inRange = rows.some(
      (r) =>
        parseDay(r.end_date) >= new Date(cursor.getFullYear(), cursor.getMonth(), 1) &&
        parseDay(r.start_date) <= new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0),
    );
    if (!inRange) {
      const anchor = parseDay(rows[0].start_date);
      setCursor(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const gridStart = addDays(first, -mondayIndex(first));
  const weeks = Array.from({ length: 6 }, (_, w) => addDays(gridStart, w * 7));

  const monthRows = rows.filter(
    (r) =>
      parseDay(r.end_date) >= gridStart && parseDay(r.start_date) <= addDays(gridStart, 41),
  );

  const shift = (delta: number) =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-2xl text-parchment">{monthLabel(cursor, c)}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label={c.prevMonth}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-silver transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
            className="border border-border px-4 py-1.5 text-xs tracking-[0.1em] text-silver transition-colors hover:border-gold hover:text-gold"
          >
            {c.today}
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label={c.nextMonth}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-silver transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div role="group" aria-label={monthLabel(cursor, c)} className="mt-6 border border-border">
        <div aria-hidden="true" className="grid grid-cols-7 border-b border-border">
          {c.weekdays.map((d) => (
            <div
              key={d}
              className="px-2 py-3 text-center text-[0.55rem] uppercase tracking-[0.18em] text-steel"
            >
              {d}
            </div>
          ))}
        </div>

        {weeks.map((weekStart) => {
          const bars = barsForWeek(weekStart, monthRows);
          const lanes = bars.reduce((max, b) => Math.max(max, b.lane + 1), 0);
          return (
            <div key={dayKey(weekStart)} className="border-b border-border last:border-b-0">
              <div className="grid grid-cols-7">
                {Array.from({ length: 7 }, (_, i) => {
                  const day = addDays(weekStart, i);
                  const outside = day.getMonth() !== cursor.getMonth();
                  const isToday = day.getTime() === today.getTime();
                  const dayEvents = monthRows.filter(
                    (r) => parseDay(r.start_date) <= day && parseDay(r.end_date) >= day,
                  );
                  const label = `${day.getDate()} ${c.monthsOf[day.getMonth()]} ${day.getFullYear()}`;
                  const content = (
                    <span
                      className={`inline-flex h-6 min-w-6 items-center justify-center text-xs ${
                        isToday ? "bg-gold font-medium text-abyss" : ""
                      }`}
                    >
                      {day.getDate()}
                    </span>
                  );
                  return dayEvents.length > 0 ? (
                    <button
                      key={dayKey(day)}
                      type="button"
                      onClick={() => setSelected(dayEvents[0])}
                      aria-label={`${label} — ${regattaName(dayEvents[0], lang)}`}
                      className={`px-1.5 pt-2 text-center transition-colors hover:bg-parchment/5 ${
                        outside ? "opacity-35" : ""
                      }`}
                    >
                      {content}
                    </button>
                  ) : (
                    <div
                      key={dayKey(day)}
                      aria-label={label}
                      className={`px-1.5 pt-2 text-center ${outside ? "opacity-35" : ""}`}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              <div
                className="grid grid-cols-7 gap-y-1 px-1 pb-2 pt-1"
                style={{ minHeight: lanes ? undefined : "0.75rem" }}
              >
                {bars.map((bar) => (
                  <button
                    key={`${bar.regatta.id}-${dayKey(weekStart)}`}
                    type="button"
                    onClick={() => setSelected(bar.regatta)}
                    style={{
                      gridColumn: `${bar.colStart + 1} / span ${bar.span}`,
                      gridRow: bar.lane + 1,
                    }}
                    title={regattaName(bar.regatta, lang)}
                    className={`truncate px-1.5 py-1 text-left text-[0.6rem] leading-tight transition-opacity hover:opacity-85 ${classBar(
                      bar.regatta.boat_class,
                      bar.regatta.status === "cancelled",
                    )}`}
                  >
                    {regattaName(bar.regatta, lang)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {monthRows.length === 0 ? <p className="mt-6 text-sm text-steel">{c.monthEmpty}</p> : null}

      {selected ? <DetailDialog regatta={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  );
}

function DetailDialog({ regatta: r, onClose }: { regatta: Regatta; onClose: () => void }) {
  const { t, lang } = useLanguage();
  const c = t.calendar;
  const notes = regattaNotes(r, lang);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-abyss/80 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.detailsLabel}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md border border-gold/40 bg-ocean p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[0.55rem] uppercase tracking-[0.24em] text-gold">
            {classLabel(r.boat_class, c.filters)}
            {r.series ? ` · ${r.series}` : ""}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.close}
            autoFocus
            className="text-silver transition-colors hover:text-gold"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <h3 className="font-display mt-3 text-2xl text-parchment">{regattaName(r, lang)}</h3>
        <p className="mt-2 text-sm text-silver">{formatRange(r.start_date, r.end_date, lang, c)}</p>
        <p className="mt-1 text-sm text-steel">{locationLine(r)}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {r.status === "cancelled" ? (
            <span className="border border-border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-steel">
              {c.status.cancelled}
            </span>
          ) : null}
          {r.participation === "confirmed" || r.participation === "planned" ? (
            <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-silver">
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  r.participation === "confirmed" ? "bg-gold" : "border border-gold"
                }`}
              />
              {r.participation === "confirmed" ? c.participation.confirmed : c.participation.planned}
            </span>
          ) : null}
          {r.result_position != null ? (
            <span className="border border-gold/50 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold">
              {c.place} {r.result_position}
            </span>
          ) : null}
        </div>

        {notes ? <p className="mt-4 text-xs italic text-steel">{notes}</p> : null}

        {r.event_url ? (
          <a
            href={r.event_url}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-block border border-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {r.event_url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        ) : null}
      </div>
    </div>
  );
}
