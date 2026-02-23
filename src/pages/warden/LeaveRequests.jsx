import { useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function LeaveRequests() {
  // ✅ Sample data with mess reduction
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Anitha",
      reason: "Medical",
      days: 2,
      year: "2",
      fromDate: "2026-02-20",
      toDate: "2026-02-22",
      appliedOn: "2026-02-18",
      status: "Not Forwarded",
      messReduction: false,
      reductionStatus: "Not Applied",
    },
    {
      id: 2,
      name: "Karthik",
      reason: "Family Function",
      days: 7,
      year: "3",
      fromDate: "2026-03-01",
      toDate: "2026-03-07",
      appliedOn: "2026-02-25",
      status: "Pending",
      messReduction: true,
      reductionStatus: "Not Forwarded",
    },
  ]);

  const [yearFilter, setYearFilter] = useState("All");

  // ✅ Forward leave to deputy
  const handleForwardLeave = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: "Pending" } : req
    );
    setRequests(updated);
    alert("Leave request forwarded to Deputy Warden");
  };

  // ✅ Forward mess reduction
  const handleForwardReduction = (id) => {
    const updated = requests.map((req) =>
      req.id === id
        ? { ...req, reductionStatus: "Pending" }
        : req
    );
    setRequests(updated);
    alert("Mess reduction forwarded to Deputy Warden");
  };

  // ✅ Deputy approves reduction
  const handleApproveReduction = (id) => {
    const updated = requests.map((req) =>
      req.id === id
        ? { ...req, reductionStatus: "Approved" }
        : req
    );
    setRequests(updated);
    alert("Deputy approved mess reduction");
  };

  // ✅ Filter logic
  const filteredRequests =
    yearFilter === "All"
      ? requests
      : requests.filter((req) => req.year === yearFilter);

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <h1>Leave Requests</h1>

        {/* ✅ Year Filter */}
        <div className="filter-bar">
          <label>Filter by Year:</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Fourth Year</option>
          </select>
        </div>

        <div className="table-card">
          <table className="warden-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Year</th>
                <th>Leave Action</th>
                <th>Mess Reduction</th>
                <th>Reduction Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.name}</td>
                    <td>{req.reason}</td>
                    <td>{req.fromDate}</td>
                    <td>{req.toDate}</td>
                    <td>{req.days}</td>
                    <td>{req.year}</td>

                    {/* ✅ Leave forward */}
                    <td>
                      {req.status === "Not Forwarded" ? (
                        <button
                          className="action-btn"
                          onClick={() =>
                            handleForwardLeave(req.id)
                          }
                        >
                          Forward Leave
                        </button>
                      ) : (
                        <span className="forwarded-text">
                          Forwarded
                        </span>
                      )}
                    </td>

                    {/* ✅ Mess reduction column */}
                    <td>
                      {!req.messReduction ? (
                        <span className="forwarded-text">
                          Not Applied
                        </span>
                      ) : req.days <= 5 ? (
                        <span className="wait-text">
                          Not Eligible
                        </span>
                      ) : req.reductionStatus ===
                        "Not Forwarded" ? (
                        <button
                          className="action-btn reduction"
                          onClick={() =>
                            handleForwardReduction(req.id)
                          }
                        >
                          Forward Reduction
                        </button>
                      ) : req.reductionStatus === "Pending" ? (
                        <button
                          className="approve-btn"
                          onClick={() =>
                            handleApproveReduction(req.id)
                          }
                        >
                          Approve (Deputy)
                        </button>
                      ) : (
                        <span className="status-badge approved">
                          Approved
                        </span>
                      )}
                    </td>

                    {/* ✅ Reduction status */}
                    <td>
                      <span className="status-badge pending">
                        {req.reductionStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
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