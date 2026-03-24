import express from "express";
import * as studentController from "../controllers/studentController.js";
import upload from "../middleware/upload.js";
import Student from "../models/Student.js";
import Complaint from "../models/Complaint.js"; // ✅ FIX

const router = express.Router();

/* ================= COMPLAINTS ================= */

router.get("/complaints/:registerNo", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      registerNo: req.params.registerNo,
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= PROFILE ================= */

router.get("/profile/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ================= REGISTER ================= */

router.post(
  "/register",
  upload.any(),
  studentController.registerStudent
);

/* ================= VIEW STUDENTS ================= */

// ✅ Backend will filter based on role & gender
router.get("/new", studentController.getNewStudents);

router.get("/approved", studentController.getApprovedStudents);

router.get("/old", studentController.getOldStudents);

// Get single student
router.get("/:id", studentController.getStudentById);

/* ================= ACTIONS ================= */

router.put("/accept/:id", studentController.acceptStudent);

router.put("/reject/:id", studentController.rejectStudent);

router.put("/promote-year", studentController.promoteYear);

router.put(
  "/update/:id",
  upload.any(),
  studentController.updateStudent
);

export default router;