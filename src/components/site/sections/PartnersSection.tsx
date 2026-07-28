import { useLanguage } from "@/i18n/LanguageProvider";
import { partners } from "@/data/partners";
import { Reveal } from "../Reveal";

export function PartnersSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="partners" className="section-dark py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.partners.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-parchment">
            {t.partners.title}
          </h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-steel">{t.partners.intro}</p>
        </Reveal>

        {/* Two sponsors today; a third entry in src/data/partners.ts slots straight in. */}
        <ul className="mt-16 grid gap-8 md:grid-cols-2">
          {partners.map((partner, i) => (
            <Reveal key={partner.id} as="li" delay={i * 120} className="h-full">
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col border border-gold/35 p-8 transition-colors duration-500 hover:border-gold focus-visible:border-gold md:p-12"
              >
                <p className="eyebrow">
                  {partner.tier === "main" ? t.partners.tierMain : t.partners.tierPartner}
                </p>

                <span className="mt-8 flex h-32 items-center justify-center rounded-sm bg-parchment px-8 transition-transform duration-500 group-hover:-translate-y-1 md:h-36">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-12 w-auto max-w-full object-contain md:max-h-14"
                  />
                </span>

                <h3 className="mt-10 font-display text-2xl font-semibold text-parchment md:text-3xl">
                  {partner.name}
                </h3>
                <div className="hairline mt-6 max-w-24" />
                <p className="mt-6 leading-relaxed text-steel">{partner.description[lang]}</p>
                <span className="mt-8 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-gold/80 transition-colors group-hover:text-gold">
                  {t.partners.visit}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
