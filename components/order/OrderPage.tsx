"use client";

import { useState } from "react";
import type { CategoryType, ProductType } from "@/src/types";
import { CategorySidebar } from "./CategorySidebar";
import { OrderSummary } from "./OrderSummary";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";

export function OrderPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const categories: CategoryType[] = [];
  const products: ProductType[] = [];

  return (
    <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
      <CategorySidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <ProductSearch search={search} onSearch={setSearch} />
        <ProductGrid products={products} onAdd={() => {}} />
      </main>
      <OrderSummary
        clientName=""
        items={[]}
        total={0}
        onClientNameChange={() => {}}
        onUpdateQty={() => {}}
        onRemove={() => {}}
        onSubmit={() => {}}
        isSubmitting={false}
      />
    </div>
  );
}
