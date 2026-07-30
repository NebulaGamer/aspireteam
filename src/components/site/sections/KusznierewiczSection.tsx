import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { PhotoFrame } from "../PhotoFrame";
import { SectionRule } from "../SectionRule";
import { IMAGE_PORTRAIT_KUSZNIEREWICZ } from "../SiteImages";


export function KusznierewiczSection() {
  const { t } = useLanguage();

  return (
    <section id="kusznierewicz" className="relative scroll-mt-24 bg-background py-24 md:py-36">
      <SectionRule />
      <div className="grid items-center lg:grid-cols-2">
        <div className="order-1 flex items-center px-6 py-12 md:px-16 lg:order-none lg:px-20 xl:px-28">
          <Reveal className="max-w-xl">
            <p className="eyebrow">{t.kusz.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] text-foreground">
              {t.kusz.name}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-muted-foreground">{t.kusz.role}</p>
            <div className="hairline mt-10 max-w-24" />
            <p className="mt-10 leading-relaxed text-foreground/85">{t.kusz.body1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.kusz.body2}</p>

            <ul className="mt-12 divide-y divide-border border-y border-border">
              {t.kusz.honours.map((honour) => (
                <li key={honour.title} className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  <span className="text-foreground">{honour.title}</span>
                  <span className="ml-auto text-right text-xs text-muted-foreground">{honour.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Landscape source: rendered at natural aspect, never cropped. */}
        <div className="flex items-center justify-center px-6 py-8 md:px-12">
          <PhotoFrame
            src={IMAGE_PORTRAIT_KUSZNIEREWICZ}
            alt={t.kusz.alt}
            maxHeight="max-h-[520px]"
          />
        </div>

      </div>
    </section>
  );
}
