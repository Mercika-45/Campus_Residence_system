import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function ViewWardens() {
  /* ================= STATE ================= */

  const [wardens, setWardens] = useState([]);

  /* ================= FETCH FROM ALLOCATIONS ================= */

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/allocations")
      .then((res) => {
        // ✅ Extract warden + hostel
        const formatted = res.data.map((item) => ({
          ...item.warden,
          hostel: item.hostel,
          _id: item._id, // unique key
        }));

        setWardens(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  /* ================= FILTERING ================= */

  const deputyWardens = wardens.filter((w) =>
    w.role?.toLowerCase().includes("executive")
  );

  const localWardens = wardens.filter((w) =>
    w.role?.toLowerCase().includes("local")
  );

  const localBoys = localWardens.filter((w) =>
    w.role?.toLowerCase().includes("boys")
  );

  const localGirls = localWardens.filter((w) =>
    w.role?.toLowerCase().includes("girls")
  );

  /* ================= TABLE RENDER ================= */

  const renderTable = (data, showBlock = false) => (
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
              <td colSpan={showBlock ? 6 : 5} className="no-data">
                No wardens available
              </td>
            </tr>
          ) : (
            data.map((w) => (
              <tr key={w._id}>
                <td>
                  <img
                    src={w.image || "/images/profile.jpg"}
                    alt="profile"
                    className="table-img"
                  />
                </td>
                <td>{w.name}</td>
                <td>{w.email}</td>
                <td>{w.phone}</td>
                <td>
                  <span className="hostel-badge">
                    {w.hostel || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="View Wardens" />

        <div className="dashboard-content">
          <h2 className="page-title">Hostel Wardens</h2>
          <p className="page-subtitle">
            View all deputy and local wardens
          </p>

          {/* ================= DEPUTY ================= */}
          <h3 className="section-title">Deputy Wardens</h3>
          {renderTable(deputyWardens, false)}

          {/* ================= LOCAL ================= */}
          <h3 className="section-title">Local Wardens</h3>

          <h4 className="subsection-title">
            Boys Hostel Wardens
          </h4>
          {renderTable(localBoys, true)}

          <h4 className="subsection-title">
            Girls Hostel Wardens
          </h4>
          {renderTable(localGirls, true)}
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;