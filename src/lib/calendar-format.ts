import type { Language } from "@/i18n/translations";
import type { Regatta } from "@/lib/regattas";

export type CalendarStrings = {
  months: readonly string[];
  monthsOf: readonly string[];
};

/** Parse a `YYYY-MM-DD` date column as a local calendar day (no timezone drift). */
export function parseDay(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function dayKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Monday-first weekday index: Monday = 0 … Sunday = 6. */
export function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

/**
 * Locale-correct date ranges.
 * PL uses the genitive month form and collapses same-month ranges:
 * "27–30 sierpnia 2026", "29 czerwca – 3 lipca 2026".
 */
export function formatRange(
  start: string,
  end: string,
  lang: Language,
  s: CalendarStrings,
): string {
  const a = parseDay(start);
  const b = parseDay(end);
  const month = (d: Date) => s.monthsOf[d.getMonth()];
  const day = (d: Date) => d.getDate();

  if (a.getTime() === b.getTime()) {
    return `${day(a)} ${month(a)} ${a.getFullYear()}`;
  }
  if (a.getFullYear() !== b.getFullYear()) {
    return `${day(a)} ${month(a)} ${a.getFullYear()} – ${day(b)} ${month(b)} ${b.getFullYear()}`;
  }
  if (a.getMonth() !== b.getMonth()) {
    return `${day(a)} ${month(a)} – ${day(b)} ${month(b)} ${b.getFullYear()}`;
  }
  // Same month: collapse to "27–30 sierpnia 2026" (en dash, no spaces).
  return `${day(a)}–${day(b)} ${month(a)} ${a.getFullYear()}`;
}

export function monthLabel(date: Date, s: CalendarStrings): string {
  return `${s.months[date.getMonth()]} ${date.getFullYear()}`;
}

export function regattaName(r: Regatta, lang: Language): string {
  return lang === "pl" ? r.name_pl : r.name_en;
}

export function regattaNotes(r: Regatta, lang: Language): string | null {
  return (lang === "pl" ? r.notes_pl : r.notes_en) || null;
}

export function classLabel(
  boatClass: string,
  s: { five: string; cape: string },
): string {
  return boatClass === "cape31" ? s.cape : s.five;
}

/** Location line: "Fraglia Vela Riva, Lake Garda · ITA" (city dropped when the venue repeats it). */
export function locationLine(r: Regatta): string {
  const city = r.city && !r.venue.toLowerCase().includes(r.city.toLowerCase()) ? r.city : null;
  const place = [r.venue, city].filter(Boolean).join(", ");
  return `${place} · ${r.country_code}`;
}

/** Seasons present in the data, ascending. */
export function seasonsFrom(rows: Regatta[]): number[] {
  return Array.from(new Set(rows.map((r) => parseDay(r.start_date).getFullYear()))).sort(
    (a, b) => a - b,
  );
}

/** The first non-cancelled regatta that has not finished yet. */
export function nextUpId(rows: Regatta[]): string | null {
  const today = startOfToday().getTime();
  const upcoming = rows
    .filter((r) => r.status !== "cancelled" && parseDay(r.end_date).getTime() >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
  return upcoming[0]?.id ?? null;
}
