import Allocation from "../models/WardenAllocation.js";

// CREATE ALLOCATION
export const allocateWarden = async (req, res) => {
  try {
    const { wardenId, hostel } = req.body;

    const existing = await Allocation.findOne({ hostel });

    if (existing) {
      return res.status(400).json({
        message: "Hostel already assigned"
      });
    }

    const allocation = new Allocation({
      warden: wardenId,
      hostel
    });

    await allocation.save();

    res.status(201).json({
      message: "Warden allocated successfully",
      data: allocation
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALLOCATIONS
export const getAllocations = async (req, res) => {
  try {
    const data = await Allocation.find()
      .populate("warden");

    res.status(200).json(data);
  } catch (error) {
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