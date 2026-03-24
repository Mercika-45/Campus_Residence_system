import { useEffect, useState } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ExecutiveDashboard() {
  const [executive, setExecutive] = useState(null);
  const [stats, setStats] = useState({
    blocks: 0,
    students: 0,
    wardens: 0
  });

  useEffect(() => {
    const data = localStorage.getItem("executiveWarden");

    if (!data) {
      window.location.href = "/executive/login";
      return;
    }

    const parsed = JSON.parse(data);
    setExecutive(parsed);

    // ================= FETCH DATA BASED ON EXECUTIVE =================
    axios
      .get(`http://localhost:5000/api/executive/${parsed.email}/stats`)
      .then(res => {
        // Backend should return blocks, students, wardens count for this executive
        setStats(res.data);
      })
      .catch(err => console.log("Failed to fetch executive stats:", err));

  }, []);

  if (!executive) return null;

  const isBoys = executive.hostelType === "boys";
  const isGirls = executive.hostelType === "girls";

  return (
    <div className="dashboard-container">
      <ExecutiveSidebar />

      <div className="main-content1">
        <ExecutiveTopbar name={executive.name} />

        <div className="content">
          <h2>
            {isBoys
              ? "Boys Executive Dashboard"
              : "Girls Executive Dashboard"}
          </h2>

          <p className="breadcrumb">
            Home / {isBoys ? "Boys Executive" : "Girls Executive"}
          </p>

          <div className="info-wrapper">

            {/* Profile Card */}
            <div className="profile-card1">
              <img
                src={executive.image || "/images/profile.jpg"}
                alt="profile"
                className="profile-img"
              />
              <h3>{executive.name}</h3>
              <p>{executive.email}</p>
              <p>
                <b>Hostel Type:</b> {isBoys ? "Boys Hostel" : "Girls Hostel"}
              </p>
            </div>

            {/* General Info */}
            <div className="general-card">
              <h3>📄 Executive Information</h3>

              <div className="info-grid">
                <p><b>ROLE</b> : Executive Warden</p>

                <p><b>HOSTEL BLOCKS</b> : {stats.blocks}</p>
                <p><b>STUDENTS</b> : {stats.students}</p>
                <p><b>WARDENS</b> : {stats.wardens}</p>

                <p><b>MOBILE</b> : {executive.phone || "9876543210"}</p>
                <p><b>EMAIL</b> : {executive.email}</p>
                <p><b>STATUS</b> : {executive.status || "Active"}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;