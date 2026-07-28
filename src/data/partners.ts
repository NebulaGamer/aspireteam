import grupaPracujLogo from "@/assets/partners/grupa-pracuj.webp.asset.json";
import comarchLogo from "@/assets/partners/comarch.png.asset.json";

/**
 * Sponsor wall — exactly two sponsors today.
 *
 * To add a third sponsor, append an entry below with its own logo asset:
 *
 *   import acmeLogo from "@/assets/partners/acme.png.asset.json";
 *   {
 *     id: "acme",
 *     name: "Acme",
 *     tier: "partner",
 *     logo: acmeLogo.url,
 *     url: "https://acme.com",
 *     description: { pl: "…", en: "…" },
 *   }
 *
 * The section lays the cards out on a responsive grid, so a third card slots
 * in without touching the component.
 */

export type PartnerTier = "main" | "partner";

export type Partner = {
  id: string;
  name: string;
  tier: PartnerTier;
  logo: string;
  url: string;
  description: { pl: string; en: string };
};

export const partners: Partner[] = [
  {
    id: "grupa-pracuj",
    name: "Grupa Pracuj",
    tier: "main",
    logo: grupaPracujLogo.url,
    url: "https://grupapracuj.pl",
    description: {
      pl: "Grupa Pracuj jest sponsorem głównym projektu Aspire od 2023 roku. Partnerstwo obejmuje także rejsy team-buildingowe i sesje mentoringowe dla pracowników na pokładzie jachtu.",
      en: "Grupa Pracuj has been the main sponsor of the Aspire project since 2023. The partnership also includes team-building and mentoring sailing sessions for employees aboard the yacht.",
    },
  },
  {
    /*
     * PLACEHOLDER WORDING — neutral, factual copy written by us.
     * To be replaced with wording approved by Comarch / the client.
     */
    id: "comarch",
    name: "Comarch",
    tier: "partner",
    logo: comarchLogo.url,
    url: "https://www.comarch.pl",
    description: {
      pl: "Comarch wspiera zespół Aspire w startach w klasie International 5.5 Metre i Cape 31, towarzysząc projektowi w kolejnym sezonie regatowym.",
      en: "Comarch supports the Aspire team in its International 5.5 Metre and Cape 31 campaigns, standing behind the project through another racing season.",
    },
  },
];
