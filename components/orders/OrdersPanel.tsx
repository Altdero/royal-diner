"use client";

import { ArchiveBoxIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { OrderType } from "@/src/types";
import { OrderCard } from "./OrderCard";

interface OrdersPanelProps {
  title: string;
  variant: "pending" | "ready";
  orders: OrderType[];
}

const config = {
  pending: {
    icon: ArchiveBoxIcon,
    headerBg: "bg-amber-50",
    headerBorder: "border-amber-200",
    titleColor: "text-amber-700",
    badgeBg: "bg-amber-400",
    emptyIcon: "text-amber-300",
    emptyText: "No orders to prepare",
    borderColor: "border-amber-200",
  },
  ready: {
    icon: CheckCircleIcon,
    headerBg: "bg-emerald-50",
    headerBorder: "border-emerald-200",
    titleColor: "text-emerald-700",
    badgeBg: "bg-emerald-400",
    emptyIcon: "text-emerald-300",
    emptyText: "No orders ready yet",
    borderColor: "border-emerald-200",
  },
};

export { config as ordersPanelConfig };

export function OrdersPanel({ title, variant, orders }: OrdersPanelProps) {
  const c = config[variant];
  const Icon = c.icon;

  return (
    <section
      aria-label={title}
      className={`flex flex-1 flex-col overflow-hidden rounded-2xl border ${c.borderColor} bg-white shadow-sm`}
    >
      {/* Hidden on mobile — info lives in the tab bar */}
      <header
        className={`hidden shrink-0 items-center gap-3 border-b ${c.headerBorder} ${c.headerBg} px-5 py-4 lg:flex`}
      >
        <Icon aria-hidden="true" className={`size-5 ${c.titleColor}`} />
        <h2
          className={`flex-1 text-sm font-bold tracking-widest uppercase ${c.titleColor}`}
        >
          {title}
        </h2>
        <span
          aria-label={`${orders.length} orders`}
          className={`flex h-6 min-w-6 items-center justify-center rounded-full ${c.badgeBg} px-2 text-xs font-bold text-white`}
        >
          {orders.length}
        </span>
      </header>

      {orders.length === 0 ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center"
        >
          <Icon
            aria-hidden="true"
            className={`size-10 opacity-30 ${c.emptyIcon}`}
          />
          <p className="text-sm text-stone-400">{c.emptyText}</p>
        </div>
      ) : (
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} variant={variant} />
          ))}
        </div>
      )}
    </section>
  );
}
