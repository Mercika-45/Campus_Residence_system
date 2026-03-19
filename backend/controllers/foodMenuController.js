import FoodMenu from "../models/FoodMenu.js";

// ✅ Get Full Weekly Menu
export const getFoodMenu = async (req, res) => {
  try {
    const menu = await FoodMenu.find().sort({ _id: 1 });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Full Weekly Menu
export const updateFoodMenu = async (req, res) => {
  try {
    const updatedMenu = req.body; // array of 7 days

    for (let item of updatedMenu) {
      await FoodMenu.findOneAndUpdate(
        { day: item.day },
        {
          morning: item.morning,
          afternoon: item.afternoon,
          dinner: item.dinner,
        },
        { upsert: true }
      );
    }

    res.status(200).json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};