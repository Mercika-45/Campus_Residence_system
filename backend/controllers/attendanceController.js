import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

/* ================= MARK ATTENDANCE ================= */

export const markAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    if (!date || !attendance) {
      return res.status(400).json({ message: "Missing data" });
    }

    // remove old records (same date + year)
    const year = attendance[0]?.year;

    await Attendance.deleteMany({ date, year });

    const records = attendance.map((item) => ({
      date,
      year: item.year,
      studentName: item.name,
      room: item.room,
      hostel: item.hostel,
      status: item.status
    }));

    await Attendance.insertMany(records);

    res.json({ message: "Attendance saved successfully ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ATTENDANCE ================= */

export const getAttendance = async (req, res) => {
  try {
    const { date, year } = req.query;

    const records = await Attendance.find({
      date,
      year: Number(year)
    });

    res.json(records);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

/* ================= GET STUDENTS BY YEAR ================= */

export const getStudentsByYear = async (req, res) => {
  try {
    const { year } = req.query;

    const students = await Student.find({
      status: "approved",
      vacated: false,
      "college.yearOfStudy": Number(year)
    });

    res.json(students);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching students" });
  }
};