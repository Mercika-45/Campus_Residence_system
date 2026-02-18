import AdminSidebar from "../../components/AdminSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/Admin.css";

function ViewWardens() {

  const wardens = [
    {
      id: 1,
      name: "Kumar",
      email: "kumar@gmail.com",
      phone: "9876543210",
      hostel: "Block A",
      image: "/images/profile.jpg"
    },
    {
      id: 2,
      name: "Anitha",
      email: "anitha@gmail.com",
      phone: "9845123456",
      hostel: "Block B",
      image: "/images/profile.jpg"
    },
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9784512369",
      hostel: "Block C",
      image: "/images/profile.jpg"
    }
  ];

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <Topbar title="View Wardens" />

        <div className="dashboard-content">
          <h2 className="page-title">Hostel Wardens</h2>
          <p className="page-subtitle">
            View all allocated wardens and their hostel details
          </p>

          <div className="table-card">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Hostel</th>
                </tr>
              </thead>

              <tbody>
                {wardens.map((w) => (
                  <tr key={w.id}>
                    <td>
                      <img src={w.image} alt="profile" className="table-img" />
                    </td>
                    <td>{w.name}</td>
                    <td>{w.email}</td>
                    <td>{w.phone}</td>
                    <td>
                      <span className="hostel-badge">{w.hostel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewWardens;
