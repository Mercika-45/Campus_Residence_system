import { useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/ViewStudentsEW.css";

/* ================= DATA ================= */

const newStudentsData = [
  { id: 1, name: "Aravinth B", year: "1", dept: "CSE", gender: "Boys" },
  { id: 2, name: "Sriram T", year: "2", dept: "MECH", gender: "Girls" },
];

const existingStudentsData = [
  {
    id: 1,
    name: "Gopika R",
    year: "1",
    dept: "CSE",
    gender: "Girls",
    hostel: "A Block",
    room: "A-101",
  },
  {
    id: 2,
    name: "Vijay Selvan",
    year: "2",
    dept: "EEE",
    gender: "Boys",
    hostel: "B Block",
    room: "B-204",
  },
  {
    id: 3,
    name: "Siva Gomathi",
    year: "3",
    dept: "ECE",
    gender: "Girls",
    hostel: "C Block",
    room: "C-305",
  },
  {
    id: 4,
    name: "Karthick Raja",
    year: "4",
    dept: "IT",
    gender: "Boys",
    hostel: "A Block",
    room: "A-402",
  },
];

const oldStudentsData = [
  {
    id: 1,
    name: "Anitha M",
    year: "4",
    dept: "CSE",
    gender: "Girls",
    vacatedYear: "2023",
  },
  {
    id: 2,
    name: "Praveen K",
    year: "4",
    dept: "EEE",
    gender: "Boys",
    vacatedYear: "2022",
  },
  {
    id: 3,
    name: "Deepa S",
    year: "4",
    dept: "ECE",
    gender: "Girls",
    vacatedYear: "2024",
  },
];

/* ================= COMPONENT ================= */

function ViewStudents() {
  const [activeTab, setActiveTab] = useState("new");
  const [existingYearFilter, setExistingYearFilter] = useState("");
  const [vacatedFilter, setVacatedFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  /* ===== FILTERS ===== */

  const applyGender = (list) =>
    genderFilter ? list.filter((s) => s.gender === genderFilter) : list;

  const filteredExisting = applyGender(
    existingYearFilter
      ? existingStudentsData.filter((s) => s.year === existingYearFilter)
      : existingStudentsData
  );

  const filteredOld = applyGender(
    vacatedFilter
      ? oldStudentsData.filter((s) => s.vacatedYear === vacatedFilter)
      : oldStudentsData
  );

  const filteredNew = applyGender(newStudentsData);

  return (
    <div className="dashboard-container">
      <ExecutiveSidebar />

      <div className="main-content">
        <ExecutiveTopbar title="Students" />

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
            <select onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="">All Genders</option>
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>

            {activeTab === "existing" && (
              <select
                onChange={(e) => setExistingYearFilter(e.target.value)}
              >
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
                  {filteredNew.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.year}</td>
                      <td>{s.dept}</td>
                      <td>{s.gender}</td>
                      <td>
                        <button className="reject">Reject</button>
                        <button className="accept">Accept</button>
                      </td>
                    </tr>
                  ))}
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
                      <tr key={s.id}>
                        <td>{index + 1}</td>
                        <td>{s.name}</td>
                        <td>{s.year}</td>
                        <td>{s.dept}</td>
                        <td>{s.gender}</td>
                        <td>{s.hostel}</td>
                        <td>{s.room}</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOld.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="no-data">
                          No students found
                        </td>
                      </tr>
                    ) : (
                      filteredOld.map((s, index) => (
                        <tr key={s.id}>
                          <td>{index + 1}</td>
                          <td>{s.name}</td>
                          <td>{s.year}</td>
                          <td>{s.dept}</td>
                          <td>{s.gender}</td>
                          <td className="vacated">
                            {s.vacatedYear}
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
