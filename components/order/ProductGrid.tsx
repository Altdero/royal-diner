"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { ProductType } from "@/src/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductType[];
  onAdd: (product: ProductType) => void;
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
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
