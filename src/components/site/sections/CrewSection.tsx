import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionRule } from "../SectionRule";
import { PhotoFrame } from "../PhotoFrame";
import { IMAGE_CREW_CAPE31, IMAGE_CREW_55_A, IMAGE_CREW_55_B } from "../SiteImages";

type Member = { name: string; role: string };

/**
 * "Registry manifest" treatment: each crew is a numbered manifest — the names
 * read as a typeset register (name left, role right in italic display type)
 * beside the photography, with the two blocks mirrored.
 *
 * Photography still renders at its natural aspect ratio (PhotoFrame): the crew
 * line-up must never be cropped.
 */
export function CrewSection() {
  const { t } = useLanguage();
  const c = t.crewSection;

  return (
    <section id="crew" className="relative section-dark scroll-mt-24 py-24 md:py-36">
      <SectionRule />
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-light italic leading-[1.02] text-parchment">
            {c.title}
          </h2>
          <p className="mt-6 leading-relaxed text-steel">{c.intro}</p>
          <span aria-hidden="true" className="mx-auto mt-10 block h-px w-24 bg-gold/60" />
        </Reveal>

        <CrewBlock
          index="01"
          kicker={c.cape.kicker}
          title={c.cape.title}
          note={c.cape.note}
          members={c.cape.members as readonly Member[]}
          photos={[IMAGE_CREW_CAPE31]}
          pendingLabel={c.photoPending}
        />

        <CrewBlock
          index="02"
          kicker={c.five.kicker}
          title={c.five.title}
          note={c.five.note}
          members={c.five.members as readonly Member[]}
          photos={[IMAGE_CREW_55_A, IMAGE_CREW_55_B]}
          pendingLabel={c.photoPending}
          mirrored
        />
      </div>
    </section>
  );
}

function CrewBlock({
  index,
  kicker,
  title,
  note,
  members,
  photos,
  pendingLabel,
  mirrored = false,
}: {
  index: string;
  kicker: string;
  title: string;
  note: string;
  members: readonly Member[];
  photos: readonly (string | null)[];
  pendingLabel: string;
  mirrored?: boolean;
}) {
  return (
    <div className="mt-20 grid items-start gap-12 md:mt-28 lg:grid-cols-12 lg:gap-16">
      <div
        className={`grid gap-6 lg:col-span-7 ${mirrored ? "lg:order-2" : ""} ${
          photos.length > 1 ? "sm:grid-cols-2" : ""
        }`}
      >
        {photos.map((photo, i) =>
          photo ? (
            <div key={i}>
              <PhotoFrame src={photo} alt={title} maxHeight="max-h-[70vh]" />
            </div>
          ) : (
            <PhotoPlaceholder key={i} label={pendingLabel} kicker={kicker} />
          ),
        )}
      </div>

      <Reveal delay={80} className={`lg:col-span-5 ${mirrored ? "lg:order-1" : ""}`}>
        <h3 className="font-display text-3xl font-semibold leading-none text-parchment md:text-4xl">
          {title}
        </h3>
        <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-gold/80">
          {kicker} · {index}
        </p>
        <p className="mt-4 text-sm text-steel">{note}</p>

        <ul className="mt-8 border-t border-gold/30">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex items-baseline justify-between gap-4 border-b border-gold/10 px-2 py-4 transition-colors duration-300 hover:bg-parchment/5"
            >
              <span className="min-w-0 font-light tracking-wide text-parchment md:text-lg">
                {member.name}
              </span>
              {member.role ? (
                <span className="shrink-0 font-display text-sm italic tracking-wide text-gold">
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
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-border bg-abyss">
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
