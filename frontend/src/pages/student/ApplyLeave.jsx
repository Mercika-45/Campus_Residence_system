import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [leaves, setLeaves] = useState(
    JSON.parse(localStorage.getItem("leaves")) || []
  );

  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      leaveType,
      fromDate,
      toDate,
      days: calculateDays(),
      reason,
      status: "Pending",
      appliedOn: new Date().toLocaleDateString(),
    };

    const updatedLeaves = [newLeave, ...leaves];
    setLeaves(updatedLeaves);
    localStorage.setItem("leaves", JSON.stringify(updatedLeaves));

    setLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content2">
        <Topbar title="Apply Leave" />

        <div className="content">
          <h2>Apply Leave</h2>
          <p className="breadcrumb">Home / Apply Leave</p>

          {/* Leave Form */}
          <form className="leave-form" onSubmit={handleSubmit}>
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
                    📅 {leave.fromDate} → {leave.toDate} ({leave.days} days)
                  </p>
                  <p>📝 {leave.reason}</p>
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
