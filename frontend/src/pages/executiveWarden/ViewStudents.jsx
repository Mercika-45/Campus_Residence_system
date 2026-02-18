import { useState } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ExecutiveWarden.css";
import "../../styles/ViewStudentsEW.css";

const newStudents = [
  { id: 1, name: "Ramesh K", year: "1", dept: "CSE" },
  { id: 2, name: "Priya M", year: "2", dept: "EEE" },
];

const oldStudents = [
  { id: 1, name: "Gopika R", year: "1", dept: "CSE" },
  { id: 2, name: "Vijay Selvan", year: "2", dept: "EEE" },
  { id: 3, name: "Siva Gomathi", year: "3", dept: "ECE" },
  { id: 4, name: "Karthick Raja", year: "4", dept: "IT" },
];

function ViewStudentsEW() {
  const [activeTab, setActiveTab] = useState("new");
  const [yearFilter, setYearFilter] = useState("");

  const filteredStudents = yearFilter
    ? oldStudents.filter((s) => s.year === yearFilter)
    : oldStudents;

  return (
    <div className="executive-layout">
      <ExecutiveSidebar />

      <div className="executive-main" style={{ flex: 1, background: "#f5f7fb",marginLeft:220, }}>
        <Topbar title="Students" />

        <div className="dashboard-content">

          <div className="tabs">
            <button
              className={activeTab === "new" ? "active" : ""}
              onClick={() => setActiveTab("new")}
            >
              New Student Approval
            </button>

            <button
              className={activeTab === "old" ? "active" : ""}
              onClick={() => setActiveTab("old")}
            >
              View Existing Students
            </button>
          </div>

          {activeTab === "new" && (
            <div className="student-list">
              {newStudents.map((s) => (
                <div className="student-card" key={s.id}>
                  <div>
                    <h4>{s.name}</h4>
                    <p>Year {s.year} - {s.dept}</p>
                  </div>

                  <div className="actions">
                    <button className="reject">Reject</button>
                    <button className="accept">Approve</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "old" && (
            <>
              <div className="filter">
                <select onChange={(e) => setYearFilter(e.target.value)}>
                  <option value="">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div className="student-list">
                {filteredStudents.map((s) => (
                  <div className="student-card" key={s.id}>
                    <div>
                      <h4>{s.name}</h4>
                      <p>Year {s.year} - {s.dept}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default ViewStudentsEW;
