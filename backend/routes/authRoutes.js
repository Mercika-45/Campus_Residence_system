import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js"; // ✅ ADD THIS

const router = express.Router();


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔥 IMPORTANT FIX STARTS HERE
    if (user.role === "student") {
      const student = await Student.findOne({ email: normalizedEmail });

      if (!student) {
        return res.status(404).json({
          message: "Student record not found",
        });
      }

      if (student.status !== "approved") {
        return res.status(403).json({
          message: "Waiting for admin approval",
        });
      }
    }
    // 🔥 IMPORTANT FIX ENDS HERE

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hostelType: user.hostelType || null,
        hostelBlock: user.hostelBlock || null,
      },
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;