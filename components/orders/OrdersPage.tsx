"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useOrders } from "@/src/hooks/useOrders";
import { OrdersPanel, ordersPanelConfig } from "./OrdersPanel";

const TAB_KEYS = ["pending", "ready"] as const;
type TabKey = (typeof TAB_KEYS)[number];

export function OrdersPage() {
  const t = useTranslations("orders");
  const [activeTab, setActiveTab] = useState<TabKey>("pending");

  const { data: pendingOrders = [] } = useOrders("PENDING");
  const { data: readyOrders = [] } = useOrders("READY");

  const ordersByTab: Record<TabKey, typeof pendingOrders> = {
    pending: pendingOrders,
    ready: readyOrders,
  };

  const tabLabels: Record<TabKey, string> = {
    pending: t("panelPendingTitle"),
    ready: t("panelReadyTitle"),
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Mobile tab switcher */}
      <nav
        aria-label={t("tabNavAriaLabel")}
        className="flex shrink-0 lg:hidden"
      >
        {TAB_KEYS.map((key) => {
          const c = ordersPanelConfig[key];
          const Icon = c.icon;
          const isActive = activeTab === key;
          const count = ordersByTab[key].length;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? `${c.headerBg} ${c.headerBorder} border-t-0 border-b-0 ${c.titleColor}`
                  : "border-stone-200 bg-white text-stone-400 hover:text-stone-600"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
              {tabLabels[key]}
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white ${c.badgeBg}`}
              >
                {count}
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
            title={t("panelPendingTitle")}
            variant="pending"
            orders={pendingOrders}
          />
        </div>
        <div
          className={
            activeTab === "ready"
              ? "flex flex-1 lg:flex"
              : "hidden lg:flex lg:flex-1"
          }
        >
          <OrdersPanel
            title={t("panelReadyTitle")}
            variant="ready"
            orders={readyOrders}
          />
        </div>
      </div>
    </div>
  );
}
