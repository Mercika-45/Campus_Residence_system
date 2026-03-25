import express from "express";
import { addWarden, getWardens, deleteWarden, updateWarden, getWardenByEmail } from "../controllers/wardenController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

// Add warden
router.post("/add", upload.single("image"), addWarden);

// Get all wardens
router.get("/", getWardens);

router.get("/single", getWardenByEmail);

// Delete warden
router.delete("/:id", deleteWarden);

// Update warden
router.put("/:id", upload.single("image"), updateWarden);

export default router;