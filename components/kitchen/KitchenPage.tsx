"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import type { OrderType } from "@/src/types";
import { KitchenCard } from "./KitchenCard";

const MOCK_ORDERS: OrderType[] = [
  {
    id: "1",
    orderNumber: 1,
    clientName: "Alice",
    total: 14.5,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "i1",
        orderId: "1",
        productId: "p1",
        quantity: 2,
        subtotal: 7,
        product: { id: "p1", name: "Espresso", image: null },
      },
      {
        id: "i2",
        orderId: "1",
        productId: "p2",
        quantity: 1,
        subtotal: 7.5,
        product: { id: "p2", name: "Croissant", image: null },
      },
    ],
  },
  {
    id: "2",
    orderNumber: 2,
    clientName: "Bob",
    total: 22,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "i3",
        orderId: "2",
        productId: "p3",
        quantity: 1,
        subtotal: 12,
        product: { id: "p3", name: "Burger", image: null },
      },
      {
        id: "i4",
        orderId: "2",
        productId: "p4",
        quantity: 2,
        subtotal: 10,
        product: { id: "p4", name: "Cappuccino", image: null },
      },
    ],
  },
];

export function KitchenPage() {
  const orders = MOCK_ORDERS;

  const handleMarkReady = () => {};

  if (orders.length === 0) {
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
            isLoading={false}
          />
        ))}
      </div>
    </div>
  );
}
