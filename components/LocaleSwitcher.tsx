"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  es: "ES",
  pt: "PT",
  fr: "FR",
};

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value)}
      aria-label={t("switchLanguage")}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-stone-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {localeLabels[locale]}
        </option>
      ))}
    </select>
  );
}
