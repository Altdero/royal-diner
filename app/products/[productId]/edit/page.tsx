import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { ProductForm } from "@/components/products/ProductForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { name: true },
  });
  return {
    title: product ? `Edit ${product.name}` : "Edit Product",
    description: product
      ? `Edit the details for ${product.name}.`
      : "Edit a product in the catalog.",
  };
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

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
        title="Edit Product"
        productId={productId}
        product={product}
        categories={categories}
      />
    </div>
  );
}
