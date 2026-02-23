import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function AdminDashboard() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT CONTENT */}
      <div className="main-content">
        <AdminTopbar title="Admin Dashboard" />

        <div className="dashboard-content">
          <h2 className="welcome-text">
            Welcome back, {admin?.name} 👋
          </h2>

          <div className="admin-profile-wrapper">
            
            {/* PROFILE CARD */}
            <div className="admin-profile-card">
              <img
                src="/images/profile.jpg"
                alt="Admin"
                className="admin-profile-img"
              />

              <h3>{admin?.name}</h3>
              <p className="admin-role">{admin?.role}</p>

              <span className="status-badge online">● Online</span>
            </div>

            {/* DETAILS CARD */}
            <div className="admin-details-card">
              <h3>Admin Information</h3>

              <div className="detail-row">
                <span>Email</span>
                <span>{admin?.email}</span>
              </div>

              <div className="detail-row">
                <span>Role</span>
                <span>{admin?.role}</span>
              </div>

              <div className="detail-row">
                <span>Admin ID</span>
                <span>ADM2026</span>
              </div>

              <div className="detail-row">
                <span>Last Login</span>
                <span>{new Date().toLocaleString()}</span>
              </div>

              <div className="detail-row">
                <span>Account Status</span>
                <span className="active-text">Active</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
