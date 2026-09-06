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
  origin: (origin, callback) => {
    // Allow requests without Origin (Postman, cURL, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, "");

    // 1. Allow URLs explicitly defined in CLIENT_URL
    if (allowedOrigins.length > 0 && allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    // 2. Allow Vercel deployments (*.vercel.app)
    if (/^https:\/\/.*\.vercel\.app$/.test(normalizedOrigin) || normalizedOrigin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    // 3. Allow Netlify deployments (*.netlify.app)
    if (/^https:\/\/.*\.netlify\.app$/.test(normalizedOrigin) || normalizedOrigin.endsWith(".netlify.app")) {
      return callback(null, true);
    }

    // 4. Allow localhost during development
    if (
      /^http:\/\/localhost:\d+$/.test(normalizedOrigin) ||
      /^http:\/\/127\.0\.0\.1:\d+$/.test(normalizedOrigin) ||
      normalizedOrigin.startsWith("http://localhost:") ||
      normalizedOrigin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }

    // 5. Permissive fallback for all cross-origin requests
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
   SECURITY & MIDDLEWARE ORDERING
   1. Disable x-powered-by & trust proxy
   2. Helmet (Security Headers)
   3. CORS (BEFORE body parsing, rate limiting, and routes)
   4. OPTIONS Preflight Handling
   5. Request Logging (Morgan)
   6. Express Body Parsing
   7. Sanitization & Rate Limiting
========================================================= */

app.disable("x-powered-by");
app.set("trust proxy", 1);

// 2. Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// 3. CORS (Global)
app.use(cors(corsOptions));

// 4. OPTIONS Preflight (Global)
app.options("*", cors(corsOptions));

// 5. Logging
app.use(morgan(isProduction ? "combined" : "dev"));

// 6. Request Body Parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// 7. Sanitization & Rate Limiting (skips OPTIONS preflights)
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
   Mount both /api/* and /* for maximum compatibility
========================================================= */

// Authentication
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// Clients
app.use("/api/clients", clientRoutes);
app.use("/clients", clientRoutes);

// Projects
app.use("/api/projects", projectRoutes);
app.use("/projects", projectRoutes);

// Tasks
app.use("/api/tasks", taskRoutes);
app.use("/tasks", taskRoutes);

/* =========================================================
   ERROR HANDLING
========================================================= */

app.use(notFound);
app.use(errorHandler);

export default app;