import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/src/lib/prisma";
import { ProductsTable } from "@/components/products/ProductsTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("pageTitle"), description: t("pageDescription") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      categoryId: true,
      category: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ProductsTable products={products} />
    </div>
  );
}
