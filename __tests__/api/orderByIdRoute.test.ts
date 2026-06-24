import { PATCH } from "@/app/api/orders/[orderId]/route";
import { prisma } from "@/src/lib/prisma";

jest.mock("@/src/lib/prisma", () => ({
  prisma: {
    order: {
      update: jest.fn(),
    },
  },
}));

const mockUpdate = prisma.order.update as jest.Mock;

const sampleOrder = {
  id: "order-1",
  orderNumber: 1,
  clientName: "Alice",
  total: 7,
  status: "READY",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: [],
};

const params = Promise.resolve({ orderId: "order-1" });

beforeEach(() => jest.clearAllMocks());

describe("PATCH /api/orders/[orderId]", () => {
  it("returns 200 with the updated order", async () => {
    mockUpdate.mockResolvedValue(sampleOrder);
    const req = new Request("http://localhost/api/orders/order-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "READY" }),
    });
    const res = await PATCH(req, { params });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(sampleOrder);
  });

  it("returns 400 when status is invalid", async () => {
    const req = new Request("http://localhost/api/orders/order-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "INVALID" }),
    });
    const res = await PATCH(req, { params });
    expect(res.status).toBe(400);
  });

  it("returns 404 when the order does not exist", async () => {
    mockUpdate.mockRejectedValue({ code: "P2025" });
    const req = new Request("http://localhost/api/orders/order-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "READY" }),
    });
    const res = await PATCH(req, { params });
    expect(res.status).toBe(404);
  });

  it("returns 500 on an unexpected error", async () => {
    mockUpdate.mockRejectedValue(new Error("DB error"));
    const req = new Request("http://localhost/api/orders/order-1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "READY" }),
    });
    const res = await PATCH(req, { params });
    expect(res.status).toBe(500);
  });
});
