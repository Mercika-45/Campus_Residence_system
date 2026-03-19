import { useEffect, useState } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcements?role=executive"
      );

      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/announcements/${id}`
      );

      // Remove from UI after delete
      setAnnouncements((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Announcement deleted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement");
    }
  };

  return (
    <div className="dashboard-container">
      <ExecutiveSidebar />

      <div className="main-content1">
        <ExecutiveTopbar name="Executive Warden" />

        <div className="content">
          <h2>Announcements</h2>
          <p className="breadcrumb">Home / View Announcements</p>

          <div className="announcement-wrapper">

            {loading && <p>Loading announcements...</p>}

            {error && <p className="error-text">{error}</p>}

            {!loading && announcements.length === 0 && (
              <p>No announcements available.</p>
            )}

            {!loading &&
  announcements.map((item) => (
    <div key={item._id} className="announcement-card">

      <span
        onClick={() => handleDelete(item._id)}
        className="delete-btn"
      >
        ❌
      </span>

      <h4>{item.title}</h4>
      <p>{item.message}</p>

      <p className="posted-by">
        Posted By: <strong>{item.createdBy.toUpperCase()}</strong>
      </p>

      <small className="announcement-time">
        Posted on: {new Date(item.createdAt).toLocaleString()}
      </small>

    </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAnnouncements;