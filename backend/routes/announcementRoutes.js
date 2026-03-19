import express from "express";
import {
  createAnnouncement,
  getAnnouncementsByRole,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncementsByRole);
router.delete("/:id", deleteAnnouncement);

export default router;