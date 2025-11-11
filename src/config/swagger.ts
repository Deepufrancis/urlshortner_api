import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for the Job Portal project (including URL Shortener).",
    },
    servers: [
      {
        url: process.env.BASE_URL || "https://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // 👈 path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
