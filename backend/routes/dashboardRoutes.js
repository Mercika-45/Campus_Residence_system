import express from "express";
import { getWardenDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getWardenDashboard);

export default router;