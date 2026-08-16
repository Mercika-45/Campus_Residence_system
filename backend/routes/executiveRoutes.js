import express from "express";
import { getExecutiveStats } from "../controllers/executiveController.js";

const router = express.Router();

router.get("/stats", getExecutiveStats);

export default router;