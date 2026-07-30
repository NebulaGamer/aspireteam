import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionRule } from "../SectionRule";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 bg-background py-24 md:py-36">
      <SectionRule />
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
              {t.about.title}
            </h2>
            <div className="hairline mt-10 max-w-24" />
          </Reveal>

          {/* The name as a philosophy — the thesis of the whole page, given room. */}
          <Reveal delay={120} className="mt-10">
            <p className="font-display text-xl leading-relaxed text-foreground/90 md:text-2xl">
              {t.about.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {t.about.movements.map((movement, i) => (
            <Reveal key={movement.title} delay={i * 120} className="max-w-xl">
              <h3 className="font-display text-2xl font-semibold text-foreground">
                {movement.title}
              </h3>
              <div className="hairline mt-6 max-w-16" />
              <p className="mt-6 leading-relaxed text-muted-foreground">{movement.body}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="shell mt-20 md:mt-28">
        <div className="hairline" />
        <dl className="grid gap-px border-border sm:grid-cols-3">
          {t.about.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 120}
              className="border-b border-border py-10 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none text-gold">
                  {stat.value}
                </span>
                <span className="mt-5 block text-sm font-medium uppercase tracking-[0.16em] text-foreground">
                  {stat.label}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">{stat.note}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
