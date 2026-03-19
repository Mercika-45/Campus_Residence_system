import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/FeePage.css";

function StudentFee() {
  const studentName = "John";
  const regNo = "22CS001";

  const [files, setFiles] = useState({});
  const [receipts, setReceipts] = useState([]);
  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API = "http://localhost:5000/api/fees";

  useEffect(() => {
    fetchReceipts();
    fetchControls();
  }, []);

  /* ================= FETCH RECEIPTS ================= */
  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/student/${regNo}`);
      setReceipts(res.data);
    } catch {
      setMessage("Failed to fetch receipts");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH GLOBAL CONTROL ================= */
  const fetchControls = async () => {
    try {
      const res = await axios.get(`${API}/control`);
      setControls(res.data);
    } catch {
      setMessage("Failed to fetch global controls");
    }
  };

  /* ================= UPLOAD ================= */
  const uploadReceipt = async (type, period) => {
    const file = files[period];

    if (!file) return setMessage("Select file first");

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("regNo", regNo);
    formData.append("feeType", type);
    formData.append("period", period);
    formData.append("receipt", file);

    try {
      await axios.post(`${API}/upload`, formData);

      setMessage("Uploaded successfully");

      setFiles((prev) => ({ ...prev, [period]: null }));
      fetchReceipts();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  /* ================= FIND RECORD ================= */
  const getRecord = (type, period) =>
    receipts.find((r) => r.feeType === type && r.period === period);

  /* ================= GET CONTROL ================= */
  const getControl = (type, period) =>
    controls.find((c) => c.feeType === type && c.period === period);

  /* ================= BUTTON STATE ================= */
  const getButtonState = (record, control) => {
    if (!control || !control.isOpen) return { text: "Locked", class: "locked-btn", disabled: true };

    if (!record) return { text: "Upload", class: "upload-btn", disabled: false };

    if (record.status === "Pending") return { text: "Pending", class: "pending-btn", disabled: true };
    if (record.status === "Paid") return { text: "Paid", class: "paid-btn", disabled: true };

    return { text: "Upload", class: "upload-btn", disabled: false };
  };

  /* ================= DATA ================= */
  const semesters = [
    "Semester 1","Semester 2","Semester 3","Semester 4",
    "Semester 5","Semester 6","Semester 7","Semester 8"
  ];

  const years = ["Year 1","Year 2","Year 3","Year 4"];

  /* ================= AUTO CLEAR MESSAGE ================= */
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content1">
        <Topbar title="Fee Payment" />
        <div className="content">
          <h2>Fee Payment</h2>
          {message && <p className="info-msg">{message}</p>}
          {loading && <p>Loading...</p>}

          {/* ================= HOSTEL ================= */}
          <div className="fee-section">
            <h3>Hostel Fee (Year-wise)</h3>
            {years.map((year) => {
              const record = getRecord("hostel", year);
              const control = getControl("hostel", year);
              const state = getButtonState(record, control);

              return (
                <div className="fee-row" key={year}>
                  <span>{year}</span>
                  <input
                    type="file"
                    disabled={state.disabled}
                    onChange={(e) =>
                      setFiles({ ...files, [year]: e.target.files[0] })
                    }
                  />
                  <button
                    className={state.class}
                    disabled={state.disabled}
                    onClick={() => uploadReceipt("hostel", year)}
                  >
                    {state.text}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ================= MESS ================= */}
          <div className="fee-section">
            <h3>Mess Fee (Semester-wise)</h3>
            {semesters.map((sem) => {
              const record = getRecord("mess", sem);
              const control = getControl("mess", sem);
              const state = getButtonState(record, control);

              return (
                <div className="fee-row" key={sem}>
                  <span>{sem}</span>
                  <input
                    type="file"
                    disabled={state.disabled}
                    onChange={(e) =>
                      setFiles({ ...files, [sem]: e.target.files[0] })
                    }
                  />
                  <button
                    className={state.class}
                    disabled={state.disabled}
                    onClick={() => uploadReceipt("mess", sem)}
                  >
                    {state.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentFee;