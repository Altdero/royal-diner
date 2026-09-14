"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common.languages");
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <select
      id="localeSwitcher"
      value={currentLocale}
      onChange={(e) => handleChange(e.target.value)}
      aria-label={t("switchLanguage")}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-stone-600 capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {tc(locale)}
        </option>
      ))}
    </select>
  );
}
