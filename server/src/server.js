import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // =====================================================
    // Validate required environment variables
    // =====================================================

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    if (process.env.JWT_SECRET.length < 32) {
      throw new Error(
        "JWT_SECRET must be at least 32 characters long"
      );
    }

    // =====================================================
    // Production environment validation
    // =====================================================

    if (process.env.NODE_ENV === "production") {
      if (process.env.MONGODB_URI.includes("replace_with")) {
        throw new Error(
          "MONGODB_URI must be configured before production deployment"
        );
      }

      if (process.env.JWT_SECRET.includes("replace_with")) {
        throw new Error(
          "JWT_SECRET must be configured before production deployment"
        );
      }
    }

    // =====================================================
    // Connect to MongoDB
    // =====================================================

    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connected successfully");

    // =====================================================
    // Start Express server
    // =====================================================

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Taskor server running on port ${PORT}`
      );

      console.log(
        `Environment: ${process.env.NODE_ENV || "development"}`
      );
    });
  } catch (error) {
    console.error("=================================");
    console.error("Failed to start Taskor server");
    console.error("=================================");
    console.error(error.message);
    console.error(error);

    process.exit(1);
  }
}

// =========================================================
// Start application
// =========================================================

startServer();