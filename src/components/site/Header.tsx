import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Language } from "@/i18n/translations";

export const NAV_ITEMS = [
  { id: "about", href: "#about" },
  { id: "boats", href: "#boats" },
  { id: "history", href: "#history" },
  { id: "results", href: "#results" },
  { id: "crew", href: "#crew" },
  
  { id: "partners", href: "#partners" },
] as const;

export function Header() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLabel = (id: (typeof NAV_ITEMS)[number]["id"]) => t.nav[id];

  return (
    <header
      className={`section-dark fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || open
          ? "border-b border-border bg-ocean/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold tracking-[0.32em] text-parchment">
            ASPIRE
          </span>
          <span className="hidden whitespace-nowrap text-[0.625rem] font-medium tracking-[0.3em] text-gold sm:inline">
            POL 17
          </span>
        </a>

        <nav aria-label={t.nav.menu} className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="relative whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.18em] text-silver transition-colors hover:text-gold"
            >
              {navLabel(item.id)}
            </a>
          ))}
          <a
            href="#contact"
            className="whitespace-nowrap border border-gold/60 px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {t.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <LangToggle lang={lang} setLang={setLang} label={t.nav.langLabel} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            className="text-parchment transition-colors hover:text-gold lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label={t.nav.menu}
          className="section-dark border-t border-border bg-ocean/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="shell flex flex-col py-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-4 text-sm uppercase tracking-[0.2em] text-silver transition-colors hover:text-gold"
                >
                  {navLabel(item.id)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 block border border-gold/60 py-3.5 text-center text-sm uppercase tracking-[0.2em] text-gold"
              >
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function LangToggle({
  lang,
  setLang,
  label,
}: {
  lang: Language;
  setLang: (l: Language) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center border border-parchment/25 text-[0.65rem] font-medium uppercase tracking-[0.2em]"
    >
      {(["pl", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1.5 transition-colors ${
            lang === code ? "bg-gold text-abyss" : "text-silver hover:text-gold"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
