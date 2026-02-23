import { useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function SendAnnouncements() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !message || !audience) {
      alert("Please fill all fields");
      return;
    }

    const announcementData = {
      title,
      message,
      audience,
      date: new Date().toLocaleDateString()
    };

    console.log("Announcement Sent:", announcementData);

    setSuccess(`Announcement successfully sent to ${audience}`);

    setTitle("");
    setMessage("");
    setAudience("");

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">

        <div className="page-header">
          <h1>Send Announcement</h1>
          <p className="breadcrumb">Dashboard / Send Announcement</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="warden-form">

            <div className="form-group">
              <label>Announcement Title</label>
              <input
                type="text"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              >
                <option value="">-- Select Audience --</option>
                <option value="Students">Students</option>
                <option value="All Residents">All Residents</option>
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

            <button type="submit" className="primary-btn">
              Send Announcement
            </button>

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}

export default SendAnnouncements;
