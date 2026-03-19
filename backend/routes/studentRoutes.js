import express from "express";
import * as studentController from "../controllers/studentController.js";
import upload from "../middleware/upload.js"; // multer middleware

const router = express.Router();

// ================= REGISTER =================
router.post(
  "/register",
  upload.any(),
  studentController.registerStudent
);

// ================= VIEW STUDENTS =================

// New students (pending approval)
router.get(
  "/new",
  studentController.getNewStudents
);

// Approved students (current hostel students)
router.get(
  "/approved",
  studentController.getApprovedStudents
);

// Old / vacated students
router.get(
  "/old",
  studentController.getOldStudents
);

// Get single student by ID
router.get(
  "/:id",
  studentController.getStudentById
);

// ================= ACTIONS =================

// Accept student
router.put(
  "/accept/:id",
  studentController.acceptStudent
);

// Reject student
router.put(
  "/reject/:id",
  studentController.rejectStudent
);

// Promote all students
router.put(
  "/promote-year",
  studentController.promoteYear
);

// Update student
router.put(
  "/update/:id",
  upload.any(),
  studentController.updateStudent
);

export default router;