"use client";

import type { OrderType } from "@/src/types";

interface OrderCardProps {
  order: OrderType;
  variant: "pending" | "ready";
}

export function OrderCard({ order, variant }: OrderCardProps) {
  const accent =
    variant === "pending"
      ? "border-l-amber-400 bg-amber-50/40"
      : "border-l-emerald-400 bg-emerald-50/40";

  return (
    <article
      aria-label={`Order #${String(order.orderNumber).padStart(3, "0")}, ${order.clientName}`}
      className={`rounded-xl border border-l-4 border-stone-200 bg-white p-4 shadow-sm ${accent}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
          #{String(order.orderNumber).padStart(3, "0")}
        </span>
        <span className="text-right text-sm leading-tight font-bold text-stone-900">
          {order.clientName}
        </span>
      </div>

      <ul className="divide-y divide-stone-100">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-1.5"
          >
            <span className="text-sm text-stone-700">{item.product.name}</span>
            <span
              className={`text-sm font-bold ${variant === "pending" ? "text-amber-600" : "text-emerald-600"}`}
            >
              ×{item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
