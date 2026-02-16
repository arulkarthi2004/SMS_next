"use client";

import { useLanguage, type Language } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-switcher" className="sr-only">
        {t("header.language")}
      </label>
      <select
        id="language-switcher"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        <option value="en">{t("header.english")}</option>
        <option value="ja">{t("header.japanese")}</option>
      </select>
    </div>
  );
}
