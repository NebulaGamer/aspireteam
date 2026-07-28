import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IMAGE_HERO, SiteImage } from "../SiteImages";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="top" className="section-dark relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="ken-burns h-full w-full">
          <SiteImage src={IMAGE_HERO} alt={t.hero.alt} className="hero-lift" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/45 via-abyss/25 to-abyss" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss/55 via-abyss/20 to-transparent" />
      </div>

      <div className="shell flex min-h-[100svh] flex-col justify-end pb-20 pt-32 md:justify-center md:pb-32">
        <p className="eyebrow animate-fade-in">{t.hero.eyebrow}</p>

        <h1 className="mt-6 font-display text-[clamp(3.5rem,16vw,13rem)] font-semibold leading-[0.85] tracking-[0.04em] text-parchment">
          ASPIRE
        </h1>

        <div className="mt-8 flex max-w-3xl items-start gap-6">
          <span className="mt-3 hidden h-px w-16 shrink-0 bg-gold sm:block" />
          <div>
            <p className="font-display text-xl leading-snug text-parchment sm:text-2xl md:text-3xl">
              {t.hero.tagline}
            </p>
            <p className="mt-4 text-sm text-steel sm:text-base">{t.hero.sub}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-8">
          <a
            href="#about"
            className="border border-gold/60 px-7 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {t.hero.cta}
          </a>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold">
            {t.hero.sail}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <span className="scroll-cue flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-silver">
          {t.hero.scroll}
          <ChevronDown size={16} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
