import { Fragment, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { results } from "@/data/results";
import { resultPhoto } from "@/data/eventPhotos";
import { Reveal } from "../Reveal";
import { SiteImage } from "../SiteImages";

const MEDAL_STYLES: Record<number, string> = {
  1: "border-gold text-gold",
  2: "border-silver text-silver",
  3: "border-bronze text-bronze",
};


export function ResultsSection() {
  const { t, lang } = useLanguage();
  const [classFilter, setClassFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);


  const classes = useMemo(() => [...new Set(results.map((r) => r.boatClass))], []);
  const years = useMemo(
    () => [...new Set(results.map((r) => r.year))].sort((a, b) => b - a),
    [],
  );

  const rows = results
    .filter((r) => (classFilter === "all" ? true : r.boatClass === classFilter))
    .filter((r) => (yearFilter === "all" ? true : String(r.year) === yearFilter))
    .sort((a, b) => b.year - a.year);

  const placeLabel = (place: number) =>
    t.results.places[place as 1 | 2 | 3] ?? `${place}.`;

  return (
    <section id="results" className="scroll-mt-24 section-dark section-abyss py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.results.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-parchment">
            {t.results.title}
          </h2>
          <p className="mt-6 leading-relaxed text-steel">{t.results.intro}</p>
        </Reveal>

        <Reveal delay={100} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <FilterGroup
            label={t.results.filters.class}
            allLabel={t.results.filters.all}
            value={classFilter}
            options={classes.map((c) => ({ value: c, label: c }))}
            onChange={setClassFilter}
          />
          <FilterGroup
            label={t.results.filters.year}
            allLabel={t.results.filters.all}
            value={yearFilter}
            options={years.map((y) => ({ value: String(y), label: String(y) }))}
            onChange={setYearFilter}
          />
        </Reveal>

        <Reveal delay={160} className="mt-12">
          {/* Desktop table */}
          <table className="hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">{t.results.title}</caption>
            <thead>
              <tr className="border-b border-gold/40 text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                <th scope="col" className="py-4 pr-6 font-medium">
                  {t.results.headers.year}
                </th>
                <th scope="col" className="py-4 pr-6 font-medium">
                  {t.results.headers.event}
                </th>
                <th scope="col" className="py-4 pr-6 font-medium">
                  {t.results.headers.venue}
                </th>
                <th scope="col" className="py-4 pr-6 font-medium">
                  {t.results.headers.boatClass}
                </th>
                <th scope="col" className="py-4 text-right font-medium">
                  {t.results.headers.place}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const photo = resultPhoto(row.id);
                const open = expanded === row.id;
                return (
                  <Fragment key={row.id}>
                    <tr className="border-b border-border">
                      <td className="py-6 pr-6 font-display text-2xl text-parchment">{row.year}</td>
                      <td className="py-6 pr-6 text-parchment">
                        {row.event[lang]}
                        {/* Only regattas with an assigned photograph gain an affordance. */}
                        {photo ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(open ? null : row.id)}
                            aria-expanded={open}
                            aria-controls={`result-photo-${row.id}`}
                            className="mt-2 block text-[0.6rem] uppercase tracking-[0.22em] text-gold transition-opacity hover:opacity-70"
                          >
                            {open ? t.results.hidePhoto : t.results.showPhoto}
                          </button>
                        ) : null}
                      </td>
                      <td className="py-6 pr-6 text-steel">{row.venue[lang]}</td>
                      <td className="py-6 pr-6 text-steel">{row.boatClass}</td>
                      <td className="py-6 text-right">
                        <Medal place={row.place} label={placeLabel(row.place)} />
                      </td>
                    </tr>
                    {photo && open ? (
                      <tr className="border-b border-border">
                        <td colSpan={5} className="pb-8" id={`result-photo-${row.id}`}>
                          <PhotoFrame
                            src={photo.src}
                            alt={t.eventPhotos[photo.key].alt}
                            maxHeight="max-h-[60vh]"
                            caption={t.eventPhotos[photo.key].caption}
                            captionClassName="mt-3 text-sm leading-relaxed text-steel"
                            className="max-w-2xl"
                          />
                        </td>
                      </tr>
                    ) : null}

                  </Fragment>
                );
              })}
            </tbody>
          </table>

          {/* Mobile cards */}
          <ul className="space-y-4 md:hidden">
            {rows.map((row) => {
              const photo = resultPhoto(row.id);
              const open = expanded === row.id;
              return (
                <li key={row.id} className="border border-border p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-2xl text-parchment">{row.year}</span>
                    <Medal place={row.place} label={placeLabel(row.place)} />
                  </div>
                  <p className="mt-4 text-parchment">{row.event[lang]}</p>
                  <p className="mt-1 text-sm text-steel">{row.venue[lang]}</p>
                  <p className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                    {row.boatClass}
                  </p>
                  {photo ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : row.id)}
                        aria-expanded={open}
                        aria-controls={`result-photo-m-${row.id}`}
                        className="mt-4 text-[0.6rem] uppercase tracking-[0.22em] text-gold transition-opacity hover:opacity-70"
                      >
                        {open ? t.results.hidePhoto : t.results.showPhoto}
                      </button>
                      {open ? (
                        <figure className="mt-4" id={`result-photo-m-${row.id}`}>
                          <div className="relative aspect-[3/2] overflow-hidden border border-gold/30 bg-abyss">
                            <SiteImage
                              src={photo.src}
                              alt={t.eventPhotos[photo.key].alt}
                              className="absolute inset-0"
                            />
                          </div>
                          <figcaption className="mt-3 text-sm leading-relaxed text-steel">
                            {t.eventPhotos[photo.key].caption}
                          </figcaption>
                        </figure>
                      ) : null}
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>


          {rows.length === 0 ? <p className="py-12 text-steel">{t.results.empty}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}

function Medal({ place, label }: { place: number; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.18em] ${
        MEDAL_STYLES[place] ?? "border-border text-steel"
      }`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-current" />
      {label}
    </span>
  );
}

function FilterGroup({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: string;
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
              : "border-border text-silver hover:border-gold hover:text-gold"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
