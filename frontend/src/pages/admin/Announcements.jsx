import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function Announcements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch announcements created by Admin
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements?createdBy=admin"
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handlePublish = async () => {
    if (!title || !message || !target) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("http://localhost:5000/api/announcements", {
        title,
        message,
        target,
        createdBy: "admin",
      });

      alert("Announcement Published Successfully 🎉");

      setTitle("");
      setMessage("");
      setTarget("");

      fetchAnnouncements();
    } catch (err) {
      setError("Failed to publish announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/announcements/${id}`
      );
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Announcements" />

        <div className="dashboard-content">
          <h3>Post Announcement</h3>

          <div className="announce-box">
            {error && <p className="error-text">{error}</p>}

            <input
              type="text"
              placeholder="Enter announcement title"
              className="announce-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

           <select
  className="announce-select"
  value={target}
  onChange={(e) => setTarget(e.target.value)}
>
  <option value="">Select Target Audience</option>
  <option value="student">Students</option>
  <option value="warden">Wardens</option>
  <option value="executive">Executive</option>
  <option value="admin">Admin</option>
  <option value="all">Everyone</option>
</select>

            <textarea
              className="announce-textarea"
              placeholder="Enter announcement message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="btn publish"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Announcement"}
            </button>
          </div>

          {/* ✅ View Announcements Sent by Admin */}
          <div style={{ marginTop: "40px" }}>
            <h3>Your Announcements</h3>

            <div className="announcement-grid1">
              {announcements.length === 0 ? (
                <p className="no-data">No announcements available.</p>
              ) : (
                announcements.map((item) => (
  <div key={item._id} className="announcement-card">
    <span
      onClick={() => handleDelete(item._id)}
      className="delete-btn"
    >
      ❌
    </span>

    <h3>{item.title}</h3>
    <p>{item.message}</p>

    <p>
      <strong>Target:</strong> {item.target}
    </p>

    

    <small className="announcement-date">
      Posted on: {new Date(item.createdAt).toLocaleString()}
    </small>
  </div>
))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcements;