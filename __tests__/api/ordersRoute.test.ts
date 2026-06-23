import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/orders/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    order: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockFindMany = prisma.order.findMany as jest.Mock;
const mockCreate = prisma.order.create as jest.Mock;

const sampleOrder = {
  id: "order-1",
  orderNumber: 1,
  clientName: "Alice",
  total: 7,
  status: "PENDING",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: [
    {
      id: "item-1",
      orderId: "order-1",
      productId: "prod-1",
      quantity: 2,
      subtotal: 7,
      product: { id: "prod-1", name: "Espresso", image: null },
    },
  ],
};

beforeEach(() => jest.clearAllMocks());

describe("GET /api/orders", () => {
  it("returns 200 with all orders when no status filter", async () => {
    mockFindMany.mockResolvedValue([sampleOrder]);
    const req = new NextRequest("http://localhost/api/orders");
    const res = await GET(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([sampleOrder]);
  });

  it("passes PENDING status filter to prisma", async () => {
    mockFindMany.mockResolvedValue([sampleOrder]);
    const req = new NextRequest("http://localhost/api/orders?status=PENDING");
    await GET(req);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "PENDING" } })
    );
  });

  it("passes READY status filter to prisma", async () => {
    mockFindMany.mockResolvedValue([]);
    const req = new NextRequest("http://localhost/api/orders?status=READY");
    await GET(req);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: "READY" } })
    );
  });

  it("ignores an invalid status value", async () => {
    mockFindMany.mockResolvedValue([sampleOrder]);
    const req = new NextRequest("http://localhost/api/orders?status=INVALID");
    await GET(req);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined })
    );
  });
});

describe("POST /api/orders", () => {
  const validBody = {
    clientName: "Alice",
    total: 7,
    items: [{ productId: "prod-1", quantity: 2, subtotal: 7 }],
  };

  it("returns 201 with the created order", async () => {
    mockCreate.mockResolvedValue(sampleOrder);
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(sampleOrder);
  });

  it("returns 400 when clientName is missing", async () => {
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, clientName: "" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when items is empty", async () => {
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, items: [] }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 500 on an unexpected error", async () => {
    mockCreate.mockRejectedValue(new Error("DB error"));
    const req = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
