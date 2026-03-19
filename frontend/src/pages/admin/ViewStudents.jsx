import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";
import "../../styles/ViewStudents.css";
/* ================= COMPONENT ================= */

function ViewStudents() {
  const [activeTab, setActiveTab] = useState("new");
  const [existingYearFilter, setExistingYearFilter] = useState("");
  const [vacatedFilter, setVacatedFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [oldStudentsData, setOldStudentsData] = useState([]);
  const [newStudentsData, setNewStudentsData] = useState([]); // ✅ move here
const navigate = useNavigate();
  /* ===== FILTERS ===== */

 const applyGender = (list) =>
  genderFilter
    ? list.filter(
        (s) => s.gender?.toLowerCase() === genderFilter.toLowerCase()
      )
    : list;



  const filteredOld = applyGender(
    vacatedFilter
      ? oldStudentsData.filter((s) => s.vacatedYear === vacatedFilter)
      : oldStudentsData
  );

  const filteredNew = applyGender(newStudentsData);

const fetchNewStudents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/student/new");

    if (!res.ok) throw new Error("Failed to fetch students");

    const data = await res.json();
    setNewStudentsData(data);
  } catch (err) {
    console.error("Error fetching new students:", err);
  }
};
const fetchOldStudents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/student/old");
    const data = await res.json();

    const students = Array.isArray(data) ? data : data.students || [];

    const cleaned = students.map(s => ({
      ...s,
      vacatedYear: s.vacatedYear || null, // set to null if missing
    }));

    setOldStudentsData(cleaned);
  } catch (err) {
    console.error(err);
  }
};
const [approvedStudents, setApprovedStudents] = useState([]);

const filteredExisting = applyGender(
  existingYearFilter
    ? approvedStudents.filter(
       (s) => s?.college?.yearOfStudy === existingYearFilter
      )
    : approvedStudents
);


const fetchApprovedStudents = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/student/approved");
    const data = await res.json();
    setApprovedStudents(data);
  } catch (err) {
    console.error(err);
  }
};
const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  if (tab) setActiveTab(tab);

  fetchNewStudents();
  fetchApprovedStudents();
   // ✅ ADD THIS
}, [location]);
useEffect(() => {
  setGenderFilter("");
  setExistingYearFilter("");
  setVacatedFilter("");
}, [activeTab]);
  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Students" />

        <div className="dashboard-content">
          {/* ================= TABS ================= */}
          <div className="tabs">
            <button
              className={activeTab === "new" ? "active" : ""}
              onClick={() => setActiveTab("new")}
            >
              New Registrations
            </button>

            <button
              className={activeTab === "existing" ? "active" : ""}
              onClick={() => setActiveTab("existing")}
            >
              Existing Students
            </button>

            <button
              className={activeTab === "old" ? "active" : ""}
              onClick={() => setActiveTab("old")}
            >
              Old / Vacated Students
            </button>
          </div>

          {/* ================= COMMON FILTERS ================= */}
          <div className="filter-row">
            <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="">All Genders</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>

            {activeTab === "existing" && (
             <select value={existingYearFilter} onChange={(e) => setExistingYearFilter(e.target.value)}>
                <option value="">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            )}
          </div>

          {/* ================= NEW STUDENTS ================= */}
          {activeTab === "new" && (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
             <tbody>
  {filteredNew.length === 0 ? (
    <tr>
      <td colSpan="6" className="no-data">
        No new registrations
      </td>
    </tr>
  ) : (
    filteredNew.map((s, index) => (
      <tr key={s._id || index}>
        <td>{index + 1}</td>
        <td>{s.studentName}</td>
        <td>{s?.college?.yearOfStudy || "-"}</td>
<td>{s?.college?.department || "-"}</td>
        <td>{s.gender}</td>
        <td>

  <button
    className="view"
    onClick={() => navigate(`/admin/student/${s._id}`)}
  >
    View
  </button>

  

</td>
      </tr>
    ))
  )}
</tbody>
              </table>
            </div>
          )}

          {/* ================= EXISTING STUDENTS ================= */}
          {activeTab === "existing" && (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>Hostel</th>
                    <th>Room No</th>
                    <th>view Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExisting.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    filteredExisting.map((s, index) => (
  <tr key={s._id}>
    <td>{index + 1}</td>
    <td>{s.studentName}</td>
    <td>{s?.college?.yearOfStudy || "-"}</td>
    <td>{s?.college?.department || "-"}</td>
    <td>{s.gender}</td>
    <td>{s?.hostel?.block || "-"}</td>
    <td>{s?.hostel?.room || "-"}</td>
     <td>
  <button
    className="view"
    onClick={() => navigate(`/admin/student/${s._id}?tab=existing`)}
  >
    View
  </button>
</td>

  </tr>
))

                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ================= OLD STUDENTS ================= */}
          {activeTab === "old" && (
            <>
              <div className="calendar-filter">
                <label className="calendar-label">
                  Select Vacated Year
                </label>

                <input
                  type="number"
                  min="2000"
                  max="2100"
                  placeholder="Enter Year"
                  className="year-only-picker"
                  value={vacatedFilter}
                  onChange={(e) => setVacatedFilter(e.target.value)}
                />

                <button
                  className="clear-btn"
                  onClick={() => setVacatedFilter("")}
                >
                  Clear
                </button>
              </div>

              <div className="table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Year</th>
                      <th>Department</th>
                      <th>Gender</th>
                      <th>Vacated Year</th>
                      <th>View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOld.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="no-data">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredOld.map((s, index) => (
  <tr key={s._id}>
    <td>{index + 1}</td>
    <td>{s.studentName}</td>
    <td>{s?.college?.yearOfStudy || "-"}</td>
    <td>{s?.college?.department || "-"}</td>
    <td>{s.gender}</td>
    <td className="vacated">
  {s.vacatedYear ? s.vacatedYear : "-"}
</td>
     <td>
      <button
        className="view"
        onClick={() =>
          navigate(`/admin/student/${s._id}?tab=old`)
        }
      >
        View
      </button>
    </td>
  </tr>
))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewStudents;