import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { PhotoFrame } from "../PhotoFrame";
import { SectionRule } from "../SectionRule";
import { IMAGE_PORTRAIT_GACEK } from "../SiteImages";

export function GacekSection() {
  const { t } = useLanguage();

  return (
    <section id="gacek" className="relative scroll-mt-24 section-dark py-24 md:py-36">
      <SectionRule />
      <div className="grid items-center lg:grid-cols-2">
        {/* The portrait keeps its own aspect ratio — a fixed tall frame would
            crop the subject. Replacing the file later cannot reintroduce that. */}
        <div className="flex items-center justify-center bg-abyss px-6 py-8 md:px-12">
          <PhotoFrame
            src={IMAGE_PORTRAIT_GACEK}
            alt={t.gacek.alt}
            maxHeight="max-h-[80vh]"
            className="w-full"
          />
        </div>


        <div className="flex items-center px-6 py-12 md:px-16 lg:px-20 xl:px-28">
          <Reveal className="max-w-xl">
            <p className="eyebrow">{t.gacek.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] text-foreground">
              {t.gacek.name}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-muted-foreground">
              {t.gacek.role}
            </p>
            <div className="hairline mt-10 max-w-24" />
            <p className="mt-10 leading-relaxed text-foreground/85">{t.gacek.body1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.gacek.body2}</p>

            <blockquote className="mt-12 border-l-2 border-gold pl-6">
              <p className="font-display text-xl leading-snug text-foreground md:text-2xl">
                “{t.gacek.quote}”
              </p>
              {t.gacek.quoteNote ? (
                <footer
                  lang="pl"
                  className="mt-5 text-sm leading-relaxed text-muted-foreground/80"
                >
                  „{t.gacek.quoteNote}”
                </footer>
              ) : null}
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
