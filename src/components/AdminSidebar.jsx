import { NavLink, useLocation } from "react-router-dom";
import "../styles/AdminSidebar.css";

function AdminSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };
  return (
    <div className="admin-sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/allocate-warden">Allocate Warden</NavLink>
        <NavLink to="/admin/view-wardens">View Wardens</NavLink>
        <NavLink to="/admin/view-students">View Students</NavLink>
        <NavLink to="/admin/control-login">Control Login</NavLink>
        <NavLink to="/admin/food-menu">Food Menu</NavLink>
        <NavLink to="/admin/complaints">Complaints</NavLink>
        <NavLink to="/admin/fee-status">Fee Status</NavLink>
        <NavLink to="/admin/announcements">Send Announcements</NavLink>
        <NavLink to="/admin/view-announcements">View Announcements</NavLink>
         <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </nav>
      
    </div>
    
  );
}

export default AdminSidebar;
