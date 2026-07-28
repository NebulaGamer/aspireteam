import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { BoatsSection } from "@/components/site/sections/BoatsSection";
import { HistorySection } from "@/components/site/sections/HistorySection";
import { ResultsSection } from "@/components/site/sections/ResultsSection";
import { GacekSection } from "@/components/site/sections/GacekSection";
import { KusznierewiczSection } from "@/components/site/sections/KusznierewiczSection";

import { PartnersSection } from "@/components/site/sections/PartnersSection";
import { ContactSection } from "@/components/site/sections/ContactSection";

const TITLE_PL = "Aspire Team — Mistrzowie świata w klasie 5.5 Metre | POL 17";
const DESCRIPTION_PL =
  "Aspire (POL 17) — polski zespół żeglarski startujący w klasie International 5.5 Metre i Cape 31. Pierwsza polska załoga z tytułem mistrza świata 5.5 Metre.";
const TITLE_EN = "Aspire Team — 5.5 Metre World Champions | POL 17";
const DESCRIPTION_EN =
  "Aspire (POL 17) — a Polish sailing team racing the International 5.5 Metre and the Cape 31. The first Polish crew to win the 5.5 Metre World Championship.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE_PL },
      { name: "description", content: DESCRIPTION_PL },
      { property: "og:title", content: TITLE_PL },
      { property: "og:description", content: DESCRIPTION_PL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pl_PL" },
      { property: "og:locale:alternate", content: "en_GB" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Aspire Team" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${TITLE_PL} · ${TITLE_EN}` },
      { name: "twitter:description", content: `${DESCRIPTION_PL} — ${DESCRIPTION_EN}` },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: "Aspire Team",
          sport: "Sailing",
          alternateName: "POL 17",
          description: DESCRIPTION_EN,
          nationality: "Poland",
          member: [
            { "@type": "Person", name: "Przemysław Gacek", jobTitle: "Helmsman" },
            { "@type": "Person", name: "Mateusz Kusznierewicz", jobTitle: "Tactician" },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <BoatsSection />
        <HistorySection />
        <ResultsSection />
        <GacekSection />
        <KusznierewiczSection />
        
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
