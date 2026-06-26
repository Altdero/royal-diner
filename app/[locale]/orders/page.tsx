import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/src/lib/prisma";
import { OrdersPage } from "@/components/orders/OrdersPage";

const include = {
  items: {
    include: {
      product: { select: { id: true, name: true, image: true } },
    },
  },
};

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

  const [pendingOrders, readyOrders] = await Promise.all([
    prisma.order.findMany({
      where: { status: "PENDING" },
      include,
      orderBy: { createdAt: "asc" },
    }),
    prisma.order.findMany({
      where: { status: "READY" },
      include,
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <OrdersPage
      initialPendingOrders={JSON.parse(JSON.stringify(pendingOrders))}
      initialReadyOrders={JSON.parse(JSON.stringify(readyOrders))}
    />
  );
}
