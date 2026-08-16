import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";

import "../../styles/AllocateRoomsEW.css";

const API = "http://localhost:5000";

function HostelStructureView() {
  const { id } = useParams();

  const executive =
    JSON.parse(localStorage.getItem("executiveWarden")) ||
    JSON.parse(localStorage.getItem("executiveBoys")) ||
    JSON.parse(localStorage.getItem("executive")) ||
    {};

  const hostelType = executive?.hostelType;

  const [hostel, setHostel] = useState(null);
  const [selectedBed, setSelectedBed] = useState({});

  /* FETCH HOSTEL */
  const fetchHostel = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/hostels/${hostelType}`
      );

      const found = data.find((h) => h._id === id);
      setHostel(found);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHostel();
  }, [id]);

  /* BED CLICK */
  const handleBedClick = (roomNo, bedIndex) => {
    setSelectedBed((prev) => ({
      ...prev,
      [roomNo]: bedIndex,
    }));
  };

  if (!hostel) {
    return (
      <div className="executive-layout">
        <ExecutiveSidebar />
        <div className="executive-main1">
          <ExecutiveTopbar title="Hostel Structure" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="executive-layout">
      <ExecutiveSidebar />

      <div className="executive-main1" style={{ marginLeft: 220 }}>
        <ExecutiveTopbar title={`Hostel: ${hostel.name}`} />

        <div className="allocate-card">
          <h2 style={{ marginBottom: 20 }}>
            {hostel.name} Structure
          </h2>

          {/* BLOCKS */}
          {hostel.blocks?.map((block, bi) => (
            <div key={bi} className="structure-block">

              <h3 style={{ marginTop: 10 }}>
                Block: {block.name}
              </h3>

              {/* ROOMS */}
              {block.rooms?.map((room, ri) => {

                // 👉 selected student index
                const activeIndex =
                  selectedBed[room.roomNo] ?? 0;

                const student =
                  room.students?.[activeIndex];

                return (
                  <div key={ri} className="structure-room">

                    <h4>Room {room.roomNo}</h4>

                    {/* BED UI */}
                    <div style={{
                      display: "flex",
                      gap: 8,
                      margin: "10px 0"
                    }}>
                      {[1, 2, 3, 4].map((bedNo) => {
                        const studentExists =
                          room.students?.[bedNo - 1];

                        const isSelected =
                          selectedBed[room.roomNo] === bedNo - 1;

                        return (
                          <div
                            key={bedNo}
                            onClick={() =>
                              handleBedClick(
                                room.roomNo,
                                bedNo - 1
                              )
                            }
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 6,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontWeight: "bold",
                              cursor: "pointer",

                              background: studentExists
                                ? "#dc3545"
                                : "#28a745",

                              border: isSelected
                                ? "2px solid black"
                                : "none"
                            }}
                          >
                            {bedNo}
                          </div>
                        );
                      })}
                    </div>

                    {/* ROOM INFO */}
                    <p>
                      Beds: {room.totalBeds || room.beds} |
                      Occupied: {room.occupied || 0}
                    </p>

                    {/* ONLY SELECTED STUDENT */}
                    {student ? (
                      <div style={{
                        background: "#f4f4f4",
                        padding: "8px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        marginTop: "10px"
                      }}>
                        <b>Name:</b> {student.name || student.studentName || "NA"}
                        <b>Reg No:</b> {student.regNo} <br />
                        <b>Year:</b> {student.year} <br />
                        <b>Dept:</b> {student.department}
                      </div>
                    ) : (
                      <p style={{
                        fontSize: "12px",
                        color: "gray"
                      }}>
                        No student assigned
                      </p>
                    )}

                  </div>
                );
              })}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HostelStructureView;