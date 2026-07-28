import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CalendarSection } from "@/components/site/sections/CalendarSection";

const TITLE_PL = "Kalendarz regat 2026–2028 — Aspire Team POL 17";
const DESCRIPTION_PL =
  "Pełny terminarz regat Aspire Team (POL 17): starty w klasach International 5.5 Metre i Cape 31 w całej Europie w latach 2026–2028.";
const TITLE_EN = "Racing Calendar 2026–2028 — Aspire Team POL 17";
const DESCRIPTION_EN =
  "The full regatta schedule of Aspire Team (POL 17): International 5.5 Metre and Cape 31 events across Europe, 2026 to 2028.";

export const Route = createFileRoute("/calendar")({
  // Filters live in the URL so a filtered calendar can be linked and shared.
  validateSearch: (search: Record<string, unknown>) => ({
    cls: typeof search.cls === "string" ? search.cls : undefined,
    season: typeof search.season === "string" ? search.season : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITLE_PL },
      { name: "description", content: DESCRIPTION_PL },
      { property: "og:title", content: TITLE_PL },
      { property: "og:description", content: DESCRIPTION_PL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pl_PL" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:url", content: "/calendar" },
      { property: "og:site_name", content: "Aspire Team" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${TITLE_PL} · ${TITLE_EN}` },
      { name: "twitter:description", content: `${DESCRIPTION_PL} — ${DESCRIPTION_EN}` },
    ],
    links: [{ rel: "canonical", href: "/calendar" }],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <CalendarSection />
        <BackHome />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function BackHome() {
  const { t } = useLanguage();
  return (
    <div className="section-dark section-abyss pb-24">
      <div className="shell">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-silver transition-colors hover:text-gold"
        >
          <ArrowLeft
            size={15}
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:-translate-x-1"
          />
          {t.calendar.backHome}
        </Link>
      </div>
    </div>
  );
}
