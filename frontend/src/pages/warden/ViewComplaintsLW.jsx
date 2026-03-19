import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

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

  // 🔹 Warden marks complaint as Completed
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

  // 🔹 Sort: Pending first
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (a.status === "Resolved") return 1;
    if (b.status === "Resolved") return -1;
    return 0;
  });

  // 🔹 Apply Filter
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
                <tr key={c._id}>
                  <td>{c.studentName}</td>
                  <td>{c.registerNo}</td>
                  <td>{c.hostel}</td>
                  <td>{c.room}</td>
                  <td>{c.category}</td>
                  <td>{c.description}</td>

                  {/* ✅ Warden Control */}
                  <td>
                    {!c.completed ? (
                      <button
                        className="pending-btn"
                        onClick={() => markCompleted(c._id)}
                      >
                        Mark Completed
                      </button>
                    ) : (
                      <span className="approved-btn">
                        Completed
                      </span>
                    )}
                  </td>

                  {/* 🔒 View Only */}
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

                  {/* ✅ Status */}
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