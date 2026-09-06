import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import { sanitizeRequest } from "./middleware/sanitizeMiddleware.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// Parse allowed origins from environment variable
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Security headers
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Logging
app.use(morgan(isProduction ? "combined" : "dev"));

// Dynamic CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // 1. Allow non-browser requests (Postman, cURL, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // 2. Allow explicitly configured origins (from CLIENT_URL)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // 3. Allow Vercel preview deployments dynamically
    if (/\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // 4. Allow local development environments
    if (
      !isProduction &&
      (/^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin))
    ) {
      return callback(null, true);
    }

    console.log("Blocked CORS origin:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle HTTP preflight requests across all endpoints
app.options("*", cors(corsOptions));

// Parse JSON & Request Body
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(sanitizeRequest);

// Rate limiting
app.use(apiLimiter);

// Health Check Routes
app.get("/", (req, res) => {
  res.json({ message: "Taskor API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;