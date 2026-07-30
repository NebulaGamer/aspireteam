/**
 * Explicit editorial boundary at the top edge of a section.
 *
 * Separation must never depend on the background colour changing — if two
 * neighbouring sections ever share a surface, this hairline still reads as a
 * deliberate rule. It spans the shell width (not the full viewport) so it
 * looks typeset rather than like a browser border.
 *
 * The parent <section> must be `relative`.
 */
export function SectionRule() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 block">
      <span className="shell block">
        <span className="block h-px bg-gold/25" />
      </span>
    </span>
  );
}
