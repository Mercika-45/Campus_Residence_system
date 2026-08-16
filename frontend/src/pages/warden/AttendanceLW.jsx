import { useState, useEffect } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function Attendance() {
  const [year, setYear] = useState("1");
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [showView, setShowView] = useState(false);
  const [students, setStudents] = useState([]);

  // ✅ Get warden info from localStorage
  const warden = JSON.parse(localStorage.getItem("warden"));
  const wardenType = warden?.hostelType?.toLowerCase(); // "boys" or "girls"

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/attendance/students?year=${year}`
    );
    let data = await res.json();

    // Filter students by warden type correctly
    data = Array.isArray(data)
      ? data.filter((s) => s.hostel?.hostelType?.toLowerCase() === wardenType)
      : [];

    setStudents(data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchStudents();
  }, [year]);

  /* ================= HANDLE CHANGE ================= */
  const handleAttendanceChange = (id, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      if (!date) {
        alert("Please select date");
        return;
      }

      const payload = students.map((s) => ({
        name: s.studentName,
        room: s?.hostel?.room || "",
        hostel: s?.hostel?.block || "",
        year: Number(year),
        status: attendanceData[s._id] || "Absent"
      }));

      const res = await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, attendance: payload })
      });

      const data = await res.json();
      alert(data.message || "Attendance submitted!");
    } catch (err) {
      console.error(err);
      alert("Error submitting attendance");
    }
  };

  /* ================= FETCH VIEW ================= */
  const fetchAttendance = async () => {
    try {
      if (!date) return;

      const res = await fetch(
        `http://localhost:5000/api/attendance?date=${date}&year=${year}`
      );

      const data = await res.json();

      const mapped = {};
      data.forEach((item) => {
        const student = students.find((s) => s.studentName === item.studentName);
        if (student) mapped[student._id] = item.status;
      });

      setAttendanceData(mapped);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showView && date) {
      fetchAttendance();
    }
  }, [showView, date, year, students]);

  return (
    <div className="warden-layout">
      <WardenSidebar />
      <div className="warden-page attendance-page">
        <div className="page-header">
          <h1>Attendance Management</h1>
          <p className="breadcrumb">Dashboard / Attendance</p>
        </div>

        {/* Toggle Button */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button className="action-btn" onClick={() => setShowView(!showView)}>
            {showView ? "Mark Attendance" : "View Attendance"}
          </button>
        </div>

        {/* ================= MARK ATTENDANCE ================= */}
        {!showView && (
          <>
            <div className="attendance-controls">
              <div>
                <label>Select Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="year-buttons">
                <button onClick={() => setYear("1")}>First Year</button>
                <button onClick={() => setYear("2")}>Second Year</button>
                <button onClick={() => setYear("3")}>Third Year</button>
                <button onClick={() => setYear("4")}>Fourth Year</button>
              </div>
            </div>

            <div className="table-card">
              <table className="warden-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Room No</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="4">No students found</td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.studentName}</td>
                        <td>{year} Year</td>
                        <td>{student?.hostel?.room || "-"}</td>
                        <td>
                          <select
                            className="attendance-select"
                            value={attendanceData[student._id] || ""}
                            onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="submit-box">
              <button className="primary-btn" onClick={handleSubmit}>
                Submit Attendance
              </button>
            </div>
          </>
        )}

        {/* ================= VIEW ATTENDANCE ================= */}
        {showView && (
          <>
            <div className="attendance-controls">
              <div>
                <label>Select Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <div className="year-buttons">
                <button onClick={() => setYear("1")}>First Year</button>
                <button onClick={() => setYear("2")}>Second Year</button>
                <button onClick={() => setYear("3")}>Third Year</button>
                <button onClick={() => setYear("4")}>Fourth Year</button>
              </div>
            </div>

            <div className="table-card">
              <table className="warden-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Hostel</th>
                    <th>Year</th>
                    <th>Room No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="5">No students found</td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.studentName}</td>
                        <td>{student?.hostel?.hostelName || "-"}</td>
                        <td>{year} Year</td>
                        <td>{student?.hostel?.room || "-"}</td>
                        <td>{attendanceData[student._id] || "Not Marked"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Attendance;