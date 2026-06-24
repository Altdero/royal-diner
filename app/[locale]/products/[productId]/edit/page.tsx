import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { ProductForm } from "@/components/products/ProductForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}): Promise<Metadata> {
  const { locale, productId } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { name: true },
  });
  return {
    title: product
      ? t("editProductTitle", { name: product.name })
      : t("newProductTitle"),
    description: t("editProductDescription"),
  };
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}) {
  const { locale, productId } = await params;
  setRequestLocale(locale);

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        categoryId: true,
        category: { select: { id: true, name: true } },
      },
    }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <ProductForm
        productId={productId}
        product={product}
        categories={categories}
      />
    </div>
  );
}
