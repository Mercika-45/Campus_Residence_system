import { useEffect, useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";
import "../../styles/FeeStatusEW.css";

function FeeStatus() {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);

  // 🔹 Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [hostelFilter, setHostelFilter] = useState("");

  // ✅ Sample Data (fallback)
  const sampleFees = [
    {
      _id: "1",
      name: "Siva Gomathi",
      room: "A-101",
      hostel: "Girls",
      year: "3",
      status: "Pending",
    },
    {
      _id: "2",
      name: "Gopika R",
      room: "G-202",
      hostel: "Girls",
      year: "2",
      status: "Paid",
    },
    {
      _id: "3",
      name: "Vijay Selvan",
      room: "B-303",
      hostel: "Boys",
      year: "4",
      status: "Pending",
    },
  ];

  // ✅ Fetch Fee Status
  const fetchFees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/fee-status");
      const data = await res.json();

      if (data && data.length > 0) {
        setFees(data);
        setFilteredFees(data);
      } else {
        setFees(sampleFees);
        setFilteredFees(sampleFees);
      }
    } catch (err) {
      console.log("Using sample fee data");
      setFees(sampleFees);
      setFilteredFees(sampleFees);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // ✅ Apply Filters
  useEffect(() => {
    let temp = [...fees];

    if (statusFilter) {
      temp = temp.filter(
        (f) => f.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (yearFilter) {
      temp = temp.filter((f) => String(f.year) === String(yearFilter));
    }

    if (hostelFilter) {
      temp = temp.filter(
        (f) => f.hostel?.toLowerCase() === hostelFilter.toLowerCase()
      );
    }

    setFilteredFees(temp);
  }, [statusFilter, yearFilter, hostelFilter, fees]);

  return (
    <div className="executive-layout">
      <ExecutiveSidebar />

      <div
        className="executive-main"
        style={{ flex: 1, background: "#f5f7fb", marginLeft: 220 }}
      >
        <ExecutiveTopbar title="Fee Status" />

        <div className="dashboard-content">
          <h2 className="page-title">Student Fee Status</h2>

          {/* 🔹 FILTER BAR */}
          <div className="filter-bar">
            {/* Status */}
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Year */}
            <select
              className="filter-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>

            {/* Hostel */}
            <select
              className="filter-select"
              value={hostelFilter}
              onChange={(e) => setHostelFilter(e.target.value)}
            >
              <option value="">All Hostels</option>
              <option value="Girls">Girls Hostel</option>
              <option value="Boys">Boys Hostel</option>
            </select>
          </div>

          {/* 🔹 TABLE */}
          <div className="card">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Room No</th>
                  <th>Hostel</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredFees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredFees.map((f) => (
                    <tr key={f._id}>
                      <td>{f.name}</td>
                      <td>{f.room}</td>
                      <td>{f.hostel}</td>
                      <td>{f.year}</td>
                      <td>
                        <span className={`status ${f.status.toLowerCase()}`}>
                          {f.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeStatus;
