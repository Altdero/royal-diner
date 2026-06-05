import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().optional(),
});

export const updateProductSchema = createProductSchema;
