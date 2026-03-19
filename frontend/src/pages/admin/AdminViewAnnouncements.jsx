import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Admin.css";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";

function AdminViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
  try {
    setLoading(true);
    setError(""); // ✅ CLEAR OLD ERROR

    const res = await axios.get(
      "http://localhost:5000/api/announcements?role=admin"
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
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="View Announcements" />

        <div className="dashboard-content">
          <div className="page-header1">
            <h1>View Announcements</h1>
            <p className="breadcrumb">Admin / View Announcements</p>
          </div>

          <div className="announcement-grid1">

            {loading && <p>Loading announcements...</p>}

            {error && <p className="error-text">{error}</p>}

            {!loading && announcements.length === 0 && (
              <p className="no-data">No announcements available.</p>
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

      <h3>{item.title}</h3>
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

export default AdminViewAnnouncements;