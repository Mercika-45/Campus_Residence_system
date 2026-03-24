import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5000/api";
  const [registerNo, setRegisterNo] = useState("");

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

        console.log("STUDENT DATA:", data);

        // ✅ FIX: correct field
        const reg = data?.registerNumber
          ? data.registerNumber.trim().toUpperCase()
          : "";

        setRegisterNo(reg);

        if (!reg) {
          console.warn("Register number not found");
          setLoading(false);
        }

      } catch (error) {
        console.error("Student fetch error:", error);
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  /* ================= FETCH LEAVES ================= */
  const fetchLeaves = async (reg) => {
    try {
      const res = await axios.get(
        `${API}/leave/student/${reg}`
      );

      console.log("LEAVE DATA:", res.data);

      setLeaves(res.data || []);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching leaves:", error);
      setLeaves([]);
      setLoading(false);
    }
  };

  /* ================= LOAD ================= */
  useEffect(() => {
    if (!registerNo) return;

    setLoading(true);
    fetchLeaves(registerNo);

    const interval = setInterval(() => {
      fetchLeaves(registerNo);
    }, 3000);

    return () => clearInterval(interval);

  }, [registerNo]);

  /* ================= HELPERS ================= */
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  const getStatusClass = (status) => {
    if (!status) return "pending";

    switch (status.toLowerCase()) {
      case "approved":
        return "approved";
      case "pending":
        return "pending";
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