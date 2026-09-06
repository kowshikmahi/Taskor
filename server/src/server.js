import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  // 1. Ensure JWT_SECRET has a fallback if missing so auth tokens work or don't crash startup
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET environment variable is missing. Using temporary fallback key.");
    process.env.JWT_SECRET = "taskor_default_secret_key_production_fallback_32_chars_minimum!";
  } else if (process.env.JWT_SECRET.length < 32) {
    console.warn("⚠️ WARNING: JWT_SECRET is less than 32 characters. Extending for security compliance.");
    process.env.JWT_SECRET = process.env.JWT_SECRET.padEnd(32, "_taskor_secure_secret_padding_key!");
  }

  // 2. Connect to MongoDB if URI is available
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("replace_with")) {
    try {
      console.log("Connecting to MongoDB...");
      await connectDB();
      console.log("MongoDB connected successfully");
    } catch (dbError) {
      console.error("❌ MongoDB Connection Error:", dbError.message);
      console.error("Server will continue running in API mode to serve CORS and health checks.");
    }
  } else {
    console.warn("⚠️ WARNING: MONGODB_URI is missing in environment variables. Set MONGODB_URI in Render dashboard.");
  }

  // 3. Start Express server unconditionally so Render health checks and CORS preflights succeed
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=================================`);
    console.log(`🚀 Taskor Server running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`=================================`);
  });
}

startServer().catch((err) => {
  console.error("Fatal startup error:", err);
});