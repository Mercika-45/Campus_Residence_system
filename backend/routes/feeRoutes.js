import express from "express";
import multer from "multer";
import {
  uploadReceipt,
  getStudentReceipts,
  getAllReceipts,
  approveReceipt,
  rejectReceipt
} from "../controllers/feeController.js";

import {
  getControls,
  updateControl
} from "../controllers/feeControlController.js"; // 🔥 NEW

const router = express.Router();

/* ================= STORAGE CONFIG ================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

/* ================= FILE VALIDATION ================= */

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

/* ================= RECEIPT ROUTES ================= */

/* Student upload */
router.post("/upload", upload.single("receipt"), uploadReceipt);

/* Student view */
router.get("/student/:regNo", getStudentReceipts);

/* Executive view */
router.get("/all", getAllReceipts);

/* Approve */
router.put("/approve/:id", approveReceipt);

/* Reject */
router.put("/reject/:id", rejectReceipt);

/* ================= 🔥 GLOBAL CONTROL ROUTES ================= */

/* Get all controls */
router.get("/control", getControls);

/* Open / Close upload globally */
router.put("/control", updateControl);

export default router;