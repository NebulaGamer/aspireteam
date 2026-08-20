import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "../Reveal";
import { SectionRule } from "../SectionRule";

/**
 * A simple, modern values register. Seven principles are listed as a numbered
 * manifest — short, scannable, and typographic. No cards, no icons, no heavy
 * descriptions: just the value and its order.
 *
 * Background is ocean dark, distinct from the adjacent Results (abyss) and
 * Partners (parchment) sections.
 */
export function ValuesSection() {
  const { t } = useLanguage();
  const v = t.values;

  return (
    <section id="values" className="relative section-dark scroll-mt-24 py-24 md:py-36">
      <SectionRule />
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{v.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-light italic leading-[1.02] text-parchment">
            {v.title}
          </h2>
        </Reveal>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-0 divide-y divide-gold/20 border-t border-gold/20">
          {v.items.map((item, i) => (
            <Reveal key={item} as="li" delay={i * 60}>
              <div className="flex items-baseline gap-6 py-5 md:gap-10 md:py-6">
                <span className="shrink-0 font-sans text-sm font-medium tabular-nums tracking-widest text-gold/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-lg font-medium leading-snug text-parchment md:text-xl">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
