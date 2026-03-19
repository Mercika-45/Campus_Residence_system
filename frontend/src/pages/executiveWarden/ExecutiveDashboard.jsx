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
      const parsed = JSON.parse(data);
      setExecutive(parsed);
    }
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
                src="/images/profile.jpg"
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
                <p><b>EMPLOYEE ID</b> : EW1023</p>

                {/* 🔥 Different Data */}
                {isBoys && (
                  <>
                    <p><b>HOSTEL BLOCKS</b> : 6</p>
                    <p><b>STUDENTS</b> : 1200+</p>
                    <p><b>WARDENS</b> : 10</p>
                  </>
                )}

                {isGirls && (
                  <>
                    <p><b>HOSTEL BLOCKS</b> : 4</p>
                    <p><b>STUDENTS</b> : 850+</p>
                    <p><b>WARDENS</b> : 7</p>
                  </>
                )}

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