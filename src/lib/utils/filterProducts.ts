import type { ProductType } from "@/src/types";

export function filterProducts(
  products: ProductType[],
  name: string
): ProductType[] {
  if (!name) return products;
  const lower = name.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lower));
}

export function filteredProductsByCategory(
  products: ProductType[],
  name: string,
  categoryId: string | null
) {
  const filteredBySearch = filterProducts(products, name);

  if (!categoryId) return filteredBySearch;
  return filteredBySearch.filter((p) => p.categoryId === categoryId);
}
