import express from "express";
import {
  markAttendance,
  getAttendance,
  getStudentsByYear
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/", getAttendance);
router.get("/students", getStudentsByYear);

export default router;