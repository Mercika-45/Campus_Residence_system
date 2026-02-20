import "../styles/Home.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";   // 👈 ADD THIS

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay">


          <h1>Campus Residence System</h1>
          <p>Smart Hostel Management Solution</p>

   {/* ✅ Top-Left Logo */}
<header>
  <div className="logo-container">
    <img src={logo} alt="Campus Residence System Logo" className="logo" />
  </div>
</header>

          <div className="card-container">
            <div className="card1">
              <h3>Administrator</h3>
              <Link to="/admin/login" className="btn">Login</Link>
            </div>

            <div className="card1">
              <h3>Executive Warden</h3>
              <Link to="/executive/login" className="btn">Login</Link>
            </div>

            <div className="card1">
              <h3>Local Warden</h3>
              <Link to="/warden/login" className="btn">Login</Link>
            </div>

            <div className="card1">
              <h3>Campus Resident</h3>
              <Link to="/student-login" className="btn">Login</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
