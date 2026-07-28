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
import gacekAsset from "@/assets/portrait-gacek.jpg.asset.json";
import kusznierewiczAsset from "@/assets/portrait-kusznierewicz.jpg.asset.json";

export const IMAGE_HERO = heroSrc;
export const IMAGE_BOAT_55_METRE = boat55Asset.url;
export const IMAGE_BOAT_CAPE_31 = cape31Src;
export const IMAGE_DECK_DETAIL = deckDetailSrc;
export const IMAGE_TROPHY = trophySrc;
/**
 * PORTRAITS — real, licensed photographs supplied by the team.
 * Przemysław Gacek and Mateusz Kusznierewicz are real, named public figures:
 * only genuine photography may be used here, never a generated likeness.
 * Setting either constant back to `null` restores the `PortraitPlaceholder`
 * panel (initials + "photograph coming soon" caption).
 */
export const IMAGE_PORTRAIT_GACEK: string | null = gacekAsset.url;
export const IMAGE_PORTRAIT_KUSZNIEREWICZ: string | null = kusznierewiczAsset.url;
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
