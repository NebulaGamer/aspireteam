import { useLanguage } from "@/i18n/LanguageProvider";
import { Parallax } from "../Parallax";
import { Reveal } from "../Reveal";
import {
  IMAGE_BOAT_55_METRE,
  IMAGE_BOAT_CAPE_31,
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

      <div className="shell relative z-10 -mt-40 pb-8 md:-mt-56 md:pb-16 lg:-mt-64">
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
