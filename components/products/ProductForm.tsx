"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImagePicker } from "@/components/products/ImagePicker";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/src/hooks/useProductMutations";
import { createProductSchema } from "@/src/lib/schemas/productSchema";
import type { CategoryType, CreateProductType, ProductType } from "@/src/types";

interface ProductFormProps {
  title: string;
  productId?: string;
  product?: ProductType;
  categories: CategoryType[];
}

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "royal_diner");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const json = await res.json();
  return json.secure_url as string;
};

export function ProductForm({
  title,
  productId,
  product,
  categories,
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!productId;

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct(productId ?? "");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductType>,
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
          image: product.image ?? undefined,
        }
      : undefined,
  });

  const currentImageUrl = useWatch({ control, name: "image" });

  const onSubmit = async (data: CreateProductType) => {
    let imageUrl = data.image;

    if (pendingFile) {
      setIsUploading(true);
      try {
        imageUrl = await uploadToCloudinary(pendingFile);
      } catch {
        toast.error("Failed to upload image. Please try again.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const payload = { ...data, image: imageUrl };

    if (isEditing) {
      updateProduct.mutate(payload, {
        onSuccess: () => router.push("/products"),
      });
    } else {
      createProduct.mutate(payload, {
        onSuccess: () => router.push("/products"),
      });
    }
  };

  const isBusy =
    isUploading || createProduct.isPending || updateProduct.isPending;

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
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-stone-900 transition duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
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

          <ImagePicker
            currentUrl={currentImageUrl}
            onFileSelect={setPendingFile}
          />

          <div className="flex justify-center gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={isBusy}>
              {isUploading ? "Uploading…" : isBusy ? "Saving…" : "Save"}
            </Button>
            <Link
              href="/products"
              className="rounded-lg border border-cyan-400 bg-cyan-50 px-4 py-2.5 text-base font-semibold text-cyan-400 uppercase transition duration-300 hover:border-cyan-500 hover:text-cyan-500"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
