import type { z } from "zod";
import type { categorySchema } from "@/src/lib/schemas/categorySchema";
import type {
  createProductSchema,
  updateProductSchema,
} from "@/src/lib/schemas/productSchema";
import type {
  createOrderSchema,
  orderStatusSchema,
  updateOrderStatusSchema,
} from "@/src/lib/schemas/orderSchema";

// ─── Inferred from Zod schemas ───────────────────────────────────────────────

export type CreateProductType = z.infer<typeof createProductSchema>;
export type UpdateProductType = z.infer<typeof updateProductSchema>;
export type CreateOrderType = z.infer<typeof createOrderSchema>;
export type OrderStatusType = z.infer<typeof orderStatusSchema>;
export type UpdateOrderStatusType = z.infer<typeof updateOrderStatusSchema>;

// ─── API response types (dates serialized as strings) ────────────────────────

export type CategoryType = z.infer<typeof categorySchema>;

export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string | null;
  categoryId: string;
  category: CategoryType;
};

export type OrderItemType = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  subtotal: number;
  product: Pick<ProductType, "id" | "name" | "image">;
};

export type OrderType = {
  id: string;
  orderNumber: number;
  clientName: string;
  total: number;
  status: OrderStatusType;
  items: OrderItemType[];
  createdAt: string;
  updatedAt: string;
};
