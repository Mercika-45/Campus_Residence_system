import express from "express";
import {
  createLeave,
  getLeaves,
  getStudentLeaves,
  approveReduction,
  approveLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

// Create Leave
router.post("/leave", createLeave);

// Get All Leaves
router.get("/leave", getLeaves);

// ✅ Correct Student Route
router.get("/leave/student/:registerNo", getStudentLeaves);

// Deputy Approve Reduction
router.put("/leave/reduction/approve/:id", approveReduction);

// Executive Approve Leave
router.put("/leave/approve/:id", approveLeave);

export default router;