"use client";

import { useTranslations } from "next-intl";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CartItem } from "@/src/store/orderStore";
import { formatCurrency } from "@/src/lib/utils/formatCurrency";
import { OrderItem } from "./OrderItem";

interface OrderSummaryProps {
  clientName: string;
  items: CartItem[];
  total: number;
  onClientNameChange: (name: string) => void;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function OrderSummary({
  clientName,
  items,
  total,
  onClientNameChange,
  onUpdateQty,
  onRemove,
  onSubmit,
  isSubmitting,
}: OrderSummaryProps) {
  const t = useTranslations("order.summary");
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <aside
      aria-label={t("asideAriaLabel")}
      className="flex max-h-100 flex-col border-t border-stone-200 bg-white lg:max-h-none lg:w-80 lg:shrink-0 lg:border-t-0 lg:border-l"
    >
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
        <h2 className="font-bold text-stone-900">{t("heading")}</h2>
        {itemCount > 0 && (
          <span
            aria-label={t("itemCountAriaLabel", { count: itemCount })}
            className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-700 px-1.5 text-xs font-bold text-white"
          >
            {itemCount}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5">
        <Input
          label={t("customerNameLabel")}
          id="clientName"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          placeholder={t("customerNamePlaceholder")}
        />

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-300">
            <ShoppingCartIcon aria-hidden="true" className="size-12" />
            <p className="text-sm text-slate-400">{t("emptyCart")}</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {items.map((item) => (
              <OrderItem
                key={item.productId}
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-stone-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-500">
            {t("totalLabel")}
          </span>
          <span className="text-xl font-bold text-stone-900">
            {formatCurrency(total)}
          </span>
        </div>
        <Button
          className="w-full"
          onClick={onSubmit}
          isLoading={isSubmitting}
          disabled={isSubmitting || items.length === 0 || !clientName.trim()}
        >
          {isSubmitting ? t("placingOrder") : t("placeOrder")}
        </Button>
      </div>
    </aside>
  );
}
