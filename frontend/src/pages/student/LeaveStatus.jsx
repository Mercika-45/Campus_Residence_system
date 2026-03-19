import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";

  // ✅ Safe localStorage handling
  const student = JSON.parse(localStorage.getItem("student") || "{}");

  // ✅ FIX: normalize register number
  const registerNo = student?.registerNo
    ? student.registerNo.trim().toUpperCase()
    : "";

  /* ================= FETCH LEAVES ================= */

  const fetchLeaves = async () => {
    try {
      if (!registerNo) {
        setLeaves([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API}/leave/student/${registerNo}`
      );

      setLeaves(res.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLoading(false);
    }
  };

  /* ================= AUTO LOAD + AUTO REFRESH ================= */

  useEffect(() => {
    fetchLeaves();

    const interval = setInterval(() => {
      fetchLeaves();
    }, 3000);

    return () => clearInterval(interval);
  }, [registerNo]);

  /* ================= DATE FORMAT ================= */

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  /* ================= STATUS STYLE ================= */

  const getStatusClass = (status) => {
    if (!status) return "pending";

    switch (status.toLowerCase()) {
      case "approved":
        return "approved";
      case "pending":
        return "pending"; // ✅ fixed typo
      case "forwarded":
        return "forwarded";
      default:
        return "pending";
    }
  };

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="Leave Status" />

        <div className="content">
          <h2>Leave Status</h2>
          <p className="breadcrumb">Home / Leave Status</p>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : leaves.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No leave records found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.leaveType}</td>

                      <td>{formatDate(leave.fromDate)}</td>

                      <td>{formatDate(leave.toDate)}</td>

                      <td>{leave.days}</td>

                      <td>{leave.reason}</td>

                      <td>
                        <span
                          className={`status ${getStatusClass(
                            leave.status
                          )}`}
                        >
                          {leave.status || "Pending"}
                        </span>
                      </td>

                      <td>{formatDate(leave.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveStatus;