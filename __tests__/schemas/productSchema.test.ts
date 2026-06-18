import { createProductSchema } from "@/src/lib/schemas/productSchema";

describe("createProductSchema", () => {
  const valid = { name: "Espresso", price: 3.5, categoryId: "cat-1" };

  it("accepts a valid product", () => {
    const result = createProductSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("accepts an optional image", () => {
    const result = createProductSchema.safeParse({
      ...valid,
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a missing name", () => {
    const result = createProductSchema.safeParse({
      price: valid.price,
      categoryId: valid.categoryId,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty name", () => {
    const result = createProductSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
  });

  it("coerces a string price to number", () => {
    const result = createProductSchema.safeParse({ ...valid, price: "3.50" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.price).toBe(3.5);
  });

  it("rejects a zero price", () => {
    const result = createProductSchema.safeParse({ ...valid, price: 0 });
    expect(result.success).toBe(false);
  });

  it("rejects a negative price", () => {
    const result = createProductSchema.safeParse({ ...valid, price: -1 });
    expect(result.success).toBe(false);
  });

  it("rejects a missing categoryId", () => {
    const result = createProductSchema.safeParse({
      name: valid.name,
      price: valid.price,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty categoryId", () => {
    const result = createProductSchema.safeParse({ ...valid, categoryId: "" });
    expect(result.success).toBe(false);
  });
});
