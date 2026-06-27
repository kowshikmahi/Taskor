import express from "express";
import { authLimiter } from "../middleware/rateLimitMiddleware.js";
import { getMe, login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.get("/me", protect, getMe);

export default router;
