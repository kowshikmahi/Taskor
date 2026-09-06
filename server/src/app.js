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

// Read frontend URLs from Render environment variable
//
// Example:
// CLIENT_URL=https://taskor-new.vercel.app
//
// Multiple URLs can be separated by commas:
// CLIENT_URL=https://taskor-new.vercel.app,https://another.vercel.app

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

/* =========================================================
   SECURITY
========================================================= */

app.disable("x-powered-by");

app.set("trust proxy", 1);

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

app.use(
  morgan(isProduction ? "combined" : "dev")
);

/* =========================================================
   CORS
========================================================= */

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an Origin header.
    // Useful for Postman, cURL, server-to-server requests, etc.
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    // 1. Allow explicitly configured frontend URLs
    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log("CORS allowed:", normalizedOrigin);
      return callback(null, true);
    }

    // 2. Allow Vercel deployments
    //
    // This allows:
    // https://taskor-new.vercel.app
    // https://taskorapp-xxxx.vercel.app
    // https://taskorapp-git-main-xxxx.vercel.app
    //
    if (
      /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(
        normalizedOrigin
      )
    ) {
      console.log(
        "CORS allowed Vercel origin:",
        normalizedOrigin
      );

      return callback(null, true);
    }

    // 3. Allow localhost during development
    if (
      !isProduction &&
      (
        /^http:\/\/localhost:\d+$/.test(normalizedOrigin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(normalizedOrigin)
      )
    ) {
      console.log(
        "CORS allowed local origin:",
        normalizedOrigin
      );

      return callback(null, true);
    }

    // 4. Block everything else
    console.log(
      "Blocked CORS origin:",
      normalizedOrigin
    );

    return callback(
      new Error("Not allowed by CORS")
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],

  optionsSuccessStatus: 204,
};

// Apply CORS globally
app.use(cors(corsOptions));

// Explicitly handle browser preflight requests
app.options("*", cors(corsOptions));

/* =========================================================
   REQUEST BODY PARSING
========================================================= */

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  })
);

/* =========================================================
   REQUEST SANITIZATION
========================================================= */

app.use(sanitizeRequest);

/* =========================================================
   RATE LIMITING
========================================================= */

app.use(apiLimiter);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Taskor API is running",
  });
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

// Authentication
app.use("/api/auth", authRoutes);

// Clients
app.use("/api/clients", clientRoutes);

// Projects
app.use("/api/projects", projectRoutes);

// Tasks
app.use("/api/tasks", taskRoutes);

/* =========================================================
   404 HANDLER
========================================================= */

app.use(notFound);

/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

app.use(errorHandler);

export default app;