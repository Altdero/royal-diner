"use client";

import { useState } from "react";
import type { OrderType } from "@/src/types";
import { OrdersPanel, ordersPanelConfig } from "./OrdersPanel";

const MOCK_PENDING: OrderType[] = [
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

const MOCK_READY: OrderType[] = [
  {
    id: "3",
    orderNumber: 3,
    clientName: "Carol",
    total: 9,
    status: "READY",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "i5",
        orderId: "3",
        productId: "p5",
        quantity: 3,
        subtotal: 9,
        product: { id: "p5", name: "Donut", image: null },
      },
    ],
  },
];

const TABS = [
  { key: "pending", label: "To Prepare", orders: MOCK_PENDING },
  { key: "ready", label: "Ready", orders: MOCK_READY },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("pending");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Mobile tab switcher */}
      <nav aria-label="Order panels" className="flex shrink-0 lg:hidden">
        {TABS.map((tab) => {
          const c = ordersPanelConfig[tab.key];
          const Icon = c.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? `${c.headerBg} ${c.headerBorder} border-t-0 border-b-0 ${c.titleColor}`
                  : "border-stone-200 bg-white text-stone-400 hover:text-stone-600"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
              {tab.label}
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white ${c.badgeBg}`}
              >
                {tab.orders.length}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Panels */}
      <div className="flex flex-1 gap-4 overflow-hidden p-4 lg:gap-6 lg:p-6">
        <div
          className={
            activeTab === "pending"
              ? "flex flex-1 lg:flex"
              : "hidden lg:flex lg:flex-1"
          }
        >
          <OrdersPanel
            title="To Prepare"
            variant="pending"
            orders={MOCK_PENDING}
          />
        </div>
        <div
          className={
            activeTab === "ready"
              ? "flex flex-1 lg:flex"
              : "hidden lg:flex lg:flex-1"
          }
        >
          <OrdersPanel title="Ready" variant="ready" orders={MOCK_READY} />
        </div>
      </div>
    </div>
  );
}
