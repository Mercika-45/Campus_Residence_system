import { NavLink,useLocation } from "react-router-dom";
import "../styles/WardenSidebar.css";

function WardenSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("warden");
    window.location.href = "/warden/login";
  };
  return (
    <div className="sidebarlw">
      <h2 className="logo">WARDEN</h2>

      <NavLink to="/warden/dashboard" end className="link">
        Dashboard
      </NavLink>
      
      <NavLink to="/warden/leave" className="link">
        Leave Requests
      </NavLink>

      <NavLink to="/warden/view-complaints" className="link">
        ViewComplaints
      </NavLink>

      <NavLink to="/warden/attendance" className="link">
        Attendance
      </NavLink>

      <NavLink to="/warden/sanitization" className="link">
        Sanitization
      </NavLink>


      <NavLink to="/warden/view-menu" className="link">
        View Food Menu
      </NavLink>

      <NavLink to="/warden/view-announcements" className="link">
        View Announcements
      </NavLink>

      <NavLink to="/warden/send-announcements" className="link">
        Send Announcements
      </NavLink>

      <NavLink to="/warden/outentry" className="link">
        OutEntry
      </NavLink>

      <NavLink to="/warden/inentry" className="link">
        InEntry
      </NavLink>
       <div className="logout" onClick={handleLogout}>
          Logout
        </div>
    </div>
  );
}

export default WardenSidebar;
