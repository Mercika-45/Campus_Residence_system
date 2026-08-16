import mongoose from "mongoose";

const sanitizationSchema = new mongoose.Schema({
  area: { type: String, required: true },
  areaType: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String },
  wardenType: { type: String, required: true } // "boys" or "girls"
}, { timestamps: true });

const Sanitization = mongoose.model("Sanitization", sanitizationSchema);

export default Sanitization;