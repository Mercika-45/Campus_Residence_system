import express from "express";
import {
  createVacating,
  getVacating,
  approveVacating,
} from "../controllers/vacatingController.js";

const router = express.Router();

router.post("/vacating", createVacating);
router.get("/vacating", getVacating);
router.put("/vacating/approve/:id", approveVacating);

export default router;