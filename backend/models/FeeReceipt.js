import mongoose from "mongoose";

const FeeReceiptSchema = new mongoose.Schema(
{
  studentName: String,
  regNo: String,

  gender: String,
  year: String,

  hostel: String,
  room: String,
  hostelType: String, // boys / girls

  feeType: String, // hostel | mess
  period: String,

  receipt: String,

  status: {
    type: String,
    default: "Pending"
  },

  rejectReason: String,

  uploadedAt: {
    type: Date,
    default: Date.now
  },

  approvedAt: Date,
  rejectedAt: Date
},
{ timestamps: true }
);

export default mongoose.model("FeeReceipt", FeeReceiptSchema);