import { useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function ViewComplaints() {
  const [filter, setFilter] = useState("All");

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      name: "Arun",
      regNo: "21CS001",
      hostel: "Boys Hostel - A",
      room: "101",
      category: "Plumbing",
      issue: "Water leakage near wash basin",
      status: "Pending",
    },
    {
      id: 2,
      name: "Ravi",
      regNo: "21ME032",
      hostel: "Boys Hostel - B",
      room: "210",
      category: "Food",
      issue: "Food quality is poor",
      status: "Resolved",
    },
    {
      id: 3,
      name: "Meena",
      regNo: "21EC014",
      hostel: "Girls Hostel",
      room: "305",
      category: "Electrical",
      issue: "Fan not working",
      status: "Pending",
    },
  ]);

  const markResolved = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Resolved" } : c
      )
    );
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <div className="page-header">
          <h1>Hostel Complaints</h1>

          <div className="filter-box">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="table-card">
          <table className="warden-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Reg No</th>
                <th>Hostel</th>
                <th>Room</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.regNo}</td>
                  <td>{c.hostel}</td>
                  <td>{c.room}</td>
                  <td>{c.category}</td>
                  <td>{c.issue}</td>

                  <td>
                    <span
                      className={`status-badge ${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    {c.status === "Pending" ? (
                      <button
                        className="action-btn"
                        onClick={() => markResolved(c.id)}
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <span className="done-text">✔ Completed</span>
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

export default ViewComplaints;
