import { useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function SendAnnouncements() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("");

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

    alert(`Announcement sent to ${audience}`);

    setTitle("");
    setMessage("");
    setAudience("");
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
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                >
                  <option value="">-- Select Audience --</option>
                  <option value="Students">Students</option>
                  <option value="Local Wardens">Local Wardens</option>
                  <option value="All">All</option>
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

              <button type="submit" className="send-btn">
                Send Announcement
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendAnnouncements;
