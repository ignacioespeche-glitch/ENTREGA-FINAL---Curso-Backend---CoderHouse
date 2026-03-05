import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce Backend",
      version: "1.0.0",
      description: "Documentación del proyecto final"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

export const swaggerSpecs = swaggerJsdoc(options);