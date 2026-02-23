import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function Announcements() {
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("");

  const handlePublish = async () => {
    if (!message || !target) {
      alert("Please enter announcement and select target audience");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, target })
      });

      if (res.ok) {
        alert("Announcement Published Successfully 🎉");
        setMessage("");
        setTarget("");
      } else {
        alert("Failed to publish announcement");
      }
    } catch (err) {
      alert("Server Error");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT CONTENT */}
      <div className="main-content">
        <AdminTopbar title="Announcements" />

        <div className="dashboard-content">

          <h3>Post Announcement</h3>

          <div className="announce-box">

            <select
              className="announce-select"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <option value="">Select Target Audience</option>
              <option value="students">Students</option>
              <option value="local-warden">Local Wardens</option>
              <option value="deputy-warden">Deputy Wardens</option>
              <option value="all-wardens">All Wardens</option>
              <option value="all">Everyone</option>
            </select>

            <textarea
              className="announce-textarea"
              placeholder="Enter announcement message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="btn publish" onClick={handlePublish}>
              Publish Announcement
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Announcements;
