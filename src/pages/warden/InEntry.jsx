import { useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function InEntry() {

  const [entries, setEntries] = useState([
    {
      id: 1,
      studentName: "Arun Kumar",
      regNo: "21CS001",
      year: "3",
      outDate: "2026-02-16T09:30",
      expectedReturn: "2026-02-16T18:00",
      status: "Out",
      actualReturn: null
    },
    {
      id: 2,
      studentName: "Meena Devi",
      regNo: "21EC014",
      year: "2",
      outDate: "2026-02-16T08:00",
      expectedReturn: "2026-02-16T17:00",
      status: "Out",
      actualReturn: null
    }
  ]);

  const [showView, setShowView] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // ✅ Auto Fetch In Time when Mark In clicked
  const markIn = (id) => {
    const now = new Date();

    const formattedDate = now.toLocaleDateString("en-GB");
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const updatedEntries = entries.map(entry =>
      entry.id === id
        ? {
            ...entry,
            status: "Returned",
            actualReturn: `${formattedDate} ${formattedTime}`
          }
        : entry
    );

    setEntries(updatedEntries);
  };

  // ✅ Filter Logic
  const filteredEntries = entries.filter((entry) => {
    return (
      (filterStatus ? entry.status === filterStatus : true) &&
      (filterYear ? entry.year === filterYear : true) &&
      (filterDate ? entry.outDate.slice(0, 10) === filterDate : true)
    );
  });

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page inentry-page">

        <div className="page-header">
          <h1>In Entry Management</h1>
          <p className="breadcrumb">Dashboard / In Entry</p>
        </div>

        {/* Toggle Button */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            className="action-btn"
            onClick={() => setShowView(!showView)}
          >
            {showView ? "Back to Mark In" : "View In Entries"}
          </button>
        </div>

        {/* ================= MARK IN SECTION ================= */}
        {!showView && (
          <div className="table-card">
            <h2>Students Out / Returned</h2>

            <table className="warden-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Year</th>
                  <th>Out Time</th>
                  <th>Expected Return</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.studentName}</td>
                    <td>{entry.regNo}</td>
                    <td>{entry.year} Year</td>
                    <td>{entry.outDate}</td>
                    <td>{entry.expectedReturn}</td>

                    <td>
                      <span className={`status-badge ${entry.status.toLowerCase()}`}>
                        {entry.status}
                      </span>
                    </td>

                    <td>
                      {entry.status === "Out" ? (
                        <button
                          className="in-btn"
                          onClick={() => markIn(entry.id)}
                        >
                          Mark In
                        </button>
                      ) : (
                        <span className="returned-text">
                          ✔ Returned at {entry.actualReturn}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= VIEW SECTION ================= */}
        {showView && (
          <>
            <div className="attendance-controls">

              <div>
                <label>Filter by Date</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div>
                <label>Filter by Year</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">All Years</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>

              <div>
                <label>Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Out">Out</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>

            </div>

            <div className="table-card">
              <h2>In Entry Records</h2>

              <table className="warden-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Reg No</th>
                    <th>Year</th>
                    <th>Out Time</th>
                    <th>Expected Return</th>
                    <th>Status</th>
                    <th>In Time</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.studentName}</td>
                        <td>{entry.regNo}</td>
                        <td>{entry.year} Year</td>
                        <td>{entry.outDate}</td>
                        <td>{entry.expectedReturn}</td>

                        <td>
                          <span className={`status-badge ${entry.status.toLowerCase()}`}>
                            {entry.status}
                          </span>
                        </td>

                        <td>
                          {entry.actualReturn ? entry.actualReturn : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default InEntry;
