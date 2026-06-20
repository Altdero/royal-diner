"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import { useOrders } from "@/src/hooks/useOrders";
import { useUpdateOrderStatus } from "@/src/hooks/useOrderMutations";
import { KitchenCard } from "./KitchenCard";

export function KitchenPage() {
  const { data: orders, isLoading } = useOrders("PENDING");
  const updateStatus = useUpdateOrderStatus();

  const handleMarkReady = (orderId: string) => {
    updateStatus.mutate({ orderId, status: "READY" });
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading kitchen orders"
        className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="animate-pulse rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="border-b border-stone-100 p-5">
              <div className="mb-2 h-3 w-24 rounded bg-slate-200" />
              <div className="h-5 w-36 rounded bg-slate-200" />
            </div>
            <div className="space-y-3 p-5">
              <div className="h-4 rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>
            <div className="border-t border-stone-100 p-5">
              <div className="h-10 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-400"
      >
        <FireIcon aria-hidden="true" className="size-12 opacity-40" />
        <p className="text-sm">No pending orders. Kitchen is clear!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <KitchenCard
            key={order.id}
            order={order}
            onMarkReady={handleMarkReady}
            isLoading={
              updateStatus.isPending &&
              updateStatus.variables?.orderId === order.id
            }
          />
        ))}
      </div>
    </div>
  );
}
