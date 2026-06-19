"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import type { CategoryType } from "@/src/types";

const CATEGORY_ICONS: Record<string, string> = {
  Burgers: "/categories/Burgers-24x24.svg",
  Coffee: "/categories/Coffee-24x24.svg",
  Cookies: "/categories/Cookies-24x24.svg",
  Desserts: "/categories/Desserts-24x24.svg",
  Donuts: "/categories/Donuts-24x24.svg",
  Pizzas: "/categories/Pizzas-24x24.svg",
};

interface CategorySidebarProps {
  categories: CategoryType[];
  activeCategory: string | null;
  onCategoryChange: (id: string | null) => void;
}

function CategoryIcon({ iconSrc }: { iconSrc: string | null; name: string }) {
  if (iconSrc) {
    return (
      <Image
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0"
        unoptimized
      />
    );
  }
  return <Squares2X2Icon className="size-5 shrink-0" />;
}

export function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items = [
    { id: null as string | null, name: "All", iconSrc: null as string | null },
    ...categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      iconSrc: CATEGORY_ICONS[cat.name] ?? null,
    })),
  ];

  return (
    <>
      {/* Mobile: horizontal scrollable pills */}
      <div className="flex gap-2 overflow-x-auto border-b border-stone-200 bg-white px-4 py-3 lg:hidden">
        {items.map((item) => (
          <button
            key={item.id ?? "all"}
            onClick={() => onCategoryChange(item.id)}
            className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition duration-200 ${
              activeCategory === item.id
                ? "bg-violet-700 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
            }`}
          >
            {item.iconSrc && (
              <Image
                src={item.iconSrc}
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0"
                unoptimized
              />
            )}
            {item.name}
          </button>
        ))}
      </div>

      {/* Desktop: collapsible vertical sidebar */}
      <aside
        className={`hidden shrink-0 flex-col overflow-hidden border-r border-stone-200 bg-white transition-all duration-300 ease-in-out lg:flex ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        {/* Header */}
        <div
          className={`flex h-12 shrink-0 items-center border-b border-stone-100 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-between px-4"
          }`}
        >
          <span
            className={`overflow-hidden text-xs font-semibold tracking-widest whitespace-nowrap text-stone-400 uppercase transition-all duration-300 ${
              isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
            }`}
          >
            Menu
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand menu" : "Collapse menu"}
            className="cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="size-4" />
            ) : (
              <ChevronLeftIcon className="size-4" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5 p-2">
          {items.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id ?? "all"}
                onClick={() => onCategoryChange(item.id)}
                title={isCollapsed ? item.name : undefined}
                className={`relative flex cursor-pointer items-center gap-2 rounded-lg transition duration-150 ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-stone-600 hover:bg-slate-50 hover:text-stone-900"
                } ${isCollapsed ? "justify-center py-3" : "px-4 py-2.5"}`}
              >
                {isActive && !isCollapsed && (
                  <span className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-violet-700" />
                )}
                <CategoryIcon iconSrc={item.iconSrc} name={item.name} />
                <span
                  className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
