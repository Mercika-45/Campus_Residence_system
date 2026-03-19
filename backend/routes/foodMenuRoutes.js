import express from "express";
import { getFoodMenu, updateFoodMenu } from "../controllers/foodMenuController.js";

const router = express.Router();

router.get("/", getFoodMenu);
router.put("/update", updateFoodMenu);

export default router;