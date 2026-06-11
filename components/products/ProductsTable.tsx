"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/src/lib/utils/formatCurrency";
import { getImagePath } from "@/src/lib/utils/getImagePath";
import type { ProductType } from "@/src/types";

const MOCK_PRODUCTS: ProductType[] = [
  {
    id: "1",
    name: "Espresso",
    price: 2.99,
    image: "espresso.jpg",
    categoryId: "1",
    category: { id: "1", name: "Coffee" },
  },
  {
    id: "2",
    name: "Classic Burger",
    price: 8.99,
    image: "classic_burger.jpg",
    categoryId: "2",
    category: { id: "2", name: "Burgers" },
  },
  {
    id: "3",
    name: "House Special Pizza",
    price: 13.99,
    image: "house_special_pizza.jpg",
    categoryId: "3",
    category: { id: "3", name: "Pizzas" },
  },
  {
    id: "4",
    name: "Strawberry Donut",
    price: 2.99,
    image: "strawberry_donut.jpg",
    categoryId: "4",
    category: { id: "4", name: "Donuts" },
  },
  {
    id: "5",
    name: "Chocolate Cake",
    price: 4.99,
    image: "chocolate_cake.jpg",
    categoryId: "5",
    category: { id: "5", name: "Desserts" },
  },
];

export function ProductsTable() {
  const products = MOCK_PRODUCTS;

  return (
    <div className="w-full p-6">
      <div className="mb-6 w-full">
        <h1 className="text-center text-2xl font-bold text-stone-900">
          Products
        </h1>
        <nav className="my-5 flex justify-end">
          <Link
            href="/products/new"
            className="rounded-lg border border-violet-700 bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white uppercase transition duration-300 hover:bg-violet-800"
          >
            New Product
          </Link>
        </nav>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full overflow-hidden text-sm not-md:min-w-3xl">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase">
            <tr>
              <th className="w-14 px-4 py-3" />
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="w-20 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors duration-150 hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <Image
                    src={getImagePath(product.image)}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-stone-900">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {product.category.name}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="rounded-lg border border-slate-400 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase transition duration-300 hover:border-slate-500 hover:text-slate-500"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
