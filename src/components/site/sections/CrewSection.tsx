import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import {
  IMAGE_CREW_CAPE31,
  IMAGE_CREW_55_A,
  IMAGE_CREW_55_B,
  SiteImage,
} from "../SiteImages";

type Member = { name: string; role: string };

/**
 * Two crews, presented with identical weight: Cape 31 first, then the 5.5 Metre.
 * Photography is not supplied yet — the null image constants fall back to an
 * intentional "awaiting photography" plate rather than a broken frame.
 */
export function CrewSection() {
  const { t } = useLanguage();
  const c = t.crewSection;

  return (
    <section id="crew" className="scroll-mt-24 bg-background py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
            {c.title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{c.intro}</p>
        </Reveal>

        <CrewBlock
          kicker={c.cape.kicker}
          title={c.cape.title}
          note={c.cape.note}
          members={c.cape.members as readonly Member[]}
          photos={[IMAGE_CREW_CAPE31]}
          pendingLabel={c.photoPending}
        />

        <div className="hairline mt-20 md:mt-28" />

        <CrewBlock
          kicker={c.five.kicker}
          title={c.five.title}
          note={c.five.note}
          members={c.five.members as readonly Member[]}
          photos={[IMAGE_CREW_55_A, IMAGE_CREW_55_B]}
          pendingLabel={c.photoPending}
        />
      </div>
    </section>
  );
}

function CrewBlock({
  kicker,
  title,
  note,
  members,
  photos,
  pendingLabel,
}: {
  kicker: string;
  title: string;
  note: string;
  members: readonly Member[];
  photos: readonly (string | null)[];
  pendingLabel: string;
}) {
  // A lone photograph runs wide; a pair runs taller so both blocks read at the same scale.
  const frame = photos.length > 1 ? "aspect-[4/3]" : "aspect-[21/9]";
  return (
    <div className="mt-16 md:mt-20">
      <Reveal>
        <div className={`grid gap-6 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {photos.map((photo, i) =>
            photo ? (
              <div key={i} className={`relative ${frame} overflow-hidden bg-abyss`}>
                <SiteImage src={photo} alt={title} className="absolute inset-0" />
              </div>
            ) : (
              <PhotoPlaceholder key={i} label={pendingLabel} kicker={kicker} frame={frame} />
            ),
          )}
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <p className="eyebrow">{kicker}</p>
        <h3 className="mt-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">{note}</p>

        {/* One name per row on mobile so the seven-name Cape 31 list never wraps mid-name. */}
        <ul className="mt-8 grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex items-baseline gap-3 border-b border-border py-4 sm:pr-6"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              <span className="text-foreground">{member.name}</span>
              {member.role ? (
                <span className="ml-auto shrink-0 text-[0.65rem] uppercase tracking-[0.18em] text-gold-ink">
                  {member.role}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function PhotoPlaceholder({ label, kicker }: { label: string; kicker: string }) {
  return (
    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border border-border bg-abyss">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_65%)]"
      />
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <span className="h-px w-16 bg-gold/50" />
        <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{kicker}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-steel">{label}</span>
        <span className="h-px w-16 bg-gold/50" />
      </div>
    </div>
  );
}
