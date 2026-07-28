import { useLanguage } from "@/i18n/LanguageProvider";
import { Parallax } from "../Parallax";
import { Reveal } from "../Reveal";
import { IMAGE_YOUTH, SiteImage } from "../SiteImages";

/*
 * EDITOR'S NOTE — copy in this section is a considered first draft, ready for the
 * client to refine with specific programme names, partner clubs, named academies
 * and any numbers (sailors supported per year, training days, etc.).
 * All strings live in src/i18n/translations.ts under `youth`.
 */

export function YouthSection() {
  const { t } = useLanguage();

  return (
    <section id="youth" className="bg-background">
      <Parallax className="relative h-[50vh] min-h-80 w-full" strength={0.1}>
        <SiteImage src={IMAGE_YOUTH} alt={t.youth.alt} />
      </Parallax>

      <div className="shell py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{t.youth.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.03] text-foreground">
              {t.youth.title}
            </h2>
            <div className="hairline mt-10 max-w-24" />
          </Reveal>

          <Reveal delay={120} className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">{t.youth.lead}</p>
            <p className="leading-relaxed text-muted-foreground">{t.youth.body}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px sm:grid-cols-2 xl:grid-cols-4">
          {t.youth.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 100}
              className="border border-border bg-card p-8 md:p-10"
            >
              <span className="font-display text-3xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-medium text-foreground">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
