import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dept: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true },          // "executive" or "local"
  hostelType: { type: String, default: "" },       // "boys" or "girls" (important!)
  password: { type: String, required: true },
  image: { type: String, default: "" }            // store relative URL
}, { timestamps: true });

export default mongoose.model("Warden", wardenSchema);