import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    registerNo: { type: String, required: true },
    hostel: { type: String, required: true },
    room: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },

    completed: { type: Boolean, default: false }, // By Warden/Admin
    approved: { type: Boolean, default: false },  // By Student

    status: {
      type: String,
      enum: ["Pending", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);