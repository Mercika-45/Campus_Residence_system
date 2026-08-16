import Warden from "../models/Warden.js";

export const getExecutiveStats = async (req, res) => {
  try {

    const email = req.query.email?.toLowerCase().trim();

    if (!email)
      return res.status(400).json({ message: "Email required" });

    // Find Executive
    const executive = await Warden.findOne({ email });

    if (
      !executive ||
      !executive.role.toLowerCase().includes("executive")
    ) {
      return res.status(404).json({ message: "Executive not found" });
    }

    // ✅ Send ONLY executive data
    res.json({
      executive
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};