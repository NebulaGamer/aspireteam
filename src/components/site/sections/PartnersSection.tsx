import { useLanguage } from "@/i18n/LanguageProvider";
import { partners } from "@/data/partners";
import { Reveal } from "../Reveal";

/**
 * Light band between two dark sections. Both sponsor logos are transparent PNG/WebP
 * with dark marks, so they sit directly on the parchment background — no plates.
 */
export function PartnersSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="partners" className="scroll-mt-24 bg-parchment py-28 text-foreground md:py-44">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold-ink">{t.partners.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
            {t.partners.title}
          </h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{t.partners.intro}</p>
        </Reveal>

        {/* Two sponsors today; a third entry in src/data/partners.ts slots straight in. */}
        <ul className="mt-16 grid gap-8 md:grid-cols-2">
          {partners.map((partner, i) => (
            <Reveal key={partner.id} as="li" delay={i * 120} className="h-full">
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-ink/60 hover:shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--gold-ink)_55%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink md:p-12"
              >
                <p className="eyebrow text-gold-ink">
                  {partner.tier === "main" ? t.partners.tierMain : t.partners.tierPartner}
                </p>

                <span className="mt-8 flex h-32 items-center justify-center px-4 md:h-36">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className={`w-auto max-w-full object-contain ${partner.logoClassName}`}
                  />
                </span>

                <h3 className="mt-10 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {partner.name}
                </h3>
                <div className="hairline-ink mt-6 max-w-24" />
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {partner.description[lang]}
                </p>
                <span className="mt-8 inline-block text-[0.65rem] uppercase tracking-[0.24em] text-gold-ink">
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
