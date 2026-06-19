"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ProductSearchProps {
  search: string;
  onSearch: (value: string) => void;
}

export function ProductSearch({ search, onSearch }: ProductSearchProps) {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products…"
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-4 pl-9 text-stone-900 transition duration-200 outline-none placeholder:text-stone-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
}
