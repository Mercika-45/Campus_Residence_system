import { useState, useEffect } from "react";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ViewMenuEW.css";

function ViewMenuEW() {

  const [isEdit, setIsEdit] = useState(false);
  const [menuData, setMenuData] = useState([]);

  // ✅ Fetch menu from backend when page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/foodmenu")
      .then((res) => setMenuData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Save updated menu
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/foodmenu/update",
        menuData
      );
      alert("Menu Updated Successfully");
      setIsEdit(false);
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
                {menuData.map((item, index) => (
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