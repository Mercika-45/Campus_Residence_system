import express from "express";

import {
  createOutEntry,
  getOutEntries,
  updateOutEntry,
  deleteOutEntry
} from "../controllers/outEntryController.js";

const router = express.Router();

router.post("/", createOutEntry);
router.get("/", getOutEntries);
router.put("/:id", updateOutEntry);
router.delete("/:id", deleteOutEntry);

export default router;