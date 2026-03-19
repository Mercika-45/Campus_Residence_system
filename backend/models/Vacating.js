import mongoose from "mongoose";

const vacatingSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    address: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    registerNo: { type: String, required: true },
    hostelName: { type: String, required: true },
    roomNo: { type: String, required: true },
    dateJoining: { type: Date, required: true },
    dateVacating: { type: Date, required: true },
    reason: { type: String, required: true },
    noDues: { type: String },
    remarks: { type: String },
    bankAcc: { type: String },
    ifsc: { type: String },
    mobile: { type: String },
    appliedOn: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Forwarded", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vacating", vacatingSchema);