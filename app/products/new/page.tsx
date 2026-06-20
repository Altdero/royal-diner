import type { Metadata } from "next";
import { prisma } from "@/src/lib/prisma";
import { ProductForm } from "@/components/products/ProductForm";

export const metadata: Metadata = {
  title: "New Product",
  description: "Add a new product to the catalog.",
};

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto w-full max-w-3xl">
      <ProductForm title="New Product" categories={categories} />
    </div>
  );
}
