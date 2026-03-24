import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },

    studentName: String,
    room: String,
    hostel: String,

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Absent"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);