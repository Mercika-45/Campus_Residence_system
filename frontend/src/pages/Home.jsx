import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay">
          <h1>Campus Residence System</h1>
          <p>Smart Hostel Management Solution</p>
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
          <h3>Hostel Resident</h3>
           <Link to="/student-login" className="btn">Login</Link>
        </div>
           
        </div>
      </div>
    </div>
          
         
      

      {/* LOGIN CARDS */}
      

        
    </>
  );
}

export default Home;
