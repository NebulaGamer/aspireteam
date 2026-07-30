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
import heroBoatAsset from "@/assets/hero-boat.jpg.asset.json";

import gacekAsset from "@/assets/portrait-gacek.jpg.asset.json";
import kusznierewiczAsset from "@/assets/portrait-kusznierewicz.jpg.asset.json";

export const IMAGE_BOAT_55_METRE = boat55Asset.url;
export const IMAGE_BOAT_CAPE_31 = cape31Asset.url;

/**
 * Historic action photograph — the 5.5 Metre crew with Mateusz Kusznierewicz on
 * the helm. Used only in the History section, tied to the 2019–2022 era.
 */
export const IMAGE_HISTORY_HELM = aboutActionAsset.url;

/**
 * Crew photography — not supplied yet, so these stay null and the crew section
 * renders its "awaiting photography" plate instead of a broken frame.
 */
/** TODO: the Palma dockside team photograph goes here. */
export const IMAGE_CREW_CAPE31: string | null = null;
/** TODO: one of these should be the crew of three with Kilian Weise. */
export const IMAGE_CREW_55_A: string | null = null;
export const IMAGE_CREW_55_B: string | null = null;

/** Hero background photograph — the POL 17 boat under sail. */
export const IMAGE_HERO_BOAT = heroBoatAsset.url;


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
      fetchPriority={priority ? "high" : "auto"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
