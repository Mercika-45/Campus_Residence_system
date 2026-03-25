import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function WardenDashboard() {
  const [warden, setWarden] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wardenData = JSON.parse(localStorage.getItem("warden"));

        if (!wardenData) {
          window.location.href = "/warden/login";
          return;
        }

        setWarden(wardenData);

        // ✅ Fetch dashboard stats
        const res = await axios.get(
          `http://localhost:5000/api/dashboard?hostelType=${wardenData.hostelType}`
        );

        setStats(res.data);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="warden-layout">
        <WardenSidebar />
        <div className="warden-main">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  /* ================= SAFETY ================= */
  if (!warden || !stats) {
    return (
      <div className="warden-layout">
        <WardenSidebar />
        <div className="warden-main">
          <h2>Failed to load dashboard</h2>
        </div>
      </div>
    );
  }

  const isBoys = warden.hostelType === "boys";

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-main">

        {/* 🔔 Notifications */}
        <div className="warden-notification">
          <span>🔔 {stats.pendingLeaves || 0} Leave Requests</span>
          <span>⚠ {stats.complaints || 0} Complaints Pending</span>
          <span>📅 Attendance: {stats.attendancePercent || 0}%</span>
        </div>

        {/* Welcome */}
        <div className="warden-welcome">
          <h1>Welcome Back, {warden.name}</h1>
          <p>
            {isBoys
              ? "Overview of Boys Hostel activities."
              : "Overview of Girls Hostel activities."}
          </p>
        </div>

        {/* Profile */}
        <div className="warden-profile-card">
          <img
            src={warden.image || "/images/profile.jpg"}
            alt="profile"
            className="warden-profile-img"
          />
          <h2>{isBoys ? "Boys Warden" : "Girls Warden"}</h2>
          <p>{warden.dept}</p>
        </div>

        {/* Stats */}
        <div className="warden-stats-grid">

          <div className="warden-stat blue">
            <h3>Total Students</h3>
            <p>{stats.totalStudents || 0}</p>
          </div>

          <div className="warden-stat orange">
            <h3>Pending Leaves</h3>
            <p>{stats.pendingLeaves || 0}</p>
          </div>

          <div className="warden-stat red">
            <h3>Complaints</h3>
            <p>{stats.complaints || 0}</p>
          </div>

          <div className="warden-stat green">
            <h3>Attendance %</h3>
            <p>{stats.attendancePercent || 0}%</p>
          </div>

        </div>

        {/* Activity */}
        <div className="warden-activity-card">
          <h3>Recent Activity</h3>

          <ul>
            {stats.recentLeaves?.length > 0 ? (
              stats.recentLeaves.map((leave, i) => (
                <li key={i}>
                  ✔ {leave.studentName} applied leave
                </li>
              ))
            ) : (
              <li>No recent leave activity</li>
            )}

            {stats.recentComplaints?.length > 0 ? (
              stats.recentComplaints.map((c, i) => (
                <li key={i}>
                  ✔ Complaint: {c.category}
                </li>
              ))
            ) : (
              <li>No recent complaints</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default WardenDashboard;