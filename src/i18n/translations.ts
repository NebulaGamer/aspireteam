/**
 * ASPIRE TEAM — all UI copy, Polish + English side by side.
 * Edit strings here only; components never contain literal copy.
 */

export const translations = {
  pl: {
    meta: {
      title: "Aspire Team — Mistrzowie świata w klasie 5.5 Metre | POL 17",
      description:
        "Aspire (POL 17) — polski zespół żeglarski startujący w klasie International 5.5 Metre i Cape 31. Pierwsza polska załoga z tytułem mistrza świata 5.5 Metre.",
    },
    nav: {
      about: "O nas",
      boats: "Jachty",
      history: "Historia",
      results: "Wyniki",
      calendar: "Kalendarz",
      crew: "Załoga",
      partners: "Partnerzy",
      contact: "Zostań partnerem",
      menu: "Menu",
      close: "Zamknij",
      langLabel: "Zmień język",
    },
    hero: {
      eyebrow: "Polski zespół żeglarski",
      tagline: "Mistrzowie świata w klasie 5.5 Metre",
      sub: "International 5.5 Metre · Cape 31 · Regaty w całej Europie",
      sail: "POL 17",
      scroll: "Przewiń",
      cta: "Poznaj zespół",
      bgAlt: "Jacht POL 17 w akcji — widok z góry na czarne żagle i błękitną wodę",
    },
    about: {
      eyebrow: "O nas",
      title: "Żeglarstwo na najwyższym poziomie",
      lead: "Aspire to polski zespół żeglarski rywalizujący na najwyższym międzynarodowym poziomie w klasie International 5.5 Metre oraz Cape 31.",
      body1:
        "Łącząc doświadczenie mistrza olimpijskiego z determinacją przedsiębiorcy, zespół startuje w regatach w całej Europie — od Zatoki Gdańskiej po Morze Śródziemne.",
      body2:
        "W 2023 roku Aspire jako pierwsza polska załoga w historii zdobyła mistrzostwo świata w klasie 5.5 Metre. Trzy kolejne podia mistrzostw świata potwierdziły, że nie był to przypadek.",
      imageAlt: "Załoga Aspire w akcji na wodzie",
      stats: [
        { value: "1×", label: "Mistrzostwo świata", note: "2023" },
        { value: "1×", label: "Mistrzostwo Europy", note: "2020" },
        { value: "3×", label: "Podium mistrzostw świata", note: "2023–2025" },
      ],
    },
    boats: {
      eyebrow: "Jachty",
      title: "Dwa programy, jedna filozofia",
      intro:
        "Klasyk klasy rozwojowej i nowoczesny ślizg jednoprojektowy. Każdy uczy czegoś innego.",
      five: {
        kicker: "International 5.5 Metre",
        name: "POL 17",
        body1:
          "Kadłub zbudowany w szwajcarskiej stoczni Wilke. Klasa olimpijska w latach 1952–1968, dziś nowoczesna klasa rozwojowa, w której projekt i innowacja wciąż decydują o przewadze.",
        body2:
          "Wąska, elegancka i zaskakująco mocna łódź — połączenie dziedzictwa z bezustannym rozwojem konstrukcyjnym.",
        specs: [
          { label: "Długość", value: "ok. 9,5 m" },
          { label: "Załoga", value: "3 osoby" },
          { label: "Stocznia", value: "Wilke, Szwajcaria" },
          { label: "Typ klasy", value: "Klasa rozwojowa" },
        ],
        alt: "Elegancki, wąski jacht klasy 5.5 Metre na szaroniebieskiej wodzie",
      },
      cape: {
        kicker: "Cape 31",
        name: "Ślizgowa kilówka jednoprojektowa",
        body1:
          "Lekka, wyczynowa 31-stopowa kilówka ślizgowa, którą zespół nabył w 2023 roku, aby poszerzyć program i wyostrzyć obsługę jachtu.",
        body2:
          "Asymetryczny spinaker, ogromna prędkość na kursach pełnych, fizyczne i bezkompromisowe ściganie. Czysta rywalizacja jednoprojektowa — wygrywa załoga, nie projekt.",
        specs: [
          { label: "Długość", value: "31 stóp / 9,4 m" },
          { label: "Załoga", value: "6–7 osób" },
          { label: "Spinaker", value: "Asymetryczny" },
          { label: "Typ klasy", value: "Jednoprojektowa" },
        ],
        alt: "Cape 31 ślizgający się na kursie pełnym pod dużym asymetrycznym spinakerem",
      },
    },
    history: {
      eyebrow: "Historia",
      title: "Droga na szczyt",
      intro: "Od pierwszych startów w klasie 5.5 Metre do tytułu mistrzów świata.",
      crewLabel: "Załoga",
    },
    results: {
      eyebrow: "Wyniki",
      title: "Regaty i miejsca",
      intro: "Najważniejsze starty zespołu Aspire.",
      filters: { all: "Wszystkie", class: "Klasa", year: "Rok" },
      headers: {
        year: "Rok",
        event: "Regaty",
        venue: "Miejsce",
        boatClass: "Klasa",
        place: "Pozycja",
      },
      places: { 1: "1. miejsce", 2: "2. miejsce", 3: "3. miejsce" },
      empty: "Brak wyników dla wybranych filtrów.",
    },
    calendar: {
      eyebrow: "Kalendarz",
      title: "Kalendarz regat",
      intro:
        "Dwa programy — International 5.5 Metre i Cape 31 — od jezior alpejskich po Morze Śródziemne. Terminarz aktualizowany na bieżąco przez zespół.",
      viewLabel: "Widok",
      views: { agenda: "Lista", month: "Miesiąc" },
      filters: {
        class: "Klasa",
        season: "Sezon",
        all: "Wszystkie",
        five: "5.5 Metre",
        cape: "Cape 31",
      },
      status: { cancelled: "Odwołane", completed: "Zakończone", scheduled: "Zaplanowane" },
      participation: { confirmed: "Startujemy", planned: "Planowane" },
      nextUp: "Następne",
      place: "Miejsce",
      today: "Dziś",
      prevMonth: "Poprzedni miesiąc",
      nextMonth: "Następny miesiąc",
      close: "Zamknij",
      detailsLabel: "Szczegóły regat",
      loading: "Wczytywanie kalendarza…",
      error: "Nie udało się wczytać kalendarza. Spróbuj ponownie później.",
      empty: "Brak regat dla wybranych filtrów.",
      monthEmpty: "Brak regat w tym miesiącu.",
      monthOnDesktop: "Widok miesięczny dostępny na większym ekranie.",
      weekdays: ["pon", "wt", "śr", "czw", "pt", "sob", "ndz"],
      weekdaysLong: [
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota",
        "niedziela",
      ],
      months: [
        "styczeń",
        "luty",
        "marzec",
        "kwiecień",
        "maj",
        "czerwiec",
        "lipiec",
        "sierpień",
        "wrzesień",
        "październik",
        "listopad",
        "grudzień",
      ],
      monthsOf: [
        "stycznia",
        "lutego",
        "marca",
        "kwietnia",
        "maja",
        "czerwca",
        "lipca",
        "sierpnia",
        "września",
        "października",
        "listopada",
        "grudnia",
      ],
    },
    gacek: {
      eyebrow: "Sternik",
      name: "Przemysław „Przemek” Gacek",
      role: "Sternik Aspire · współzałożyciel i CEO Grupy Pracuj",
      body1:
        "Współzałożyciel i prezes Grupy Pracuj — wiodącej grupy HR-tech w Europie Środkowej (Pracuj.pl, Rabota.ua), którą kieruje od ponad dwóch dekad.",
      body2:
        "Żeglarska pasja z dzieciństwa, odkryta na nowo w dorosłym życiu i doprowadzona na sam szczyt. Stanął za sterem Aspire i w ciągu roku poprowadził zespół po brązowy medal mistrzostw świata, a rok później po srebro.",
      quote:
        "Nigdy nie przypuszczałem, że zostanę sportowcem, a tym bardziej że stanę na podium i usłyszę hymn Polski.",
      quoteNote: "",
      alt: "Przemysław Gacek — portret na pokładzie jachtu",
    },
    kusz: {
      eyebrow: "Taktyk i mentor",
      name: "Mateusz Kusznierewicz",
      role: "Taktyk Aspire · mistrz olimpijski",
      body1:
        "Jeden z najwybitniejszych żeglarzy w historii Polski. Złoto olimpijskie w klasie Finn w Atlancie 1996 — pierwsze olimpijskie złoto w dziejach polskiego żeglarstwa.",
      body2:
        "W Aspire pływa jako taktyk i mentor, a na lądzie prowadzi programy mentoringowe i przywódcze zespołu.",
      honours: [
        { title: "Złoto olimpijskie", note: "Finn · Atlanta 1996" },
        { title: "Brąz olimpijski", note: "Finn · Ateny 2004" },
        { title: "Żeglarz Roku ISAF", note: "1999" },
        { title: "Mistrz świata Finn Gold Cup", note: "Klasa Finn" },
        { title: "Mistrz świata klasy Star", note: "z Dominikiem Życkim — pierwsza polska załoga" },
        { title: "Zwycięzca Bacardi Cup", note: "Klasa Star" },
        { title: "Olimpijczyk", note: "Londyn 2012" },
      ],
      alt: "Mateusz Kusznierewicz — portret",
    },
    partners: {
      eyebrow: "Sponsorzy i partnerzy",
      title: "Sponsorzy",
      intro:
        "Partnerstwo z Aspire to obecność marki na regatach najwyższej rangi w Europie, dni na wodzie dla klientów i pracowników oraz wspólna praca nad kulturą zespołu prowadzona przez mistrza olimpijskiego.",
      tierMain: "Sponsor główny · od 2023",
      tierPartner: "Partner",
      visit: "Odwiedź stronę",
    },

    contact: {
      eyebrow: "Zostań partnerem",
      title: "Partnerstwo z Aspire",
      lead: "Partnerstwo z Aspire to skojarzenie marki z wynikiem na poziomie mistrzostw świata, platforma do hospitality dla klientów na wodzie oraz autentyczny team-building i rozwój przywództwa prowadzony przez mistrza olimpijskiego.",
      bullets: [
        "Widoczność przy rywalizacji na poziomie mistrzostw świata",
        "Dni regatowe i hospitality dla klientów",
        "Team-building i mentoring z mistrzem olimpijskim",
      ],
      form: {
        company: "Nazwa firmy",
        person: "Osoba kontaktowa",
        email: "Adres e-mail",
        phone: "Telefon (opcjonalnie)",
        interest: "Obszar zainteresowania",
        interestPlaceholder: "Wybierz obszar",
        message: "Wiadomość",
        submit: "Wyślij zapytanie",
        submitting: "Wysyłanie…",
        options: {
          sponsorship: "Sponsoring",
          hospitality: "Hospitality i dni regatowe",
          teambuilding: "Team-building i mentoring",
          media: "Współpraca medialna",
          other: "Inne",
        },
        successTitle: "Dziękujemy",
        successBody: "Twoje zapytanie zostało wysłane. Odezwiemy się w ciągu kilku dni roboczych.",
        successAgain: "Wyślij kolejne zapytanie",
        errors: {
          companyRequired: "Podaj nazwę firmy.",
          companyMax: "Nazwa firmy może mieć maksymalnie 100 znaków.",
          personRequired: "Podaj osobę kontaktową.",
          personMax: "Imię i nazwisko może mieć maksymalnie 100 znaków.",
          emailRequired: "Podaj adres e-mail.",
          emailInvalid: "Podaj poprawny adres e-mail.",
          phoneInvalid: "Podaj poprawny numer telefonu.",
          interestRequired: "Wybierz obszar zainteresowania.",
          messageRequired: "Napisz kilka słów o swoim zapytaniu.",
          messageMax: "Wiadomość może mieć maksymalnie 1000 znaków.",
          submitFailed:
            "Nie udało się wysłać zapytania. Spróbuj ponownie lub napisz na kontakt@aspireteam.pl.",
          rateLimited: "Zapytanie zostało już wysłane. Odczekaj minutę przed kolejną próbą.",
        },
      },
    },
    footer: {
      tagline: "Polski zespół żeglarski · POL 17",
      navLabel: "Nawigacja",
      contactLabel: "Kontakt",
      email: "kontakt@aspireteam.pl",
      social: "Media społecznościowe",
      rights: "Wszelkie prawa zastrzeżone.",
    },
  },

  en: {
    meta: {
      title: "Aspire Team — 5.5 Metre World Champions | POL 17",
      description:
        "Aspire (POL 17) — a Polish sailing team racing the International 5.5 Metre and the Cape 31. The first Polish crew to win the 5.5 Metre World Championship.",
    },
    nav: {
      about: "About",
      boats: "The Boats",
      history: "History",
      results: "Results",
      calendar: "Calendar",
      crew: "Crew",
      partners: "Partners",
      contact: "Partner with us",
      menu: "Menu",
      close: "Close",
      langLabel: "Change language",
    },
    hero: {
      eyebrow: "Polish sailing team",
      tagline: "5.5 Metre World Champions",
      sub: "International 5.5 Metre · Cape 31 · Racing across Europe",
      sail: "POL 17",
      scroll: "Scroll",
      cta: "Meet the team",
      bgAlt: "The POL 17 yacht in action — aerial view of black sails and deep blue water",
    },
    about: {
      eyebrow: "About us",
      title: "Sailing at the highest level",
      lead: "Aspire is a Polish sailing team competing at the highest international level in the International 5.5 Metre class and the Cape 31.",
      body1:
        "Combining an Olympic champion's experience with an entrepreneur's drive, the team races across Europe — from the Bay of Gdańsk to the Mediterranean.",
      body2:
        "In 2023 Aspire became the first Polish crew ever to win the 5.5 Metre World Championship. Three consecutive Worlds podiums since have proved it was no accident.",
      imageAlt: "The Aspire crew in action on the water",
      stats: [
        { value: "1×", label: "World Champion", note: "2023" },
        { value: "1×", label: "European Champion", note: "2020" },
        { value: "3×", label: "Consecutive Worlds podiums", note: "2023–2025" },
      ],
    },
    boats: {
      eyebrow: "The boats",
      title: "Two programmes, one philosophy",
      intro:
        "A development-class classic and a modern one-design planing machine. Each teaches something different.",
      five: {
        kicker: "International 5.5 Metre",
        name: "POL 17",
        body1:
          "A Wilke hull built in Switzerland. An Olympic class from 1952 to 1968, today a modern development class where design innovation still decides the edge.",
        body2:
          "Narrow, elegant and surprisingly powerful — a blend of heritage and relentless design development.",
        specs: [
          { label: "Length", value: "approx. 9.5 m" },
          { label: "Crew", value: "Three" },
          { label: "Builder", value: "Wilke, Switzerland" },
          { label: "Class type", value: "Development class" },
        ],
        alt: "An elegant narrow 5.5 Metre keelboat sailing on grey-blue water",
      },
      cape: {
        kicker: "Cape 31",
        name: "One-design planing keelboat",
        body1:
          "A lightweight, high-performance 31-foot planing keelboat, acquired by the team in 2023 to broaden the programme and sharpen boat-handling.",
        body2:
          "Asymmetric spinnaker, huge downwind speed, physical and uncompromising racing. Pure one-design: the crew wins, not the design office.",
        specs: [
          { label: "Length", value: "31 ft / 9.4 m" },
          { label: "Crew", value: "Six to seven" },
          { label: "Spinnaker", value: "Asymmetric" },
          { label: "Class type", value: "One-design" },
        ],
        alt: "A Cape 31 planing downwind under a large asymmetric spinnaker",
      },
    },
    history: {
      eyebrow: "History",
      title: "The road to the top",
      intro: "From first races in the 5.5 Metre class to a world title.",
      crewLabel: "Crew",
    },
    results: {
      eyebrow: "Results",
      title: "Regattas and placings",
      intro: "The team's most significant results.",
      filters: { all: "All", class: "Class", year: "Year" },
      headers: {
        year: "Year",
        event: "Event",
        venue: "Venue",
        boatClass: "Class",
        place: "Place",
      },
      places: { 1: "1st place", 2: "2nd place", 3: "3rd place" },
      empty: "No results for the selected filters.",
    },
    gacek: {
      eyebrow: "Helmsman",
      name: "Przemysław “Przemek” Gacek",
      role: "Helmsman of Aspire · co-founder and CEO of Grupa Pracuj",
      body1:
        "Co-founder and CEO of Grupa Pracuj, the leading HR-tech group in Central Europe (Pracuj.pl, Rabota.ua), which he has led for over two decades.",
      body2:
        "A childhood sailing passion rediscovered later in life and pursued to the very top. He took the helm of Aspire and within a year led the team to a World Championship bronze, then silver the following year.",
      quote:
        "I never imagined I would become an athlete — let alone stand on a podium and hear the Polish anthem played.",
      quoteNote: "Nigdy nie przypuszczałem, że zostanę sportowcem, a tym bardziej że stanę na podium i usłyszę hymn Polski.",
      alt: "Przemysław Gacek — portrait aboard the yacht",
    },
    kusz: {
      eyebrow: "Tactician and mentor",
      name: "Mateusz Kusznierewicz",
      role: "Tactician of Aspire · Olympic champion",
      body1:
        "One of the greatest sailors Poland has produced. Olympic Gold in the Finn class at Atlanta 1996 — the first Olympic gold in the history of Polish sailing.",
      body2:
        "On Aspire he sails as tactician and mentor, and ashore he leads the team's mentoring and leadership work.",
      honours: [
        { title: "Olympic Gold", note: "Finn · Atlanta 1996" },
        { title: "Olympic Bronze", note: "Finn · Athens 2004" },
        { title: "ISAF World Sailor of the Year", note: "1999" },
        { title: "Finn Gold Cup World Champion", note: "Finn class" },
        { title: "Star World Champion", note: "with Dominik Życki — the first Polish crew to win it" },
        { title: "Bacardi Cup winner", note: "Star class" },
        { title: "Olympian", note: "London 2012" },
      ],
      alt: "Mateusz Kusznierewicz — portrait",
    },
    partners: {
      eyebrow: "Sponsors & partners",
      title: "Sponsors",
      intro:
        "Partnering with Aspire means brand presence at Europe's top-level regattas, days on the water for clients and employees, and shared work on team culture led by an Olympic champion.",
      tierMain: "Main sponsor · since 2023",
      tierPartner: "Partner",
      visit: "Visit website",
    },

    contact: {
      eyebrow: "Partner with us",
      title: "Partnering with Aspire",
      lead: "Partnering with Aspire means association with world-championship performance, a platform for client hospitality on the water, and genuine team-building and leadership development led by an Olympic champion.",
      bullets: [
        "Visibility alongside world-championship racing",
        "Regatta days and client hospitality",
        "Team-building and mentoring with an Olympic champion",
      ],
      form: {
        company: "Company name",
        person: "Contact person",
        email: "Email address",
        phone: "Phone (optional)",
        interest: "Area of interest",
        interestPlaceholder: "Select an area",
        message: "Message",
        submit: "Send enquiry",
        submitting: "Sending…",
        options: {
          sponsorship: "Sponsorship",
          hospitality: "Hospitality & regatta days",
          teambuilding: "Team-building & mentoring",
          media: "Media collaboration",
          other: "Other",
        },
        successTitle: "Thank you",
        successBody: "Your enquiry has been sent. We will be in touch within a few working days.",
        successAgain: "Send another enquiry",
        errors: {
          companyRequired: "Please enter a company name.",
          companyMax: "Company name must be 100 characters or fewer.",
          personRequired: "Please enter a contact person.",
          personMax: "Name must be 100 characters or fewer.",
          emailRequired: "Please enter an email address.",
          emailInvalid: "Please enter a valid email address.",
          phoneInvalid: "Please enter a valid phone number.",
          interestRequired: "Please select an area of interest.",
          messageRequired: "Please tell us a little about your enquiry.",
          messageMax: "Message must be 1000 characters or fewer.",
          submitFailed:
            "We couldn't send your enquiry. Please try again or email kontakt@aspireteam.pl.",
          rateLimited: "Your enquiry was just sent. Please wait a minute before sending another.",
        },
      },
    },
    footer: {
      tagline: "Polish sailing team · POL 17",
      navLabel: "Navigation",
      contactLabel: "Contact",
      email: "kontakt@aspireteam.pl",
      social: "Social media",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type Dictionary = (typeof translations)["pl"];
