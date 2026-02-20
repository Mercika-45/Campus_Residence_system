import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/RaiseComplaint.css";

function RaiseComplaint() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState(
    JSON.parse(localStorage.getItem("complaints")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !description) {
      alert("Please fill all fields");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      category,
      description,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    const updatedComplaints = [newComplaint, ...complaints];
    setComplaints(updatedComplaints);
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));

    setCategory("");
    setDescription("");
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
              <p className="no-complaint">No complaints raised yet</p>
            ) : (
              complaints.map((c) => (
                <div key={c.id} className="complaint-card">
                  <div className="complaint-header">
                    <span className="category">{c.category}</span>
                    <span className={`status ${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </div>

                  <p>{c.description}</p>
                  <small>📅 {c.date}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaiseComplaint;
