import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { IMAGE_HERO_BOAT, SiteImage } from "@/components/site/SiteImages";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="section-dark section-abyss relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Real team photograph — the POL 17 boat at speed. */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <SiteImage src={IMAGE_HERO_BOAT} alt={t.hero.bgAlt} priority />
      </div>

      {/* Gradient scrim to keep the left-aligned typography legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-r from-abyss/90 via-abyss/60 to-abyss/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-abyss via-abyss/40 to-transparent"
      />

      {/* Slow radial wash of ocean light drifting beneath the type. */}
      <div aria-hidden="true" className="hero-wash absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />


      <div className="shell flex min-h-[100svh] flex-col justify-center py-32 md:py-40">
        <p className="hero-step hero-step-1 eyebrow">{t.hero.eyebrow}</p>

        <h1 className="hero-step hero-step-2 mt-6 font-display text-[clamp(3rem,17vw,17rem)] font-semibold leading-[0.82] tracking-[0.02em] text-parchment">
          ASPIRE
        </h1>

        <div className="hero-step hero-step-3 hero-rule mt-10" />

        <div className="hero-step hero-step-4 mt-10 max-w-3xl">
          <p className="font-display text-xl leading-snug text-parchment sm:text-2xl md:text-3xl">
            {t.hero.tagline}
          </p>
          <p className="mt-4 text-sm text-steel sm:text-base">{t.hero.sub}</p>
        </div>

        <div className="hero-step hero-step-5 mt-14 flex flex-wrap items-center gap-10">
          <a
            href="#about"
            className="border border-gold/60 px-7 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {t.hero.cta}
          </a>

          <span className="inline-flex flex-col gap-2">
            <span className="h-px w-full bg-gold/40" />
            <span className="px-1 text-[0.7rem] font-medium uppercase tracking-[0.5em] text-gold">
              {t.hero.sail}
            </span>
            <span className="h-px w-full bg-gold/40" />
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
