import mongoose from "mongoose";

const feeReceiptSchema = new mongoose.Schema({

  studentName: {
    type: String,
    required: true
  },

  regNo: {
    type: String,
    required: true
  },

  feeType: {
    type: String,
    enum: ["hostel", "mess"],
    required: true
  },

  period: {
    type: String,
    required: true
  },

  receipt: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["NotUploaded", "Pending", "Paid", "Rejected"],
    default: "NotUploaded"
  },

  rejectReason: {
    type: String,
    default: ""
  },


  /* 🔥 TRACK APPROVAL */
  approvedAt: Date,

  /* 🔥 TRACK REJECTION */
  rejectedAt: Date,

  uploadedAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("FeeReceipt", feeReceiptSchema);