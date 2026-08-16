import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/FeePage.css";

function StudentFee() {
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [studentSemester, setStudentSemester] = useState("");

  const [receipts, setReceipts] = useState([]);
  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const API = "http://localhost:5000/api/fees";

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
          `http://localhost:5000/api/student/profile/${userData.email}`
        );

        const data = res.data;

        setStudentName(data.studentName || "");
        setRegNo(data.registerNumber?.trim().toUpperCase() || "");

        // ✅ FIXED FIELDS
        setStudentYear(data?.college?.yearOfStudy || "");
        setStudentSemester(data?.college?.semester || "");

      } catch (err) {
        console.error(err);
      }
    };

    fetchStudent();
  }, []);

  /* ================= LOAD RECEIPTS + CONTROL ================= */
  useEffect(() => {
    if (!regNo) return;
    fetchReceipts();
    fetchControls();
  }, [regNo]);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/student/${regNo}`);
      setReceipts(res.data || []);
    } catch {
      setMessage("Failed to fetch receipts");
    } finally {
      setLoading(false);
    }
  };

  const fetchControls = async () => {
    try {
      const res = await axios.get(`${API}/control`);
      setControls(res.data || []);
    } catch {
      setMessage("Failed to fetch controls");
    }
  };

  /* ================= HELPERS ================= */
  const getRecord = (type, period) =>
    receipts.find(
      (r) =>
        r.feeType?.toLowerCase() === type.toLowerCase() &&
        r.period?.toLowerCase() === period.toLowerCase()
    );

  const getControl = (type, period) =>
    controls.find(
      (c) =>
        c.feeType?.toLowerCase() === type.toLowerCase() &&
        c.period?.toLowerCase() === period.toLowerCase()
    );

  /* ================= BUTTON STATE ================= */
  const getButtonState = (record, control) => {
    if (record?.status?.toLowerCase() === "paid")
      return { text: "Paid", class: "paid-btn" };

    if (record?.status?.toLowerCase() === "pending")
      return { text: "Pending", class: "pending-btn" };

    if (!control || !control.isOpen)
      return { text: "Locked", class: "locked-btn" };

    return { text: "Pay Fee", class: "pay-btn" };
  };

  /* ================= ACTION ================= */
  const handleAction = (type, period, record) => {
    // ✅ PAID → OPEN RECEIPT
    if (record?.status?.toLowerCase() === "paid") {
      navigate("/student/payment-success", {
        state: {
          txnId: record.txnId,
          form: {
            applicationNo: regNo,
            studentName,
            year: studentYear,
            semester: studentSemester,
          },
          total: record.amount,
          viewOnly: true,
        },
      });
      return;
    }

    // ⏳ PENDING
    if (record?.status?.toLowerCase() === "pending") {
      alert("⏳ Payment under verification");
      return;
    }

    // 💳 NEW PAYMENT
    navigate("/dummy-payment", {
      state: { feeType: type, period, regNo },
    });
  };

  /* ================= DATA ================= */
  const semesters = [
    "Semester 1","Semester 2","Semester 3","Semester 4",
    "Semester 5","Semester 6","Semester 7","Semester 8"
  ];

  const years = ["Year 1","Year 2","Year 3","Year 4"];

  const allowedYear = `Year ${studentYear}`;
  const allowedSemester = `Semester ${studentSemester}`;

  /* ================= UI ================= */
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

              const isAllowed = year === allowedYear;

              return (
                <div className="fee-row" key={year}>
                  <span>{year}</span>

                  <button
                    className={state.class}
                    disabled={!isAllowed && state.text !== "Paid"}
                    onClick={() => handleAction("hostel", year, record)}
                  >
                    {!isAllowed && state.text !== "Paid"
                      ? "Not Allowed"
                      : state.text}
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

              const isAllowed = sem === allowedSemester;

              return (
                <div className="fee-row" key={sem}>
                  <span>{sem}</span>

                  <button
                    className={state.class}
                    disabled={!isAllowed && state.text !== "Paid"}
                    onClick={() => handleAction("mess", sem, record)}
                  >
                    {!isAllowed && state.text !== "Paid"
                      ? "Not Allowed"
                      : state.text}
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