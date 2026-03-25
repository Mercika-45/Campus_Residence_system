import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  hostelName: String,

  hostelType: {
    type: String,
    enum: ["Boys Hostel", "Girls Hostel"], // ✅ MUST match Hostel model
  },

  block: String,
  floor: String,
  room: String,
  bedNumber: String,
  foodPreference: String,

  feeReceipt: {
    type: String,
    default: ""
  }
},
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);