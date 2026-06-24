import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OrdersPage } from "@/components/orders/OrdersPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "orders" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function OrdersRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <OrdersPage />;
}
