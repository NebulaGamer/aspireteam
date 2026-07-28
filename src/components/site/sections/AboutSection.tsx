import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { IMAGE_ABOUT_ACTION, SiteImage } from "../SiteImages";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-24 bg-background py-24 md:py-36">
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
                {t.about.title}
              </h2>
              <div className="hairline mt-10 max-w-24" />
            </Reveal>

            <Reveal delay={120} className="mt-10 max-w-xl space-y-6">
              <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">{t.about.lead}</p>
              <p className="leading-relaxed text-muted-foreground">{t.about.body1}</p>
              <p className="leading-relaxed text-muted-foreground">{t.about.body2}</p>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
            <SiteImage
              src={IMAGE_ABOUT_ACTION}
              alt={t.about.imageAlt}
              className="absolute inset-0"
            />
          </Reveal>
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
