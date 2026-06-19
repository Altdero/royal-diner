"use client";

import { useEffect, useState } from "react";
import { useCategories } from "@/src/hooks/useCategories";
import { useCreateOrder } from "@/src/hooks/useOrderMutations";
import { useProducts } from "@/src/hooks/useProducts";
import { useOrderStore } from "@/src/store/orderStore";
import { CategorySidebar } from "./CategorySidebar";
import { OrderSummary } from "./OrderSummary";
import { ProductGrid } from "./ProductGrid";
import { ProductSearch } from "./ProductSearch";

export function OrderPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts({
    categoryId: activeCategory ?? undefined,
    search: debouncedSearch,
  });

  const {
    clientName,
    items,
    setClientName,
    addItem,
    updateQuantity,
    removeItem,
    clearOrder,
  } = useOrderStore();

  const createOrder = useCreateOrder();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    if (!clientName.trim() || items.length === 0) return;
    createOrder.mutate(
      {
        clientName,
        total,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      },
      { onSuccess: clearOrder }
    );
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
      <CategorySidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <ProductSearch search={search} onSearch={setSearch} />
        <ProductGrid
          products={products}
          isLoading={productsLoading}
          onAdd={addItem}
        />
      </main>
      <OrderSummary
        clientName={clientName}
        items={items}
        total={total}
        onClientNameChange={setClientName}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
        onSubmit={handleSubmit}
        isSubmitting={createOrder.isPending}
      />
    </div>
  );
}
