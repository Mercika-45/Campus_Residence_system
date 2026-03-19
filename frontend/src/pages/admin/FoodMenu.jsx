import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/ViewMenuEW.css"; // same style as executive

function FoodMenu() {
  const [menuData, setMenuData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ Fetch menu from backend
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foodmenu");
      setMenuData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Handle input change
  const handleChange = (index, field, value) => {
    const updatedMenu = [...menuData];
    updatedMenu[index][field] = value;
    setMenuData(updatedMenu);
  };

  // ✅ Save updated menu
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/foodmenu/update",
        menuData
      );
      alert("Menu Updated Successfully");
      setIsEdit(false);
      fetchMenu(); // refresh after save
    } catch (error) {
      console.log(error);
      alert("Failed to update menu");
    }
  };

  return (
    <div className="dashboard-container">
      
      <AdminSidebar />

      <div className="main-content1">
        <AdminTopbar title="Food Menu Management" />

        <div className="content">

          <div className="menu-header">
            <h2>Weekly Hostel Food Menu</h2>

            <button
              className="edit-btn"
              onClick={isEdit ? handleSave : () => setIsEdit(true)}
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
                {menuData.length > 0 ? (
                  menuData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.day}</td>

                      <td>
                        {isEdit ? (
                          <input
                            value={item.morning}
                            onChange={(e) =>
                              handleChange(index, "morning", e.target.value)
                            }
                          />
                        ) : (
                          item.morning
                        )}
                      </td>

                      <td>
                        {isEdit ? (
                          <input
                            value={item.afternoon}
                            onChange={(e) =>
                              handleChange(index, "afternoon", e.target.value)
                            }
                          />
                        ) : (
                          item.afternoon
                        )}
                      </td>

                      <td>
                        {isEdit ? (
                          <input
                            value={item.dinner}
                            onChange={(e) =>
                              handleChange(index, "dinner", e.target.value)
                            }
                          />
                        ) : (
                          item.dinner
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Menu Available
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FoodMenu;