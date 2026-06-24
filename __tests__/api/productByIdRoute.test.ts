import { GET, PUT, DELETE } from "@/app/api/products/[productId]/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    product: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockFindUnique = prisma.product.findUnique as jest.Mock;
const mockUpdate = prisma.product.update as jest.Mock;
const mockDelete = prisma.product.delete as jest.Mock;

const sampleProduct = {
  id: "prod-1",
  name: "Espresso",
  price: 3.5,
  image: null,
  categoryId: "cat-1",
  category: { id: "cat-1", name: "Coffee" },
};

const params = Promise.resolve({ productId: "prod-1" });

beforeEach(() => jest.clearAllMocks());

describe("GET /api/products/[productId]", () => {
  it("returns 200 with the product when found", async () => {
    mockFindUnique.mockResolvedValue(sampleProduct);
    const req = new Request("http://localhost/api/products/prod-1");
    const res = await GET(req, { params });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(sampleProduct);
  });

  it("returns 404 when the product is not found", async () => {
    mockFindUnique.mockResolvedValue(null);
    const req = new Request("http://localhost/api/products/prod-1");
    const res = await GET(req, { params });
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/products/[productId]", () => {
  const validBody = { name: "Espresso", price: 3.5, categoryId: "cat-1" };

  it("returns 200 with the updated product", async () => {
    mockUpdate.mockResolvedValue(sampleProduct);
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await PUT(req, { params });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(sampleProduct);
  });

  it("returns 400 when price is negative", async () => {
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, price: -5 }),
    });
    const res = await PUT(req, { params });
    expect(res.status).toBe(400);
  });

  it("returns 404 when the product is not found", async () => {
    mockUpdate.mockRejectedValue({ code: "P2025" });
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await PUT(req, { params });
    expect(res.status).toBe(404);
  });

  it("returns 500 on an unexpected error", async () => {
    mockUpdate.mockRejectedValue(new Error("DB error"));
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await PUT(req, { params });
    expect(res.status).toBe(500);
  });
});

describe("DELETE /api/products/[productId]", () => {
  it("returns 204 on success", async () => {
    mockDelete.mockResolvedValue(undefined);
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params });
    expect(res.status).toBe(204);
  });

  it("returns 404 when the product is not found", async () => {
    mockDelete.mockRejectedValue({ code: "P2025" });
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params });
    expect(res.status).toBe(404);
  });

  it("returns 409 when the product is referenced by orders", async () => {
    mockDelete.mockRejectedValue({ code: "P2003" });
    const req = new Request("http://localhost/api/products/prod-1", {
      method: "DELETE",
    });
    const res = await DELETE(req, { params });
    expect(res.status).toBe(409);
  });
});
