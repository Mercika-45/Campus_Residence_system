import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function ViewWardens() {
  const [wardens, setWardens] = useState([]);

  // ================= FETCH ALLOCATIONS =================
  useEffect(() => {
  axios
    .get("http://localhost:5000/api/allocations")
    .then((res) => {
      const formatted = res.data.map((item) => ({
        ...item.warden,
        hostel: item.hostel,
        hostelType: item.warden.hostelType?.toLowerCase() || "N/A",
        _id: item._id,
      }));

      setWardens(formatted);
    })
    .catch((err) => console.log("Fetch allocations error:", err));
}, []);
  // ================= FILTERING =================
  const deputyWardens = wardens.filter((w) =>
    w.role?.toLowerCase().includes("executive")
  );

 const localWardens = wardens.filter((w) =>
  w.role?.toLowerCase().includes("local")
);

const localBoys = localWardens.filter((w) => w.hostelType?.toLowerCase() === "boys");
const localGirls = localWardens.filter((w) => w.hostelType?.toLowerCase() === "girls");

  // ================= TABLE RENDER =================
  const renderTable = (data) => (
    <div className="table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Hostel</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data">
                No wardens available
              </td>
            </tr>
          ) : (
            data.map((w) => (
              <tr key={w._id}>
                <td>
                  <img
                    src={w.image ? `http://localhost:5000${w.image}` : "/images/profile.jpg"}
                    alt="profile"
                    className="table-img"
                  />
                </td>
                <td>{w.name}</td>
                <td>{w.email}</td>
                <td>{w.phone}</td>
                <td>
                  <span className="hostel-badge">{w.hostel || "N/A"}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  // ================= UI =================
  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminTopbar title="View Wardens" />
        <div className="dashboard-content">
          <h2 className="page-title">Hostel Wardens</h2>
          <p className="page-subtitle">View all deputy and local wardens</p>

          {/* Deputy Wardens */}
          <h3 className="section-title">Deputy Wardens</h3>
          {renderTable(deputyWardens)}

          {/* Local Wardens */}
          <h3 className="section-title">Local Wardens</h3>

          <h4 className="subsection-title">Boys Hostel Wardens</h4>
          {renderTable(localBoys)}

          <h4 className="subsection-title">Girls Hostel Wardens</h4>
          {renderTable(localGirls)}
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;