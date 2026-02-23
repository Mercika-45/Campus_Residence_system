import { useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ViewMenuEW.css";

function ViewMenuEW() {

  const [isEdit, setIsEdit] = useState(false);

  const [menuData, setMenuData] = useState([
    { day: "Monday", morning: "Idli & Sambar", afternoon: "Rice, Sambar, Poriyal", dinner: "Chapati & Kurma" },
    { day: "Tuesday", morning: "Dosa & Chutney", afternoon: "Rice, Rasam, Curry", dinner: "Veg Fried Rice" },
    { day: "Wednesday", morning: "Pongal", afternoon: "Rice, Sambar, Kootu", dinner: "Chapati & Dal" },
    { day: "Thursday", morning: "Poori & Masala", afternoon: "Rice, Curd, Pickle", dinner: "Upma" },
    { day: "Friday", morning: "Idiyappam", afternoon: "Rice, Veg Curry", dinner: "Dosa" },
    { day: "Saturday", morning: "Bread & Jam", afternoon: "Variety Rice", dinner: "Chapati & Kurma" },
    { day: "Sunday", morning: "Special Breakfast", afternoon: "Biryani", dinner: "Light Dinner" }
  ]);

  const handleChange = (index, field, value) => {
    const updatedMenu = [...menuData];
    updatedMenu[index][field] = value;
    setMenuData(updatedMenu);
  };

  return (
    <div className="dashboard-container">

      <ExecutiveSidebar />

      <div className="main-content1">
        <ExecutiveTopbar title="Food Menu Management" />

        <div className="content">

          <div className="menu-header">
            <h2>Weekly Hostel Food Menu</h2>
            <button 
              className="edit-btn"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Save Menu" : "Edit Menu"}
            </button>
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

                    <td>
                      {isEdit ? (
                        <input
                          value={item.morning}
                          onChange={(e) => handleChange(index, "morning", e.target.value)}
                        />
                      ) : (
                        item.morning
                      )}
                    </td>

                    <td>
                      {isEdit ? (
                        <input
                          value={item.afternoon}
                          onChange={(e) => handleChange(index, "afternoon", e.target.value)}
                        />
                      ) : (
                        item.afternoon
                      )}
                    </td>

                    <td>
                      {isEdit ? (
                        <input
                          value={item.dinner}
                          onChange={(e) => handleChange(index, "dinner", e.target.value)}
                        />
                      ) : (
                        item.dinner
                      )}
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

export default ViewMenuEW;
