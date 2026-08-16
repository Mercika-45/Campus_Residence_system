import { useState, useEffect } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ViewWardensEW.css";

function ViewWardens() {
  const [localWardens, setLocalWardens] = useState([]);

  // ================= FETCH FROM BACKEND =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allocations")
      .then((res) => {
        // Filter allocations for local wardens and format
      // inside useEffect mapping
const formatted = res.data
  .filter(item => item.warden)
  .map(item => ({
    _id: item._id,
    name: item.warden.name,
    hostel: item.hostel || "N/A",
    phone: item.warden.phone,
    photo: item.warden.image
      ? `http://localhost:5000${item.warden.image}`
      : "https://ui-avatars.com/api/?name=Warden&background=0A1F44&color=fff",
    hostelType: item.warden.hostelType?.toLowerCase() || "N/A",
    role: item.warden.role?.toLowerCase() || "",
  }))
  .filter(w => (w.hostelType === "boys" || w.hostelType === "girls") && w.role.includes("local")); // only valid hostel types

        setLocalWardens(formatted);
      })
      .catch(err => console.log("Failed to fetch allocations:", err));
  }, []);

  // ================= FILTER =================
  const boysWardens = localWardens.filter(w => w.hostelType === "boys");
  const girlsWardens = localWardens.filter(w => w.hostelType === "girls");

  // ================= TABLE RENDER =================
  const renderTable = (data) => (
    <div className="ew-table-card">
      <table className="ew-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Hostel</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No wardens available</td>
            </tr>
          ) : (
            data.map((w, index) => (
              <tr key={w._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={w.photo}
                    alt={w.name}
                    className="ew-avatar"
                  />
                </td>
                <td>{w.name}</td>
                <td>{w.phone}</td>
                <td><span className="hostel-badge">{w.hostel}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // ================= UI =================
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ExecutiveSidebar />
      <div style={{ flex: 1, background: "#f5f7fb", marginLeft: 240 }}>
        <ExecutiveTopbar title="View Local Wardens" />
        <div className="ew-container">
          <h2>Local Wardens</h2>

          {/* Boys */}
          <h3 className="ew-section-title">Boys Hostel Wardens</h3>
          {renderTable(boysWardens)}

          {/* Girls */}
          <h3 className="ew-section-title">Girls Hostel Wardens</h3>
          {renderTable(girlsWardens)}
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;