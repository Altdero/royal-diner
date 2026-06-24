import { getLocale, getTranslations } from "next-intl/server";
import { NavLinks } from "@/components/NavLinks";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export async function Nav() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <nav
      aria-label={t("ariaLabel")}
      className="border-b border-slate-200 bg-white"
    >
      <div className="flex h-14 items-center justify-between px-6">
        <span className="text-lg font-bold text-violet-700">
          {t("brandName")}
        </span>
        <div className="flex items-center gap-3">
          <NavLinks />
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </nav>
  );
}
