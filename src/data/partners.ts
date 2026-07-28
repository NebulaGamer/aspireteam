/**
 * Partner wall.
 *
 * To add a partner, append an entry below. Leave `logo` undefined to render the
 * neutral placeholder tile, or set it to an imported image path once a real
 * logo file is available:
 *
 *   import acmeLogo from "@/assets/partners/acme.svg";
 *   { id: "acme", name: "Acme", logo: acmeLogo, url: "https://acme.com" }
 */

export type Partner = {
  id: string;
  name: string;
  logo?: string;
  url?: string;
};

export const partners: Partner[] = [
  { id: "partner-1", name: "Partner 1" },
  { id: "partner-2", name: "Partner 2" },
  { id: "partner-3", name: "Partner 3" },
  { id: "partner-4", name: "Partner 4" },
  { id: "partner-5", name: "Partner 5" },
  { id: "partner-6", name: "Partner 6" },
];
