import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/src/lib/prisma";
import { createOrderSchema } from "@/src/lib/schemas/orderSchema";

const include = {
  items: {
    include: {
      product: { select: { id: true, name: true, image: true } },
    },
  },
};

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, READY]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: Array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientName, items, total]
 *             properties:
 *               clientName:
 *                 type: string
 *               total:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity, subtotal]
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     subtotal:
 *                       type: number
 *     responses:
 *       201:
 *         description: Created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 */
export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  const orders = await prisma.order.findMany({
    where: status === "PENDING" || status === "READY" ? { status } : undefined,
    include,
    orderBy: { createdAt: "asc" },
  });

  return Response.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createOrderSchema.parse(body);
    const order = await prisma.order.create({
      data: {
        clientName: data.clientName,
        total: data.total,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
      include,
    });
    return Response.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
