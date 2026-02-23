import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/StudentDashboard.css";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("student");
    if (!data) {
      window.location.href = "/student-login";
    } else {
      setStudent(JSON.parse(data));
    }
  }, []);

  if (!student) return null;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar name={student.name} />

        <div className="content">
          <h2>Dashboard</h2>
          <p className="breadcrumb">Home / Dashboard</p>

          <div className="info-wrapper">
            {/* Profile Card */}
            <div className="profile-card1">
              <img
                src="/images/profile.jpg"
                alt="profile"
                className="profile-img"
              />
              <h3>{student.name}</h3>
              <p>{student.registerNo}</p>
            </div>

            {/* General Info */}
            <div className="general-card">
              <h3>📄 General Information</h3>

              <div className="info-grid">
                <p><b>DEGREE</b> : B.E.</p>
                <p><b>BRANCH</b> : {student.department}</p>
                <p><b>SEMESTER</b> : 8</p>
                <p><b>CAMPUS</b> : UCE, NAGERCOIL</p>
                <p><b>DOB</b> : 31-JAN-05</p>
                <p><b>GENDER</b> : Female</p>
                <p><b>MOBILE</b> : 9688027985</p>
                <p><b>EMAIL</b> : {student.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;