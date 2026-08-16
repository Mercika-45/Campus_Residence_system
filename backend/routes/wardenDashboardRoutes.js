import express from "express";
import { getWardenDashboardStats } from "../controllers/wardenDashboardController.js";

const router = express.Router();

// GET /api/warden-dashboard/stats?email=...
router.get("/stats", getWardenDashboardStats);

export default router;