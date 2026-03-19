import mongoose from "mongoose";

const feeControlSchema = new mongoose.Schema({
  feeType: {
    type: String,
    enum: ["hostel", "mess"],
    required: true
  },

  period: {
    type: String,
    required: true
  },

  isOpen: {
    type: Boolean,
    default: false
  }
});

/* 🔥 Prevent duplicate entries */
feeControlSchema.index({ feeType: 1, period: 1 }, { unique: true });

export default mongoose.model("FeeControl", feeControlSchema);