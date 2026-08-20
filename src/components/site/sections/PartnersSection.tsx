import { useLanguage } from "@/i18n/LanguageProvider";
import { partners } from "@/data/partners";
import { Reveal } from "../Reveal";
import { SectionRule } from "../SectionRule";

/**
 * Light band between two dark sections. Both sponsor logos are transparent PNG/WebP
 * with dark marks, so they sit directly on the parchment background — no plates.
 */
export function PartnersSection() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="partners"
      className="relative scroll-mt-24 bg-parchment py-24 text-foreground md:py-36"
    >
      <SectionRule />
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold-ink">{t.partners.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
            {t.partners.title}
          </h2>
          <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">{t.partners.intro}</p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t.partners.note}
          </p>
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

        {/* Business collaboration: programmes built on racing practice, not logo placement. */}
        <div className="mt-24 border-t border-border pt-16 md:mt-32 md:pt-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-gold-ink">{t.partners.programsEyebrow}</p>
            <h3 className="mt-6 font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.06] text-foreground">
              {t.partners.programsTitle}
            </h3>
            <p className="mt-8 leading-relaxed text-muted-foreground">{t.partners.programsLead}</p>
          </Reveal>

          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.partners.programsItems.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 80}>
                <div className="hairline-ink max-w-10" />
                <h4 className="mt-5 font-sans text-lg font-medium text-foreground">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-20 max-w-3xl">
            <p className="eyebrow text-gold-ink">{t.partners.caseEyebrow}</p>
            <h3 className="mt-6 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-[1.08] text-foreground">
              {t.partners.caseTitle}
            </h3>
          </Reveal>

          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {t.partners.caseSteps.map((step, i) => (
              <Reveal key={step.step} as="li" delay={i * 100}>
                <p className="font-display text-3xl font-semibold text-gold-ink">{step.step}</p>
                <h4 className="mt-4 font-sans text-lg font-medium text-foreground">{step.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Hospitality Days */}
        <div className="mt-24 border-t border-border pt-16 md:mt-32 md:pt-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="eyebrow text-gold-ink">{t.partners.hospitalityEyebrow}</p>
              <h3 className="mt-6 font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.06] text-foreground">
                {t.partners.hospitalityTitle}
              </h3>
              <p className="mt-8 leading-relaxed text-muted-foreground">
                {t.partners.hospitalityLead}
              </p>
            </Reveal>
            <Reveal delay={120} className="md:pt-4">
              <ul className="space-y-5">
                {t.partners.hospitalityItems.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-border pb-5 last:border-0">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-ink"
                    />
                    <span className="leading-relaxed text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

