import Warden from "../models/Warden.js";
import bcrypt from "bcryptjs";

// ADD WARDEN
export const addWarden = async (req, res) => {
  try {
    const { name, dept, phone, email, role, password } = req.body;

    const existing = await Warden.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIX: get image from req.file
    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "https://ui-avatars.com/api/?name=Warden&background=0A1F44&color=fff";

    const newWarden = new Warden({
      name,
      dept,
      phone,
      email,
      role,
      password: hashedPassword,
      image
    });

    await newWarden.save();

    res.status(201).json({
      message: "Warden added successfully",
      data: newWarden
    });

  } catch (error) {
    console.log(error); // 👈 IMPORTANT for debugging
    res.status(500).json({ message: error.message });
  }
};

// GET ALL WARDENS
export const getWardens = async (req, res) => {
  try {
    const wardens = await Warden.find();
    res.status(200).json(wardens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};