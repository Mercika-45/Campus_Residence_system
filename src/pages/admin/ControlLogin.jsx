import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";

function ControlLogin() {
  const [students, setStudents] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // ✅ extended fallback data
const sampleData = [
  // ===== 1st Year =====
  {
    _id: "1",
    registerNumber: "CSE001",
    name: "Ramesh K",
    roomNo: "A-101",
    hostel: "Boys Hostel",
    year: "1",
    gender: "Male",
    active: true,
  },
  {
    _id: "4",
    registerNumber: "IT012",
    name: "Karthik R",
    roomNo: "A-102",
    hostel: "Boys Hostel",
    year: "1",
    gender: "Male",
    active: true,
  },
  {
    _id: "5",
    registerNumber: "CIV009",
    name: "Divya S",
    roomNo: "G-101",
    hostel: "Girls Hostel",
    year: "1",
    gender: "Female",
    active: true,
  },

  // ===== 2nd Year =====
  {
    _id: "2",
    registerNumber: "EEE045",
    name: "Priya M",
    roomNo: "G-202",
    hostel: "Girls Hostel",
    year: "2",
    gender: "Female",
    active: false,
  },
  {
    _id: "6",
    registerNumber: "ECE033",
    name: "Harish V",
    roomNo: "A-203",
    hostel: "Boys Hostel",
    year: "2",
    gender: "Male",
    active: true,
  },
  {
    _id: "7",
    registerNumber: "MECH021",
    name: "Sneha P",
    roomNo: "G-204",
    hostel: "Girls Hostel",
    year: "2",
    gender: "Female",
    active: true,
  },

  // ===== 3rd Year =====
  {
    _id: "3",
    registerNumber: "ECE078",
    name: "Arun S",
    roomNo: "A-305",
    hostel: "Boys Hostel",
    year: "3",
    gender: "Male",
    active: true,
  },
  {
    _id: "8",
    registerNumber: "CSE067",
    name: "Lokesh T",
    roomNo: "A-306",
    hostel: "Boys Hostel",
    year: "3",
    gender: "Male",
    active: false,
  },
  {
    _id: "9",
    registerNumber: "IT055",
    name: "Nandhini R",
    roomNo: "G-305",
    hostel: "Girls Hostel",
    year: "3",
    gender: "Female",
    active: true,
  },

  // ===== 4th Year =====
  {
    _id: "10",
    registerNumber: "CSE099",
    name: "Vignesh K",
    roomNo: "A-401",
    hostel: "Boys Hostel",
    year: "4",
    gender: "Male",
    active: true,
  },
  {
    _id: "11",
    registerNumber: "EEE088",
    name: "Meena L",
    roomNo: "G-402",
    hostel: "Girls Hostel",
    year: "4",
    gender: "Female",
    active: true,
  },
];
  // ✅ fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/students-login"
      );
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setStudents(sampleData);
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
        "http://localhost:5000/api/admin/promote-year",
        { method: "PUT" }
      );
      fetchStudents();
    } catch (err) {
      console.error(err);

      // fallback logic
      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          year:
            s.year === "1"
              ? "2"
              : s.year === "2"
              ? "3"
              : s.year === "3"
              ? "4"
              : "4",
        }))
      );
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