import express from "express";
import {
  allocateWarden,
  getAllocations,
  deleteAllocation
} from "../controllers/allocationController.js";

const router = express.Router();

router.post("/allocate", allocateWarden);
router.get("/", getAllocations);
router.delete("/:id", deleteAllocation);

export default router;