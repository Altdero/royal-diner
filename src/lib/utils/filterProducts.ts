import type { ProductType } from "@/src/types";

export function filterProducts(
  products: ProductType[],
  search: string
): ProductType[] {
  if (!search) return products;
  const lower = search.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lower));
}
