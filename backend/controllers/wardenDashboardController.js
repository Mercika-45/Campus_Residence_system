import Warden from "../models/Warden.js";

// Get Warden Dashboard Data (similar to Executive)
export const getWardenDashboardStats = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const warden = await Warden.findOne({ email });
    if (!warden) return res.status(404).json({ message: "Warden not found" });

    // Send ONLY warden data (like Executive)
    res.json({
      warden
    });
  } catch (error) {
    console.error("Warden Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};