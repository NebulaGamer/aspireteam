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

import crewCape31Asset from "@/assets/crew-cape31.jpg.asset.json";
import crew55AAsset from "@/assets/crew-55-a.jpg.asset.json";
import crew55BAsset from "@/assets/crew-55-b.jpg.asset.json";
import eventPortoCervoAsset from "@/assets/event-porto-cervo-2023.jpg.asset.json";
import eventBenodetAsset from "@/assets/event-benodet-2024.jpg.asset.json";
import eventSopotAsset from "@/assets/event-sopot-2025.jpg.asset.json";

export const IMAGE_BOAT_55_METRE = boat55Asset.url;
export const IMAGE_BOAT_CAPE_31 = cape31Asset.url;

/**
 * Historic action photograph — the 5.5 Metre crew with Mateusz Kusznierewicz on
 * the helm. Used only in the History section, tied to the 2019–2022 era.
 */
export const IMAGE_HISTORY_HELM = aboutActionAsset.url;

/**
 * Crew photography — supplied by the team.
 */
/** Palma dockside team photograph, seven crew in blue Aspire kit. */
export const IMAGE_CREW_CAPE31: string | null = crewCape31Asset.url;
/**
 * The 5.5 Metre crew of three celebrating aboard POL 17.
 * TO BE REPLACED: the client is supplying a photograph in which Przemysław
 * Gacek is clearly visible at the helm (he now steers the 5.5). Swap whichever
 * of A/B currently features Mateusz Kusznierewicz as the main figure.
 */
export const IMAGE_CREW_55_A: string | null = crew55AAsset.url;
/**
 * The 5.5 Metre crew of three racing upwind.
 * TO BE REPLACED: see the note on IMAGE_CREW_55_A — one of these two slots must
 * end up showing Gacek at the helm once the new file arrives.
 */
export const IMAGE_CREW_55_B: string | null = crew55BAsset.url;


/** Hero background photograph — the POL 17 boat under sail. */
export const IMAGE_HERO_BOAT = heroBoatAsset.url;

/**
 * Event photography from individual regattas — supplied by the client, rights held
 * by the team. History and Results render nothing at all while a slot is null.
 */
/** The crew with the trophy at Yacht Club Costa Smeralda, Italian ribbons — world title, gold. */
export const IMAGE_EVENT_PORTO_CERVO_2023: string | null = eventPortoCervoAsset.url;
/** The crew with the trophy at sunset over the marina in Bénodet. */
export const IMAGE_EVENT_BENODET_2024: string | null = eventBenodetAsset.url;
/** The crew in the venue with the "2nd place" plaque, Sopot. */
export const IMAGE_EVENT_SOPOT_2025: string | null = eventSopotAsset.url;




/** Portraits — real, licensed photographs supplied by the team. */
export const IMAGE_PORTRAIT_GACEK = gacekAsset.url;
export const IMAGE_PORTRAIT_KUSZNIEREWICZ = kusznierewiczAsset.url;

/**
 * Intrinsic pixel dimensions of every supplied photograph. Used to set the
 * `width`/`height` attributes (no layout shift) and to let PhotoFrame render
 * people photography at its natural aspect ratio instead of cropping it.
 */
const INTRINSIC: Record<string, { width: number; height: number }> = {
  [IMAGE_BOAT_55_METRE]: { width: 960, height: 640 },
  [IMAGE_BOAT_CAPE_31]: { width: 1200, height: 800 },
  [IMAGE_HISTORY_HELM]: { width: 800, height: 534 },
  [IMAGE_HERO_BOAT]: { width: 1600, height: 1067 },
  [crewCape31Asset.url]: { width: 1600, height: 1153 },
  [crew55AAsset.url]: { width: 1178, height: 866 },
  [crew55BAsset.url]: { width: 1135, height: 757 },
  [eventPortoCervoAsset.url]: { width: 840, height: 1024 },
  [eventBenodetAsset.url]: { width: 1600, height: 1199 },
  [eventSopotAsset.url]: { width: 1200, height: 1599 },
  [IMAGE_PORTRAIT_GACEK]: { width: 1200, height: 857 },
  [IMAGE_PORTRAIT_KUSZNIEREWICZ]: { width: 1920, height: 1280 },
};

export function imageSize(src: string): { width: number; height: number } {
  return INTRINSIC[src] ?? { width: 1600, height: 1067 };
}


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
