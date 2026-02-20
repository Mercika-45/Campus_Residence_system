import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function ViewWardens() {
  /* ================= DATA ================= */

  // ✅ Deputy Wardens (NO block)
  const deputyWardens = [
    {
      id: 1,
      name: "Kumar",
      email: "kumar@gmail.com",
      phone: "9876543210",
      hostel: "Boys Hostel",
      image: "/images/profile.jpg",
    },
    {
      id: 2,
      name: "Anitha",
      email: "anitha@gmail.com",
      phone: "9845123456",
      hostel: "Girls Hostel",
      image: "/images/profile.jpg",
    },
  ];

  // ✅ Local Wardens (WITH block)
  const localWardens = [
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9784512369",
      hostel: "Boys Hostel",
      block: "Block A",
      image: "/images/profile.jpg",
    },
    {
      id: 4,
      name: "Meena",
      email: "meena@gmail.com",
      phone: "9123456780",
      hostel: "Girls Hostel",
      block: "Block B",
      image: "/images/profile.jpg",
    },
    {
      id: 5,
      name: "Suresh",
      email: "suresh@gmail.com",
      phone: "9001122334",
      hostel: "Boys Hostel",
      block: "Block C",
      image: "/images/profile.jpg",
    },
  ];

  /* ================= FILTERING ================= */

  const localBoys = localWardens.filter(
    (w) => w.hostel === "Boys Hostel"
  );

  const localGirls = localWardens.filter(
    (w) => w.hostel === "Girls Hostel"
  );

  /* ================= TABLE RENDER ================= */

  const renderTable = (data, showBlock = false) => (
    <div className="table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Hostel</th>
            {showBlock && <th>Block</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={showBlock ? 6 : 5} className="no-data">
                No wardens available
              </td>
            </tr>
          ) : (
            data.map((w) => (
              <tr key={w.id}>
                <td>
                  <img
                    src={w.image}
                    alt="profile"
                    className="table-img"
                  />
                </td>
                <td>{w.name}</td>
                <td>{w.email}</td>
                <td>{w.phone}</td>
                <td>
                  <span className="hostel-badge">{w.hostel}</span>
                </td>

                {showBlock && (
                  <td>
                    <span className="block-badge">{w.block}</span>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="View Wardens" />

        <div className="dashboard-content">
          <h2 className="page-title">Hostel Wardens</h2>
          <p className="page-subtitle">
            View all deputy and local wardens
          </p>

          {/* ================= DEPUTY ================= */}
          <h3 className="section-title">Deputy Wardens</h3>
          {renderTable(deputyWardens, false)}

          {/* ================= LOCAL ================= */}
          <h3 className="section-title">Local Wardens</h3>

          <h4 className="subsection-title">
            Boys Hostel Wardens
          </h4>
          {renderTable(localBoys, true)}

          <h4 className="subsection-title">
            Girls Hostel Wardens
          </h4>
          {renderTable(localGirls, true)}
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;
