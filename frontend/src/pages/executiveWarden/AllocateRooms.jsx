import { useState, useEffect } from "react";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/AllocateRoomsEW.css";

function AllocateRooms() {

  const [hostels, setHostels] = useState(() => {
    const saved = localStorage.getItem("hostelData");
    return saved ? JSON.parse(saved) : [];
  });

  const [newHostel, setNewHostel] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("");
  const [newBlock, setNewBlock] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [beds, setBeds] = useState("");
  const [regNo, setRegNo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");

  const [editingHostel, setEditingHostel] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  const [tempName, setTempName] = useState("");
  const [tempRoom, setTempRoom] = useState({
    roomNo: "",
    totalBeds: 0
  });

  useEffect(() => {
  if (!hostels.length) return;

  if (!selectedHostel) {
    setSelectedHostel(hostels[0].name);
  }
}, [hostels]);

useEffect(() => {
  const hostel = hostels.find(h => h.name === selectedHostel);
  if (hostel && hostel.blocks.length > 0) {
    if (!selectedBlock) {
      setSelectedBlock(hostel.blocks[0].name);
    }
  }
}, [selectedHostel, hostels]);


  useEffect(() => {
    localStorage.setItem("hostelData", JSON.stringify(hostels));
  }, [hostels]);

  // ADD HOSTEL
  const addHostel = () => {
    if (!newHostel.trim()) return;

    const exists = hostels.find(h => h.name === newHostel);
    if (exists) {
      alert("Hostel already exists");
      return;
    }

    setHostels([...hostels, { name: newHostel, blocks: [] }]);
    setNewHostel("");
  };

  // ADD BLOCK
  const addBlock = () => {
    if (!selectedHostel || !newBlock.trim()) return;

    const hostel = hostels.find(h => h.name === selectedHostel);
    const exists = hostel?.blocks.find(b => b.name === newBlock);
    if (exists) {
      alert("Block already exists");
      return;
    }

    setHostels(hostels.map(h => {
      if (h.name === selectedHostel) {
        return {
          ...h,
          blocks: [...h.blocks, { name: newBlock, rooms: [] }]
        };
      }
      return h;
    }));

    setNewBlock("");
  };

  // ADD ROOM
  const addRoom = () => {
    if (!selectedHostel || !selectedBlock || !newRoom || !beds) return;

    const block = hostels
      .find(h => h.name === selectedHostel)
      ?.blocks.find(b => b.name === selectedBlock);

    const exists = block?.rooms.find(r => r.roomNo === newRoom);
    if (exists) {
      alert("Room already exists");
      return;
    }

    setHostels(hostels.map(h => {
      if (h.name === selectedHostel) {
        return {
          ...h,
          blocks: h.blocks.map(b => {
            if (b.name === selectedBlock) {
              return {
                ...b,
                rooms: [
                  ...b.rooms,
                  { roomNo: newRoom, totalBeds: Number(beds), occupied: 0 }
                ]
              };
            }
            return b;
          })
        };
      }
      return h;
    }));

    setNewRoom("");
    setBeds("");
  };

  // ALLOCATE ROOM
  const allocateRoom = () => {
    if (!selectedRoom || !regNo || !year || !department) {
      alert("Fill all fields");
      return;
    }

    setHostels(hostels.map(h => {
      if (h.name === selectedHostel) {
        return {
          ...h,
          blocks: h.blocks.map(b => {
            if (b.name === selectedBlock) {
              return {
                ...b,
                rooms: b.rooms.map(r => {
                  if (r.roomNo === selectedRoom) {
                    if (r.occupied >= r.totalBeds) {
                      alert("No beds available");
                      return r;
                    }
                    return {
                      ...r,
                      occupied: r.occupied + 1,
                      students: [
                        ...(r.students || []),
                        { regNo, year, department }
                      ]
                    };
                  }
                  return r;
                })
              };
            }
            return b;
          })
        };
      }
      return h;
    }));

    alert("Room Allocated");

    setRegNo("");
    setYear("");
    setDepartment("");
    setSelectedRoom("");
  };

  const blocks =
    hostels.find(h => h.name === selectedHostel)?.blocks || [];

  const rooms =
    blocks.find(b => b.name === selectedBlock)?.rooms || [];

  return (
    <div className="executive-layout">
      <ExecutiveSidebar />
      <div className="executive-main1" style={{ marginLeft: 220  ,marginRight: -20 }}>
        <ExecutiveTopbar title="Room Management" />
        <div className="allocate-card">

          {/* ADD HOSTEL */}
          <h3 className="section-title">Add Hostel</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Hostel Name</label>
              <input
                value={newHostel}
                onChange={(e) => setNewHostel(e.target.value)}
                placeholder="Enter hostel name"
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="allocate-btn" onClick={addHostel}>
              Add Hostel
            </button>
          </div>

          <hr />

          {/* ADD BLOCK */}
          <h3 className="section-title">Add Block</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Select Hostel</label>
              <select
                value={selectedHostel}
                onChange={(e) => {
                  setSelectedHostel(e.target.value);
                  setSelectedBlock("");
                }}
              >
                <option value="">Select Hostel</option>
                {hostels.map((h, i) => (
                  <option key={i} value={h.name}>{h.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Block Name</label>
              <input
                value={newBlock}
                onChange={(e) => setNewBlock(e.target.value)}
                placeholder="Enter block name"
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="allocate-btn" onClick={addBlock}>
              Add Block
            </button>
          </div>

          <hr />

          {/* ADD ROOM */}
          <h3 className="section-title">Add Room</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Select Block</label>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
              >
                <option value="">Select Block</option>
                {blocks.map((b, i) => (
                  <option key={i} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Room Number</label>
              <input
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Total Beds</label>
              <input
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="allocate-btn" onClick={addRoom}>
              Add Room
            </button>
          </div>

          <hr />

         {/* ALLOCATE ROOM */}
<h3 className="section-title">Allocate Room</h3>
<div className="form-grid">

  {/* SELECT HOSTEL */}
  <div className="form-group">
    <label>Select Hostel</label>
    <select
      value={selectedHostel}
      onChange={(e) => {
        setSelectedHostel(e.target.value);
        setSelectedBlock("");
        setSelectedRoom("");
      }}
    >
      <option value="">Select Hostel</option>
      {hostels.map((h, i) => (
        <option key={i} value={h.name}>
          {h.name}
        </option>
      ))}
    </select>
  </div>

  {/* SELECT BLOCK */}
  <div className="form-group">
    <label>Select Block</label>
    <select
      value={selectedBlock}
      onChange={(e) => {
        setSelectedBlock(e.target.value);
        setSelectedRoom("");
      }}
      disabled={!selectedHostel}
    >
      <option value="">Select Block</option>
      {hostels
        .find(h => h.name === selectedHostel)
        ?.blocks.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
    </select>
  </div>

  {/* SELECT ROOM */}
  <div className="form-group">
    <label>Select Room</label>
    <select
      value={selectedRoom}
      onChange={(e) => setSelectedRoom(e.target.value)}
      disabled={!selectedBlock}
    >
      <option value="">Select Room</option>
      {hostels
        .find(h => h.name === selectedHostel)
        ?.blocks.find(b => b.name === selectedBlock)
        ?.rooms.map((r, i) => (
          <option key={i} value={r.roomNo}>
            {r.roomNo} (Free: {r.totalBeds - r.occupied})
          </option>
        ))}
    </select>
  </div>

  {/* REG NO */}
  <div className="form-group">
    <label>Student Reg No</label>
    <input
      value={regNo}
      onChange={(e) => setRegNo(e.target.value)}
    />
  </div>

  {/* YEAR */}
  <div className="form-group">
    <label>Year</label>
    <select value={year} onChange={(e) => setYear(e.target.value)}>
      <option value="">Select Year</option>
      <option value="1">1st Year</option>
      <option value="2">2nd Year</option>
      <option value="3">3rd Year</option>
      <option value="4">4th Year</option>
    </select>
  </div>

 <div className="form-group">
  <label>Department</label>
  <select
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
  >
    <option value="">Select Department</option>
    <option value="Computer Science and Engineering">
      Computer Science and Engineering
    </option>
    <option value="Information Technology">
      Information Technology
    </option>
    <option value="Electrical and Electronic Engineering">
      Electrical and Electronic Engineering
    </option>
    <option value="Electronics and Communication Engineering">
      Electronics and Communication Engineering
    </option>
    <option value="Mechanical Engineering">
      Mechanical Engineering
    </option>
    <option value="Civil Engineering">
      Civil Engineering
    </option>
  </select>
</div>

</div>

<div className="btn-wrapper">
  <button className="allocate-btn" onClick={allocateRoom}>
    Allocate Room
  </button>
</div>


         {/* CURRENT STRUCTURE */}
<h3 className="section-title">Current Structure</h3>
<div className="structure-wrapper">

  {hostels.map((h, hi) => (
    <div key={hi}>

      {/* HOSTEL */}
      <h4>
        {editingHostel === hi ? (
          <>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
            <button
              onClick={() => {
                if (!tempName.trim()) return;

                const duplicate = hostels.find(
                  (hostel, index) =>
                    hostel.name === tempName && index !== hi
                );

                if (duplicate) {
                  alert("Hostel name already exists");
                  return;
                }

                const updated = [...hostels];
                updated[hi].name = tempName;
                setHostels(updated);
                setEditingHostel(null);
              }}
              style={{ marginLeft: 10 }}
            >
              Save
            </button>
            <button onClick={() => setEditingHostel(null)}>Cancel</button>
          </>
        ) : (
          <>
            {h.name}
            <button
              onClick={() => {
                setEditingHostel(hi);
                setTempName(h.name);
              }}
              style={{ marginLeft: 10 }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                if (window.confirm("Delete this hostel?")) {
                  setHostels(hostels.filter((_, i) => i !== hi));
                }
              }}
              style={{ marginLeft: 10, background: "red", color: "#fff" }}
            >
              Delete
            </button>
          </>
        )}
      </h4>

      {/* BLOCKS */}
      {h.blocks.map((b, bi) => (
        <div key={bi} className="structure-block">

          <strong>
            {editingBlock &&
            editingBlock.hostel === hi &&
            editingBlock.block === bi ? (
              <>
                <input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (!tempName.trim()) return;

                    const duplicate = h.blocks.find(
                      (block, index) =>
                        block.name === tempName && index !== bi
                    );

                    if (duplicate) {
                      alert("Block name already exists");
                      return;
                    }

                    const updated = [...hostels];
                    updated[hi].blocks[bi].name = tempName;
                    setHostels(updated);
                    setEditingBlock(null);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  Save
                </button>
                <button onClick={() => setEditingBlock(null)}>Cancel</button>
              </>
            ) : (
              <>
                {b.name}
                <button
                  onClick={() => {
                    setEditingBlock({ hostel: hi, block: bi });
                    setTempName(b.name);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Delete this block?")) {
                      const updated = [...hostels];
                      updated[hi].blocks =
                        updated[hi].blocks.filter((_, i) => i !== bi);
                      setHostels(updated);
                    }
                  }}
                  style={{ marginLeft: 10, background: "red", color: "#fff" }}
                >
                  Delete
                </button>
              </>
            )}
          </strong>

          {/* ROOMS */}
          {b.rooms.map((r, ri) => (
            <div key={ri} className="structure-room">

              {editingRoom &&
              editingRoom.hostel === hi &&
              editingRoom.block === bi &&
              editingRoom.room === ri ? (
                <>
                  <input
                    value={tempRoom.roomNo}
                    onChange={(e) =>
                      setTempRoom({ ...tempRoom, roomNo: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    value={tempRoom.totalBeds}
                    onChange={(e) =>
                      setTempRoom({
                        ...tempRoom,
                        totalBeds: Number(e.target.value)
                      })
                    }
                    style={{ marginLeft: 5 }}
                  />

                  <button
                    onClick={() => {
                      if (!tempRoom.roomNo || !tempRoom.totalBeds) return;

                      const duplicate = b.rooms.find(
                        (room, index) =>
                          room.roomNo === tempRoom.roomNo && index !== ri
                      );

                      if (duplicate) {
                        alert("Room already exists");
                        return;
                      }

                      const updated = [...hostels];
                      updated[hi].blocks[bi].rooms[ri] = {
                        ...updated[hi].blocks[bi].rooms[ri],
                        roomNo: tempRoom.roomNo,
                        totalBeds: tempRoom.totalBeds
                      };

                      setHostels(updated);
                      setEditingRoom(null);
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    Save
                  </button>
                  <button onClick={() => setEditingRoom(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div>
                    <strong>
                      Room {r.roomNo} | Beds: {r.totalBeds} | Occupied: {r.occupied}
                    </strong>

                    {r.students && (
                      <ul className="student-list">
                        {r.students.map((s, si) => (
                          <li key={si}>
                            RegNo: {s.regNo} | Year: {s.year} | Dept: {s.department}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setEditingRoom({
                        hostel: hi,
                        block: bi,
                        room: ri
                      });
                      setTempRoom({
                        roomNo: r.roomNo,
                        totalBeds: r.totalBeds
                      });
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm("Delete this room?")) {
                        const updated = [...hostels];
                        updated[hi].blocks[bi].rooms =
                          updated[hi].blocks[bi].rooms.filter((_, i) => i !== ri);
                        setHostels(updated);
                      }
                    }}
                    style={{ marginLeft: 10, background: "red", color: "#fff" }}
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          ))}

        </div>
      ))}

    </div>
  ))}



          </div>

        </div>
      </div>
    </div>
  );
}

export default AllocateRooms;
