import { useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function Attendance() {
  const [year, setYear] = useState("1");
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [showView, setShowView] = useState(false);

  const students = {
    1: [
      { name: "Anitha", room: "101", hostel: "A Block" },
      { name: "Priya", room: "102", hostel: "A Block" }
    ],
    2: [
      { name: "Karthik", room: "201", hostel: "B Block" },
      { name: "Rahul", room: "202", hostel: "B Block" }
    ],
    3: [
      { name: "Meena", room: "301", hostel: "C Block" },
      { name: "Sathya", room: "302", hostel: "C Block" }
    ],
    4: [
      { name: "Vetri", room: "401", hostel: "D Block" },
      { name: "Arun", room: "402", hostel: "D Block" }
    ]
  };

  const handleAttendanceChange = (studentName, value) => {
    setAttendanceData({
      ...attendanceData,
      [studentName]: value
    });
  };

  const handleSubmit = () => {
    console.log("Date:", date);
    console.log("Attendance:", attendanceData);
    alert("Attendance submitted successfully!");
  };

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
          <button
            className="action-btn"
            onClick={() => setShowView(!showView)}
          >
            {showView ? "Mark Attendance" : "View Attendance"}
          </button>
        </div>

        {/* ================= MARK ATTENDANCE ================= */}
        {!showView && (
          <>
            <div className="attendance-controls">
              <div>
                <label>Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
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
                  {students[year].map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{year} Year</td>
                      <td>{student.room}</td>
                      <td>
                        <select
                          value={attendanceData[student.name] || ""}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.name,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
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
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
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
                  {students[year].map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.hostel}</td>
                      <td>{year} Year</td>
                      <td>{student.room}</td>
                      <td>
                        {attendanceData[student.name] || "Not Marked"}
                      </td>
                    </tr>
                  ))}
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
