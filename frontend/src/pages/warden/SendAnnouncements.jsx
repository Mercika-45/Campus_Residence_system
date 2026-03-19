import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function SendAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Warden's Announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements?createdBy=warden"
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        createdBy: "warden",
      });

      alert("Announcement Sent Successfully ✅");

      setTitle("");
      setMessage("");
      setTarget("");

      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      setError("Failed to send announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/announcements/${id}`
      );
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <div className="page-header">
          <h1>Send Announcement</h1>
          <p className="breadcrumb">
            Dashboard / Send Announcement
          </p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="warden-form">
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <div className="form-group">
              <label>Announcement Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Target Audience</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                <option value="">-- Select Audience --</option>
                <option value="student">Students</option>
                <option value="all">Everyone</option>
              </select>
            </div>

            <div className="form-group full">
              <label>Message</label>
              <textarea
                rows="6"
                placeholder="Enter announcement message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Announcement"}
            </button>
          </form>
        </div>

        {/* ✅ View Sent Announcements */}
        <div style={{ marginTop: "40px" }}>
          <h2>Your Announcements</h2>

          {announcements.length === 0 ? (
            <p>No announcements available.</p>
          ) : (
           announcements.map((item) => (
  <div
    key={item._id}
    className="form-card"
    style={{ marginTop: "15px", position: "relative" }}
  >
    <span
      onClick={() => handleDelete(item._id)}
      className="delete-btn"
      style={{
        position: "absolute",
        top: "10px",
        right: "15px",
        cursor: "pointer",
      }}
    >
      ❌
    </span>

    <h3>{item.title}</h3>
    <p>{item.message}</p>

    <p>
      <strong>Target:</strong> {item.target}
    </p>

    <small style={{ color: "gray" }}>
      Posted on: {new Date(item.createdAt).toLocaleString()}
    </small>
  </div>
))
          )}
        </div>
      </div>
    </div>
  );
}

export default SendAnnouncements;