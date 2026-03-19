import mongoose from "mongoose";

const outEntrySchema = new mongoose.Schema(
{
  studentName: {
    type: String,
    required: true,
  },

  regNo: {
    type: String,
    required: true,
  },

  parentMobile: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  outDate: {
    type: Date,
    required: true,
  },

  returnDate: {
    type: Date,
    required: true,
  },

  reason: {
    type: String,
  },

  status: {
    type: String,
    default: "Out"
  },

  lateAlertSent: {
  type: Boolean,
  default: false
},

  actualReturn: {
    type: Date
  }

},
{ timestamps: true }
);

export default mongoose.model("OutEntry", outEntrySchema);