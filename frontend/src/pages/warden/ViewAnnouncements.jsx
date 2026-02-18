import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function ViewAnnouncements() {

  const announcements = [
    {
      id: 1,
      title: "Hostel Fee Due",
      content: "Please ensure hostel fees are paid before 25th February 2026.",
      date: "20 Feb 2026",
      icon: "📢"
    },
    {
      id: 2,
      title: "Maintenance Work",
      content: "Water pipeline maintenance scheduled on 23rd February. Water supply may be interrupted.",
      date: "18 Feb 2026",
      icon: "🛠"
    },
    {
      id: 3,
      title: "Mess Menu Update",
      content: "New healthy mess menu will be implemented from 1st March 2026.",
      date: "15 Feb 2026",
      icon: "🍽"
    }
  ];

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">

        <div className="page-header">
          <h1>Announcements</h1>
          <p className="breadcrumb">Dashboard / Announcements</p>
        </div>

        <div className="announcement-grid">
          {announcements.map((item) => (
            <div key={item.id} className="announcement-card">
              <h3>
                <span className="announcement-icon">{item.icon}</span>
                {item.title}
              </h3>
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

export default ViewAnnouncements;
