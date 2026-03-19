import { useEffect, useState } from "react";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function WardenDashboard() {
  const [warden, setWarden] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("warden");

    if (!data) {
      window.location.href = "/warden/login";
    } else {
      setWarden(JSON.parse(data));
    }
  }, []);

  if (!warden) return null;

  const isBoys = warden.hostelType === "boys";
  const isGirls = warden.hostelType === "girls";

  return (
    <div className="warden-layout">

      <WardenSidebar />

      <div className="warden-main">

        {/* 🔔 Notifications */}
        <div className="warden-notification">
          {isBoys && (
            <>
              <span>🔔 3 Boys Leave Requests</span>
              <span>⚠ 2 Boys Complaints Pending</span>
              <span>📅 Attendance Pending for Boys 2nd Year</span>
            </>
          )}

          {isGirls && (
            <>
              <span>🔔 5 Girls Leave Requests</span>
              <span>⚠ 1 Girls Complaint Pending</span>
              <span>📅 Attendance Pending for Girls 3rd Year</span>
            </>
          )}
        </div>

        {/* Welcome Section */}
        <div className="warden-welcome">
          <h1>
            Welcome Back, {warden.name}
          </h1>
          <p>
            {isBoys
              ? "Overview of Boys Hostel activities."
              : "Overview of Girls Hostel activities."}
          </p>
        </div>

        {/* Profile Card */}
        <div className="warden-profile-card">
          <img
            src="/images/profile.jpg"
            alt="profile"
            className="warden-profile-img"
          />
          <h2>
            {isBoys ? "Boys Warden" : "Girls Warden"}
          </h2>
          <p>
            Responsible for student discipline, leave approvals,
            complaint handling, attendance monitoring and hostel administration.
          </p>
        </div>

        {/* Stats Section */}
        <div className="warden-stats-grid">

          {isBoys && (
            <>
              <div className="warden-stat blue">
                <h3>Total Students</h3>
                <p>420</p>
              </div>

              <div className="warden-stat orange">
                <h3>Pending Leaves</h3>
                <p>8</p>
              </div>

              <div className="warden-stat red">
                <h3>Complaints</h3>
                <p>5</p>
              </div>

              <div className="warden-stat green">
                <h3>Attendance %</h3>
                <p>92%</p>
              </div>
            </>
          )}

          {isGirls && (
            <>
              <div className="warden-stat blue">
                <h3>Total Students</h3>
                <p>350</p>
              </div>

              <div className="warden-stat orange">
                <h3>Pending Leaves</h3>
                <p>6</p>
              </div>

              <div className="warden-stat red">
                <h3>Complaints</h3>
                <p>2</p>
              </div>

              <div className="warden-stat green">
                <h3>Attendance %</h3>
                <p>95%</p>
              </div>
            </>
          )}

        </div>

        {/* Activity Section */}
        <div className="warden-activity-card">
          <h3>Recent Activity</h3>

          <ul>
            {isBoys && (
              <>
                <li>✔ Arjun applied for 2 days leave</li>
                <li>✔ Room 204 complaint resolved</li>
                <li>✔ Sanitization completed for Block B</li>
                <li>✔ Attendance marked for Boys 1st Year</li>
              </>
            )}

            {isGirls && (
              <>
                <li>✔ Anitha applied for 1 day leave</li>
                <li>✔ Room 105 complaint resolved</li>
                <li>✔ Sanitization completed for Block A</li>
                <li>✔ Attendance marked for Girls 2nd Year</li>
              </>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default WardenDashboard;