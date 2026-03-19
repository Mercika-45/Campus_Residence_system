import Leave from "../models/Leave.js";

// =============================
// CREATE LEAVE
// =============================
export const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    const savedLeave = await leave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// GET ALL LEAVES
// =============================
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// ✅ GET STUDENT LEAVES (FIXED)
// =============================
export const getStudentLeaves = async (req, res) => {
  try {
    const { registerNo } = req.params;

    if (!registerNo) {
      return res.status(400).json({ message: "Register number is required" });
    }

    const leaves = await Leave.find({ registerNo })
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching student leaves:", error);
    res.status(500).json({ message: error.message });
  }
};



// =============================
// APPROVE REDUCTION
// =============================
export const approveReduction = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { reductionApproved: true },
      { new: true }
    );

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =============================
// APPROVE LEAVE
// =============================
export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};