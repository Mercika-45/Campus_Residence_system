import express from "express";
import {
  getStudentsOut,
  getReturnedEntries,
  markStudentIn
} from "../controllers/inEntryController.js";

const router = express.Router();

router.get("/students-out", getStudentsOut);
router.get("/returned", getReturnedEntries);
router.post("/mark-in/:id", markStudentIn);

export default router;