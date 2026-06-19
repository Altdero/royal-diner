"use client";

import Image from "next/image";
import { PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { ProductType } from "@/src/types";
import { formatCurrency } from "@/src/lib/utils/formatCurrency";
import { getImagePath } from "@/src/lib/utils/getImagePath";

interface ProductCardProps {
  product: ProductType;
  onAdd: (product: ProductType) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <button
      onClick={() => onAdd(product)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm transition duration-200 hover:border-violet-300 hover:shadow-md active:scale-[0.98]"
    >
      <div className="relative h-28 shrink-0 bg-slate-100 sm:h-32">
        {product.image ? (
          <Image
            src={getImagePath(product.image)}
            alt={product.name}
            fill
            sizes="auto"
            loading="eager"
            className="object-cover transition duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PhotoIcon className="size-10 text-slate-300" />
          </div>
        )}
        <div className="absolute right-2 bottom-2 flex size-7 items-center justify-center rounded-full bg-violet-700 text-white opacity-0 shadow-md transition duration-200 group-hover:opacity-100">
          <PlusIcon className="size-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-0.5 p-3">
        <p className="line-clamp-2 text-sm leading-snug font-semibold text-stone-800">
          {product.name}
        </p>
        <p className="mt-1 text-sm font-bold text-violet-700">
          {formatCurrency(product.price)}
        </p>
      </div>
    </button>
  );
}
