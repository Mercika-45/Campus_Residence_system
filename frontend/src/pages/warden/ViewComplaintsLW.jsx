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
      completed: false,
      approved: false,
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
      completed: false,
      approved: false,
      status: "Pending",
    },
  ]);

  // Toggle Completed
  const toggleCompleted = (id) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedCompleted = !c.completed;
          return {
            ...c,
            completed: updatedCompleted,
            status:
              updatedCompleted && c.approved
                ? "Resolved"
                : "Pending",
          };
        }
        return c;
      })
    );
  };

  // Toggle Student Approval
  const toggleApproved = (id) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedApproved = !c.approved;
          return {
            ...c,
            approved: updatedApproved,
            status:
              c.completed && updatedApproved
                ? "Resolved"
                : "Pending",
          };
        }
        return c;
      })
    );
  };

  // Sort → Pending Top, Resolved Bottom
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (a.status === "Resolved") return 1;
    if (b.status === "Resolved") return -1;
    return 0;
  });

  // Apply Filter
  const filteredComplaints =
    filter === "All"
      ? sortedComplaints
      : sortedComplaints.filter((c) => c.status === filter);

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
                <th>Completed</th>
                <th>Student Approval</th>
                <th>Status</th>
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
                    <button
                      className={
                        c.completed ? "approved-btn" : "pending-btn"
                      }
                      onClick={() => toggleCompleted(c.id)}
                    >
                      {c.completed
                        ? "Completed"
                        : "Not Completed"}
                    </button>
                  </td>

                  <td>
                    <button
                      className={
                        c.approved ? "approved-btn" : "pending-btn"
                      }
                      onClick={() => toggleApproved(c.id)}
                    >
                      {c.approved
                        ? "Approved"
                        : "Not Approved"}
                    </button>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
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
