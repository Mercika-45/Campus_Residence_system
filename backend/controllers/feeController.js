import Fee from "../models/Fee.js";

/* ================= GET STUDENT RECEIPTS ================= */
export const getStudentReceipts = async (req, res) => {
  try {
    const regNo = req.params.regNo.trim();

 console.log("FETCH PARAM 👉", regNo);

const data = await Fee.find({
  regNo: { $regex: `^${regNo}$`, $options: "i" }
});

console.log("DB RESULT 👉", data);

    console.log("FETCHED RECEIPTS 👉", data);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

/* ================= MAKE PAYMENT ================= */
export const makePayment = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    // 🔥 CLEAN DATA (VERY IMPORTANT)
    const regNo = req.body.regNo.trim().toUpperCase();
   const period = req.body.period.trim().toLowerCase();
const feeType = req.body.feeType.trim().toLowerCase();

    const { studentName, amount, txnId } = req.body;

    console.log("CLEAN DATA 👉", { regNo, feeType, period });

    // 🔍 Check if record already exists
    let record = await Fee.findOne({ regNo, feeType, period });

    if (record) {
      // ✅ UPDATE EXISTING
      record.status = "Paid";
      record.amount = amount;
      record.txnId = txnId;
      record.paymentMethod = "Online";

      await record.save();

      console.log("UPDATED 👉", record);
    } else {
      // ✅ CREATE NEW
      record = await Fee.create({
        regNo,
        studentName,
        feeType,
        period,
        amount,
        txnId,
        paymentMethod: "Online",
        status: "Paid",
      });

      console.log("CREATED 👉", record);
    }

    res.json({
      success: true,
      message: "Payment saved successfully",
      record,
    });

  } catch (err) {
    console.error("ERROR 👉", err);

    // 🔥 HANDLE DUPLICATE ERROR
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Payment already exists",
      });
    }

    res.status(500).json({
      message: "Payment failed",
    });
  }
};
/* ================= DELETE FEE ================= */

export const deleteFee = async (req, res) => {
  try {
    const { regNo, feeType, period } = req.body;

    const cleanRegNo = regNo.trim();
    const cleanType = feeType.toLowerCase().trim();
    const cleanPeriod = period.toLowerCase().trim();

    const deleted = await Fee.findOneAndDelete({
      regNo: cleanRegNo,
      feeType: cleanType,
      period: cleanPeriod,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/* ================= GET ALL FEES ================= */

export const getAllFees = async (req, res) => {
  try {
    const data = await Fee.find();

    console.log("ALL FEES 👉", data);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all fees" });
  }
};
export const promoteSemester = async (req, res) => {
  try {
    const students = await Student.find({
      status: "approved",
      vacated: false
    });

    const year = new Date().getFullYear();

    for (const student of students) {

      let sem = Number(student?.college?.semester);

      if (!sem) continue;

      // promote semester
      if (sem < 8) {
        student.college.semester = sem + 1;
      }

      // final semester → mark vacated
      else if (sem === 8) {
        student.vacated = true;
        student.vacatedYear = year;
      }

      await student.save();
    }

    res.json({
      message: "Semester promoted successfully from Fee Controller"
    });

  } catch (err) {
    console.error("PROMOTE ERROR:", err);
    res.status(500).json({
      message: "Promotion failed",
      error: err.message
    });
  }
};