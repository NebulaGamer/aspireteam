import { useState } from "react";

import {
  BOAT_CLASSES,
  EMPTY_REGATTA,
  PARTICIPATIONS,
  STATUSES,
  type RegattaFormValues,
  validateRegatta,
} from "@/lib/regattas";

const fieldClass =
  "w-full rounded-sm border border-parchment/20 bg-abyss/60 px-3 py-2 text-sm text-parchment outline-none placeholder:text-parchment/35 focus:border-gold";
const labelClass = "block text-[11px] uppercase tracking-[0.18em] text-parchment/60";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className={labelClass}>{label}</span>
      {children}
      {error ? <span className="block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

export function RegattaForm({
  initial,
  submitting,
  serverError,
  onCancel,
  onSubmit,
}: {
  initial?: RegattaFormValues;
  submitting: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (values: RegattaFormValues) => void;
}) {
  const [values, setValues] = useState<RegattaFormValues>(initial ?? EMPTY_REGATTA);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set =
    (key: keyof RegattaFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const found = validateRegatta(values);
        setErrors(found);
        if (Object.keys(found).length === 0) onSubmit(values);
      }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name (PL)" error={errors.name_pl}>
          <input className={fieldClass} value={values.name_pl} onChange={set("name_pl")} />
        </Field>
        <Field label="Name (EN)" error={errors.name_en}>
          <input className={fieldClass} value={values.name_en} onChange={set("name_en")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Venue" error={errors.venue}>
          <input className={fieldClass} value={values.venue} onChange={set("venue")} />
        </Field>
        <Field label="City">
          <input className={fieldClass} value={values.city} onChange={set("city")} />
        </Field>
        <Field label="Country (ISO-3)" error={errors.country_code}>
          <input
            className={fieldClass}
            maxLength={3}
            placeholder="POL"
            value={values.country_code}
            onChange={set("country_code")}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Boat class" error={errors.boat_class}>
          <select className={fieldClass} value={values.boat_class} onChange={set("boat_class")}>
            {BOAT_CLASSES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Series">
          <input
            className={fieldClass}
            placeholder="MED Circuit"
            value={values.series}
            onChange={set("series")}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Start date" error={errors.start_date}>
          <input type="date" className={fieldClass} value={values.start_date} onChange={set("start_date")} />
        </Field>
        <Field label="End date" error={errors.end_date}>
          <input type="date" className={fieldClass} value={values.end_date} onChange={set("end_date")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Status" error={errors.status}>
          <select className={fieldClass} value={values.status} onChange={set("status")}>
            {STATUSES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Aspire participation" error={errors.participation}>
          <select className={fieldClass} value={values.participation} onChange={set("participation")}>
            {PARTICIPATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Result position" error={errors.result_position}>
          <input
            className={fieldClass}
            inputMode="numeric"
            placeholder="14"
            value={values.result_position}
            onChange={set("result_position")}
          />
        </Field>
      </div>

      <Field label="Event URL" error={errors.event_url}>
        <input className={fieldClass} placeholder="https://" value={values.event_url} onChange={set("event_url")} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Notes (PL)">
          <textarea rows={3} className={fieldClass} value={values.notes_pl} onChange={set("notes_pl")} />
        </Field>
        <Field label="Notes (EN)">
          <textarea rows={3} className={fieldClass} value={values.notes_en} onChange={set("notes_en")} />
        </Field>
      </div>

      {serverError ? <p className="text-sm text-red-400">{serverError}</p> : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-sm bg-gold px-5 py-2 text-sm font-medium text-abyss disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Save regatta"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-sm border border-parchment/25 px-5 py-2 text-sm text-parchment/80"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
