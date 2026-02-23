import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function ViewMenu() {

  const menuData = [
    { day: "Monday", morning: "Idli & Sambar", afternoon: "Rice, Sambar, Poriyal", dinner: "Chapati & Kurma" },
    { day: "Tuesday", morning: "Dosa & Chutney", afternoon: "Rice, Rasam, Curry", dinner: "Veg Fried Rice" },
    { day: "Wednesday", morning: "Pongal", afternoon: "Rice, Sambar, Kootu", dinner: "Chapati & Dal" },
    { day: "Thursday", morning: "Poori & Masala", afternoon: "Rice, Curd, Pickle", dinner: "Upma" },
    { day: "Friday", morning: "Idiyappam", afternoon: "Rice, Veg Curry", dinner: "Dosa" },
    { day: "Saturday", morning: "Bread & Jam", afternoon: "Variety Rice", dinner: "Chapati & Kurma" },
    { day: "Sunday", morning: "Special Breakfast", afternoon: "Biryani", dinner: "Light Dinner" }
  ];

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">

        <div className="page-header">
          <h1>Weekly Hostel Food Menu</h1>
          <p className="breadcrumb">Dashboard / Food Menu</p>
        </div>

        <div className="menu-table-card">
          <table className="menu-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Morning</th>
                <th>Afternoon</th>
                <th>Dinner</th>
              </tr>
            </thead>

            <tbody>
              {menuData.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.morning}</td>
                  <td>{item.afternoon}</td>
                  <td>{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default ViewMenu;
