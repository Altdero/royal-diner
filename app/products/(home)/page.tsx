import type { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import { ProductsTable } from "@/components/products/ProductsTable";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage the product catalog — add, edit, or remove items.",
};

export default async function ProductsPage() {
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
