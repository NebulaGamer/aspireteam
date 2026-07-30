/**
 * Links regatta photography to the timeline milestone and results row it belongs to.
 * The image constants live in SiteImages.tsx; the captions live in the translations
 * file. When an image is null nothing is rendered — see SiteImages for the slots.
 */

import {
  IMAGE_EVENT_BENODET_2024,
  IMAGE_EVENT_PORTO_CERVO_2023,
  IMAGE_EVENT_SOPOT_2025,
} from "@/components/site/SiteImages";

export type EventPhotoKey = "portoCervo2023" | "benodet2024" | "sopot2025";

export type EventPhoto = { src: string; key: EventPhotoKey };

const IMAGES: Record<EventPhotoKey, string | null> = {
  portoCervo2023: IMAGE_EVENT_PORTO_CERVO_2023,
  benodet2024: IMAGE_EVENT_BENODET_2024,
  sopot2025: IMAGE_EVENT_SOPOT_2025,
};

/** Timeline entry id → photo key. */
const TIMELINE_PHOTOS: Record<string, EventPhotoKey> = {
  "2023-worlds": "portoCervo2023",
  "2024-worlds": "benodet2024",
  "2025-worlds": "sopot2025",
};

/** Results row id → photo key. */
const RESULT_PHOTOS: Record<string, EventPhotoKey> = {
  "worlds-2023-portocervo": "portoCervo2023",
  "worlds-2024-benodet": "benodet2024",
  "worlds-2025-sopot": "sopot2025",
};

function resolve(key: EventPhotoKey | undefined): EventPhoto | null {
  if (!key) return null;
  const src = IMAGES[key];
  return src ? { src, key } : null;
}

export const timelinePhoto = (id: string) => resolve(TIMELINE_PHOTOS[id]);
export const resultPhoto = (id: string) => resolve(RESULT_PHOTOS[id]);
