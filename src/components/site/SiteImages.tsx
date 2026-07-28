/**
 * SWAPPABLE IMAGERY
 * -----------------
 * Every photograph on the site is referenced through one of the constants
 * below. Only real, supplied photography is used — there is no generated
 * imagery anywhere. To add a photograph, upload it to `src/assets/` and
 * point the matching constant at it. No layout code needs to be touched.
 */

import boat55Asset from "@/assets/boat-55m-pol17.jpg.asset.json";
import cape31Asset from "@/assets/cape31-replacement.jpg.asset.json";
import aboutActionAsset from "@/assets/about-action.jpg.asset.json";

import gacekAsset from "@/assets/portrait-gacek.jpg.asset.json";
import kusznierewiczAsset from "@/assets/portrait-kusznierewicz.jpg.asset.json";

export const IMAGE_BOAT_55_METRE = boat55Asset.url;
export const IMAGE_BOAT_CAPE_31 = cape31Asset.url;

/** Action photograph shown beside the About section text. */
export const IMAGE_ABOUT_ACTION = aboutActionAsset.url;

/**
 * Deck / crew photograph shown beside the boat comparison table.
 * Assign a real crew-on-deck photograph supplied by the team here; while it is
 * `null`, the comparison block renders as a full-width editorial table and the
 * layout adapts automatically — no other change is needed.
 */
export const IMAGE_DECK_CREW: string | null = null;

/** Portraits — real, licensed photographs supplied by the team. */
export const IMAGE_PORTRAIT_GACEK = gacekAsset.url;
export const IMAGE_PORTRAIT_KUSZNIEREWICZ = kusznierewiczAsset.url;

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Cover image filling its (positioned) parent. Alt text always comes from translations. */
export function SiteImage({ src, alt, className = "", priority = false }: SiteImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
