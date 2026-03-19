import Hostel from "../models/Hostel.js";

// ➤ Get all hostels
export const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 });
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
};

// ➤ Add new hostel
export const addHostel = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "All fields required" });
    }

    // prevent duplicate
    const exists = await Hostel.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Hostel already exists" });
    }

    const hostel = new Hostel({ name, type });
    await hostel.save();

    res.status(201).json({ message: "Hostel added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding hostel" });
  }
};

// ➤ Delete hostel
export const deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hostel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting hostel" });
  }
};