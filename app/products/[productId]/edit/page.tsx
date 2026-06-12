import { ProductForm } from "@/components/products/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <ProductForm title="Edit Product" productId={productId} />
    </div>
  );
}
