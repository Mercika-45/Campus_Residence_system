import express from "express";
import {
  getHostels,
  addHostel,
  deleteHostel,
} from "../controllers/hostelController.js";

const router = express.Router();

// GET all hostels
router.get("/", getHostels);

// ADD hostel
router.post("/add", addHostel);

// DELETE hostel
router.delete("/:id", deleteHostel);

export default router;