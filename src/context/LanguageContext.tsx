"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";

type Dictionary = typeof en;

const dictionaries = {
  en,
  ja,
} as const;

export type Language = keyof typeof dictionaries;

type Primitive = string | number | boolean | null;
type DotNestedKeys<T> = T extends Primitive
  ? ""
  : {
      [K in keyof T & string]: T[K] extends Primitive
        ? K
        : `${K}` | `${K}.${DotNestedKeys<T[K]>}`;
    }[keyof T & string];

export type TranslationKey = DotNestedKeys<Dictionary>;

type TranslateFn = (key: TranslationKey) => string;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslateFn;
}

const STORAGE_KEY = "app-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getValueByPath = (obj: Dictionary, path: string): string | undefined => {
  const value = path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);

  return typeof value === "string" ? value : undefined;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ja") {
      window.setTimeout(() => {
        setLanguageState(stored);
      }, 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }, []);

  const dictionary = useMemo(() => dictionaries[language], [language]);

  const t = useCallback<TranslateFn>(
    (key) => {
      return getValueByPath(dictionary, key) ?? key;
    },
    [dictionary]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
