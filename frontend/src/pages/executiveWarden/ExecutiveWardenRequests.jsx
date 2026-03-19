import { useState, useEffect } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ExecutiveWardenRequests() {
  const [activeTab, setActiveTab] = useState("leave");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [reductionRequests, setReductionRequests] = useState([]);
  const [vacatingRequests, setVacatingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null);

  // ✅ NEW: Applied On Date Filter
  const [appliedDateFilter, setAppliedDateFilter] = useState("");

  const API = "http://localhost:5000/api";

  useEffect(() => {
    fetchLeaves();
    fetchVacating();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${API}/leave`);

      setLeaveRequests(
        res.data.filter(
          (l) => l.status === "Pending" || l.status === "Approved"
        )
      );

      setReductionRequests(
        res.data.filter(
          (l) =>
            l.messReduction === true &&
            (l.reductionApproved === false || l.reductionApproved === true)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVacating = async () => {
    try {
      const res = await axios.get(`${API}/vacating`);
      setVacatingRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (type, id) => {
    try {
      if (type === "leave") {
        await axios.put(`${API}/leave/approve/${id}`);
        fetchLeaves();
      }

      if (type === "reduction") {
        await axios.put(`${API}/leave/reduction/approve/${id}`);
        fetchLeaves();
      }

      if (type === "vacating") {
        await axios.put(`${API}/vacating/approve/${id}`);
        fetchVacating();
      }

      setSelectedRequest(null);
      setModalType(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (type, req) => {
    setSelectedRequest(req);
    setModalType(type);
  };

  // ✅ UPDATED SORT → Pending first, Approved below
  const sortRequests = (data, type) => {
    return [...data].sort((a, b) => {
      const statusA =
        type === "reduction"
          ? a.reductionApproved
            ? "Approved"
            : "Pending"
          : a.status;

      const statusB =
        type === "reduction"
          ? b.reductionApproved
            ? "Approved"
            : "Pending"
          : b.status;

      if (statusA === "Pending" && statusB === "Approved") return -1;
      if (statusA === "Approved" && statusB === "Pending") return 1;
      return 0;
    });
  };

  // ✅ NEW: Filter by Applied On Date
  const filterByAppliedDate = (data) => {
    if (!appliedDateFilter) return data;

    return data.filter(
      (req) =>
        req.appliedOn &&
        new Date(req.appliedOn).toISOString().substring(0, 10) ===
          appliedDateFilter
    );
  };

  const renderTableRow = (req, type) => (
    <tr
      key={req._id}
      className={req.status?.toLowerCase()}
      onClick={() => openModal(type, req)}
      style={{ cursor: "pointer" }}
    >
      <td>{req.studentName}</td>
      <td>{req.registerNo ?? "-"}</td>
      <td>{req.semester ?? "-"}</td>
      <td>{req.hostelName ?? "-"}</td>
      <td>{req.roomNo ?? "-"}</td>
      {type === "leave" && <td>{req.leaveType ?? "-"}</td>}

      <td>
        {req.fromDate
          ? new Date(req.fromDate).toISOString().substring(0, 10)
          : "-"}
      </td>

      <td>
        {req.toDate
          ? new Date(req.toDate).toISOString().substring(0, 10)
          : "-"}
      </td>

      <td>
        {req.appliedOn
          ? new Date(req.appliedOn).toISOString().substring(0, 10)
          : "-"}
      </td>

      <td>
        {type === "reduction"
          ? req.reductionApproved
            ? "Approved"
            : "Pending"
          : req.status ?? "Pending"}
      </td>
    </tr>
  );

  const renderTable = (data, type) => {
    const filtered = filterByAppliedDate(data);
    const sorted = sortRequests(filtered, type);

    return (
      <>
       <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
  <label style={{ fontSize: "15px" }}>
    Applied On:
  </label>
  <input
    type="date"
    value={appliedDateFilter}
    onChange={(e) => setAppliedDateFilter(e.target.value)}
    style={{
      padding: "3px 6px",
      fontSize: "14px",
      height: "38px",
      width: "160px"
    }}
  />
</div>

        <table className="request-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>Semester</th>
              <th>Hostel</th>
              <th>Room No</th>
              {type === "leave" && <th>Leave Type</th>}
              <th>From Date</th>
              <th>To Date</th>
              <th>Applied On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={type === "leave" ? 10 : 9}
                  style={{ textAlign: "center" }}
                >
                  No requests
                </td>
              </tr>
            ) : (
              sorted.map((req) => renderTableRow(req, type))
            )}
          </tbody>
        </table>
      </>
    );
  };

  // 🔒 Vacating logic unchanged
  const renderVacatingRow = (req) => (
    <tr
      key={req._id}
      className={req.status?.toLowerCase()}
      onClick={() => openModal("vacating", req)}
      style={{ cursor: "pointer" }}
    >
      <td>{req.studentName}</td>
      <td>{req.branch}</td>
      <td>{req.year}</td>
      <td>{req.semester}</td>
      <td>{req.hostelName}</td>
      <td>{req.dateJoining?.substring(0, 10)}</td>
      <td>{req.dateVacating?.substring(0, 10)}</td>
      <td>{req.reason}</td>
      <td>{req.noDues}</td>
      <td>
      {req.appliedOn
      ? new Date(req.appliedOn).toISOString().substring(0, 10)
      : "-"}
      </td>
      <td>{req.status}</td>
    </tr>
  );

  const renderVacatingTable = (data) => (
    <table className="request-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Branch</th>
          <th>Year</th>
          <th>Semester</th>
          <th>Hostel</th>
          <th>Date Joining</th>
          <th>Date Vacating</th>
          <th>Reason</th>
          <th>No Dues</th>
          <th>Applied On</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="12" style={{ textAlign: "center" }}>
              No requests
            </td>
          </tr>
        ) : (
          data.map((req) => renderVacatingRow(req))
        )}
      </tbody>
    </table>
  );

  return (
    <div className="executive-page">
      <ExecutiveSidebar />
      <div className="executive-main1">
        <ExecutiveTopbar title="Forwarded Requests" />
        <div className="executive-content">

          <div className="tabs">
            <button
              className={activeTab === "leave" ? "active" : ""}
              onClick={() => setActiveTab("leave")}
            >
              Leave Requests
            </button>
            <button
              className={activeTab === "reduction" ? "active" : ""}
              onClick={() => setActiveTab("reduction")}
            >
              Reduction Requests
            </button>
            <button
              className={activeTab === "vacating" ? "active" : ""}
              onClick={() => setActiveTab("vacating")}
            >
              Vacating Requests
            </button>
          </div>

          {activeTab === "leave" &&
            renderTable(leaveRequests, "leave")}
          {activeTab === "reduction" &&
            renderTable(reductionRequests, "reduction")}
          {activeTab === "vacating" &&
            renderVacatingTable(vacatingRequests)}

          {selectedRequest && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedRequest(null)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Request Details</h3>
                <p><strong>Name:</strong> {selectedRequest.studentName}</p>
                <p><strong>Register No:</strong> {selectedRequest.registerNo}</p>
                <p><strong>Semester:</strong> {selectedRequest.semester}</p>
                <p><strong>Hostel:</strong> {selectedRequest.hostelName}</p>
                <p><strong>Room No:</strong> {selectedRequest.roomNo}</p>

                {modalType === "leave" && (
                  <p><strong>Leave Type:</strong> {selectedRequest.leaveType}</p>
                )}

                <p><strong>From:</strong> {selectedRequest.fromDate?.substring(0, 10)}</p>
                <p><strong>To:</strong> {selectedRequest.toDate?.substring(0, 10)}</p>
                <p><strong>Applied On:</strong> {selectedRequest.appliedOn?.substring(0, 10)}</p>

                {modalType === "reduction" &&
                  !selectedRequest.reductionApproved && (
                    <button
                      onClick={() =>
                        handleApprove("reduction", selectedRequest._id)
                      }
                    >
                      Approve Reduction
                    </button>
                  )}

                {modalType === "leave" &&
                  selectedRequest.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleApprove("leave", selectedRequest._id)
                      }
                    >
                      Approve Leave
                    </button>
                  )}

                <button
                  className="close-btn"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ExecutiveWardenRequests;