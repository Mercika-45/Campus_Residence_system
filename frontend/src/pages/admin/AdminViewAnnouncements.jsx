import "../../styles/Admin.css";
import AdminSidebar from "../../components/AdminSidebar";

function AdminViewAnnouncements() {

  const announcements = [
    {
      id: 1,
      title: "Hostel Fee Due",
      content: "Please ensure hostel fees are paid before 25th February 2026.",
      date: "20 Feb 2026"
    },
    {
      id: 2,
      title: "Maintenance Work",
      content: "Water pipeline maintenance on 23rd February. Water supply may be interrupted.",
      date: "18 Feb 2026"
    },
    {
      id: 3,
      title: "Mess Menu Update",
      content: "New healthy mess menu will be implemented from 1st March 2026.",
      date: "15 Feb 2026"
    }
  ];

  return (
    <div className="warden-layout">
      <AdminSidebar />

      <div className="warden-page">

        <div className="page-header1">
          <h1>View Announcements</h1>
          <p className="breadcrumb">Admin / View Announcements</p>
        </div>

        <div className="announcement-grid1">
          {announcements.map((item) => (
            <div key={item.id} className="announcement-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <span className="announcement-date">
                Posted on: {item.date}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminViewAnnouncements;
