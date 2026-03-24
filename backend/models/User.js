import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "warden", "executive", "admin"],
      required: true,
    },

    // ✅ Hostel type required for all wardens (executive + local)
    hostelType: {
      type: String,
      enum: ["boys", "girls"],
      required: function () {
        return this.role === "executive" || this.role === "warden";
      },
    },

    // optional
    hostelBlock: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);