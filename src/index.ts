import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import urlRoutes from "./routes/UrlRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS fix (must be before routes)
app.use(cors({
  origin: "*", // Allow all origins (you can restrict later)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Optional: handle preflight requests explicitly
app.options("*", cors());

// ✅ Connect DB
connectDB();

// ✅ Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Root route
app.get("/", (_req, res) => {
  res.send("Hai there, API is running...");
});

// ✅ API routes
app.use("/", urlRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger docs: https://urlshortner-api-q5t6.onrender.com/api-docs`);
});
