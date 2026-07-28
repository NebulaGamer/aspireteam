import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { IMAGE_PORTRAIT_KUSZNIEREWICZ, SiteImage } from "../SiteImages";
import { PortraitPlaceholder } from "../PortraitPlaceholder";

export function KusznierewiczSection() {
  const { t } = useLanguage();

  return (
    <section className="section-dark">
      <div className="grid lg:grid-cols-2">
        <div className="order-1 flex items-center px-6 py-20 md:px-16 lg:order-none lg:px-20 xl:px-28">
          <Reveal className="max-w-xl">
            <p className="eyebrow">{t.kusz.eyebrow}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] text-parchment">
              {t.kusz.name}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-steel">{t.kusz.role}</p>
            <div className="hairline mt-10 max-w-24" />
            <p className="mt-10 leading-relaxed text-silver">{t.kusz.body1}</p>
            <p className="mt-4 leading-relaxed text-steel">{t.kusz.body2}</p>

            <ul className="mt-12 divide-y divide-border border-y border-border">
              {t.kusz.honours.map((honour) => (
                <li key={honour.title} className="flex items-baseline gap-4 py-4">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  <span className="text-parchment">{honour.title}</span>
                  <span className="ml-auto text-right text-xs text-steel">{honour.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative min-h-[60vh] overflow-hidden bg-abyss lg:min-h-screen">
          {IMAGE_PORTRAIT_KUSZNIEREWICZ ? (
            <SiteImage src={IMAGE_PORTRAIT_KUSZNIEREWICZ} alt={t.kusz.alt} />
          ) : (
            <PortraitPlaceholder initials="MK" label={t.kusz.alt} />
          )}
        </div>
      </div>
    </section>
  );
}
