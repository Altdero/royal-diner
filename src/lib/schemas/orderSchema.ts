import { z } from "zod";

export const ORDER_STATUSES = {
  PENDING: "PENDING",
  READY: "READY",
} as const;

export const orderStatusSchema = z.enum(["PENDING", "READY"]);

export const createOrderSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1),
        subtotal: z.number().positive(),
      })
    )
    .min(1, "At least one item is required"),
  total: z.number().positive(),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});
