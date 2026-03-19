import { useEffect, useState } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/FeePage.css";
import "../../styles/ExecutiveWarden.css";

function FeeApproval() {
  const [receipts, setReceipts] = useState([]);
  const [controls, setControls] = useState([]);
  const [preview, setPreview] = useState(null);
  const [rejectReasons, setRejectReasons] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000";

  const semesters = [
    "Semester 1","Semester 2","Semester 3","Semester 4",
    "Semester 5","Semester 6","Semester 7","Semester 8"
  ];

  const years = ["Year 1","Year 2","Year 3","Year 4"];

  useEffect(() => {
    fetchReceipts();
    fetchControls();
  }, []);

  const fetchReceipts = async () => {
    const res = await axios.get(`${API}/api/fees/all`);
    setReceipts(res.data);
  };

  const fetchControls = async () => {
    const res = await axios.get(`${API}/api/fees/control`);
    setControls(res.data);
  };

  const toggleControl = async (feeType, period, current) => {
    await axios.put(`${API}/api/fees/control`, {
      feeType,
      period,
      isOpen: !current
    });

    setControls((prev) =>
      prev.map((c) =>
        c.feeType === feeType && c.period === period
          ? { ...c, isOpen: !current }
          : c
      )
    );

    setMessage(!current ? "Opened" : "Closed");
  };

  const approve = async (id) => {
    await axios.put(`${API}/api/fees/approve/${id}`);
    setReceipts((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status: "Paid" } : r))
    );
    setMessage("Approved");
  };

  const reject = async (id) => {
    await axios.put(`${API}/api/fees/reject/${id}`, {
      reason: rejectReasons[id]
    });
    fetchReceipts();
    setMessage("Rejected");
  };

  const isOpen = (type, period) => {
    const c = controls.find(
      (x) => x.feeType === type && x.period === period
    );
    return c?.isOpen;
  };

  return (
    <div className="executive-page">
      <ExecutiveSidebar />

      <div className="executive-main1">
        <ExecutiveTopbar title="Fee Control & Approval" />

        <div className="executive-content">

          {/* 🔥 GLOBAL CONTROL PANEL */}
          <div className="control-panel">
            <h3>Upload Control</h3>

            <h4>Hostel Fee</h4>
            {years.map((year) => (
              <button
                key={year}
                className={isOpen("hostel", year) ? "close-btn" : "open-btn"}
                onClick={() =>
                  toggleControl("hostel", year, isOpen("hostel", year))
                }
              >
                {year} - {isOpen("hostel", year) ? "Close" : "Open"}
              </button>
            ))}

            <h4>Mess Fee</h4>
            {semesters.map((sem) => (
              <button
                key={sem}
                className={isOpen("mess", sem) ? "close-btn" : "open-btn"}
                onClick={() =>
                  toggleControl("mess", sem, isOpen("mess", sem))
                }
              >
                {sem} - {isOpen("mess", sem) ? "Close" : "Open"}
              </button>
            ))}
          </div>

          {/* 🔥 RECEIPTS TABLE */}
          <table className="fee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reg No</th>
                <th>Type</th>
                <th>Period</th>
                <th>Status</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {receipts.map((r) => (
                <tr key={r._id}>
                  <td>{r.studentName}</td>
                  <td>{r.regNo}</td>
                  <td>{r.feeType}</td>
                  <td>{r.period}</td>

                  <td>
                    <span className={`badge ${r.status.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>

                  <td>
                    {r.receipt ? (
                      <button
                        className="preview-btn"
                        onClick={() => setPreview(r.receipt)}
                      >
                        View
                      </button>
                    ) : (
                      <span className="no-file">No File</span>
                    )}
                  </td>

                  <td>
                    {r.status === "Pending" && (
                      <>
                        <button
                          className="action-btn approve-btn"
                          onClick={() => approve(r._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="action-btn reject-btn"
                          onClick={() => reject(r._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MODAL */}
          {preview && (
            <div className="modal">
              <iframe
                src={`${API}/uploads/${preview}`}
                title="Preview"
                width="100%"
                height="600px"
              />
              <button className="close-btn" onClick={() => setPreview(null)}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeeApproval;