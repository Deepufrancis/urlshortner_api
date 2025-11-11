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
        url: process.env.BASE_URL || "https://urlshortner-api-q5t6.onrender.com",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
