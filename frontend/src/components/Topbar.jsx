import "../styles/StudentDashboard.css";

function Topbar({ name }) {
  return (
    <div className="topbarS">
      <h3>Welcome, {name}</h3>

      <div className="user">
        <img
          src="/images/profile.jpg"
          alt="User"
        />
      </div>
    </div>
  );
}

export default Topbar;
