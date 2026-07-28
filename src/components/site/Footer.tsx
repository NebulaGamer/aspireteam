import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { NAV_ITEMS } from "./Header";

const SOCIALS = [
  { id: "instagram", href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
  { id: "facebook", href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
  { id: "linkedin", href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
  { id: "youtube", href: "https://youtube.com", Icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="section-dark section-abyss border-t border-border">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-2xl font-semibold tracking-[0.32em] text-parchment">
              ASPIRE
            </span>
            <span className="text-[0.65rem] tracking-[0.3em] text-gold">POL 17</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel">{t.footer.tagline}</p>
          <div className="hairline mt-8 max-w-xs" />
        </div>

        <nav aria-label={t.footer.navLabel}>
          <h2 className="eyebrow">{t.footer.navLabel}</h2>
          <ul className="mt-5 space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-sm text-silver transition-colors hover:text-gold"
                >
                  {t.nav[item.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{t.footer.contactLabel}</h2>
          <a
            href={`mailto:${t.footer.email}`}
            className="mt-5 inline-block text-sm text-silver transition-colors hover:text-gold"
          >
            {t.footer.email}
          </a>
          <h2 className="eyebrow mt-8">{t.footer.social}</h2>
          <ul className="mt-4 flex gap-4">
            {SOCIALS.map(({ id, href, Icon, label }) => (
              <li key={id}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center border border-parchment/20 text-silver transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aspire Team. {t.footer.rights}</p>
          <p className="tracking-[0.24em] text-gold/70">POL 17</p>
        </div>
      </div>
    </footer>
  );
}
