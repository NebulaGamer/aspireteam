/** Team history timeline. Ordered oldest → newest. */

export type TimelineEntry = {
  id: string;
  period: string;
  highlight?: boolean;
  title: { pl: string; en: string };
  body: { pl: string; en: string };
  crew?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "2019-2020-forms",
    period: "2019–2020",
    title: { pl: "Powstanie zespołu", en: "The team forms" },
    body: {
      pl: "Zespół zawiązuje się i rozpoczyna starty w klasie International 5.5 Metre.",
      en: "The team comes together and enters the International 5.5 Metre class.",
    },
  },
  {
    id: "2020-euros",
    period: "2020",
    title: { pl: "Mistrzostwo Europy", en: "European Champions" },
    body: {
      pl: "Zwycięstwo w mistrzostwach Europy klasy 5.5 Metre w Sanremo we Włoszech.",
      en: "Wins the 5.5 Metre European Championship in Sanremo, Italy.",
    },
    crew: ["Mateusz Kusznierewicz", "Przemysław Gacek", "Simon Fry"],
  },
  {
    id: "2023-patron",
    period: "2023",
    title: { pl: "Grupa Pracuj patronem", en: "Grupa Pracuj becomes patron" },
    body: {
      pl: "Grupa Pracuj zostaje patronem projektu Aspire.",
      en: "Grupa Pracuj becomes patron of the Aspire project.",
    },
  },
  {
    id: "2023-alpencup",
    period: "2023",
    title: { pl: "Alpen Cup", en: "Alpen Cup" },
    body: {
      pl: "Zwycięstwo w Alpen Cup klasy 5.5 Metre w Torbole nad jeziorem Garda.",
      en: "Wins the 5.5 Metre Alpen Cup at Torbole, Lake Garda.",
    },
  },
  {
    id: "2023-cape31",
    period: "2023",
    title: { pl: "Cape 31 dołącza do floty", en: "A Cape 31 joins the programme" },
    body: {
      pl: "Zakup Cape 31 otwiera program dwóch jachtów i rozpoczyna przejście Przemysława Gacka za ster.",
      en: "Acquiring a Cape 31 begins a two-boat programme and Przemysław Gacek's transition to the helm.",
    },
  },
  {
    id: "2023-worlds",
    period: "2023",
    highlight: true,
    title: { pl: "Mistrzowie świata", en: "World Champions" },
    body: {
      pl: "Zwycięstwo w mistrzostwach świata klasy 5.5 Metre w Yacht Club Costa Smeralda, Porto Cervo na Sardynii — pierwszy tytuł mistrzów świata 5.5 Metre w historii Polski.",
      en: "Wins the 5.5 Metre World Championship at Yacht Club Costa Smeralda, Porto Cervo, Sardinia — the first 5.5 Metre world title in Polish history.",
    },
    crew: ["Mateusz Kusznierewicz", "Przemysław Gacek", "Edward Wright"],
  },
  {
    id: "2024-worlds",
    period: "2024",
    title: { pl: "Brąz mistrzostw świata", en: "Worlds bronze" },
    body: {
      pl: "Brązowy medal mistrzostw świata 5.5 Metre w Bénodet we Francji — pierwsze mistrzostwa świata Gacka w roli sternika.",
      en: "Bronze at the 5.5 Metre World Championship in Bénodet, France — Gacek's first Worlds as helmsman.",
    },
  },
  {
    id: "2025-worlds",
    period: "2025",
    title: { pl: "Srebro w Sopocie", en: "Silver in Sopot" },
    body: {
      pl: "Srebrny medal mistrzostw świata 5.5 Metre w Sopocie. Aspire współorganizowało regaty, sprowadzając klasę do Polski po raz pierwszy.",
      en: "Silver at the 5.5 Metre World Championship in Sopot, Poland. Aspire also helped organise the event, bringing the class to Poland for the first time.",
    },
    crew: ["Przemysław Gacek", "Mateusz Kusznierewicz", "Kilian Weise"],
  },
];
