import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Boys", "Girls"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);