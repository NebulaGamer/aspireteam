/**
 * SWAPPABLE IMAGERY
 * -----------------
 * Every photograph on the site is referenced through one of the constants
 * below. To replace a placeholder with real client photography, drop the new
 * file into `src/assets/` and change the single import + constant here.
 * No layout code needs to be touched.
 */

import heroSrc from "@/assets/hero-55m.jpg";
import boat55Asset from "@/assets/boat-55m-pol17.jpg.asset.json";
import cape31Src from "@/assets/cape31-downwind.jpg";
import deckDetailSrc from "@/assets/deck-detail.jpg";
import trophySrc from "@/assets/trophy.jpg";
import youthSrc from "@/assets/youth-sailing.jpg";

export const IMAGE_HERO = heroSrc;
export const IMAGE_BOAT_55_METRE = boat55Asset.url;
export const IMAGE_BOAT_CAPE_31 = cape31Src;
export const IMAGE_DECK_DETAIL = deckDetailSrc;
export const IMAGE_TROPHY = trophySrc;
/**
 * PORTRAITS — INTENTIONAL PLACEHOLDERS.
 * Przemysław Gacek and Mateusz Kusznierewicz are real, named public figures,
 * so no generated likeness is used for them. While these constants are `null`
 * the crew sections render the `PortraitPlaceholder` panel (initials + a
 * "photograph coming soon" caption) instead of a face.
 *
 * MUST BE REPLACED with licensed photographs of the real people: drop the file
 * into `src/assets/`, import it, and assign it here — nothing else changes.
 */
export const IMAGE_PORTRAIT_GACEK: string | null = null;
export const IMAGE_PORTRAIT_KUSZNIEREWICZ: string | null = null;
export const IMAGE_YOUTH = youthSrc;

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
