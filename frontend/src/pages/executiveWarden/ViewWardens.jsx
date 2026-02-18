import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ViewWardensEW.css";

function ViewWardens() {
  const wardens = [
    {
      id: 1,
      name: "Mr. Kumar",
      hostel: "Boys Hostel - A",
      phone: "9876543210",
      photo: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 2,
      name: "Mrs. Devi",
      hostel: "Girls Hostel - B",
      phone: "9123456780",
      photo: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 3,
      name: "Mr. Arun",
      hostel: "Boys Hostel - C",
      phone: "9988776655",
      photo: "https://i.pravatar.cc/150?img=15"
    }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ExecutiveSidebar />

      <div style={{ flex: 1, background: "#f5f7fb",marginLeft:240 }}>
        <Topbar title="View Local Wardens" />

        <div className="ew-container" >
          <h2>Local Wardens List</h2>

          <table className="ew-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Hostel</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {wardens.map((w, index) => (
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
                  <td>{w.hostel}</td>
                  <td>{w.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewWardens;
