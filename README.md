# Aspire Sailing

Build a premium, editorial one-page website for **Aspire Team** — a Polish competitive sailing team (sail number POL 17) racing an International 5.5 Metre and a Cape 31.

## Visual direction — this is the most important part
Think *world-class sailing team meets luxury watch brand*. Not a generic startup landing page.

- **Palette:** deep navy / near-black ocean (#0A1628, #050B14) as the base, crisp off-white (#F5F2EC), and a restrained champagne-gold accent (#C9A227) used sparingly for medals, numbers and dividers. Cool steel-blue for secondary text.
- **Type:** a high-contrast editorial serif for display headings (e.g. Playfair Display or Fraunces) paired with a clean geometric sans for body (e.g. Inter or Satoshi). Large, confident headings. Generous letter-spacing on small uppercase eyebrow labels.
- **Layout:** full-bleed cinematic image sections alternating with generously white-spaced editorial text blocks. Wide margins. Big numbers. Thin gold hairline rules.
- **Motion:** tasteful scroll-reveal fade-and-rise on section entry, subtle parallax on full-bleed hero images, a slow ken-burns zoom on the hero. Nothing bouncy or playful. Smooth and expensive-feeling.
- Dark sections and light sections should alternate for rhythm.

## Imagery
The client will supply real photography of both boats shortly. For now, generate high-quality cinematic sailing imagery as placeholders: a 5.5 Metre keelboat heeled over upwind in strong breeze with spray, a Cape 31 planing downwind under a big spinnaker, crew hiking, close detail shots of deck hardware, sails and a gold trophy. Moody, high-contrast, cool blue-grey ocean tones. Build every image as an easily swappable component with a clearly named constant at the top of the file, so photos can be replaced later without touching layout.

## Bilingual — Polish / English
The whole site must switch between **Polish and English** with a small PL / EN toggle in the header. Use a single translations file (a typed object keyed by section) plus React context, so both languages live side by side and are trivial to edit. Default to Polish, remember the choice. Every single string on the page — nav, headings, body, buttons, form labels, form validation messages, footer — must be translated. Write natural, native-quality Polish, not machine translation.

## Sections, in order

**1. Hero** — full-screen, full-bleed. "ASPIRE" in large display type, tagline "Mistrzowie świata w klasie 5.5 Metre" / "5.5 Metre World Champions". Sail number POL 17 shown as a small gold detail. Subtle scroll cue.

**2. About Us / O nas** — Aspire is a Polish sailing team competing at the highest international level in the International 5.5 Metre class and the Cape 31. Combining an Olympic champion's experience with an entrepreneur's drive, the team races across Europe and became the first Polish crew ever to win the 5.5 Metre World Championship. Include three headline stat cards: **1× World Champion (2023)**, **1× European Champion (2020)**, **3 consecutive Worlds podiums (2023–2025)**.

**3. The Boats / Jachty** — the visual centrepiece. Two large alternating full-bleed feature blocks with an elegant spec panel over each:

*International 5.5 Metre "Aspire" (POL 17)* — a Wilke hull built in Switzerland. A classic Olympic-era class (Olympic from 1952 to 1968) that today is a modern development class where design innovation still matters. LOA approx. 9.5 m, crew of three. Elegant, narrow, powerful. Emphasise the blend of heritage and cutting-edge development.

*Cape 31* — a lightweight, high-performance 31-foot one-design planing keelboat, acquired by the team in 2023 to broaden the programme and sharpen boat-handling. Fast, physical, asymmetric spinnaker, huge downwind speed. Emphasise adrenaline and one-design purity.

Add a small side-by-side comparison strip: length, crew, class type, discipline.

**4. History / Historia** — a vertical timeline with gold markers, alternating left/right:
- **2019–2020** — the team forms and enters the International 5.5 Metre class.
- **2020** — Wins the 5.5 Metre European Championship in Sanremo, Italy. Crew: Mateusz Kusznierewicz, Przemysław Gacek, Simon Fry.
- **2023** — Grupa Pracuj becomes patron of the Aspire project.
- **2023** — Wins the 5.5 Metre Alpen Cup at Torbole, Lake Garda.
- **2023** — Acquires a Cape 31, beginning a two-boat programme and Przemysław Gacek's transition to the helm.
- **2023** — **World Champions.** Wins the 5.5 Metre World Championship at Yacht Club Costa Smeralda, Porto Cervo, Sardinia — the first 5.5 Metre world title in Polish history. Crew: Mateusz Kusznierewicz, Przemysław Gacek, Edward Wright.
- **2024** — Bronze at the 5.5 Metre World Championship in Bénodet, France — Gacek's first Worlds as helmsman.
- **2025** — Silver at the 5.5 Metre World Championship in Sopot, Poland. Aspire also helped organise the event, bringing the class to Poland for the first time. Crew: Przemysław Gacek, Mateusz Kusznierewicz, Kilian Weise.

**5. Competition Results / Wyniki** — a refined results table with gold/silver/bronze medal indicators. Rows: 2025 5.5 Metre World Championship, Sopot POL — 2nd. 2024 5.5 Metre World Championship, Bénodet FRA — 3rd. 2023 5.5 Metre World Championship, Porto Cervo ITA — 1st. 2023 5.5 Metre Alpen Cup, Torbole ITA — 1st. 2020 5.5 Metre European Championship, Sanremo ITA — 1st. Add filter chips for class and year. Make the data a clean array in one file so rows are easy to add.

**6. Przemysław "Przemek" Gacek** — full-height split layout, portrait one side, editorial text the other. Helmsman of Aspire. Co-founder and CEO of Grupa Pracuj, the leading HR-tech group in Central Europe (Pracuj.pl, Rabota.ua), which he has led for over two decades. A childhood sailing passion rediscovered later in life and pursued to the very top: he took the helm of Aspire and within a year led the team to a World Championship bronze, then silver the following year. Pull-quote: *"Nigdy nie przypuszczałem, że zostanę sportowcem, a tym bardziej że stanę na podium i usłyszę hymn Polski."* — with the English translation shown in EN mode.

**7. Mateusz Kusznierewicz** — mirrored split layout. One of the greatest sailors Poland has produced. Olympic Gold, Finn class, Atlanta 1996 — the first Olympic gold in the history of Polish sailing. Olympic Bronze, Finn class, Athens 2004. ISAF World Sailor of the Year 1999. Finn Gold Cup World Champion. Star World Champion with Dominik Życki — the first Polish crew to win it. Bacardi Cup winner. Olympian at London 2012. On Aspire he sails as tactician and mentor, and leads the team's mentoring and leadership work ashore. Show his honours as an elegant medal/award row with gold accents.

**8. Supporting Young People / Wspieramy młodych** — warm, optimistic, slightly lighter section. Aspire believes the value of a sailing programme is measured by what it passes on. The team supports young Polish sailors on the path from youth classes to international competition — mentoring, access to training with world-class crew, and using the team's boats as a learning platform. Ashore, Mateusz Kusznierewicz leads mentoring, teamwork and leadership programmes that translate lessons from Olympic sport into everyday performance. Bringing the 2025 World Championship to Sopot put world-class racing directly in front of a new generation of Polish sailors. Present as three or four cards: Mentoring, Training & Access, Leadership Programmes, Inspiring the Next Generation. Add a short editor's note comment in the code marking this copy as ready for the client to refine with specific programme names.

**9. Sponsors & Partners / Sponsorzy i Partnerzy** — an elegant partner wall. Grupa Pracuj is the team's title patron since 2023 — give it a prominent lead position with a short line about the partnership including team-building and mentoring sailing sessions for employees aboard the yacht. Below, a tidy grid of neutral placeholder logo tiles with a clear comment showing how to add more partners. Understated, no clutter.

**10. Partner With Us / Zostań Partnerem** — dark, confident closing section aimed at companies. A short pitch: partnering with Aspire means association with world-championship performance, a platform for client hospitality on the water, and genuine team-building and leadership development led by an Olympic champion. Then a partnership enquiry form: company name, contact person, email, phone (optional), area of interest (select: sponsorship / hospitality & regatta days / team-building & mentoring / media collaboration / other), and message. Proper client-side validation with translated error messages, a clear loading state, and an elegant success confirmation. For now have it submit to a stubbed handler — I will wire it to the database and email in the next step, so structure the submit function so that is a clean swap.

**11. Footer** — logo, sail number POL 17, nav links, social icons, contact email placeholder, copyright.

## Also
- Sticky header that turns from transparent to frosted navy on scroll, with smooth-scroll anchor nav and the PL/EN toggle.
- Fully responsive and genuinely excellent on mobile — full-bleed images must not break, timeline collapses to a single column, results table becomes cards.
- Accessible: semantic landmarks, alt text on every image in both languages, visible focus states, sufficient contrast.
- Proper page title, meta description and Open Graph tags in both languages.
- Keep all content data (results, timeline, partners, translations) in clearly named separate files so it is easy to update later.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aspireteam.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a1cbcd8e-f84f-499e-ac53-571e4f0f7af6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
