import express from "express";
import {
  getHostelsByType,
  getAllHostels,
  addHostel,
  addBlock,
  addRoom,
  allocateRoom,
  deleteHostel,
  deleteBlock,
  deleteRoom,
  editHostel,
  editBlock,
  editRoom
} from "../controllers/hostelController.js";

const router = express.Router();

router.get("/", getAllHostels);
router.get("/:type", getHostelsByType);
router.post("/add-hostel", addHostel);
router.post("/add-block", addBlock);
router.post("/add-room", addRoom);
router.post("/allocate", allocateRoom);
router.delete("/delete-hostel/:hostelId", deleteHostel);
router.delete("/delete-block", deleteBlock);
router.delete("/delete-room", deleteRoom);
router.put("/edit-hostel", editHostel);
router.put("/edit-block", editBlock);
router.put("/edit-room", editRoom);



export default router;