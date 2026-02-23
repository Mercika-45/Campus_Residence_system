import { useState, useEffect } from "react";
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

  useEffect(() => {
    setLeaveRequests([
      {
        id: 1,
        studentName: "Anitha",
        registerNo: "UCEN1234",
        semester: "4 / CSE",
        hostelName: "Alpha Hostel",
        roomNo: "A-101",
        leaveType: "Medical Leave",
        appliedOn: "2026-02-18",
        status: "Pending",
      },
    ]);

    setReductionRequests([
      {
        id: 1,
        studentName: "Divya",
        registerNo: "UCEN1236",
        semester: "4 / ECE",
        hostelName: "Beta Hostel",
        roomNo: "B-201",
        appliedOn: "2026-02-09",
        status: "Pending",
      },
    ]);

    setVacatingRequests([
      {
        id: 1,
        studentName: "Mani",
        fatherName: "Rajan",
        address: "123, Konam, Nagercoil",
        branch: "CSE",
        year: "4",
        semester: "8",
        hostelName: "Alpha Hostel",
        dateJoining: "2022-06-01",
        dateVacating: "2026-05-30",
        reason: "Course Completed",
        noDues: "Cleared",
        remarks: "",
        bankAcc: "1234567890",
        ifsc: "UCEN000123",
        mobile: "9876543210",
        cautionDeposit: 5000,
        refundRequested: true,
        appliedOn: "2026-02-17",
        status: "Pending",
      },
    ]);
  }, []);

  const handleApprove = (type, id) => {
    const updater = (prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r));
    if (type === "leave") setLeaveRequests(updater);
    if (type === "reduction") setReductionRequests(updater);
    if (type === "vacating") setVacatingRequests(updater);
    setSelectedRequest(null);
    setModalType(null);
  };

  const openModal = (type, req) => {
    setSelectedRequest(req);
    setModalType(type);
  };

  const sortRequests = (data) =>
    [...data].sort((a, b) => (a.status === "Pending" ? -1 : 1));

  // Render row for Leave & Reduction tables
  const renderTableRow = (req, type) => (
    <tr
      key={req.id}
      className={req.status.toLowerCase()}
      onClick={() => openModal(type, req)}
      style={{ cursor: "pointer" }}
    >
      <td>{req.studentName}</td>
      <td>{req.registerNo ?? "-"}</td>
      <td>{req.semester ?? "-"}</td>
      <td>{req.hostelName ?? "-"}</td>
      <td>{req.roomNo ?? "-"}</td>
      {type === "leave" && <td>{req.leaveType}</td>}
      <td>{req.appliedOn}</td>
      <td>{req.status}</td>
    </tr>
  );

  const renderTable = (data, type) => (
    <table className="request-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Register No</th>
          <th>Semester / Branch</th>
          <th>Hostel Name</th>
          <th>Room No</th>
          {type === "leave" && <th>Leave Type</th>}
          <th>Applied On</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {sortRequests(data).length === 0 ? (
          <tr>
            <td colSpan={type === "leave" ? 8 : 7} style={{ textAlign: "center" }}>
              No requests
            </td>
          </tr>
        ) : (
          sortRequests(data).map((req) => renderTableRow(req, type))
        )}
      </tbody>
    </table>
  );

  // Vacating table remains the same
  const renderVacatingRow = (req) => (
    <tr
      key={req.id}
      className={req.status.toLowerCase()}
      onClick={() => openModal("vacating", req)}
      style={{ cursor: "pointer" }}
    >
      <td>{req.studentName}</td>
      <td>{req.fatherName}</td>
      <td>{req.branch}</td>
      <td>{req.year}</td>
      <td>{req.semester}</td>
      <td>{req.hostelName}</td>
      <td>{req.dateJoining}</td>
      <td>{req.dateVacating}</td>
      <td>{req.reason}</td>
      <td>{req.noDues}</td>
      <td>{req.appliedOn}</td>
      <td>{req.status}</td>
    </tr>
  );

  const renderVacatingTable = (data) => (
    <table className="request-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Father's Name</th>
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
        {sortRequests(data).length === 0 ? (
          <tr>
            <td colSpan="12" style={{ textAlign: "center" }}>
              No requests
            </td>
          </tr>
        ) : (
          sortRequests(data).map((req) => renderVacatingRow(req))
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

          {activeTab === "leave" && renderTable(leaveRequests, "leave")}
          {activeTab === "reduction" && renderTable(reductionRequests, "reduction")}
          {activeTab === "vacating" && renderVacatingTable(vacatingRequests)}

          {selectedRequest && (
            <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {modalType === "vacating" ? (
                  <>
                    <h3>HOSTEL VACATING & CAUTION DEPOSIT FORM</h3>
                    <p><strong>Name of the Student:</strong> {selectedRequest.studentName}</p>
                    <p><strong>Father’s Name:</strong> {selectedRequest.fatherName}</p>
                    <p><strong>Address:</strong> {selectedRequest.address}</p>
                    <p><strong>Branch:</strong> {selectedRequest.branch}</p>
                    <p><strong>Year of Study:</strong> {selectedRequest.year}</p>
                    <p><strong>Semester:</strong> {selectedRequest.semester}</p>
                    <p><strong>Hostel Name:</strong> {selectedRequest.hostelName}</p>
                    <p><strong>Room No.:</strong> {selectedRequest.roomNo}</p>
                    <p><strong>Date of Joining:</strong> {selectedRequest.dateJoining}</p>
                    <p><strong>Date of Vacating:</strong> {selectedRequest.dateVacating}</p>
                    <p><strong>Reason for Vacating:</strong> {selectedRequest.reason}</p>
                    <p><strong>No Dues Status:</strong> {selectedRequest.noDues}</p>
                    <p><strong>Remarks by Deputy Warden:</strong> {selectedRequest.remarks}</p>
                    <hr />
                    <h4>CAUTION DEPOSIT DETAILS</h4>
                    <p><strong>Student Bank Account No.:</strong> {selectedRequest.bankAcc}</p>
                    <p><strong>IFSC Code:</strong> {selectedRequest.ifsc}</p>
                    <p><strong>Mobile No.:</strong> {selectedRequest.mobile}</p>
                    <p><strong>Caution Deposit Amount:</strong> {selectedRequest.cautionDeposit}</p>
                    <p><strong>Refund Requested:</strong> {selectedRequest.refundRequested ? "Yes" : "No"}</p>
                    <p><strong>Applied On:</strong> {selectedRequest.appliedOn}</p>
                  </>
                ) : (
                  <>
                    <h3>Request Details</h3>
                    <p><strong>Name:</strong> {selectedRequest.studentName}</p>
                    <p><strong>Register No:</strong> {selectedRequest.registerNo}</p>
                    <p><strong>Semester / Branch:</strong> {selectedRequest.semester}</p>
                    <p><strong>Hostel Name:</strong> {selectedRequest.hostelName}</p>
                    <p><strong>Room No:</strong> {selectedRequest.roomNo}</p>
                    {modalType === "leave" && <p><strong>Leave Type:</strong> {selectedRequest.leaveType}</p>}
                    <p><strong>Applied On:</strong> {selectedRequest.appliedOn}</p>
                  </>
                )}

                {selectedRequest.status === "Pending" && (
                  <button onClick={() => handleApprove(modalType, selectedRequest.id)}>Approve</button>
                )}
                <button className="close-btn" onClick={() => setSelectedRequest(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveWardenRequests;