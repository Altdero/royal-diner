import { ZodError } from "zod";
import { prisma } from "@/src/lib/prisma";
import { updateProductSchema } from "@/src/lib/schemas/productSchema";
import { isPrismaError } from "@/src/lib/utils/isPrismaError";

const include = { category: { select: { id: true, name: true } } };

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Product not found
 *       409:
 *         description: Product is referenced by existing orders
 */
export async function GET(
  _: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include,
  });
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const body = await request.json();
    const data = updateProductSchema.parse(body);
    const product = await prisma.product.update({
      where: { id: productId },
      data,
      include,
    });
    return Response.json(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    if (isPrismaError(error, "P2025")) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    await prisma.product.delete({ where: { id: productId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (isPrismaError(error, "P2025")) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    if (isPrismaError(error, "P2003")) {
      return Response.json(
        { error: "Product is referenced by existing orders" },
        { status: 409 }
      );
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
