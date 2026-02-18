import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ExecutiveWarden.css";
import "../../styles/AllocateRoomsEW.css";

function AllocateRooms() {
  return (
    <div className="executive-layout">
      <ExecutiveSidebar />

      <div className="executive-main" style={{  background: "#f5f7fb",marginLeft:220 }}>
        <Topbar title="Allocate Rooms" />

        <div className="dashboard-content">
          <div className="card allocate-card">

            <h3 className="page-title">Allocate Student Room</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Student Register Number</label>
                <input type="text" placeholder="Enter Reg No" />
              </div>

              <div className="form-group">
                <label>Select Hostel</label>
                <select>
                  <option value="">Select Hostel</option>
                  <option>Men's Hostel</option>
                  <option>Women's Hostel</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select Block</label>
                <select>
                  <option value="">Select Block</option>
                  <option>Block A</option>
                  <option>Block B</option>
                  <option>Block C</option>
                </select>
              </div>

              <div className="form-group">
                <label>Room Number</label>
                <input type="text" placeholder="Enter Room No" />
              </div>
            </div>

            <div className="btn-wrapper">
              <button className="btn allocate-btn">Allocate Room</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AllocateRooms;
