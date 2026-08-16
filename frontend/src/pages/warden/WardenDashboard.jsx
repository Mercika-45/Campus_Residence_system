import { useEffect, useState } from "react";
import axios from "axios";
import WardenSidebar from "../../components/WardenSidebar";
import "../../styles/WardenPages.css"; // Same as ViewMenu

function WardenDashboard() {
  const API = "http://localhost:5000";

  const [warden, setWarden] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load warden from localStorage
  useEffect(() => {
    const data = localStorage.getItem("warden");
    if (!data) {
      window.location.href = "/warden/login";
      return;
    }
    const parsed = JSON.parse(data);
    fetchWardenData(parsed.email);
  }, []);

  // Fetch warden data from backend
  const fetchWardenData = async (email) => {
    try {
      const res = await axios.get(`${API}/api/warden-dashboard/stats`, {
        params: { email },
      });
      setWarden(res.data.warden);
    } catch (err) {
      console.error("Failed fetching warden data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading dashboard...</h2>;
  if (!warden) return <h2>No Warden Data Found</h2>;

  const isBoys = warden.hostelType === "boys";

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        {/* Page Header */}
        <div className="page-header">
          <h1>{isBoys ? "Boys Local Warden Dashboard" : "Girls Local Warden Dashboard"}</h1>
          <p className="breadcrumb">Dashboard / Local Warden</p>
        </div>

        <div className="info-wrapper">
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src={warden.image ? `${API}${warden.image}` : "/images/profile.jpg"}
              alt="profile"
              className="profile-img"
              onError={(e) => (e.target.src = "/images/profile.jpg")}
            />
            <h3>{warden.name}</h3>
            <p>{warden.email}</p>
            <p>
              <b>Hostel Type:</b> {isBoys ? "Boys Hostel" : "Girls Hostel"}
            </p>
          </div>

          {/* General Info Card */}
          <div className="general-card">
            <h3>📄 Warden Information</h3>
            <div className="info-grid">
              <p><b>ROLE</b> : Local Warden</p>
              <p><b>MOBILE</b> : {warden.phone || "Not Available"}</p>
              <p><b>EMAIL</b> : {warden.email}</p>
              <p><b>STATUS</b> : Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardenDashboard;