import { Link, useLocation } from "react-router-dom";
import "../styles/StudentDashboard.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">CRS</h2>

      <ul>
        <li className={location.pathname === "/student/dashboard" ? "active" : ""}>
          <Link to="/student/dashboard">Dashboard</Link>
        </li>

        <li className={location.pathname === "/student/menu" ? "active" : ""}>
          <Link to="/student/menu">View Menu</Link>
        </li>

        <li>
          <Link to="/student/room">View Room</Link>
        </li>

        <li>
          <Link to="/student/fee">Pay Fee</Link>
        </li>

        <li>
          <Link to="/student/complaint">Raise Complaint</Link>
        </li>

        <li>
          <Link to="/student/leave">Apply Leave</Link>
        </li>

        <li>
          <Link to="/student/leave-status">Leave Status</Link>
        </li>

        <li
          className="logout"
          onClick={() => {
            localStorage.removeItem("student");
            window.location.href = "/student-login";
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
