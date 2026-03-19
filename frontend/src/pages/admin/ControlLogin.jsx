import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function ControlLogin() {
  const [students, setStudents] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

 
  // ✅ fetch students
  const fetchStudents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/student/approved");
    const data = await res.json();

    // convert backend data to login table format
    const formatted = data
  .filter((s) => s?.college?.yearOfStudy !== 4) // hide 4th year
  .map((s) => ({
    _id: s._id,
    registerNumber: s.registerNumber,
    name: s.studentName,
    gender: s.gender,
    year: s?.college?.yearOfStudy || "",
    hostel: s?.hostel?.hostelName || "",
    roomNo: s?.hostel?.room || "",
    active: true
  }));
    setStudents(formatted);

  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ delete single login
  const deleteLogin = async (id) => {
    if (!window.confirm("Remove this student login?")) return;

    try {
      await fetch(
        `http://localhost:5000/api/admin/delete-login/${id}`,
        { method: "DELETE" }
      );
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ promote year
 const promoteYear = async () => {
  if (!window.confirm("Promote all students to next year?")) return;

  try {

    await fetch(
      "http://localhost:5000/api/student/promote-year",
      { method: "PUT" }
    );

    // refresh tables
    fetchStudents();

  } catch (err) {
    console.error(err);
  }
};
  // ✅ filtering
  const filteredStudents = students.filter((s) => {
    const genderMatch = genderFilter ? s.gender === genderFilter : true;
    const yearMatch = yearFilter ? s.year === yearFilter : true;
    return genderMatch && yearMatch;
  });

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Control Student Login" />

        <div className="dashboard-content">
          <h3>Student Login Control</h3>

          {/* ✅ YEAR BUTTONS */}
          <div className="year-buttons">
            <button onClick={() => setYearFilter("")}>All</button>
            <button onClick={() => setYearFilter("1")}>1st Year</button>
            <button onClick={() => setYearFilter("2")}>2nd Year</button>
            <button onClick={() => setYearFilter("3")}>3rd Year</button>
            <button onClick={() => setYearFilter("4")}>4th Year</button>
          </div>

          {/* ✅ YEAR ACTIONS */}
          {yearFilter && (
            <div className="year-actions">
            
              <button
                className="btn promote"
                onClick={promoteYear}
              >
                Promote All Students
              </button>
            </div>
          )}

          {/* ✅ Gender Filter */}
          <div className="filter-bar">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Genders</option>
              <option value="Male">Boys</option>
              <option value="Female">Girls</option>
            </select>

            <button
              className="clear-btn"
              onClick={() => {
                setGenderFilter("");
                setYearFilter("");
              }}
            >
              Clear
            </button>
          </div>

          {/* ✅ TABLE */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Register No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Year</th>
                  <th>Hostel</th>
                  <th>Room No</th>
                  <th>Status</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s._id}>
                      <td>{s.registerNumber}</td>
                      <td>{s.name}</td>
                      <td>{s.gender}</td>
                      <td>{s.year}</td>
                      <td>{s.hostel}</td>
                      <td>{s.roomNo}</td>

                      <td>
                        <span
                          className={
                            s.active
                              ? "status active"
                              : "status inactive"
                          }
                        >
                          {s.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn delete"
                          onClick={() => deleteLogin(s._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlLogin;