import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function ApplyLeave() {
  const [studentName, setStudentName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [semester, setSemester] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [messReduction, setMessReduction] = useState(false);

  const [leaves, setLeaves] = useState(
    JSON.parse(localStorage.getItem("leaves")) || []
  );

  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName || !registerNo || !semester || !leaveType || !fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      alert("To Date cannot be before From Date");
      return;
    }

    const days = calculateDays();

    const newLeave = {
      id: Date.now(),
      studentName,
      registerNo,
      semester,
      leaveType,
      fromDate,
      toDate,
      days,
      reason,
      messReduction: days > 5 ? messReduction : false,
      status: "Pending",
      appliedOn: new Date().toLocaleDateString(),
    };

    const updatedLeaves = [newLeave, ...leaves];
    setLeaves(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));

    // reset form
    setStudentName("");
    setRegisterNo("");
    setSemester("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
    setMessReduction(false);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content1">
        <Topbar title="Apply Leave" />

        <div className="content">
          <h2>Apply Leave</h2>
          <p className="breadcrumb">Home / Apply Leave</p>

          {/* Leave Form */}
          <form className="leave-form" onSubmit={handleSubmit}>
            <label>Name of the Student</label>
            <input
              type="text"
              value={studentName}
              placeholder="Enter student name"
              onChange={(e) => setStudentName(e.target.value)}
            />

            <label>Register No</label>
            <input
              type="text"
              value={registerNo}
              placeholder="Enter register number"
              onChange={(e) => setRegisterNo(e.target.value)}
            />

            <label>Semester / Branch</label>
            <input
              type="text"
              value={semester}
              placeholder="Enter semester / branch"
              onChange={(e) => setSemester(e.target.value)}
            />

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
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={messReduction}
                    onChange={(e) => setMessReduction(e.target.checked)}
                  />
                  Apply for Mess Reduction (Leave exceeds 5 days)
                </label>
              </div>
            )}

            <label>Reason</label>
            <textarea
              rows="3"
              value={reason}
              placeholder="Enter reason for leave"
              onChange={(e) => setReason(e.target.value)}
            ></textarea>

            <button type="submit">Apply Leave</button>
          </form>

          {/* Leave List */}
          <div className="leave-list">
            <h3>Leave History</h3>

            {leaves.length === 0 ? (
              <p className="no-leave">No leave applied yet</p>
            ) : (
              leaves.map((leave) => (
                <div className="leave-card" key={leave.id}>
                  <div className="leave-header">
                    <span>{leave.leaveType}</span>
                    <span className={`status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </div>

                  <p>
                    📌 {leave.studentName} | {leave.registerNo} | {leave.semester}
                  </p>

                  <p>
                    📅 {leave.fromDate} → {leave.toDate} ({leave.days} days)
                  </p>

                  <p>📝 {leave.reason}</p>

                  {leave.messReduction && (
                    <p className="mess-tag">🍽️ Mess Reduction Applied</p>
                  )}

                  <small>Applied on {leave.appliedOn}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;