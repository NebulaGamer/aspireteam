import { useLanguage } from "@/i18n/LanguageProvider";
import type { Regatta } from "@/lib/regattas";
import {
  classLabel,
  formatRange,
  locationLine,
  monthLabel,
  parseDay,
  regattaName,
  regattaNotes,
} from "@/lib/calendar-format";

const RESULT_STYLES: Record<number, string> = {
  1: "border-gold text-gold",
  2: "border-silver text-silver",
  3: "border-bronze text-bronze",
};

type Group = { key: string; label: string; rows: Regatta[] };

function groupByMonth(rows: Regatta[], months: readonly string[]): Group[] {
  const groups: Group[] = [];
  for (const row of rows) {
    const d = parseDay(row.start_date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.rows.push(row);
    else groups.push({ key, label: monthLabel(d, { months, monthsOf: months }), rows: [row] });
  }
  return groups;
}

export function AgendaView({
  rows,
  nextId,
}: {
  rows: Regatta[];
  nextId: string | null;
}) {
  const { t, lang } = useLanguage();
  const c = t.calendar;

  if (rows.length === 0) {
    return <p className="py-12 text-steel">{c.empty}</p>;
  }

  return (
    <div className="space-y-12">
      {groupByMonth(rows, c.months).map((group) => (
        <section key={group.key} aria-label={group.label}>
          <h3 className="sticky top-20 z-10 -mx-1 bg-abyss/90 px-1 py-2 text-[0.6rem] uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
            {group.label}
          </h3>
          <ul className="mt-2">
            {group.rows.map((r) => (
              <AgendaRow key={r.id} regatta={r} isNext={r.id === nextId} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function AgendaRow({ regatta: r, isNext }: { regatta: Regatta; isNext: boolean }) {
  const { t, lang } = useLanguage();
  const c = t.calendar;
  const cancelled = r.status === "cancelled";
  const completed = r.status === "completed";
  const notes = regattaNotes(r, lang);
  const name = regattaName(r, lang);

  return (
    <li
      className={`border-b border-border py-6 pl-5 transition-colors sm:py-7 ${
        isNext ? "border-l-2 border-l-gold bg-gold/[0.04]" : "border-l-2 border-l-transparent"
      } ${cancelled ? "opacity-55" : completed ? "opacity-80" : ""}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs tracking-[0.12em] text-steel">
              {formatRange(r.start_date, r.end_date, lang, c)}
            </span>
            {isNext ? (
              <span className="border border-gold px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.22em] text-gold">
                {c.nextUp}
              </span>
            ) : null}
            {cancelled ? (
              <span className="border border-border px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.22em] text-steel">
                {c.status.cancelled}
              </span>
            ) : null}
          </div>

          <h4
            className={`font-display mt-2 text-xl text-parchment sm:text-2xl ${
              cancelled ? "line-through decoration-steel/70" : ""
            }`}
          >
            {r.event_url ? (
              <a
                href={r.event_url}
                target="_blank"
                rel="noreferrer noopener"
                className="underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h4>

          <p className="mt-1 text-sm text-steel">{locationLine(r)}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="border border-gold/40 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold">
              {classLabel(r.boat_class, c.filters)}
            </span>
            {r.series ? (
              <span className="border border-border px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-silver">
                {r.series}
              </span>
            ) : null}
          </div>

          {notes ? <p className="mt-3 text-xs italic text-steel">{notes}</p> : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 md:justify-end">
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
            <span
              className={`inline-flex items-center border px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] ${
                RESULT_STYLES[r.result_position] ?? "border-border text-steel"
              }`}
            >
              {c.place} {r.result_position}
            </span>
          ) : null}
        </div>
      </div>
    </li>
  );
}
