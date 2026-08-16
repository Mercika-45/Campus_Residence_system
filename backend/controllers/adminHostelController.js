import AdminHostel from "../models/AdminHostel.js";

// ================= ADD HOSTEL =================
export const addAdminHostel = async (req, res) => {
  try {
    let { name, type, createdBy } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Please provide hostel name and type" });
    }

    // Normalize type to match enum
    type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    const validTypes = ["Boys", "Girls"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `Invalid hostel type. Allowed types: ${validTypes.join(", ")}` });
    }

    const existingHostel = await AdminHostel.findOne({ name });
    if (existingHostel) {
      return res.status(400).json({ message: "Hostel already exists" });
    }

    const newHostel = new AdminHostel({ name, type, createdBy });
    await newHostel.save();

    res.status(201).json({ message: "Hostel added successfully", hostel: newHostel });
  } catch (err) {
    console.error("Add Hostel Error:", err);
    res.status(500).json({ message: "Error adding hostel" });
  }
};

// ================= DELETE HOSTEL =================
export const deleteAdminHostel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHostel = await AdminHostel.findByIdAndDelete(id);
    if (!deletedHostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    res.status(200).json({ message: "Hostel deleted successfully" });
  } catch (err) {
    console.error("Delete Hostel Error:", err);
    res.status(500).json({ message: "Error deleting hostel" });
  }
};

// ================= GET ALL HOSTELS =================
export const getAdminHostels = async (req, res) => {
  try {
    const hostels = await AdminHostel.find();
    res.status(200).json(hostels);
  } catch (err) {
    console.error("Get Hostels Error:", err);
    res.status(500).json({ message: "Error fetching hostels" });
  }
};