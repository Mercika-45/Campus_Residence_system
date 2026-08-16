import express from "express";
import { addSanitization, getSanitization } from "../controllers/sanitizationController.js";

const router = express.Router();

router.post("/add", addSanitization);
router.get("/", getSanitization);

export default router;