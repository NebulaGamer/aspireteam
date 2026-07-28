import { useLanguage } from "@/i18n/LanguageProvider";
import { Parallax } from "../Parallax";
import { Reveal } from "../Reveal";
import {
  IMAGE_BOAT_55_METRE,
  IMAGE_BOAT_CAPE_31,
  IMAGE_DECK_CREW,
  SiteImage,
} from "../SiteImages";

type BoatCopy = {
  kicker: string;
  name: string;
  body1: string;
  body2: string;
  alt: string;
  specs: readonly { readonly label: string; readonly value: string }[];
};

export function BoatsSection() {
  const { t } = useLanguage();

  return (
    <section id="boats" className="section-dark">
      <div className="shell py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">{t.boats.eyebrow}</p>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-parchment">
            {t.boats.title}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-steel">{t.boats.intro}</p>
        </Reveal>
      </div>

      <BoatFeature copy={t.boats.five} image={IMAGE_BOAT_55_METRE} />
      <BoatFeature copy={t.boats.cape} image={IMAGE_BOAT_CAPE_31} flipped />

      <div
        className={`shell py-24 md:py-32 ${
          IMAGE_DECK_CREW ? "grid gap-16 md:grid-cols-[1fr_0.8fr]" : ""
        }`}
      >
        <Reveal>
          <h3 className="eyebrow">{t.boats.compare.title}</h3>
          <div className="hairline mt-6" />
          <dl className="mt-2">
            <div className="grid grid-cols-3 gap-3 border-b border-gold/40 sm:gap-4 py-5 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              {t.boats.compare.headers.map((h, i) => (
                <span key={i} className={i === 0 ? "" : "text-right md:text-left"}>
                  {h}
                </span>
              ))}
            </div>
            {t.boats.compare.rows.map((row) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 items-baseline gap-3 border-b border-border sm:gap-4 ${
                  IMAGE_DECK_CREW ? "py-5 text-sm" : "py-7 md:py-9"
                }`}
              >
                <dt className="hyphens-auto break-words text-sm text-steel">{row.label}</dt>
                <dd
                  className={`hyphens-auto break-words text-right text-parchment md:text-left ${
                    IMAGE_DECK_CREW ? "text-sm" : "font-display text-base sm:text-lg md:text-xl"
                  }`}
                >
                  {row.a}
                </dd>
                <dd
                  className={`hyphens-auto break-words text-right text-parchment md:text-left ${
                    IMAGE_DECK_CREW ? "text-sm" : "font-display text-base sm:text-lg md:text-xl"
                  }`}
                >
                  {row.b}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {IMAGE_DECK_CREW ? (
          <Reveal delay={140} className="relative min-h-64 overflow-hidden">
            <div className="absolute inset-0">
              <SiteImage src={IMAGE_DECK_CREW} alt={t.boats.detailAlt} />
            </div>
          </Reveal>
        ) : null}
      </div>

    </section>
  );
}

function BoatFeature({
  copy,
  image,
  flipped = false,
}: {
  copy: BoatCopy;
  image: string;
  flipped?: boolean;
}) {
  return (
    <article className="relative">
      <Parallax className="relative h-[70vh] min-h-[26rem] w-full md:h-[85vh]">
        <SiteImage src={image} alt={copy.alt} />
      </Parallax>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent" />

      <div className="shell relative -mt-28 pb-8 md:-mt-40 md:pb-16">
        <Reveal
          className={`max-w-xl border border-border bg-ocean/85 p-8 backdrop-blur-md md:p-12 ${
            flipped ? "md:ml-auto" : ""
          }`}
        >
          <p className="eyebrow">{copy.kicker}</p>
          <h3 className="mt-4 font-display text-3xl font-semibold text-parchment md:text-4xl">
            {copy.name}
          </h3>
          <div className="hairline mt-8" />
          <p className="mt-8 leading-relaxed text-silver">{copy.body1}</p>
          <p className="mt-4 leading-relaxed text-steel">{copy.body2}</p>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
            {copy.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                  {spec.label}
                </dt>
                <dd className="mt-2 font-display text-lg text-parchment">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </article>
  );
}
