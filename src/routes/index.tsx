import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { IMAGE_HERO_BOAT } from "@/components/site/SiteImages";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { BoatsSection } from "@/components/site/sections/BoatsSection";
import { HistorySection } from "@/components/site/sections/HistorySection";
import { ResultsSection } from "@/components/site/sections/ResultsSection";
import { CrewSection } from "@/components/site/sections/CrewSection";
import { ValuesSection } from "@/components/site/sections/ValuesSection";
import { PartnersSection } from "@/components/site/sections/PartnersSection";
import { ContactSection } from "@/components/site/sections/ContactSection";

const TITLE_PL = "Aspire Team — żeglarstwo na najwyższym poziomie | Cape 31 i 5.5 Metre";
const DESCRIPTION_PL =
  "Aspire — polski zespół żeglarski rywalizujący na międzynarodowym poziomie w klasach Cape 31 oraz International 5.5 Metre.";
const TITLE_EN = "Aspire Team — sailing at the highest level | Cape 31 & 5.5 Metre";
const DESCRIPTION_EN =
  "Aspire — a Polish sailing team competing internationally in the Cape 31 and the International 5.5 Metre classes.";

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
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "Aspire Team" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aspire Team — POL 17" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${TITLE_PL} · ${TITLE_EN}` },
      { name: "twitter:description", content: `${DESCRIPTION_PL} — ${DESCRIPTION_EN}` },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      // LCP candidate: the hero photograph. Preloaded so it paints as early as possible.
      // Priority is set on the <img> itself; the head link only warms the connection.
      { rel: "preload", as: "image", href: IMAGE_HERO_BOAT },

    ],
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
          url: SITE_URL,
          logo: `${SITE_URL}/icon-512.png`,
          member: [
            {
              "@type": "Person",
              name: "Przemysław Gacek",
              jobTitle: "Helmsman (International 5.5 Metre)",
            },
            {
              "@type": "Person",
              name: "Mateusz Kusznierewicz",
              jobTitle: "Tactician and co-founder",
            },
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
        <CrewSection />
        <ValuesSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
