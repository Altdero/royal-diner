import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { KitchenPage } from "@/components/kitchen/KitchenPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kitchen" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function KitchenRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <KitchenPage />;
}
