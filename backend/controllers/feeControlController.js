import FeeControl from "../models/FeeControl.js";

/* ================= GET ALL CONTROLS ================= */

export const getControls = async (req, res) => {
  try {
    const controls = await FeeControl.find();
    res.json(controls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE CONTROL ================= */

export const updateControl = async (req, res) => {
  try {
    const { feeType, period, isOpen } = req.body;

    const control = await FeeControl.findOneAndUpdate(
      { feeType, period },
      { isOpen },
      { new: true, upsert: true }
    );

    res.json({
      message: isOpen ? "Upload opened" : "Upload closed",
      control
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};