"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CategoryType } from "@/src/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const MOCK_CATEGORIES: CategoryType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Burgers" },
  { id: "3", name: "Pizzas" },
  { id: "4", name: "Donuts" },
  { id: "5", name: "Desserts" },
  { id: "6", name: "Cookies" },
];

interface ProductFormProps {
  title: string;
}

export function ProductForm({ title }: ProductFormProps) {
  const categories = MOCK_CATEGORIES;

  return (
    <div className="mx-auto w-full max-w-lg p-6">
      <div className="mb-6 w-full">
        <h1 className="text-center text-2xl font-bold text-stone-900">
          {title}
        </h1>
        <nav className="my-5 flex">
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm text-stone-500 transition duration-200 hover:text-violet-700"
          >
            <ArrowLeftIcon className="size-4" /> Products
          </Link>
        </nav>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form className="space-y-5">
          <Input id="name" label="Name" placeholder="e.g. Espresso" />

          <Input
            id="price"
            label="Unit Price"
            type="number"
            placeholder="0.00"
            min={0}
            step={0.01}
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryId"
              className="text-sm font-medium text-stone-700"
            >
              Category
            </label>
            <select
              id="categoryId"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-stone-900 transition duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            id="image"
            label="Image"
            placeholder="filename.jpg or Cloudinary URL"
          />

          <div className="flex justify-center gap-3 pt-2">
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link
              href="/products"
              className="rounded-lg border border-slate-400 bg-slate-50 px-4 py-2.5 text-base font-semibold text-slate-400 uppercase transition duration-300 hover:border-slate-500 hover:text-slate-500"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
