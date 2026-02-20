import { Link, useLocation } from "react-router-dom";
import "../styles/StudentDashboard.css";

function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("student");
    window.location.href = "/student-login";
  };

  return (
    <div className="sidebarS">
      <h2 className="logo">Campus Resident</h2>

      <div className="nav-links">
        <Link
          to="/student/dashboard"
          className={location.pathname === "/student/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/student/menu"
          className={location.pathname === "/student/menu" ? "active" : ""}
        >
          View Menu
        </Link>

        <Link to="/student/fee">Pay Fee</Link>
        <Link to="/student/complaint">Raise Complaint</Link>
        <Link to="/student/leave">Apply Leave</Link>
        <Link to="/student/vacating">vacation</Link>
        <Link to="/student/leave-status">Leave Status</Link>

        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
