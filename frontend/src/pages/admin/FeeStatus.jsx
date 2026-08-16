import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";
import "../../styles/FeeStatus.css";

function FeeStatus() {
  const [fees, setFees] = useState([]);
  const [activeTab, setActiveTab] = useState("hostel");

  const API = "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const feeRes = await axios.get(`${API}/api/fees/all`);
      const studentRes = await axios.get(`${API}/api/student/approved`);

      const merged = studentRes.data.flatMap((student) => {
        const regNo = student.registerNumber?.trim();

        // ✅ HOSTEL (YEAR BASED)
        const hostelFee = feeRes.data.find(
          (f) =>
            f.regNo?.trim() === regNo &&
            f.feeType === "hostel" &&
            f.period?.toLowerCase() ===
              `year ${student?.college?.yearOfStudy}`.toLowerCase()
        );

        const hostelRow = {
          name: student.studentName,
          room: student?.hostel?.room,
          hostel: student?.hostel?.hostelType,
          period: `Year ${student?.college?.yearOfStudy}`,
          regNo,
          type: "hostel",
          status: hostelFee?.status || "Not Paid",
        };

        // ✅ MESS (ONLY CURRENT SEMESTER)
        const currentSem = `semester ${student?.college?.semester}`.toLowerCase();

        const messFee = feeRes.data.find(
          (f) =>
            f.regNo?.trim() === regNo &&
            f.feeType === "mess" &&
            f.period?.toLowerCase() === currentSem
        );

        const messRow = {
          name: student.studentName,
          room: student?.hostel?.room,
          hostel: student?.hostel?.hostelType,
          period: `Semester ${student?.college?.semester}`,
          regNo,
          type: "mess",
          status: messFee?.status || "Not Paid",
        };

        return [hostelRow, messRow];
      });

      setFees(merged);
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = (regNo) => {
    navigate(`/admin/fee-view/${regNo}`);
  };

  const filteredFees = fees.filter((f) => f.type === activeTab);

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Fee Status" />

        <div className="dashboard-content">
          <h2 className="page-title">Student Fee Status</h2>

          {/* TABS */}
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
                <th>Name</th>
                <th>Room</th>
                <th>Hostel</th>
                <th>Period</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredFees.map((f, i) => (
                <tr key={i}>
                  <td>{f.name}</td>
                  <td>{f.room}</td>
                  <td>{f.hostel}</td>
                  <td>{f.period}</td>

                  <td>{f.status}</td>

                  <td>
                    {f.status === "Paid" ? (
                      <button
                        className="view-btn1"
                        onClick={() => handleView(f.regNo)}
                      >
                        View Receipt
                      </button>
                    ) : (
                      <span style={{ color: "gray" }}>
                        Not Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FeeStatus;