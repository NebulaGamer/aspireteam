/**
 * Competition results. Add a new row at the top — the table sorts by year desc.
 * `place` drives the medal indicator (1 = gold, 2 = silver, 3 = bronze).
 */

export type ResultRow = {
  id: string;
  year: number;
  boatClass: string;
  place: number;
  event: { pl: string; en: string };
  venue: { pl: string; en: string };
};

export const results: ResultRow[] = [
  {
    id: "worlds-2025-sopot",
    year: 2025,
    boatClass: "5.5 Metre",
    place: 2,
    event: { pl: "Mistrzostwa Świata 5.5 Metre", en: "5.5 Metre World Championship" },
    venue: { pl: "Sopot, Polska", en: "Sopot, POL" },
  },
  {
    id: "worlds-2024-benodet",
    year: 2024,
    boatClass: "5.5 Metre",
    place: 3,
    event: { pl: "Mistrzostwa Świata 5.5 Metre", en: "5.5 Metre World Championship" },
    venue: { pl: "Bénodet, Francja", en: "Bénodet, FRA" },
  },
  {
    id: "worlds-2023-portocervo",
    year: 2023,
    boatClass: "5.5 Metre",
    place: 1,
    event: { pl: "Mistrzostwa Świata 5.5 Metre", en: "5.5 Metre World Championship" },
    venue: { pl: "Porto Cervo, Włochy", en: "Porto Cervo, ITA" },
  },
  {
    id: "alpencup-2023-torbole",
    year: 2023,
    boatClass: "5.5 Metre",
    place: 1,
    event: { pl: "Alpen Cup 5.5 Metre", en: "5.5 Metre Alpen Cup" },
    venue: { pl: "Torbole, Włochy", en: "Torbole, ITA" },
  },
  {
    id: "euros-2020-sanremo",
    year: 2020,
    boatClass: "5.5 Metre",
    place: 1,
    event: { pl: "Mistrzostwa Europy 5.5 Metre", en: "5.5 Metre European Championship" },
    venue: { pl: "Sanremo, Włochy", en: "Sanremo, ITA" },
  },
];
