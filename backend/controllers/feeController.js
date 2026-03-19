import FeeReceipt from "../models/FeeReceipt.js";
import FeeControl from "../models/FeeControl.js"; // 🔥 NEW

/* ================= UPLOAD RECEIPT ================= */

export const uploadReceipt = async (req, res) => {
  try {
    const { studentName, regNo, feeType, period } = req.body;

    /* 🔥 CHECK GLOBAL CONTROL */
    const control = await FeeControl.findOne({ feeType, period });

    if (!control || !control.isOpen) {
      return res.status(400).json({
        message: "Upload not allowed for this period"
      });
    }

    /* 🔍 FIND EXISTING RECEIPT */
    let fee = await FeeReceipt.findOne({
      regNo,
      feeType,
      period
    });

    /* ❌ Already paid */
    if (fee && fee.status === "Paid") {
      return res.status(400).json({
        message: "Already paid"
      });
    }

    /* ❌ No file */
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    /* ✅ CREATE OR UPDATE */
    if (fee) {
      fee.receipt = req.file.filename;
      fee.status = "Pending";
      fee.rejectReason = "";
      fee.uploadedAt = new Date();
    } else {
      fee = new FeeReceipt({
        studentName,
        regNo,
        feeType,
        period,
        receipt: req.file.filename,
        status: "Pending"
      });
    }

    await fee.save();

    res.json({ message: "Receipt uploaded successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= STUDENT RECEIPTS ================= */

export const getStudentReceipts = async (req, res) => {
  try {
    const receipts = await FeeReceipt.find({
      regNo: req.params.regNo
    }).sort({ feeType: 1, period: 1 });

    res.json(receipts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= ALL RECEIPTS ================= */

export const getAllReceipts = async (req, res) => {
  try {
    const { status, feeType } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (feeType) filter.feeType = feeType;

    const receipts = await FeeReceipt.find(filter)
      .sort({ uploadedAt: -1 });

    res.json(receipts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= APPROVE ================= */

export const approveReceipt = async (req, res) => {
  try {
    const fee = await FeeReceipt.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        message: "Receipt not found"
      });
    }

    if (fee.status === "Paid") {
      return res.status(400).json({
        message: "Already approved"
      });
    }

    fee.status = "Paid";
    fee.approvedAt = new Date();

    await fee.save();

    res.json({ message: "Payment Approved" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= REJECT ================= */

export const rejectReceipt = async (req, res) => {
  try {
    const { reason } = req.body;

    const fee = await FeeReceipt.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        message: "Receipt not found"
      });
    }

    fee.status = "Rejected";
    fee.rejectReason = reason || "Invalid receipt";
    fee.rejectedAt = new Date();

    await fee.save();

    res.json({ message: "Receipt Rejected" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};