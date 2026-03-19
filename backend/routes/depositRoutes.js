import express from "express";
import {
  createDeposit,
  getDeposit,
  approveDeposit,
} from "../controllers/depositController.js";

const router = express.Router();

router.post("/deposit", createDeposit);
router.get("/deposit", getDeposit);
router.put("/deposit/approve/:id", approveDeposit);

export default router;