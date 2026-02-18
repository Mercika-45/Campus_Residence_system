import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ViewRoom.css";

function ViewRoom() {
  // Logged-in student (later comes from backend/session)
  const student = {
    id: 1,
    name: "Arun",
    gender: "Male",
    roomNumber: 27
  };

  // Hostel auto-decided by gender
  const hostelName =
    student.gender === "Male" ? "Boys Hostel A" : "Girls Hostel A";

  // Dummy students data
  const allStudents = [
    { id: 1, name: "Arun", gender: "Male", hostel: "Boys Hostel A", roomNumber: 27 },
    { id: 2, name: "Karthik", gender: "Male", hostel: "Boys Hostel A", roomNumber: 27 },
    { id: 3, name: "Rahul", gender: "Male", hostel: "Boys Hostel A", roomNumber: 27 }
  ];

  // Students in same room
  const roommates = allStudents.filter(
    s =>
      s.gender === student.gender &&
      s.hostel === hostelName &&
      s.roomNumber === student.roomNumber
  );

  const TOTAL_BEDS = 4;
  const occupiedBeds = roommates.length;
  const freeBeds = TOTAL_BEDS - occupiedBeds;

  return (
    <div className="student-layout">
      <Sidebar />

      <div className="student-main">
        <Topbar title="My Room Status" />

        <div className="room-container">
          <div className="room-card">

            {/* HEADER */}
            <h2>🏨 {hostelName}</h2>
            <p className="room-sub">Room No: {student.roomNumber}</p>

            {/* SUMMARY */}
            <div className="room-summary">
              <div className="summary-box occupied">
                <h3>{occupiedBeds}</h3>
                <p>Occupied Beds</p>
              </div>

              <div className="summary-box free">
                <h3>{freeBeds}</h3>
                <p>Free Beds</p>
              </div>

              <div className="summary-box total">
                <h3>{TOTAL_BEDS}</h3>
                <p>Total Beds</p>
              </div>
            </div>

            {/* BED VISUALIZATION */}
            <h3 className="section-title">🛏 Bed Status</h3>

            <div className="beds">
              {[...Array(TOTAL_BEDS)].map((_, index) => (
                <div
                  key={index}
                  className={`bed ${index < occupiedBeds ? "occupied" : "free"}`}
                >
                  Bed {index + 1}
                </div>
              ))}
            </div>

            {/* ROOMMATES */}
            <h3 className="section-title">👥 Students in this Room</h3>

            <ul className="student-list">
              {roommates.map(s => (
                <li key={s.id}>
                  {s.name} {s.id === student.id && <span>(You)</span>}
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRoom;
