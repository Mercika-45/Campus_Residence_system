import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
  name: String,
  dept: String,
  phone: String,
  email: {
    type: String,
    unique: true
  },
  role: String,
  password: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Warden", wardenSchema);