"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { ProductType } from "@/src/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductType[];
  onAdd: (product: ProductType) => void;
  isLoading?: boolean;
}

export function ProductGrid({ products, onAdd, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl border border-stone-200 bg-white"
          >
            <div className="h-28 bg-slate-200 sm:h-32" />
            <div className="space-y-2 p-3">
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="mt-2 h-8 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-slate-400">
        <ShoppingBagIcon className="size-12 opacity-40" />
        <p className="text-sm">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
