import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    feeType: {
      type: String,
      enum: ["hostel", "mess"],
      required: true,
      lowercase: true,
      trim: true,
    },

    period: {
      type: String, // "Year 1", "Semester 1"
      required: true,
      trim: true,
    },

    amount: Number,

    txnId: String,

    paymentMethod: {
      type: String,
      default: "Online",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

/* 🔥 Prevent duplicate payments */
feeSchema.index({ regNo: 1, feeType: 1, period: 1 }, { unique: true });

export default mongoose.model("Fee", feeSchema);