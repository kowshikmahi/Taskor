import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

import { apiLimiter } from "./middleware/rateLimitMiddleware.js";
import { sanitizeRequest } from "./middleware/sanitizeMiddleware.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

/* =========================================================
   CORS CONFIGURATION
========================================================= */

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

console.log("Allowed CORS origins from env:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an Origin header (Postman, mobile apps, cURL, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

    // 1. Allow explicitly configured frontend URLs
    if (allowedOrigins.length > 0 && allowedOrigins.includes(normalizedOrigin)) {
      console.log("CORS allowed explicit origin:", normalizedOrigin);
      return callback(null, true);
    }

    // 2. Allow ALL Vercel preview & production deployments (*.vercel.app)
    if (normalizedOrigin.endsWith(".vercel.app") || normalizedOrigin.includes("vercel.app")) {
      console.log("CORS allowed Vercel origin:", normalizedOrigin);
      return callback(null, true);
    }

    // 3. Allow ALL Netlify preview & production deployments (*.netlify.app)
    if (normalizedOrigin.endsWith(".netlify.app") || normalizedOrigin.includes("netlify.app")) {
      console.log("CORS allowed Netlify origin:", normalizedOrigin);
      return callback(null, true);
    }

    // 4. Allow localhost during development
    if (
      normalizedOrigin.startsWith("http://localhost:") ||
      normalizedOrigin.startsWith("http://127.0.0.1:") ||
      normalizedOrigin.startsWith("https://localhost:")
    ) {
      console.log("CORS allowed local origin:", normalizedOrigin);
      return callback(null, true);
    }

    // 5. Permissive fallback for all cross-origin requests
    console.log("CORS fallback allowed origin:", normalizedOrigin);
    return callback(null, true);
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],

  optionsSuccessStatus: 200,
};

/* =========================================================
   SECURITY & MIDDLEWARE
========================================================= */

app.disable("x-powered-by");
app.set("trust proxy", 1);

// Apply CORS globally BEFORE any other middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/* =========================================================
   LOGGING
========================================================= */

app.use(morgan(isProduction ? "combined" : "dev"));

/* =========================================================
   REQUEST BODY PARSING
========================================================= */

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

/* =========================================================
   REQUEST SANITIZATION & RATE LIMITING
========================================================= */

app.use(sanitizeRequest);
app.use(apiLimiter);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({ message: "Taskor API is running" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* =========================================================
   API ROUTES
========================================================= */

// Authentication (Mount both /api/auth and /auth for frontend compatibility)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// Clients (Mount both /api/clients and /clients)
app.use("/api/clients", clientRoutes);
app.use("/clients", clientRoutes);

// Projects (Mount both /api/projects and /projects)
app.use("/api/projects", projectRoutes);
app.use("/projects", projectRoutes);

// Tasks (Mount both /api/tasks and /tasks)
app.use("/api/tasks", taskRoutes);
app.use("/tasks", taskRoutes);

/* =========================================================
   ERROR HANDLING
========================================================= */

app.use(notFound);
app.use(errorHandler);

export default app;