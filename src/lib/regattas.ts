import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Regatta = Tables<"regattas">;
export type RegattaInput = TablesInsert<"regattas">;

export const BOAT_CLASSES = [
  { value: "five_five", label: "5.5 Metre" },
  { value: "cape31", label: "Cape 31" },
] as const;

export const STATUSES = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const PARTICIPATIONS = [
  { value: "confirmed", label: "Confirmed" },
  { value: "planned", label: "Planned" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "not_racing", label: "Not racing" },
] as const;

export type RegattaFormValues = {
  name_pl: string;
  name_en: string;
  venue: string;
  city: string;
  country_code: string;
  boat_class: string;
  series: string;
  start_date: string;
  end_date: string;
  status: string;
  participation: string;
  result_position: string;
  event_url: string;
  notes_pl: string;
  notes_en: string;
};

export const EMPTY_REGATTA: RegattaFormValues = {
  name_pl: "",
  name_en: "",
  venue: "",
  city: "",
  country_code: "",
  boat_class: "five_five",
  series: "",
  start_date: "",
  end_date: "",
  status: "scheduled",
  participation: "unconfirmed",
  result_position: "",
  event_url: "",
  notes_pl: "",
  notes_en: "",
};

export function toFormValues(r: Regatta): RegattaFormValues {
  return {
    name_pl: r.name_pl,
    name_en: r.name_en,
    venue: r.venue,
    city: r.city ?? "",
    country_code: r.country_code,
    boat_class: r.boat_class,
    series: r.series ?? "",
    start_date: r.start_date,
    end_date: r.end_date,
    status: r.status,
    participation: r.participation,
    result_position: r.result_position == null ? "" : String(r.result_position),
    event_url: r.event_url ?? "",
    notes_pl: r.notes_pl ?? "",
    notes_en: r.notes_en ?? "",
  };
}

/** Client-side validation for UX only — RLS and CHECK constraints are the real gate. */
export function validateRegatta(v: RegattaFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!v.name_pl.trim()) errors.name_pl = "Polish name is required.";
  if (!v.name_en.trim()) errors.name_en = "English name is required.";
  if (!v.venue.trim()) errors.venue = "Venue is required.";
  if (!/^[A-Za-z]{3}$/.test(v.country_code.trim()))
    errors.country_code = "Use a 3-letter ISO code, e.g. POL.";
  if (!v.start_date) errors.start_date = "Start date is required.";
  if (!v.end_date) errors.end_date = "End date is required.";
  if (v.start_date && v.end_date && v.end_date < v.start_date)
    errors.end_date = "End date must be on or after the start date.";
  if (!BOAT_CLASSES.some((b) => b.value === v.boat_class))
    errors.boat_class = "Choose a boat class.";
  if (!STATUSES.some((s) => s.value === v.status)) errors.status = "Choose a status.";
  if (!PARTICIPATIONS.some((p) => p.value === v.participation))
    errors.participation = "Choose a participation state.";
  if (v.result_position.trim()) {
    const n = Number(v.result_position);
    if (!Number.isInteger(n) || n < 1) errors.result_position = "Position must be a whole number ≥ 1.";
  }
  if (v.event_url.trim() && !/^https?:\/\/\S+$/i.test(v.event_url.trim()))
    errors.event_url = "Use a full URL starting with http:// or https://";
  return errors;
}

export function toPayload(v: RegattaFormValues): RegattaInput {
  const optional = (s: string) => (s.trim() ? s.trim() : null);
  return {
    name_pl: v.name_pl.trim(),
    name_en: v.name_en.trim(),
    venue: v.venue.trim(),
    city: optional(v.city),
    country_code: v.country_code.trim().toUpperCase(),
    boat_class: v.boat_class,
    series: optional(v.series),
    start_date: v.start_date,
    end_date: v.end_date,
    status: v.status,
    participation: v.participation,
    result_position: v.result_position.trim() ? Number(v.result_position) : null,
    event_url: optional(v.event_url),
    notes_pl: optional(v.notes_pl),
    notes_en: optional(v.notes_en),
  };
}

export function formatDateRange(start: string, end: string): string {
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  return start === end ? fmt(start) : `${fmt(start)} – ${fmt(end)}`;
}
