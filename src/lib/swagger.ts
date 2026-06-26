import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Royal Diner API",
      version: "1.0.0",
      description: "Diner order management system — REST API",
    },
    servers: [
      { url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000" },
    ],
    tags: [
      { name: "Categories", description: "Product categories" },
      { name: "Products", description: "Menu products" },
      { name: "Orders", description: "Customer orders" },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            image: { type: "string", nullable: true },
            categoryId: { type: "string" },
            category: { $ref: "#/components/schemas/Category" },
          },
        },
        OrderItem: {
          type: "object",
          properties: {
            id: { type: "string" },
            orderId: { type: "string" },
            productId: { type: "string" },
            quantity: { type: "integer" },
            subtotal: { type: "number" },
            product: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                image: { type: "string", nullable: true },
              },
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string" },
            orderNumber: { type: "integer" },
            clientName: { type: "string" },
            total: { type: "number" },
            status: { type: "string", enum: ["PENDING", "READY"] },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
