"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div role="search" className="relative flex-1 md:max-w-100">
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        aria-label="Search products"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-8 pl-9 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
        >
          <XMarkIcon aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  );
}
