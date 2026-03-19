import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function LeaveRequests() {
  const [requests, setRequests] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${API}/leave`);
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  // ✅ Filter by Applied On Date
  const filteredRequests =
    dateFilter === ""
      ? requests
      : requests.filter((req) => {
          const appliedDate = req.appliedOn
            ? new Date(req.appliedOn).toISOString().substring(0, 10)
            : "";
          return appliedDate === dateFilter;
        });

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <h1>Leave Requests</h1>

        {/* ✅ Smaller Filter */}
        <div
          className="filter-bar"
          style={{ marginBottom: "15px" }}
        >
          <label style={{ marginRight: "10px" }}>
            Filter by Applied Date:
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              width: "180px",
              padding: "5px",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="table-card">
          <table className="warden-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register No</th>
                <th>Year</th> {/* ✅ Added Year */}
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Applied On</th>
                <th>Leave Action</th>
                <th>Mess Reduction</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.studentName}</td>
                    <td>{req.registerNo}</td>

                    {/* ✅ Year Column */}
                    <td>{req.semester}</td>

                    <td>{req.reason}</td>

                    <td>
                      {req.fromDate
                        ? new Date(req.fromDate)
                            .toISOString()
                            .substring(0, 10)
                        : "-"}
                    </td>

                    <td>
                      {req.toDate
                        ? new Date(req.toDate)
                            .toISOString()
                            .substring(0, 10)
                        : "-"}
                    </td>

                    <td>{req.days}</td>

                    <td>
                      {req.appliedOn
                        ? new Date(req.appliedOn)
                            .toISOString()
                            .substring(0, 10)
                        : "-"}
                    </td>

                    {/* Leave Action */}
                    <td>
                      {req.status === "Pending" ? (
                        <span className="status-badge pending">
                          Pending
                        </span>
                      ) : req.status === "Approved" ? (
                        <span className="status-badge approved">
                          Approved
                        </span>
                      ) : (
                        <span className="forwarded-text">
                          {req.status}
                        </span>
                      )}
                    </td>

                    {/* Mess Reduction */}
                    <td>
  {!req.messReduction ? (
    <span className="forwarded-text">
      Not Applied
    </span>
  ) : req.days <= 5 ? (
    <span className="wait-text">
      Not Eligible
    </span>
  ) : req.reductionApproved === true ? (
    <span className="status-badge approved">
      Approved
    </span>
  ) : (
    <span className="status-badge pending">
      Pending
    </span>
  )}
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;