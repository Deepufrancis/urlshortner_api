import dotenv from "dotenv";
dotenv.config();
console.log("BASE_URL loaded from .env:", process.env.BASE_URL);

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";


import { getEnvVariable } from "../src/utils/helpers";
import cookieParser from "cookie-parser";
import urlRoutes from "./routes/UrlRoutes";

// ✅ import swagger
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middlewares
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Swagger route (before API routes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", async (_req, res) => {
  res.send("Hai there, API is running...");
});

// API routes
app.use("/", urlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
