import { useEffect, useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ExecutiveDashboard() {
  const [executive, setExecutive] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("executiveWarden");
    if (!data) {
      window.location.href = "/executive/login";
    } else {
      setExecutive(JSON.parse(data));
    }
  }, []);

  if (!executive) return null;

  return (
    <div className="dashboard-container">
      <ExecutiveSidebar />

      <div className="main-content1">
        <ExecutiveTopbar name={executive.name} />

        <div className="content">
          <h2>Executive Dashboard</h2>
          <p className="breadcrumb">Home / Executive Dashboard</p>

          <div className="info-wrapper">
            {/* Profile Card */}
            <div className="profile-card1">
              <img
                src="/images/profile.jpg"
                alt="profile"
                className="profile-img"
              />
              <h3>{executive.name}</h3>
              <p>{executive.email}</p>
            </div>

            {/* General Info */}
            <div className="general-card">
              <h3>📄 Executive Information</h3>

              <div className="info-grid">
                <p><b>ROLE</b> : Executive Warden</p>
                <p><b>EMPLOYEE ID</b> : EW1023</p>
                <p><b>HOSTEL BLOCKS</b> : 6</p>
                <p><b>STUDENTS</b> : 1200+</p>
                <p><b>OFFICE</b> : Main Hostel Admin</p>
                <p><b>MOBILE</b> : 9876543210</p>
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
