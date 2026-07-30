import { useLanguage } from "@/i18n/LanguageProvider";
import { timeline } from "@/data/timeline";
import { Reveal } from "../Reveal";
import { IMAGE_HISTORY_HELM, SiteImage } from "../SiteImages";

export function HistorySection() {
  const { t, lang } = useLanguage();

  return (
    <section id="history" className="scroll-mt-24 bg-background py-24 md:py-36">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t.history.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-foreground">
            {t.history.title}
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t.history.intro}</p>
        </Reveal>

        {/* Historic photography, tied to the era it belongs to. */}
        <Reveal delay={120} className="mt-14 md:mt-20">
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden bg-abyss md:aspect-[21/9]">
              <SiteImage
                src={IMAGE_HISTORY_HELM}
                alt={t.history.photoAlt}
                className="absolute inset-0"
              />
            </div>
            <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.history.photoCaption}
            </figcaption>
          </figure>
        </Reveal>


        <ol className="relative mt-20 md:mt-28">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-gold/60 via-border to-transparent md:left-1/2"
          />

          {timeline.map((entry, i) => {
            const right = i % 2 === 1;
            return (
              <li key={entry.id} className="relative pb-14 pl-10 md:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 h-[15px] w-[15px] rotate-45 border md:left-1/2 md:-translate-x-1/2 ${
                    entry.highlight ? "border-gold bg-gold" : "border-gold/70 bg-background"
                  }`}
                />
                <div
                  className={`md:grid md:grid-cols-2 md:gap-16 ${right ? "" : "md:[&>*:first-child]:col-start-1"}`}
                >
                  <div
                    className={`${
                      right ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-4 md:text-right"
                    }`}
                  >
                    <Reveal>
                      <p className="font-display text-2xl font-semibold text-gold md:text-3xl">
                        {entry.period}
                      </p>
                      <h3 className="mt-2 text-lg font-medium text-foreground">
                        {entry.title[lang]}
                      </h3>
                      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground md:inline-block">
                        {entry.body[lang]}
                      </p>
                      {entry.crew ? (
                        <p className="mt-4 text-sm text-foreground/70">
                          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-gold">
                            {t.history.crewLabel}
                          </span>
                          <br />
                          {entry.crew.join(" · ")}
                        </p>
                      ) : null}
                    </Reveal>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
