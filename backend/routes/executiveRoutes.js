import express from "express";
import Executive from "../models/Executive.js";
import Hostel from "../models/Hostel.js";
import Student from "../models/Student.js";
import Warden from "../models/Warden.js";

const router = express.Router();

// GET stats for a logged-in executive
router.get("/:email/stats", async (req, res) => {
  const { email } = req.params;

  try {
    // Find executive
    const exec = await Executive.findOne({ email });
    if (!exec) return res.status(404).json({ message: "Executive not found" });

    // Count hostels, students, and wardens for this executive's hostel type
    const blocks = await Hostel.countDocuments({ type: exec.hostelType });
    const students = await Student.countDocuments({ hostelType: exec.hostelType });
    const wardens = await Warden.countDocuments({ hostelType: exec.hostelType });

    res.json({
      blocks,
      students,
      wardens,
      phone: exec.phone || "",
      image: exec.image || "",
      status: exec.status || "Active"
    });
  } catch (err) {
    console.error("Executive stats error:", err.message);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

export default router;