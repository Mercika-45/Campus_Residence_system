import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema({
  warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warden"
  },
  hostel: String
}, { timestamps: true });

export default mongoose.model("WardenAllocation", allocationSchema);