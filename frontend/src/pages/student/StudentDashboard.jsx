import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    window.location.href = "/student-login";
    return;
  }

  const fetchStudent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student/profile/${userData.email}`
      );

      setStudent(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchStudent();
}, []);

  if (!student) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar name={student.studentName} />

        <div className="content">
          <h2>Dashboard</h2>

          <div className="info-wrapper">
            <div className="profile-card1">
              <img
  src={`http://localhost:5000/uploads/${student.photo}`}
  alt="profile"
  className="profile-img"
  onError={(e) => {
    e.target.src = "/images/profile.jpg";
  }}
/>
              <h3>{student.studentName}</h3>
              <p>{student.registerNumber}</p>
            </div>

            <div className="general-card">
              <h3>📄 General Information</h3>

              <div className="info-grid">
                <p><b>DEGREE</b> : {student.college?.degree}</p>
                <p><b>BRANCH</b> : {student.college?.department}</p>
                <p><b>SEMESTER</b> : {student.college?.yearOfStudy}</p>
                <p><b>DOB</b> : {student.dob}</p>
                <p><b>GENDER</b> : {student.gender}</p>
                <p><b>MOBILE</b> : {student.mobile}</p>
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