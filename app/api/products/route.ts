import type { NextRequest } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/src/lib/prisma";
import { createProductSchema } from "@/src/lib/schemas/productSchema";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name (case-insensitive)
 *     responses:
 *       200:
 *         description: Array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, categoryId]
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
 *       201:
 *         description: Created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const products = await prisma.product.findMany({
    where: {
      ...(categoryId && { categoryId }),
      ...(search && { name: { contains: search, mode: "insensitive" } }),
    },
    include: { category: { select: { id: true, name: true } } },
    orderBy: { name: "asc" },
  });

  return Response.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = createProductSchema.parse(body);
    const product = await prisma.product.create({
      data,
      include: { category: { select: { id: true, name: true } } },
    });
    return Response.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
