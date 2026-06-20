"use client";

import { Button } from "@/components/ui/Button";
import type { OrderType } from "@/src/types";

interface KitchenCardProps {
  order: OrderType;
  onMarkReady: (orderId: string) => void;
  isLoading: boolean;
}

export function KitchenCard({
  order,
  onMarkReady,
  isLoading,
}: KitchenCardProps) {
  return (
    <article
      aria-label={`Order #${String(order.orderNumber).padStart(3, "0")}, ${order.clientName}`}
      className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-sm"
    >
      <header className="border-b border-stone-100 px-5 py-4">
        <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
          Order #{String(order.orderNumber).padStart(3, "0")}
        </span>
        <p className="mt-1 text-lg font-bold text-stone-900">
          {order.clientName}
        </p>
      </header>

      <ul className="flex-1 divide-y divide-stone-100 px-5 py-2">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-2.5"
          >
            <span className="text-sm text-stone-800">{item.product.name}</span>
            <span className="text-sm font-bold text-violet-700">
              ×{item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-stone-100 px-5 py-4">
        <Button
          onClick={() => onMarkReady(order.id)}
          isLoading={isLoading}
          disabled={isLoading}
          aria-label={`Mark order #${String(order.orderNumber).padStart(3, "0")} as ready`}
          className="flex w-full items-center justify-center gap-2"
        >
          {isLoading ? "Updating…" : "Mark as Ready"}
        </Button>
      </div>
    </article>
  );
}
