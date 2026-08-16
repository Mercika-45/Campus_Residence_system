import OutEntry from "../models/OutEntry.js";
import Student from "../models/Student.js";
import twilio from "twilio";

/* ================= CREATE ================= */
export const createOutEntry = async (req, res) => {
  try {

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const {
  studentName,
  regNo,
  parentMobile,
  year,
  outDate,
  returnDate,
  reason,
  wardenType   // ✅ ADD THIS
} = req.body;

    if (!studentName || !regNo || !parentMobile || !year || !outDate || !returnDate) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }
    

    const existingEntry = await OutEntry.findOne({
  regNo,
  outDate
});

if (existingEntry) {
  return res.status(400).json({
    message: "This Out Entry already exists"
  });
}
const newEntry = await OutEntry.create({
  studentName,
  regNo,
  parentMobile,
  year,
  outDate,
  returnDate,
  reason,
  wardenType: wardenType.toLowerCase(), // ✅ MUST ADD
});

    try {

      const cleanNumber = parentMobile.toString().replace(/\D/g, "");

      await client.messages.create({
        body: `Hostel Alert:

Student: ${studentName}
Reg No: ${regNo}

Out Time: ${new Date(outDate).toLocaleString()}
Return Time: ${new Date(returnDate).toLocaleString()}

Reason: ${reason || "Not provided"}
        `,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${cleanNumber}`,
      });

    } catch (smsError) {}

    res.status(201).json({
      message: "Out entry recorded",
      data: newEntry,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentByRegNo = async (req, res) => {
  try {
    const { regNo } = req.params;

    const student = await Student.findOne({
      registerNumber: regNo
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      studentName: student.studentName,
      yearOfStudy: student.college?.yearOfStudy,
      fatherMobile: student.family?.fatherMobile
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ================= */
export const getOutEntries = async (req, res) => {
  try {
    const { wardenType, year, date } = req.query;

    let filter = {};

    // ✅ FILTER BY WARDEN TYPE (MOST IMPORTANT)
    if (wardenType) {
      filter.wardenType = wardenType.toLowerCase();
    }

    // ✅ FILTER BY YEAR
    if (year) {
      filter.year = year;
    }

    // ✅ FILTER BY DATE
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.outDate = { $gte: start, $lte: end };
    }

    const entries = await OutEntry.find(filter).sort({ createdAt: -1 });

    res.status(200).json(entries);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE ================= */
export const updateOutEntry = async (req, res) => {
  try {

    const updated = await OutEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


/* ================= DELETE ================= */
export const deleteOutEntry = async (req, res) => {
  try {

    await OutEntry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Entry deleted successfully",
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};