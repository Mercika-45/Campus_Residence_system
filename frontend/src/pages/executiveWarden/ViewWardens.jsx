import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ViewWardensEW.css";

function ViewWardens() {
  /* ================= LOCAL WARDEN DATA ================= */

  const localWardens = [
    {
      id: 1,
      name: "Mr. Kumar",
      hostel: "Boys Hostel",
      block: "Block A",
      phone: "9876543210",
      photo: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 2,
      name: "Mrs. Devi",
      hostel: "Girls Hostel",
      block: "Block B",
      phone: "9123456780",
      photo: "https://i.pravatar.cc/150?img=32",
    },
    {
      id: 3,
      name: "Mr. Arun",
      hostel: "Boys Hostel",
      block: "Block C",
      phone: "9988776655",
      photo: "https://i.pravatar.cc/150?img=15",
    },
  ];

  /* ================= FILTER ================= */

  const boysWardens = localWardens.filter(
    (w) => w.hostel === "Boys Hostel"
  );

  const girlsWardens = localWardens.filter(
    (w) => w.hostel === "Girls Hostel"
  );

  /* ================= TABLE RENDER ================= */

  const renderTable = (data) => (
    <div className="ew-table-card">
      <table className="ew-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Hostel</th>
            <th>Block</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No wardens available
              </td>
            </tr>
          ) : (
            data.map((w, index) => (
              <tr key={w.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={w.photo}
                    alt={w.name}
                    className="ew-avatar"
                  />
                </td>
                <td>{w.name}</td>
                <td>
                  <span className="hostel-badge">{w.hostel}</span>
                </td>
                <td>
                  <span className="block-badge">{w.block}</span>
                </td>
                <td>{w.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  /* ================= UI ================= */

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ExecutiveSidebar />

      <div style={{ flex: 1, background: "#f5f7fb", marginLeft: 240 }}>
        <ExecutiveTopbar title="View Local Wardens" />

        <div className="ew-container">
          <h2>Local Wardens</h2>

          {/* ✅ Boys First */}
          <h3 className="ew-section-title">
            Boys Hostel Wardens
          </h3>
          {renderTable(boysWardens)}

          {/* ✅ Girls Next */}
          <h3 className="ew-section-title">
            Girls Hostel Wardens
          </h3>
          {renderTable(girlsWardens)}
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;
