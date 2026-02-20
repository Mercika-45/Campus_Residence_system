import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ExecutiveWarden.css";

function ViewAnnouncements() {
  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      <ExecutiveSidebar />

      <div className="main-content1">
        
        {/* Topbar */}
        <ExecutiveTopbar name="Executive Warden" />

        <div className="content">
          <h2>Announcements</h2>
          <p className="breadcrumb">Home / View Announcements</p>

          <div className="announcement-wrapper">

            <div className="announcement-card">
              <h4>📢 Hostel Fee Due</h4>
              <p>Please ensure hostel fees are paid before <b>25th February 2026</b>.</p>
              <small>Posted on: 20 Feb 2026</small>
            </div>

            <div className="announcement-card">
              <h4>🛠 Maintenance Work</h4>
              <p>Water pipeline maintenance scheduled on <b>23rd February</b>. Water supply may be interrupted.</p>
              <small>Posted on: 18 Feb 2026</small>
            </div>

            <div className="announcement-card">
              <h4>🍽 Mess Menu Update</h4>
              <p>New healthy mess menu will be implemented from <b>1st March 2026</b>.</p>
              <small>Posted on: 15 Feb 2026</small>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default ViewAnnouncements;
