import express from "express";
import { addAdminHostel, deleteAdminHostel, getAdminHostels } from "../controllers/adminHostelController.js";

const router = express.Router();

router.post("/add", addAdminHostel);
router.get("/", getAdminHostels);
router.delete("/:id", deleteAdminHostel);

export default router;