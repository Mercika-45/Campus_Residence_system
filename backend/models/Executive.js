import mongoose from "mongoose";

const ExecutiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hostelType: { type: String, enum: ["boys", "girls"], required: true },
  phone: { type: String },
  image: { type: String },
  status: { type: String, default: "Active" }
});

export default mongoose.model("Executive", ExecutiveSchema);