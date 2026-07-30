/**
 * ASPIRE TEAM — all UI copy, Polish + English side by side.
 * Edit strings here only; components never contain literal copy.
 */

export const translations = {
  pl: {
    meta: {
      title: "Aspire Team — żeglarstwo na najwyższym poziomie | Cape 31 i 5.5 Metre",
      description:
        "Aspire — polski zespół żeglarski rywalizujący na międzynarodowym poziomie w klasach Cape 31 oraz International 5.5 Metre.",
    },
    nav: {
      about: "O nas",
      boats: "Jachty",
      history: "Historia",
      results: "Wyniki",
      
      crew: "Załoga",
      partners: "Partnerzy",
      contact: "Zostań partnerem",
      menu: "Menu",
      close: "Zamknij",
      langLabel: "Zmień język",
    },
    hero: {
      headline: "Żeglarstwo na najwyższym poziomie",
      intro1:
        "Aspire to polski zespół żeglarski rywalizujący na międzynarodowym poziomie w klasach Cape 31 oraz International 5.5 Metre.",
      intro2:
        "Projekt łączy doświadczenie Mateusza Kusznierewicza, mistrza olimpijskiego, z doświadczeniem Przemysława Gacka, przedsiębiorcy i założyciela jednej z największych europejskich firm technologicznych w branży HR. Budujemy zespół oparty na ambicji, ciągłym rozwoju i uczeniu się od najlepszych.",
      scroll: "Przewiń",
      cta: "Poznaj zespół",
      bgAlt: "Jacht Aspire w akcji — widok z góry na czarne żagle i błękitną wodę",
    },
    about: {
      eyebrow: "O nas",
      title: "Aspirować — nazwa, która jest planem",
      lead: "Aspire to nie tylko nazwa zespołu. To idea, na której opiera się cały projekt: aspirowanie, ciągły rozwój, ciekawość życia, zmian i nauki oraz stawianie sobie kolejnych, coraz bardziej ambitnych celów.",
      movements: [
        {
          title: "Spotkanie dwóch doświadczeń",
          body: "Projekt łączy dwa światy. Świat Mateusza Kusznierewicza — sportu żeglarskiego na poziomie olimpijskim, uprawianego według najwyższych standardów — oraz świat Przemysława Gacka, przedsiębiorcy, który zbudował jedną z największych europejskich firm technologicznych w branży HR. To zderzenie sportu i biznesu jest sednem Aspire, a nie przypisem do historii zespołu.",
        },
        {
          title: "Otwarta, zmieniająca się załoga",
          body: "Do wspólnego pływania zapraszamy innych żeglarzy — przede wszystkim polskich, choć nie tylko. Skład celowo się zmienia, bo nauka od różnych ludzi jest dla nas najszybszą drogą rozwoju. To świadomy wybór, a nie brak konsekwencji.",
        },
      ],

      stats: [
        { value: "1×", label: "Mistrzostwo świata", note: "2023" },
        { value: "1×", label: "Mistrzostwo Europy", note: "2020" },
        {
          value: "3×",
          label: "Podium mistrzostw świata",
          note: "złoto, brąz, srebro · 2023–2025",
        },
      ],
    },
    boats: {
      eyebrow: "Jachty",
      title: "Dwa programy, jedna filozofia",
      intro:
        "Nowoczesny ślizg jednoprojektowy i klasyk klasy rozwojowej. Dwa równorzędne programy — każdy uczy czegoś innego.",
      five: {
        kicker: "POL 17",
        name: "International 5.5 Metre",
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
        kicker: "POL 17",
        name: "Cape 31",
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
      intro:
        "Od pierwszych startów do trzech kolejnych podiów mistrzostw świata: złoto (Porto Cervo 2023), brąz (Bénodet 2024) i srebro (Sopot 2025).",
      crewLabel: "Załoga",
      // Historic photograph — belongs to the era before Przemysław Gacek took the helm.
      photoAlt:
        "Załoga Aspire w klasie 5.5 Metre podczas regat, Mateusz Kusznierewicz za sterem",
      photoCaption:
        "Lata 2019–2022: Mateusz Kusznierewicz za sterem POL 17. Od 2023 roku ster w klasie 5.5 Metre przejął Przemysław Gacek.",
    },
    crewSection: {
      eyebrow: "Załoga",
      title: "Dwie łodzie, dwie załogi",
      intro:
        "Skład Aspire zmienia się w zależności od programu i regat. Poniżej aktualne załogi obu jachtów.",
      photoPending: "Zdjęcie zespołu w przygotowaniu",
      cape: {
        kicker: "Cape 31",
        title: "Załoga Cape 31",
        note: "Siedmioosobowy skład startowy.",
        // Nazwiska Juana, Jamesa i Tymka czekają na potwierdzenie od klienta.
        members: [
          { name: "Przemek Gacek", role: "" },
          { name: "Mateusz Kusznierewicz", role: "" },
          { name: "Igor Tarasiuk", role: "" },
          { name: "Paweł Gardasiewicz", role: "" },
          { name: "Juan", role: "" },
          { name: "James", role: "" },
          { name: "Tymek", role: "" },
        ],
      },
      five: {
        kicker: "International 5.5 Metre",
        title: "Załoga 5.5 Metre",
        note: "Trzyosobowa załoga.",
        members: [
          { name: "Przemek Gacek", role: "sternik" },
          { name: "Mateusz Kusznierewicz", role: "" },
          { name: "Kilian Weise", role: "" },
        ],
      },
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
      showPhoto: "Pokaż zdjęcie",
      hidePhoto: "Ukryj zdjęcie",
    },
    /**
     * Podpisy zdjęć z regat — zapis faktów.
     * UWAGA: Bénodet 2024 opisujemy wyłącznie jako „Bénodet 2024" z nazwą regat.
     * Puchar widoczny na zdjęciu należy do innej klasy, a wynik mistrzostw świata
     * to brąz. Dokładne brzmienie czeka na potwierdzenie klienta i nie wolno go
     * zmieniać na sugerujące zwycięstwo.
     */
    eventPhotos: {
      portoCervo2023: {
        alt: "Załoga Aspire z pucharem mistrzostw świata w Yacht Club Costa Smeralda, Porto Cervo",
        caption:
          "Porto Cervo 2023 — mistrzostwa świata klasy 5.5 Metre, złoto. Załoga z pucharem w Yacht Club Costa Smeralda.",
      },
      benodet2024: {
        alt: "Załoga Aspire z pucharem o zachodzie słońca w marinie w Bénodet",
        caption: "Bénodet 2024 — mistrzostwa świata klasy 5.5 Metre.",
      },
      sopot2025: {
        alt: "Załoga Aspire z tablicą za drugie miejsce podczas mistrzostw świata w Sopocie",
        caption:
          "Sopot 2025 — mistrzostwa świata klasy 5.5 Metre, srebro. Załoga z tablicą za drugie miejsce.",
      },
    },

    gacek: {
      eyebrow: "Sternik",
      name: "Przemysław Gacek",
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
      eyebrow: "Taktyk i współzałożyciel",
      name: "Mateusz Kusznierewicz",
      role: "Taktyk i współzałożyciel projektu Aspire · mistrz olimpijski",
      body1:
        "Jeden z najwybitniejszych żeglarzy w historii Polski. Złoto olimpijskie w klasie Finn w Atlancie 1996 — pierwsze olimpijskie złoto w dziejach polskiego żeglarstwa.",
      body2:
        "W Aspire pływa jako taktyk i współzałożyciel projektu, a na lądzie prowadzi programy mentoringowe i przywódcze zespołu.",
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
      eyebrow: "Partnerzy",
      title: "Partnerzy",
      intro: "Co daje partnerstwo z Aspire:",
      benefits: [
        {
          title: "Promocja marki",
          body: "w otoczeniu międzynarodowego, profesjonalnego żeglarstwa.",
        },
        {
          title: "Hospitality Days na wodzie",
          body: "dla pracowników, klientów i partnerów biznesowych.",
        },
        {
          title: "Spotkania z Mateuszem Kusznierewiczem",
          body: "mistrzem olimpijskim i współtwórcą Aspire.",
        },
      ],
      note: "Żeglarstwo łączy technologię, precyzję, pracę zespołową i decyzje podejmowane pod presją.",
      tierMain: "Sponsor główny",
      tierPartner: "Sponsor",
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
      tagline: "Polski zespół żeglarski",
      navLabel: "Nawigacja",
      contactLabel: "Kontakt",
      email: "kontakt@aspireteam.pl",
      social: "Media społecznościowe",
      rights: "Wszelkie prawa zastrzeżone.",
    },
  },

  en: {
    meta: {
      title: "Aspire Team — sailing at the highest level | Cape 31 & 5.5 Metre",
      description:
        "Aspire — a Polish sailing team competing internationally in the Cape 31 and the International 5.5 Metre classes.",
    },
    nav: {
      about: "About",
      boats: "The Boats",
      history: "History",
      results: "Results",
      
      crew: "Crew",
      partners: "Partners",
      contact: "Partner with us",
      menu: "Menu",
      close: "Close",
      langLabel: "Change language",
    },
    hero: {
      headline: "Sailing at the highest level",
      intro1:
        "Aspire is a Polish sailing team competing at international level in the Cape 31 and the International 5.5 Metre classes.",
      intro2:
        "The project brings together Mateusz Kusznierewicz, an Olympic champion, and Przemysław Gacek, an entrepreneur and founder of one of Europe's largest HR technology companies. We are building a team grounded in ambition, constant progress and learning from the very best.",
      scroll: "Scroll",
      cta: "Meet the team",
      bgAlt: "The Aspire yacht in action — aerial view of black sails and deep blue water",
    },
    about: {
      eyebrow: "About us",
      title: "To aspire — the name is the plan",
      lead: "Aspire is more than a team name. It is the idea the whole project runs on: aspiring, constant progress, curiosity about life, change and learning, and setting ourselves ever more ambitious goals.",
      movements: [
        {
          title: "Where two experiences meet",
          body: "The project brings two worlds together. Mateusz Kusznierewicz's world — Olympic-level sport sailing held to the highest standard — and Przemysław Gacek's, an entrepreneur who built one of Europe's largest HR technology companies. That collision of sport and business is the point of Aspire, not a footnote to it.",
        },
        {
          title: "An open, changing crew",
          body: "We invite other sailors to race with us — mainly Polish, though not exclusively. The line-up deliberately rotates, because learning from different people is the fastest way we develop. It is a conscious choice, not an inconsistency.",
        },
      ],

      stats: [
        { value: "1×", label: "World Champion", note: "2023" },
        { value: "1×", label: "European Champion", note: "2020" },
        {
          value: "3×",
          label: "Consecutive Worlds podiums",
          note: "gold, bronze, silver · 2023–2025",
        },
      ],
    },
    boats: {
      eyebrow: "The boats",
      title: "Two programmes, one philosophy",
      intro:
        "A modern one-design planing machine and a development-class classic. Two equal programmes — each teaches something different.",
      five: {
        kicker: "POL 17",
        name: "International 5.5 Metre",

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
        kicker: "POL 17",
        name: "Cape 31",
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
      intro:
        "From the first races to three consecutive Worlds podiums: gold (Porto Cervo 2023), bronze (Bénodet 2024) and silver (Sopot 2025).",
      crewLabel: "Crew",
      // Historic photograph — belongs to the era before Przemysław Gacek took the helm.
      photoAlt: "The Aspire 5.5 Metre crew racing, Mateusz Kusznierewicz on the helm",
      photoCaption:
        "2019–2022: Mateusz Kusznierewicz on the helm of POL 17. From 2023 Przemysław Gacek has steered the 5.5 Metre.",
    },
    crewSection: {
      eyebrow: "Crew",
      title: "Two boats, two crews",
      intro:
        "The Aspire line-up changes with the programme and the regatta. These are the current crews of both boats.",
      photoPending: "Team photograph coming soon",
      cape: {
        kicker: "Cape 31",
        title: "Cape 31 crew",
        note: "A seven-strong racing line-up.",
        // Surnames for Juan, James and Tymek are pending confirmation from the client.
        members: [
          { name: "Przemek Gacek", role: "" },
          { name: "Mateusz Kusznierewicz", role: "" },
          { name: "Igor Tarasiuk", role: "" },
          { name: "Paweł Gardasiewicz", role: "" },
          { name: "Juan", role: "" },
          { name: "James", role: "" },
          { name: "Tymek", role: "" },
        ],
      },
      five: {
        kicker: "International 5.5 Metre",
        title: "5.5 Metre crew",
        note: "A crew of three.",
        members: [
          { name: "Przemek Gacek", role: "helmsman" },
          { name: "Mateusz Kusznierewicz", role: "" },
          { name: "Kilian Weise", role: "" },
        ],
      },
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
      name: "Przemysław Gacek",
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
      eyebrow: "Tactician and co-founder",
      name: "Mateusz Kusznierewicz",
      role: "Tactician and co-founder of Aspire · Olympic champion",
      body1:
        "One of the greatest sailors Poland has produced. Olympic Gold in the Finn class at Atlanta 1996 — the first Olympic gold in the history of Polish sailing.",
      body2:
        "On Aspire he sails as tactician and co-founder of the project, and ashore he leads the team's mentoring and leadership work.",
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
      eyebrow: "Partners",
      title: "Partners",
      intro: "What a partnership with Aspire offers:",
      benefits: [
        {
          title: "Brand promotion",
          body: "in the world of international, professional sailing.",
        },
        {
          title: "Hospitality Days on the water",
          body: "for employees, clients and business partners.",
        },
        {
          title: "Sessions with Mateusz Kusznierewicz",
          body: "Olympic champion and co-founder of Aspire.",
        },
      ],
      note: "Sailing brings together technology, precision, teamwork and decision-making under pressure.",
      tierMain: "Main sponsor",
      tierPartner: "Sponsor",
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
      tagline: "Polish sailing team",
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
