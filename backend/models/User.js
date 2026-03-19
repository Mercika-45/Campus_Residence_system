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

    // ✅ ADD THIS
    hostelType: {
      type: String,
      enum: ["boys", "girls"],
      required: function () {
        return this.role === "executive";
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