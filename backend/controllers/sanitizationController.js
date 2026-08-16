import Sanitization from "../models/Sanitization.js";

// Add new record
export const addSanitization = async (req, res) => {
  try {
    const record = new Sanitization(req.body);
    await record.save();
    res.status(201).json({ message: "Sanitization record added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding record" });
  }
};

// Get records by wardenType
export const getSanitization = async (req, res) => {
  try {
    const { wardenType } = req.query;
    const records = await Sanitization.find({ wardenType });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching records" });
  }
};