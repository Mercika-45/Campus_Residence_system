import { useState, useEffect } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function SendAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements?createdBy=executive"
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
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
        createdBy: "executive",
      });

      alert("Announcement Sent Successfully ✅");

      setTitle("");
      setMessage("");
      setTarget("");

      fetchAnnouncements();
    } catch (err) {
      setError("Failed to send announcement");
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
      <ExecutiveSidebar />

      <div className="main-content1">
        <ExecutiveTopbar name="Executive Warden" />

        <div className="content">
          <h2>Send Announcement</h2>
          <p className="breadcrumb">Home / Send Announcement</p>

          <div className="form-wrapper">
            <form className="announcement-form" onSubmit={handleSubmit}>
              {error && <p className="error-text">{error}</p>}

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
  <option value="warden">Wardens</option>
  <option value="admin">Admin</option>
  <option value="all">Everyone</option>
</select>
              </div>

              <div className="form-group">
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
                className="send-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Announcement"}
              </button>
            </form>
          </div>

          {/* ✅ View Sent Announcements */}
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

export default SendAnnouncements;