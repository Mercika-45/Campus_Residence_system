import mongoose from "mongoose";

const adminHostelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hostel name is required"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Hostel type is required"],
      enum: ["Boys", "Girls"], // only these values allowed
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional: admin who added the hostel
    },
  },
  { timestamps: true }
);

const AdminHostel = mongoose.model("AdminHostel", adminHostelSchema);

export default AdminHostel;