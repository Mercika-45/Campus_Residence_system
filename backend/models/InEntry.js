import mongoose from "mongoose";

const inEntrySchema = new mongoose.Schema({

  studentName: {
    type: String,
    required: true
  },

  regNo: {
    type: String,
    required: true
  },

  year: {
    type: String,
    required: true
  },

  outEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OutEntry",
    required: true
  },

  outDate: {
    type: Date
  },

  returnDate: {
    type: Date
  },

  actualReturn: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "Returned"
  }

}, { timestamps: true });

export default mongoose.model("InEntry", inEntrySchema);