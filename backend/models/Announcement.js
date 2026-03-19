import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      enum: ["student", "warden", "executive", "admin", "all"],
      required: true,
    },

    createdBy: {
      type: String,
      enum: ["warden", "executive", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);