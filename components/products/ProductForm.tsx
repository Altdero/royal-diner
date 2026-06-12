"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// CldUploadWidget validates the upload preset at module evaluation time. During
// Next.js prerendering this runs server-side where the env var is absent, causing
// a build-time throw. ssr:false defers the import to the client where it is set.
const ImagePicker = dynamic(
  () => import("@/components/products/ImagePicker").then((m) => m.ImagePicker),
  { ssr: false }
);
import { useCategories } from "@/src/hooks/useCategories";
import { useProduct } from "@/src/hooks/useProducts";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/src/hooks/useProductMutations";
import { createProductSchema } from "@/src/lib/schemas/productSchema";
import type { CreateProductType } from "@/src/types";

interface ProductFormProps {
  title: string;
  productId?: string;
}

export function ProductForm({ title, productId }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!productId;

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();
  const { data: product, isLoading: productLoading } = useProduct(
    productId ?? ""
  );
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(productId ?? "");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductType>,
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        image: product.image ?? undefined,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: CreateProductType) => {
    if (isEditing) {
      updateProduct.mutate(data, {
        onSuccess: () => router.push("/products"),
      });
    } else {
      createProduct.mutate(data, {
        onSuccess: () => router.push("/products"),
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

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
        {isEditing && productLoading ? (
          <p className="text-sm text-stone-400">Loading…</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              label="Name"
              placeholder="e.g. Espresso"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              id="price"
              label="Unit Price"
              type="number"
              placeholder="0.00"
              step={0.01}
              error={errors.price?.message}
              {...register("price")}
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
                disabled={categoriesLoading}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-stone-900 transition duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:opacity-50"
                {...register("categoryId")}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-rose-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImagePicker value={field.value} onChange={field.onChange} />
              )}
            />

            <div className="flex justify-center gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isPending}>
                {isPending ? "Saving…" : "Save"}
              </Button>
              <Link
                href="/products"
                className="rounded-lg border border-cyan-400 bg-cyan-50 px-4 py-2.5 text-base font-semibold text-cyan-400 uppercase transition duration-300 hover:border-cyan-500 hover:text-cyan-500"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
