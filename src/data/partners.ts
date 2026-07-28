import grupaPracujLogo from "@/assets/partners/grupa-pracuj.webp.asset.json";
import comarchLogo from "@/assets/partners/comarch.png.asset.json";

/**
 * Sponsor wall.
 *
 * To add a sponsor, append an entry below. Leave `logo` undefined to render the
 * neutral placeholder tile, or upload a logo asset and import its pointer:
 *
 *   import acmeLogo from "@/assets/partners/acme.png.asset.json";
 *   { id: "acme", name: "Acme", logo: acmeLogo.url, url: "https://acme.com" }
 */

export type Partner = {
  id: string;
  name: string;
  logo?: string;
  url?: string;
};

/** Main sponsor — rendered large at the top of the section. */
export const mainPartner: Partner = {
  id: "grupa-pracuj",
  name: "Grupa Pracuj",
  logo: grupaPracujLogo.url,
  url: "https://grupapracuj.pl",
};

export const partners: Partner[] = [
  {
    id: "comarch",
    name: "Comarch",
    logo: comarchLogo.url,
    url: "https://www.comarch.pl",
  },
];
