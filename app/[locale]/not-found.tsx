import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t("notFound404")}</h1>
      <p className="text-zinc-500">{t("pageNotFound")}</p>
      <Link href="/orders" className="text-sm underline">
        {t("goToOrders")}
      </Link>
    </div>
  );
}
