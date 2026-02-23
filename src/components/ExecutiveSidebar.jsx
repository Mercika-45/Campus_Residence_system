import { NavLink,useLocation } from "react-router-dom";
import "../styles/ExecutiveWarden.css";

function ExecutiveSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("executiveWarden");
    window.location.href = "/executive/login";
  };
  return (
    <div className="executive-sidebar">
      <h2 className="logo">Executive Warden</h2>

      <NavLink to="/executive/dashboard">Dashboard</NavLink>
      <NavLink to="/executive/view-announcements">View Announcements</NavLink>
      <NavLink to="/executive/send-announcements">Send Announcements</NavLink>
      <NavLink to="/executive/view-complaints">View Complaints</NavLink>
      <NavLink to="/executive/view-menu">View Menu</NavLink>
      <NavLink to="/executive/view-wardens">View Local Wardens</NavLink>
      <NavLink to="/executive/view-students">View Students</NavLink>
      <NavLink to="/executive/student-request"> Student Request</NavLink>
      <NavLink to="/executive/fee-status">Fee Status</NavLink>
      <NavLink to="/executive/allocate-rooms">Allocate Rooms</NavLink>
      <div className="logout" onClick={handleLogout}>
          Logout
        </div>
    </div>
  );
}

export default ExecutiveSidebar;
