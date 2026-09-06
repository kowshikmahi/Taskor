import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from your specific Vercel deployment (or use '*' to allow all during development)
app.use(cors({
  origin: [
    'https://taskorapp-2f8f6c9kh-kowshikmahi1209-8877s-projects.vercel.app',
    // Tip: Add your main production domain here too if using Vercel preview deployments
    /\.vercel\.app$/ 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Important: Ensure CORS middleware is placed BEFORE your routes!
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    if (process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be at least 32 characters long");
    }

    if (
      process.env.NODE_ENV === "production" &&
      process.env.MONGODB_URI.includes("replace_with")
    ) {
      throw new Error("MONGODB_URI must be configured before production deployment");
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Taskor server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
}

startServer();
