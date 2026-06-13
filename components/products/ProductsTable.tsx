"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useDeleteProduct } from "@/src/hooks/useProductMutations";
import { formatCurrency } from "@/src/lib/utils/formatCurrency";
import { getImagePath } from "@/src/lib/utils/getImagePath";
import type { ProductType } from "@/src/types";
import { filterProducts } from "@/src/lib/utils/filterProducts";
import { ProductSearch } from "./ProductSearch";

interface ProductsTableProps {
  products: ProductType[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const deleteProduct = useDeleteProduct();
  const [toDelete, setToDelete] = useState<ProductType | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const filtered = filterProducts(products, debouncedSearch);

  const handleConfirmDelete = () => {
    if (!toDelete) return;
    deleteProduct.mutate(toDelete.id, {
      onSuccess: () => {
        setToDelete(null);
        router.refresh();
      },
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden p-4 md:mx-auto md:w-fit md:min-w-212.5">
      <div className="mb-6">
        <h1 className="text-center text-2xl font-bold text-stone-900">
          Products
        </h1>
        <nav className="my-5 flex items-center justify-between gap-3">
          <ProductSearch value={search} onChange={setSearch} />
          <Link
            href="/products/new"
            className="shrink-0 rounded-lg border border-violet-700 bg-violet-700 px-3 py-1.5 text-sm font-semibold text-white uppercase transition duration-300 hover:bg-violet-800"
          >
            New Product
          </Link>
        </nav>
      </div>

      <div className="overflow-x-auto overflow-y-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold tracking-wide text-stone-500 uppercase">
            <tr>
              <th className="w-14 px-4 py-3" />
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Unit Price</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-stone-400"
                >
                  {debouncedSearch ? (
                    <>No products match &ldquo;{debouncedSearch}&rdquo;.</>
                  ) : (
                    <>
                      No products yet.{" "}
                      <Link
                        href="/products/new"
                        className="text-violet-600 hover:underline"
                      >
                        Add one
                      </Link>
                      .
                    </>
                  )}
                </td>
              </tr>
            )}

            {filtered.map((product) => (
              <tr
                key={product.id}
                className="transition-colors duration-150 hover:bg-slate-50"
              >
                <td className="min-w-17.5 px-4 py-3">
                  {product.image ? (
                    <Image
                      src={getImagePath(product.image)}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-lg bg-slate-200">
                      <PhotoIcon className="size-5 text-slate-400" />
                    </div>
                  )}
                </td>
                <td className="min-w-25 px-4 py-3 font-medium whitespace-nowrap text-stone-900">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {product.category.name}
                </td>
                <td className="px-4 py-3 text-stone-600">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-3">
                  <div className="hidden items-center gap-2 sm:flex">
                    <Link
                      href={`/products/${product.id}/edit`}
                      className="rounded-lg border border-slate-400 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase transition duration-300 hover:border-slate-500 hover:text-slate-500"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setToDelete(product)}
                      className="cursor-pointer rounded-lg border border-rose-400 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-400 uppercase transition duration-300 hover:border-rose-500 hover:text-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex items-center gap-4 sm:hidden">
                    <Link
                      href={`/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                    >
                      <PencilIcon className="size-4 text-slate-400" />
                    </Link>
                    <button
                      aria-label={`Delete ${product.name}`}
                      onClick={() => setToDelete(product)}
                      className="cursor-pointer"
                    >
                      <TrashIcon className="size-4 text-rose-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!toDelete}
        title="Delete product"
        message={`"${toDelete?.name}" will be permanently removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
