import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function WardenDashboard() {
  return (
    <div className="warden-layout">

      <WardenSidebar />

      <div className="warden-main">

        <div className="warden-notification">
          <span>🔔 3 New Leave Requests</span>
          <span>⚠ 2 Complaints Pending</span>
          <span>📅 Attendance Pending for 2nd Year</span>
        </div>

        <div className="warden-welcome">
          <h1>Welcome Back, Dr. Meena Lakshmi</h1>
          <p>Here is the overview of today’s hostel activities.</p>
        </div>

        <div className="warden-profile-card">
          <img
            src="/images/profile.jpg"
            alt="profile"
            className="warden-profile-img"
          />
          <h2>Chief Warden</h2>
          <p>
            Responsible for student discipline, leave approvals, complaint
            handling, attendance monitoring and hostel administration.
          </p>
        </div>

        <div className="warden-stats-grid">

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

        </div>

        <div className="warden-activity-card">
          <h3>Recent Activity</h3>
          <ul>
            <li>✔ Anitha applied for 2 days leave</li>
            <li>✔ Room 204 complaint resolved</li>
            <li>✔ Sanitization completed for Block B</li>
            <li>✔ Attendance marked for 1st Year</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default WardenDashboard;
