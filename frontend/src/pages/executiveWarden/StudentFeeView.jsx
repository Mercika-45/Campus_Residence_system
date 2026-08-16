import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/FeePage.css";

function StudentFeeView() {
  const { regNo } = useParams();

  const [view, setView] = useState("hostel");
  const [hostelData, setHostelData] = useState([]);
  const [messData, setMessData] = useState([]);

  const API = "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, [regNo]);

  const normalize = (val) =>
    String(val || "").toLowerCase().replace(/\s+/g, "").trim();

  // ================= FETCH ALL =================
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/api/fees/all`);

      const all = res.data.filter(
        (r) => normalize(r.regNo) === normalize(regNo)
      );

      // ✅ SPLIT CORRECTLY
      const hostel = all.filter((r) => r.feeType === "hostel");
      const mess = all.filter((r) => r.feeType === "mess");

      setHostelData(hostel);
      setMessData(mess);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PERIODS =================
  const hostelYears = ["year 1", "year 2", "year 3", "year 4"];

  const messSemesters = [
    "semester 1",
    "semester 2",
    "semester 3",
    "semester 4",
    "semester 5",
    "semester 6",
    "semester 7",
    "semester 8",
  ];

  // ================= GET RECORD =================
  const getHostelRecord = (period) =>
    hostelData.find((d) => normalize(d.period) === normalize(period));

  const getMessRecord = (sem) =>
    messData.find((d) => normalize(d.period) === normalize(sem));

  return (
    <div className="executive-page">
      <ExecutiveSidebar />

      <div className="executive-main1">
        <ExecutiveTopbar title={`Fee Details - ${regNo}`} />

        <div className="executive-content">

          {/* SWITCH BUTTONS */}
          <div style={{ marginBottom: 15 }}>
            <button className="but1" onClick={() => setView("hostel")}>Hostel View</button>
            <button className="but1" onClick={() => setView("mess")}>Mess View</button>
          </div>

          {/* ================= HOSTEL ================= */}
          {view === "hostel" && (
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Txn</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {hostelYears.map((year) => {
                  const record = getHostelRecord(year);

                  return (
                    <tr key={year}>
                      <td>{year}</td>
                      <td>{record?.status || "Not Paid"}</td>
                      <td>{record?.txnId || "-"}</td>
                      <td>₹{record?.amount || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* ================= MESS ================= */}
          {view === "mess" && (
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Txn</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {messSemesters.map((sem) => {
                  const record = getMessRecord(sem);

                  return (
                    <tr key={sem}>
                      <td>{sem}</td>
                      <td>{record?.status || "Not Paid"}</td>
                      <td>{record?.txnId || "-"}</td>
                      <td>₹{record?.amount || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default StudentFeeView;