import { useLanguage } from "@/i18n/LanguageProvider";
import { mainPartner, partners } from "@/data/partners";
import { Reveal } from "../Reveal";

export function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section id="partners" className="section-dark py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.partners.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-parchment">
            {t.partners.title}
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-16 border border-gold/35 p-10 md:p-16">
          <p className="eyebrow">{t.partners.leadLabel}</p>
          <div className="mt-8 flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
            <a
              href={mainPartner.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex w-full max-w-sm items-center justify-center rounded-sm bg-parchment px-8 py-8"
            >
              <img
                src={mainPartner.logo}
                alt={mainPartner.name}
                loading="lazy"
                className="h-14 w-auto max-w-full object-contain md:h-16"
              />
            </a>
            <div className="min-w-0">
              <p className="font-display text-3xl font-semibold text-parchment md:text-5xl">
                {mainPartner.name}
              </p>
              <div className="hairline mt-8 max-w-40" />
              <p className="mt-8 max-w-2xl leading-relaxed text-steel">{t.partners.leadBody}</p>
            </div>
          </div>
        </Reveal>

        {/*
          To add a sponsor, append an entry to `partners` in src/data/partners.ts.
          Supply a `logo` URL to replace the neutral placeholder tile.
        */}
        <Reveal delay={180} className="mt-20">
          <h3 className="eyebrow">{t.partners.gridLabel}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <li key={partner.id} className="bg-ocean">
                {partner.logo ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex aspect-[3/2] items-center justify-center p-6"
                  >
                    <span className="flex h-full w-full items-center justify-center rounded-sm bg-parchment px-5 py-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="lazy"
                        className="max-h-10 w-auto max-w-full object-contain"
                      />
                    </span>
                  </a>
                ) : (
                  <span className="flex aspect-[3/2] items-center justify-center p-6 text-center text-[0.6rem] uppercase tracking-[0.22em] text-steel">
                    {t.partners.placeholder}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
