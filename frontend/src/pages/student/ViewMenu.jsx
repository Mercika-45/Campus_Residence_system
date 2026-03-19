import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ViewMenu.css";

function ViewMenu() {

  const [menuData, setMenuData] = useState([]);

  // ✅ Fetch menu from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foodmenu")
      .then((res) => setMenuData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="student-layout">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="View Food Menu" />

        <div className="menu-container">
          <h2>Weekly Hostel Food Menu</h2>

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