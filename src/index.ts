import dotenv from "dotenv";
dotenv.config();
console.log("BASE_URL loaded from .env:", process.env.BASE_URL);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/db";
import { getEnvVariable } from "./utils/helpers";
import urlRoutes from "./routes/UrlRoutes";
import swaggerSpec from "./config/swagger";

const app = express();
const PORT = process.env.PORT || getEnvVariable("PORT");

// Connect Database
connectDB();

// Middlewares
app.use(
  cors({
    origin: "*", // or specify your frontend URL here
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (_req, res) => {
  res.send("Hai there, API is running...");
});

// API routes
app.use("/", urlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
