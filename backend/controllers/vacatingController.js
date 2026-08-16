import Vacating from "../models/Vacating.js";
import Student from "../models/Student.js";

export const createVacating = async (req, res) => {
  const data = await Vacating.create(req.body);
  res.json(data);
};

export const getVacating = async (req, res) => {
  const data = await Vacating.find().sort({ createdAt: -1 });
  res.json(data);
};

// ✅ FIXED FUNCTION
export const approveVacating = async (req, res) => {
  try {
    console.log("🔥 APPROVE API HIT");

    const vacating = await Vacating.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    const regNo = String(vacating.registerNo).trim();

    // 👉 YOUR CODE GOES HERE
    const updatedStudent = await Student.findOneAndUpdate(
      {
        registerNumber: {
          $regex: `^${regNo}$`,
          $options: "i"
        }
      },
      {
        vacated: true,
        vacatedYear: new Date().getFullYear(),
        "hostel.room": null,
        "hostel.hostelName": null
      },
      { new: true }
    );

    console.log("UPDATED STUDENT:", updatedStudent);

    res.json({ message: "Success", updatedStudent });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
};