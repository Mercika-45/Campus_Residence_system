import mongoose from "mongoose";

// ✅ STUDENT
const studentSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  studentName: { type: String, required: false},  // ✅ ADD THIS
  year: { type: String, required: true },
  department: { type: String, required: true },
  hostelType: String
});

// ✅ ROOM
const roomSchema = new mongoose.Schema({
  roomNo: String,
  totalBeds: Number,
  occupied: { type: Number, default: 0 },
  students: {
    type: [studentSchema],
    default: []   // ✅ IMPORTANT FIX
  }
});

// ✅ BLOCK
const blockSchema = new mongoose.Schema({
  name: String,
  rooms: [roomSchema]
});

// ✅ HOSTEL
const hostelSchema = new mongoose.Schema(
  {
    name: String,
    hostelType: String, // boys / girls
    blocks: [blockSchema]
  },
  { timestamps: true } // ✅ optional improvement
);

export default mongoose.model("Hostel", hostelSchema);