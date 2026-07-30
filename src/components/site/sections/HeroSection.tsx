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
      {/* Real team photograph — the Cape 31 at speed. */}
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
        <h1 className="hero-step hero-step-2 max-w-[22ch] font-display text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.98] text-parchment">
          {t.hero.headline}
        </h1>

        <div className="hero-step hero-step-3 hero-rule mt-10" />

        <div className="hero-step hero-step-4 mt-10 max-w-[60ch] space-y-6">
          <p className="text-base leading-relaxed text-parchment/90 sm:text-lg">{t.hero.intro1}</p>
          <p className="text-sm leading-relaxed text-steel sm:text-base">{t.hero.intro2}</p>
        </div>

        <div className="hero-step hero-step-5 mt-14">
          <a
            href="#about"
            className="inline-block border border-gold/60 px-7 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {t.hero.cta}
          </a>
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
