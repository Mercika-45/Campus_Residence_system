import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/Admin.css";
import "../../styles/FeeStatus.css";

function FeeStatus() {

  const [fees, setFees] = useState([]);

  // Fetch Fee Status From Backend
  const fetchFees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/fee-status");
      const data = await res.json();
      setFees(data);
    } catch (err) {
      console.log("Error fetching fee status", err);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div className="dashboard-container">

      <AdminSidebar />

      <div className="main-content">
        <Topbar title="Fee Status" />

        <div className="dashboard-content">

          <h2>Student Fee Status</h2>

          <div className="table-card">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Room No</th>
                  <th>Fee Status</th>
                </tr>
              </thead>

              <tbody>
                {fees.map((f) => (
                  <tr key={f._id}>
                    <td>{f.name}</td>
                    <td>{f.room}</td>
                    <td>
                      <span className={`status ${f.status.toLowerCase()}`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FeeStatus;
