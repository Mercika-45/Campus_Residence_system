import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

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
        "http://localhost:5000/api/announcements?role=warden"
      );

      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">

        <div className="page-header">
          <h1>Announcements</h1>
          <p className="breadcrumb">Dashboard / Announcements</p>
        </div>

        <div className="announcement-grid">

          {loading && <p>Loading announcements...</p>}

          {error && <p className="error-text">{error}</p>}

          {!loading && announcements.length === 0 && (
            <p>No announcements available.</p>
          )}

          {!loading &&
  announcements.map((item) => (
    <div key={item._id} className="announcement-card">
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
  );
}

export default ViewAnnouncements;