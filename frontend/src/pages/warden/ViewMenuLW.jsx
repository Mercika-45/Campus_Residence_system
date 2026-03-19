import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function ViewMenu() {

  const [menuData, setMenuData] = useState([]);

  // ✅ Fetch from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foodmenu")
      .then((res) => setMenuData(res.data))
      .catch((err) => console.log(err));
  }, []);

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