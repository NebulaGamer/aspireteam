import { Link, useRouterState } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { NAV_ITEMS, navHref } from "./Header";
import { AspireLockup } from "@/components/site/AspireLogo";


export function Footer() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  return (
    <footer className="section-dark section-abyss border-t border-border">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-4">
            <AspireLockup className="h-7 w-auto text-parchment" />
            <span className="sr-only">ASPIRE</span>
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
                  href={navHref(item.href, onHome)}
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
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            {/*
              Obscurity, not security: anyone can type /admin. The real protection is
              the RLS policies on the database plus the auth + role check in the panel.
            */}
            <Link
              to="/admin"
              aria-label="Panel"
              rel="nofollow"
              className="transition-colors duration-500 hover:text-steel/70"
            >
              ©
            </Link>{" "}
            {new Date().getFullYear()} Aspire Team. {t.footer.rights}
          </p>
          
        </div>
      </div>
    </footer>
  );
}
