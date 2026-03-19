import express from "express";
import { addWarden, getWardens } from "../controllers/wardenController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addWarden);
router.get("/", getWardens);

export default router;