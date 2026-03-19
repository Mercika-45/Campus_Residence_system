import express from "express";
import {
  createComplaint,
  getComplaints,
  markCompleted,
  approveComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaints);

// Warden/Admin
router.put("/complete/:id", markCompleted);

// Student
router.put("/approve/:id", approveComplaint);

export default router;