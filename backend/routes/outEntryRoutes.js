import express from "express";
import { getStudentByRegNo } from "../controllers/outEntryController.js";
import {
  createOutEntry,
  getOutEntries,
  updateOutEntry,
  deleteOutEntry
} from "../controllers/outEntryController.js";

const router = express.Router();

router.get("/regno/:regNo", getStudentByRegNo);
router.post("/", createOutEntry);
router.get("/", getOutEntries);
router.put("/:id", updateOutEntry);
router.delete("/:id", deleteOutEntry);

export default router;