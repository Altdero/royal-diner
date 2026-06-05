import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Royal Diner API",
      version: "1.0.0",
      description: "Diner order management system — REST API",
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      { name: "Categories", description: "Product categories" },
      { name: "Products", description: "Menu products" },
      { name: "Orders", description: "Customer orders" },
    ],
  },
  apis: ["./app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
