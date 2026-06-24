import { ZodError } from "zod";
import { prisma } from "@/src/lib/prisma";
import { updateOrderStatusSchema } from "@/src/lib/schemas/orderSchema";
import { isPrismaError } from "@/src/lib/utils/isPrismaError";

/**
 * @swagger
 * /api/orders/{orderId}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, READY]
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Order not found
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const body = await request.json();
    const { status } = updateOrderStatusSchema.parse(body);
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });
    return Response.json(order);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    if (isPrismaError(error, "P2025")) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
