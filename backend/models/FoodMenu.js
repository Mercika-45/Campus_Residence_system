import mongoose from "mongoose";

const foodMenuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      unique: true
    },
    morning: {
      type: String,
      required: true
    },
    afternoon: {
      type: String,
      required: true
    },
    dinner: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("FoodMenu", foodMenuSchema);