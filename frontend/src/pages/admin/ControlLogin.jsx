import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/Admin.css";

function ControlLogin() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/students-login");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await fetch(`http://localhost:5000/api/admin/toggle-login/${id}`, {
        method: "PUT"
      });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLogin = async (id) => {
    if (!window.confirm("Are you sure you want to remove this login permanently?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/delete-login/${id}`, {
        method: "DELETE"
      });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <Topbar title="Control Student Login" />

        <div className="dashboard-content">

          <h3>Student Login Control</h3>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Register No</th>
                  <th>Name</th>
                  <th>Room No</th>
                  <th>Status</th>
                  <th>Toggle</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.registerNumber}</td>
                    <td>{s.name}</td>
                    <td>{s.roomNo}</td>

                    <td>
                      <span className={s.active ? "status active" : "status inactive"}>
                        {s.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <button
                        className={`btn ${s.active ? "deactivate" : "activate"}`}
                        onClick={() => toggleStatus(s._id, s.active)}
                      >
                        {s.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>

                    <td>
                      <button className="btn delete" onClick={() => deleteLogin(s._id)}>
                        Delete
                      </button>
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

export default ControlLogin;
