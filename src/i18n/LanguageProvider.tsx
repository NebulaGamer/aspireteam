import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Dictionary, type Language } from "./translations";

const STORAGE_KEY = "aspire-lang";
const DEFAULT_LANGUAGE: Language = "pl";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  // Restore the remembered choice after hydration (avoids SSR mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pl" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — language still switches for the session */
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] as unknown as Dictionary }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
