import { useLanguage } from "@/i18n/LanguageProvider";
import { partners } from "@/data/partners";
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
          <p className="mt-6 font-display text-4xl font-semibold text-parchment md:text-6xl">
            {t.partners.leadName}
          </p>
          <div className="hairline mt-10 max-w-40" />
          <p className="mt-8 max-w-2xl leading-relaxed text-steel">{t.partners.leadBody}</p>
        </Reveal>

        {/*
          To add a partner, append an entry to `partners` in src/data/partners.ts.
          Supply a `logo` import to replace the neutral placeholder tile.
        */}
        <Reveal delay={180} className="mt-20">
          <h3 className="eyebrow">{t.partners.gridLabel}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <li
                key={partner.id}
                className="flex aspect-[3/2] items-center justify-center bg-ocean p-6"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
                  />
                ) : (
                  <span className="text-center text-[0.6rem] uppercase tracking-[0.22em] text-steel">
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
