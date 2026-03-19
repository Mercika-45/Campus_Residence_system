import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  studentName: String,
  registerNo: String,
  semester: String,
  hostelName: String,
  roomNo: String,
  leaveType: String,
  fromDate: Date,
  toDate: Date,
  days: Number,
  reason: String,
  messReduction: Boolean,

  appliedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending"
  },
  reductionApproved: {
  type: Boolean,
  default: false,
},
 
}, { timestamps: true });

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;