import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/FeePage.css";
import "../../styles/ExecutiveWarden.css";

function FeeApproval() {
  const [receipts, setReceipts] = useState([]);
  const [students, setStudents] = useState([]);
  const [controls, setControls] = useState([]);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("hostel");
  const API = "http://localhost:5000";
const navigate = useNavigate();
  const semesters = [
    "Semester 1","Semester 2","Semester 3","Semester 4",
    "Semester 5","Semester 6","Semester 7","Semester 8"
  ];

  const years = ["Year 1","Year 2","Year 3","Year 4"];

  useEffect(() => {
    fetchReceipts();
    fetchStudents();
    fetchControls();
  }, []);

  /* ================= FETCH ================= */

  const fetchReceipts = async () => {
    const res = await axios.get(`${API}/api/fees/all`);
    setReceipts(res.data || []);
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/api/student/approved`);
      console.log("STUDENTS 👉", res.data);
      setStudents(res.data || []);
    } catch (err) {
      console.error("Student fetch error", err);
    }
  };

  const fetchControls = async () => {
    const res = await axios.get(`${API}/api/fees/control`);
    setControls(res.data || []);
  };

  /* ================= CONTROL ================= */

  const toggleControl = async (feeType, period, current) => {
    await axios.put(`${API}/api/fees/control`, {
      feeType,
      period,
      isOpen: !current,
    });

    fetchControls();
    setMessage(!current ? "Opened" : "Closed");
  };

  const isOpen = (type, period) => {
    const c = controls.find(
      (x) => x.feeType === type && x.period === period
    );
    return c?.isOpen;
  };

  /* ================= APPROVE / REJECT ================= */

  const approve = async (regNo, feeType, period) => {
    await axios.post(`${API}/api/fees/pay`, {
      regNo: regNo.toUpperCase(), // ✅ FIX
      feeType,
      period,
      status: "Paid",
      amount: 0,
      txnId: "MANUAL-" + Date.now(),
    });

    fetchReceipts();
    setMessage("Approved");
  };

  const reject = async (regNo, feeType, period) => {
    await axios.delete(`${API}/api/fees/delete`, {
      data: {
        regNo: regNo.toUpperCase(), // ✅ FIX
        feeType,
        period,
      },
    });

    fetchReceipts();
    setMessage("Rejected");
  };
const handleView = (regNo) => {
  navigate(`/executive/fee-view/${regNo}`);
};
  /* ================= NORMALIZE ================= */

  const normalize = (val) =>
    String(val).toLowerCase().replace(/\s+/g, "").trim();

  /* ================= CREATE ROW ================= */

  const createRow = (student, type, period) => {
    const record = receipts.find((r) => {
      return (
        normalize(r.regNo) === normalize(student.registerNumber) &&
        normalize(r.feeType) === normalize(type) &&
        normalize(r.period) === normalize(period)
      );
    });

    return {
      id: `${student._id}-${type}-${period}`,
      studentName: student.studentName,
      regNo: student.registerNumber, // ✅ FIXED
      hostelType: student?.hostel?.hostelType || "", // ✅ IMPORTANT
      hostel: student?.hostel?.block || "-",
      room: student?.hostel?.room || "-",
      year: student?.college?.yearOfStudy || "-",
      dept: student?.college?.department || "-",
      feeType: type,
      period,
      status: record?.status || "Not Paid",
      txnId: record?.txnId || "-",
    };
  };

  /* ================= BUILD DATA ================= */

  const fullData = students.flatMap((student) => {
    const year = `Year ${student?.college?.yearOfStudy}`;
const semester = `semester ${student?.college?.semester}`;

    return [
      createRow(student, "hostel", year),
      createRow(student, "mess", semester),
    ];
  });

  /* ================= FILTER ================= */

  const executive = JSON.parse(localStorage.getItem("executiveWarden"));
  const wardenType = executive?.hostelType;

  const filteredData = fullData.filter((s) => {
    if (!wardenType) return true;

    return (
      s.hostelType &&
      s.hostelType.toLowerCase() === wardenType.toLowerCase()
    );
  });

  const tabData = filteredData.filter(
  (item) => item.feeType === activeTab
);
  /* ================= DEBUG ================= */

  useEffect(() => {
    console.log("WARDEN TYPE 👉", wardenType);
    console.log("FULL DATA 👉", fullData);
    console.log("FILTERED DATA 👉", filteredData);
  }, [students, receipts]);

  /* ================= UI ================= */

  return (
    <div className="executive-page">
      <ExecutiveSidebar />

      <div className="executive-main1">
        <ExecutiveTopbar title="Fee Control & Approval" />

        <div className="executive-content">

          {/* CONTROL */}
          <div className="control-panel">
  {activeTab === "hostel" && (
    <>
      <h4>Hostel Fee</h4>
      {years.map((year) => (
        <button
          key={year}
          onClick={() =>
            toggleControl("hostel", year, isOpen("hostel", year))
          }
        >
          {year} - {isOpen("hostel", year) ? "Close" : "Open"}
        </button>
      ))}
    </>
  )}

  {activeTab === "mess" && (
    <>
      <h4>Mess Fee</h4>
      
      {semesters.map((sem) => (
        <button
          key={sem}
          onClick={() =>
            toggleControl("mess", sem, isOpen("mess", sem))
          }
        >
          {sem} - {isOpen("mess", sem) ? "Close" : "Open"}
        </button>
        
      ))}
    </>
  )}
</div>
           <div className="tabs">
  <button
    className={activeTab === "hostel" ? "active" : ""}
    onClick={() => setActiveTab("hostel")}
  >
    Hostel Fee
  </button>

  <button
    className={activeTab === "mess" ? "active" : ""}
    onClick={() => setActiveTab("mess")}
  >
    Mess Fee
  </button>
</div>
          {/* TABLE */}
          <table className="fee-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Reg No</th>
                <th>Type</th>
                <th>Period</th>
                <th>Status</th>
                <th>Txn</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tabData.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No Data Found
                  </td>
                </tr>
              ) : (
                tabData.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.studentName}</td>
                    <td>{r.regNo}</td>
                    <td>{r.feeType}</td>
                    <td>{r.period}</td>

                    <td>
                      <span
                        className={`badge ${
                          r.status === "Paid"
                            ? "paid"
                            : r.status === "Pending"
                            ? "pending"
                            : "notpaid"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td>{r.txnId}</td>

                   <td>
  {r.status === "Paid" ? (
    <button
      className="view-btn1"
      onClick={() => handleView(r.regNo)}
    >
      View Receipt
    </button>
  ) : (
    <span style={{ color: "gray" }}>Not Paid</span>
  )}
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {message && <p className="info-msg">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default FeeApproval;