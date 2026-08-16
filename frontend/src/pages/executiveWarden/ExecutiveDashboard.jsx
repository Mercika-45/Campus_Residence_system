import { useEffect, useState } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ExecutiveDashboard() {

  const API = "http://localhost:5000";

  const [executive, setExecutive] = useState(null);

  const [stats, setStats] = useState({
    blocks: 0,
    students: 0,
    wardens: 0
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD EXECUTIVE DATA ================= */

  useEffect(() => {

    const data = localStorage.getItem("executiveWarden");

    if (!data) {
      window.location.href = "/executive/login";
      return;
    }

    const parsed = JSON.parse(data);

    fetchExecutiveStats(parsed.email);

  }, []);

  /* ================= FETCH FROM BACKEND ================= */

  const fetchExecutiveStats = async (email) => {
    try {

      const res = await axios.get(
        `${API}/api/executive/stats`,
        {
          params: { email }
        }
      );

      // ✅ Stats
      setStats({
        blocks: res.data.blocks || 0,
        students: res.data.students || 0,
        wardens: res.data.wardens || 0
      });

      // ✅ Executive profile from DB
      setExecutive(res.data.executive);

    } catch (err) {
      console.error("Failed to fetch executive stats:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) return <h2>Loading dashboard...</h2>;
  if (!executive) return <h2>No Executive Data Found</h2>;

  const isBoys = executive.hostelType === "boys";
  const isGirls = executive.hostelType === "girls";

  /* ================= UI ================= */

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

            {/* ================= PROFILE CARD ================= */}
            <div className="profile-card1">

              <img
                src={
  executive.image
    ? `${API}${executive.image}`
    : "/images/profile.jpg"
}
                alt="profile"
                className="profile-img"
                onError={(e) => {
                  e.target.src = "/images/profile.jpg";
                }}
              />

              <h3>{executive.name}</h3>
              <p>{executive.email}</p>

              <p>
                <b>Hostel Type :</b>{" "}
                {isBoys ? "Boys Hostel" : "Girls Hostel"}
              </p>

            </div>

            {/* ================= GENERAL INFO ================= */}

            <div className="general-card">

              <h3>📄 Executive Information</h3>

              <div className="info-grid">

                <p><b>ROLE</b> : Executive Warden</p>

                <p><b>MOBILE</b> : {executive.phone || "Not Available"}</p>

                <p><b>EMAIL</b> : {executive.email}</p>

                <p><b>STATUS</b> : Active</p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ExecutiveDashboard;