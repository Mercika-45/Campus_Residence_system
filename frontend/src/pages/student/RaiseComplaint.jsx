import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/RaiseComplaint.css";

function RaiseComplaint() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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

  // 🔹 Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        {
          studentName: "Demo Student",   // Replace with logged user
          registerNo: "21CS001",
          hostel: "Boys Hostel - A",
          room: "101",
          category,
          description,
        }
      );

      setCategory("");
      setDescription("");

      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Approve Complaint (Student Action)
  const approveComplaint = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/approve/${id}`
      );
      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="Raise Complaint" />

        <div className="content">
          <h2>Raise a Complaint</h2>
          <p className="breadcrumb">Home / Raise Complaint</p>

          {/* Complaint Form */}
          <form className="complaint-form" onSubmit={handleSubmit}>
            <label>Complaint Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Water Issue">Water Issue</option>
              <option value="Electricity">Electricity</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Room Issue">Room Issue</option>
              <option value="Mess Issue">Mess Issue</option>
              <option value="Other">Other</option>
            </select>

            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              placeholder="Describe your issue..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button type="submit">Submit Complaint</button>
          </form>

          {/* Complaint List */}
<div className="complaint-list">
  <h3>Your Complaints</h3>

  {complaints.length === 0 ? (
    <p className="no-complaint">
      No complaints raised yet
    </p>
  ) : (
    <div className="table-card">
      <table className="complaint-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Completed</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td>{c.category}</td>
              <td>{c.description}</td>
              <td>
                {new Date(
                  c.createdAt
                ).toLocaleDateString()}
              </td>

              {/* Completed */}
              <td>
                {c.completed ? (
                  <span className="badge completed">
                    Completed
                  </span>
                ) : (
                  <span className="badge pending">
                    Not Completed
                  </span>
                )}
              </td>

              {/* Action */}
              <td>
                {c.completed && !c.approved && (
                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveComplaint(c._id)
                    }
                  >
                    Approve
                  </button>
                )}

                {c.approved && (
                  <span className="approved-label">
                    Approved ✅
                  </span>
                )}
              </td>

              
              {/* Status */}
              <td>
                <span
                  className={`badge ${c.status.toLowerCase()}`}
                >
                  {c.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;