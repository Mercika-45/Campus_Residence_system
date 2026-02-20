import { useState } from "react";
import AdminSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";
import "../../styles/Complaints.css";

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
    {
      id: 3,
      name: "Meena",
      regNo: "21EC014",
      hostel: "Girls Hostel",
      room: "305",
      category: "Electrical",
      issue: "Fan not working",
      completed: false,
      approved: false,
      status: "Pending",
    }
  ]);

  // ✅ Mark as Completed / Not Completed
  const toggleCompleted = (id) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          const updatedCompleted = !c.completed;

          return {
            ...c,
            completed: updatedCompleted,
            status:
              updatedCompleted && c.approved
                ? "Resolved"
                : "Pending"
          };
        }
        return c;
      })
    );
  };

  // ✅ Student Approval
  const toggleApproved = (id) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === id) {
          const updatedApproved = !c.approved;

          return {
            ...c,
            approved: updatedApproved,
            status:
              c.completed && updatedApproved
                ? "Resolved"
                : "Pending"
          };
        }
        return c;
      })
    );
  };

  // ✅ Sort: Pending at Top, Resolved at Bottom
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (a.status === "Resolved") return 1;
    if (b.status === "Resolved") return -1;
    return 0;
  });

  return (
    <div className="dashboard-container">

      <AdminSidebar />

      <div className="main-content">
        <ExecutiveTopbar title="Student Complaints" />

        <div className="dashboard-content">
          <h2>Hostel Complaints Management</h2>

          <div className="table-card">
            <table className="complaint-table">
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
                {sortedComplaints.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.regNo}</td>
                    <td>{c.hostel}</td>
                    <td>{c.room}</td>
                    <td>{c.category}</td>
                    <td>{c.issue}</td>

                    {/* Completed Toggle */}
                    <td>
                      <button
                        className={c.completed ? "approved-btn" : "pending-btn"}
                        onClick={() => toggleCompleted(c.id)}
                      >
                        {c.completed ? "Completed" : "Not Completed"}
                      </button>
                    </td>

                    {/* Student Approval Toggle */}
                    <td>
                      <button
                        className={c.approved ? "approved-btn" : "pending-btn"}
                        onClick={() => toggleApproved(c.id)}
                      >
                        {c.approved ? "Approved" : "Not Approved"}
                      </button>
                    </td>

                    {/* Final Status */}
                    <td>
                      <span className={`status ${c.status.toLowerCase()}`}>
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
    </div>
  );
}

export default ViewComplaints;
