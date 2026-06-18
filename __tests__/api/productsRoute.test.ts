import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/products/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockFindMany = prisma.product.findMany as jest.Mock;
const mockCreate = prisma.product.create as jest.Mock;

const sampleProduct = {
  id: "prod-1",
  name: "Espresso",
  price: 3.5,
  image: null,
  categoryId: "cat-1",
  category: { id: "cat-1", name: "Coffee" },
};

beforeEach(() => jest.clearAllMocks());

describe("GET /api/products", () => {
  it("returns 200 with a list of products", async () => {
    mockFindMany.mockResolvedValue([sampleProduct]);
    const req = new NextRequest("http://localhost/api/products");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([sampleProduct]);
  });

  it("passes categoryId filter to prisma", async () => {
    mockFindMany.mockResolvedValue([]);
    const req = new NextRequest(
      "http://localhost/api/products?categoryId=cat-1"
    );
    await GET(req);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ categoryId: "cat-1" }),
      })
    );
  });

  it("passes search filter to prisma", async () => {
    mockFindMany.mockResolvedValue([]);
    const req = new NextRequest(
      "http://localhost/api/products?search=espresso"
    );
    await GET(req);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          name: { contains: "espresso", mode: "insensitive" },
        }),
      })
    );
  });
});

describe("POST /api/products", () => {
  const validBody = { name: "Espresso", price: 3.5, categoryId: "cat-1" };

  it("returns 201 with the created product", async () => {
    mockCreate.mockResolvedValue(sampleProduct);
    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(sampleProduct);
  });

  it("returns 400 when name is missing", async () => {
    const body = { price: validBody.price, categoryId: validBody.categoryId };
    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when price is non-positive", async () => {
    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, price: 0 }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 on an unexpected error", async () => {
    mockCreate.mockRejectedValue(new Error("DB error"));
    const req = new Request("http://localhost/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
