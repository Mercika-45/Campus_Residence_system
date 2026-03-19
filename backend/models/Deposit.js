import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    branchYearSemester: { type: String, required: true },
    registerNo: { type: String, required: true },
    department: { type: String, required: true },
    appliedOn: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Forwarded", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Deposit", depositSchema);