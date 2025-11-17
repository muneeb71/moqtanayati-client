"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import enCommon from "@/lib/i18n/en/common.json";
import arCommon from "@/lib/i18n/ar/common.json";

const TRANSLATIONS = {
  en: { common: enCommon },
  ar: { common: arCommon },
};

const DEFAULT_LOCALE = "en";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem("locale") : null;
      if (stored && (stored === "en" || stored === "ar")) {
        setLocale(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
      // Keep layout alignment LTR for all languages as requested
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [locale]);

  // Keep LTR regardless of locale
  const dir = "ltr";

  const t = useCallback(
    (key, ns = "common") => {
      const dict = TRANSLATIONS[locale]?.[ns] || {};
      return (
        key
          .split(".")
          .reduce(
            (acc, part) => (acc && acc[part] != null ? acc[part] : null),
            dict,
          ) ?? key
      );
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, dir, t }),
    [locale, dir, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
