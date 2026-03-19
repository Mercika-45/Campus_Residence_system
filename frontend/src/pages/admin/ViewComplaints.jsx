import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";
import "../../styles/Complaints.css";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

  // 🔹 Fetch complaints from backend
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );
      setComplaints(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Admin marks complaint as Completed
  const markCompleted = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/complete/${id}`
      );
      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Sort Pending first
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (a.status === "Resolved") return 1;
    if (b.status === "Resolved") return -1;
    return 0;
  });

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Student Complaints" />

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
                  <tr key={c._id}>
                    <td>{c.studentName}</td>
                    <td>{c.registerNo}</td>
                    <td>{c.hostel}</td>
                    <td>{c.room}</td>
                    <td>{c.category}</td>
                    <td>{c.description}</td>

                    {/* ✅ Completed Control */}
                    <td>
                      {!c.completed ? (
                        <button
                          className="pending-btn"
                          onClick={() =>
                            markCompleted(c._id)
                          }
                        >
                          Mark Completed
                        </button>
                      ) : (
                        <span className="approved-btn">
                          Completed
                        </span>
                      )}
                    </td>

                    {/* 🔒 View Only Student Approval */}
                    <td>
                      {c.approved ? (
                        <span className="approved-btn">
                          Approved
                        </span>
                      ) : (
                        <span className="pending-btn">
                          Not Approved
                        </span>
                      )}
                    </td>

                    {/* ✅ Final Status */}
                    <td>
                      <span
                        className={`status ${c.status.toLowerCase()}`}
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
    </div>
  );
}

export default ViewComplaints;