"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  MinusIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { CartItem } from "@/src/store/orderStore";
import { formatCurrency } from "@/src/lib/utils/formatCurrency";
import { getImagePath } from "@/src/lib/utils/getImagePath";

interface OrderItemProps {
  item: CartItem;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
}

export function OrderItem({ item, onUpdateQty, onRemove }: OrderItemProps) {
  const t = useTranslations("order.item");

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {item.image ? (
          <Image
            src={getImagePath(item.image)!}
            alt={item.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PhotoIcon aria-hidden="true" className="size-5 text-slate-300" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-stone-800">
          {item.name}
        </p>
        <p className="text-xs text-slate-400">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onUpdateQty(item.productId, item.quantity - 1)}
          aria-label={t("decreaseAriaLabel", { name: item.name })}
          className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600"
        >
          <MinusIcon aria-hidden="true" className="size-3" />
        </button>
        <span
          aria-live="polite"
          aria-atomic="true"
          className="w-4 text-center text-sm font-bold text-stone-800"
        >
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
          aria-label={t("increaseAriaLabel", { name: item.name })}
          className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition hover:bg-violet-100"
        >
          <PlusIcon aria-hidden="true" className="size-3" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-14 text-right text-sm font-bold text-stone-800">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          onClick={() => onRemove(item.productId)}
          aria-label={t("removeAriaLabel", { name: item.name })}
          className="cursor-pointer rounded-full p-0.5 text-slate-300 transition hover:bg-rose-50 hover:text-rose-400"
        >
          <XMarkIcon aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
