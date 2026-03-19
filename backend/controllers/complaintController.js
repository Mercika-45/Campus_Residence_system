import Complaint from "../models/Complaint.js";


// 🟢 Student → Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🟢 All Roles → Get Complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🟢 Warden/Admin → Mark Completed
export const markCompleted = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    complaint.completed = true;

    // 🔥 Important Logic
    complaint.status =
      complaint.completed && complaint.approved
        ? "Resolved"
        : "Pending";

    await complaint.save();

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🟢 Student → Approve Complaint
export const approveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    complaint.approved = true;

    // 🔥 Important Logic
    complaint.status =
      complaint.completed && complaint.approved
        ? "Resolved"
        : "Pending";

    await complaint.save();

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};