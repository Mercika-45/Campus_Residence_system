import Allocation from "../models/WardenAllocation.js";
import Warden from "../models/Warden.js";

// CREATE ALLOCATION
export const allocateWarden = async (req, res) => {
  try {
    const { wardenId, hostel } = req.body;

    // 1️⃣ Check if warden exists
    const warden = await Warden.findById(wardenId);
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    // 2️⃣ Check if the hostel is already assigned for the same role
    const existing = await Allocation.find()
      .populate("warden");

    const conflict = existing.find(
      (alloc) =>
        alloc.hostel === hostel &&
        alloc.warden.role === warden.role
    );

    if (conflict) {
      return res.status(400).json({
        message: `Hostel already assigned to a ${warden.role} warden`,
      });
    }

    // 3️⃣ Create allocation
    const allocation = new Allocation({
      warden: wardenId,
      hostel,
    });

    await allocation.save();

    res.status(201).json({
      message: "Warden allocated successfully",
      data: allocation,
    });

  } catch (error) {
    console.error("Allocate Warden Error:", error.message);
    res.status(500).json({ message: "Allocation failed", error: error.message });
  }
};
// GET ALLOCATIONS
// GET ALLOCATIONS
// GET ALLOCATIONS
export const getAllocations = async (req, res) => {
  try {
    const data = await Allocation.find().populate("warden");

    // Include hostelType directly from Warden/User
    const formatted = data.map((item) => ({
      _id: item._id,
      hostel: item.hostel,
      warden: {
        _id: item.warden._id,
        name: item.warden.name,
        email: item.warden.email,
        phone: item.warden.phone,
        role: item.warden.role,
        image: item.warden.image,
        hostelType: item.warden.hostelType || "N/A", // ✅ now included
      },
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE ALLOCATION
export const deleteAllocation = async (req, res) => {
  try {
    const { id } = req.params;

    await Allocation.findByIdAndDelete(id);

    res.status(200).json({
      message: "Allocation removed"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};