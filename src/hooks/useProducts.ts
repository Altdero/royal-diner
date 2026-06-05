"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "@/src/types";

interface ProductsFilters {
  categoryId?: string;
  search?: string;
}

async function fetchProducts(filters: ProductsFilters): Promise<ProductType[]> {
  const params = new URLSearchParams();
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.search) params.set("search", filters.search);

  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function fetchProduct(productId: string): Promise<ProductType> {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export function useProducts(filters: ProductsFilters = {}) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });
}
