import { useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ExecutiveWarden.css";


function ViewComplaints() {

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
    }
  ]);

  // ✅ Mark complaint as Resolved
  const markResolved = (id) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: "Resolved" } : c
      )
    );
  };

  return (
    <div className="dashboard-container">

      <ExecutiveSidebar />

      <div className="main-content1">
        <Topbar title="Student Complaints" />

        <div className="dashboard-content">

          <h2>Hostel Complaints Management</h2>

          <div className="table-card">
            <table className="complaint-table">
              <thead>
                <tr >
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
                {complaints.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.regNo}</td>
                    <td>{c.hostel}</td>
                    <td>{c.room}</td>
                    <td>{c.category}</td>
                    <td>{c.issue}</td>

                    <td>
                      <span className={`status ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </td>

                    <td>
                      {c.status === "Pending" ? (
                        <button
                          className="resolve-btn"
                          onClick={() => markResolved(c.id)}
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="resolved-text">✔ Done</span>
                      )}
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

export default ViewComplaints;
