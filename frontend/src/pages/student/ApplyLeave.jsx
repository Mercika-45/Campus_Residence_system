import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function ApplyLeave() {
  const API = "http://localhost:5000/api";

  const today = new Date().toISOString().split("T")[0];

  const [studentName, setStudentName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState(""); // ✅ NEW
  const [hostelName, setHostelName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [messReduction, setMessReduction] = useState(false);
  const [appliedOn] = useState(today);

  /* ================= FETCH STUDENT ================= */
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
      window.location.href = "/student-login";
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `${API}/student/profile/${userData.email}`
        );

        const data = res.data;

        setStudentName(data.studentName || "");

        // normalize register number
        const reg = data?.registerNumber
          ? data.registerNumber.trim().toUpperCase()
          : "";

        setRegisterNo(reg);

        setSemester(data.college?.yearOfStudy || "");
        setBranch(data.college?.department || ""); // ✅ FIX

        setHostelName(data.hostel?.hostelName || "");
        setRoomNo(data.hostel?.room || "");

      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchStudent();
  }, []);

  /* ================= CALCULATE DAYS ================= */
  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diff =
      Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    return diff > 0 ? diff : 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !studentName ||
      !registerNo ||
      !semester ||
      !branch ||
      !hostelName ||
      !roomNo ||
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason
    ) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      alert("To Date cannot be before From Date");
      return;
    }

    const newLeave = {
      studentName,
      registerNo: registerNo.trim().toUpperCase(),
      semester,
      branch, // ✅ included
      hostelName,
      roomNo,
      leaveType,
      fromDate,
      toDate,
      days: calculateDays(),
      reason,
      messReduction: calculateDays() > 5 ? messReduction : false,
      appliedOn,
    };

    try {
      await axios.post(`${API}/leave`, newLeave);

      alert("Leave applied successfully");

      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
      setMessReduction(false);

    } catch (error) {
      console.error("Error applying leave:", error);
      alert("Error applying leave");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="Apply Leave" />

        <div className="content">
          <h2>Apply Leave</h2>
          <p className="breadcrumb">Home / Apply Leave</p>

          <form className="leave-form" onSubmit={handleSubmit}>

            <label>Applied On</label>
            <input type="date" value={appliedOn} readOnly />

            <label>Name of the Student</label>
            <input type="text" value={studentName} readOnly />

            <label>Register No</label>
            <input type="text" value={registerNo} readOnly />

            <label>Semester / Branch</label>
            <input
              type="text"
              value={`  ${semester}/ ${branch}`} // ✅ FIXED
              readOnly
            />

            <label>Hostel Name</label>
            <input type="text" value={hostelName} readOnly />

            <label>Room No</label>
            <input type="text" value={roomNo} readOnly />

            <label>Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="On Duty">On Duty</option>
            </select>

            <div className="date-row">
              <div>
                <label>From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div>
                <label>To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>

            <p className="days">
              Total Days: <b>{calculateDays()}</b>
            </p>

            {calculateDays() > 5 && (
              <div className="mess-reduction-box">
                <label>
                  <input
                    type="checkbox"
                    checked={messReduction}
                    onChange={(e) =>
                      setMessReduction(e.target.checked)
                    }
                  />
                  Apply for Mess Reduction
                </label>
              </div>
            )}

            <label>Reason</label>
            <textarea
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>

            <button type="submit">Apply Leave</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;