import Warden from "../models/Warden.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ================= ADD WARDEN =================
export const addWarden = async (req, res) => {
  try {
    const { name, dept, phone, email, role, password, hostelType } = req.body;

    if (!name || !dept || !phone || !email || !role || !password || !hostelType) {
      return res.status(400).json({ message: "Please fill all warden details including hostel type" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingWarden = await Warden.findOne({ email: normalizedEmail });
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingWarden || existingUser) {
      return res.status(400).json({ message: "Warden or User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWarden = new Warden({
      name,
      dept,
      phone,
      email: normalizedEmail,
      role,
      hostelType,
      password: hashedPassword,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newWarden.save();

    // Create User with hostelType
    try {
      await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: role.toLowerCase().includes("executive") ? "executive" : "warden",
        hostelType, // ✅ Important
      });
    } catch (userErr) {
      console.error("User creation failed:", userErr.message);
    }

    res.status(201).json({ message: "Warden added successfully" });
  } catch (err) {
    console.error("Add Warden Error:", err.message);
    res.status(500).json({ message: "Error adding warden" });
  }
};
// ================= DELETE WARDEN =================
export const deleteWarden = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove from Warden collection
    const deleted = await Warden.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // Optional: remove from User collection
    await User.findOneAndDelete({ email: deleted.email });

    res.status(200).json({ message: "Warden deleted successfully" });

  } catch (err) {
    console.error("Delete Warden Error:", err.message);
    res.status(500).json({ message: "Error deleting warden" });
  }
};

// ================= UPDATE WARDEN =================

export const updateWarden = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dept, phone, email, role, password, hostelType } = req.body;

    const updatedData = {
      name,
      dept,
      phone,
      email: email.toLowerCase().trim(),
      role,
      hostelType
    };

    // Hash password if admin changed it
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    // Update Warden collection
    const updatedWarden = await Warden.findByIdAndUpdate(id, updatedData, { returnDocument: "after" });
    if (!updatedWarden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // Update User login credentials
    await User.findOneAndUpdate(
      { email: updatedWarden.email },
      {
        name: updatedWarden.name,
        email: updatedWarden.email,
        role: updatedWarden.role.toLowerCase().includes("executive") ? "executive" : "warden",
        hostelType: updatedData.hostelType, // ✅ fixed
        ...(password ? { password: updatedData.password } : {})
      },
      { returnDocument: "after" }
    );

    res.status(200).json({ message: "Warden updated successfully with login credentials", warden: updatedWarden });

  } catch (err) {
    console.error("Update Warden Error:", err.message);
    res.status(500).json({ message: "Error updating warden" });
  }
};

// ================= GET ALL WARDENS =================
export const getWardens = async (req, res) => {
  try {
    const wardens = await Warden.find();
    res.status(200).json(wardens);
  } catch (err) {
    console.error("Get Wardens Error:", err.message);
    res.status(500).json({ message: "Error fetching wardens" });
  }
};