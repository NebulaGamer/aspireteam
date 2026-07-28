import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * INTENTIONAL PORTRAIT PLACEHOLDER
 * --------------------------------
 * Used where a licensed photograph of a real, named person is not yet
 * available. It deliberately shows NO human face — only the person's initials
 * and an "awaiting photography" caption — so the site never presents a
 * generated likeness as a real person.
 *
 * To replace with a real portrait: set the matching constant in
 * `SiteImages.tsx` to an imported photograph. The section will render the
 * photo instead of this panel, with identical layout and aspect ratio.
 */
export function PortraitPlaceholder({
  initials,
  label,
}: {
  /** e.g. "PG" — rendered in the display serif inside a thin gold ring. */
  initials: string;
  /** Accessible description of who the panel stands in for. */
  label: string;
}) {
  const { t } = useLanguage();

  return (
    <div role="img" aria-label={label} className="portrait-placeholder relative h-full w-full">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-center">
        <span className="grid h-32 w-32 place-items-center rounded-full border border-gold/50 md:h-40 md:w-40">
          <span className="font-display text-4xl font-semibold tracking-[0.12em] text-gold md:text-5xl">
            {initials}
          </span>
        </span>
        <span className="eyebrow text-gold/80">{t.portrait.comingSoon}</span>
      </div>
    </div>
  );
}
