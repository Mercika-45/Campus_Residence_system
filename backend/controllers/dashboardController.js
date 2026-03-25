import Student from "../models/Student.js";
import Leave from "../models/Leave.js";
import Complaint from "../models/Complaint.js";
import Attendance from "../models/Attendance.js";

export const getWardenDashboard = async (req, res) => {
  try {
    const { hostelType } = req.query; // boys / girls

    // ✅ FILTER CONDITION
    const filter = { hostelType };

    /* ================= TOTAL STUDENTS ================= */
    const totalStudents = await Student.countDocuments({
      ...filter,
      status: "approved",
      vacated: false,
    });

    /* ================= PENDING LEAVES ================= */
    const pendingLeaves = await Leave.countDocuments({
      ...filter,
      status: "Pending",
    });

    /* ================= COMPLAINTS ================= */
    const complaints = await Complaint.countDocuments({
      ...filter,
      status: "Pending",
    });

    /* ================= ATTENDANCE ================= */
    const attendanceRecords = await Attendance.find(filter);

    let present = 0;
    let total = attendanceRecords.length;

    attendanceRecords.forEach((rec) => {
      if (rec.status === "Present") present++;
    });

    const attendancePercent =
      total === 0 ? 0 : Math.round((present / total) * 100);

    /* ================= RECENT ACTIVITY ================= */
    const recentLeaves = await Leave.find(filter)
      .sort({ createdAt: -1 })
      .limit(2);

    const recentComplaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .limit(2);

    res.json({
      totalStudents,
      pendingLeaves,
      complaints,
      attendancePercent,
      recentLeaves,
      recentComplaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard error" });
  }
};