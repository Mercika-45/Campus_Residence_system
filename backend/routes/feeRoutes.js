import express from "express";
import multer from "multer";

import {
  getStudentReceipts,
  makePayment,
   deleteFee,
   getAllFees,
   
} from "../controllers/feeController.js";

import {
  getControls,
  updateControl,
  
} from "../controllers/feeControlController.js";

const router = express.Router();

/* ================= MULTER CONFIG (for future use) ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= PAYMENT ROUTES ================= */

// ✅ Online Payment (VERY IMPORTANT)
router.post("/pay", makePayment);

// ✅ Get student payment status
router.get("/student/:regNo", getStudentReceipts);
router.get("/all", getAllFees); // ✅ ADD THIS
/* ================= DELETE ROUTE ================= */

router.delete("/delete", deleteFee);
/* ================= CONTROL ROUTES ================= */

// ✅ Get all controls
router.get("/control", getControls);

// ✅ Open / Close fee payment
router.put("/control", updateControl);


export default router;