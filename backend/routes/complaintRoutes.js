import express from "express";
import {
  createComplaint,
  getComplaints,
  markCompleted,
  approveComplaint,
  getComplaintsByRegisterNo   // ✅ CORRECT NAME
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaints);
router.get("/student/:registerNo", getComplaintsByRegisterNo);

// Warden/Admin
router.put("/complete/:id", markCompleted);

// Student
router.put("/approve/:id", approveComplaint);


export default router;