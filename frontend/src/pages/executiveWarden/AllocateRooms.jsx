import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/AllocateRoomsEW.css";

const API = "http://localhost:5000";

function AllocateRooms() {

/* =====================================================
   EXECUTIVE DATA
===================================================== */
const executive =
JSON.parse(localStorage.getItem("executiveWarden")) ||
JSON.parse(localStorage.getItem("executiveBoys")) ||
JSON.parse(localStorage.getItem("executive")) ||
{};
const hostelType = executive?.hostelType;
const navigate = useNavigate();
/* =====================================================
   STATES
===================================================== */
const [hostels, setHostels] = useState([]);

const [newHostel, setNewHostel] = useState("");
const [newBlock, setNewBlock] = useState("");
const [newRoom, setNewRoom] = useState("");
const [beds, setBeds] = useState("");

const [selectedHostel, setSelectedHostel] = useState("");
const [selectedBlock, setSelectedBlock] = useState("");
const [selectedRoom, setSelectedRoom] = useState("");
const [name, setName] = useState("");
const [regNo, setRegNo] = useState("");
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

/* =====================================================
   FETCH HOSTELS
===================================================== */
const fetchHostels = async () => {
  try {
    const { data } = await axios.get(`${API}/api/hostels/${hostelType}`);
    setHostels(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchHostels();
}, [hostelType]);

/* =====================================================
   AUTO SELECT HOSTEL
===================================================== */
useEffect(() => {
  if (!hostels.length) return;

  setSelectedHostel(prev =>
    prev || hostels[0]._id
  );
}, [hostels]);

/* =====================================================
   AUTO SELECT BLOCK
===================================================== */
useEffect(() => {

  const hostel = hostels.find(
    h => h._id === selectedHostel
  );

  if (!hostel) {
    setSelectedBlock("");
    return;
  }

  setSelectedBlock(prev =>
    prev || hostel.blocks?.[0]?.name || ""
  );

}, [selectedHostel, hostels]);

/* =====================================================
   DERIVED DATA
===================================================== */
const selectedHostelObj =
  hostels.find(h => h._id === selectedHostel);

const blocks = selectedHostelObj?.blocks || [];

const selectedBlockObj =
  blocks.find(b => b.name === selectedBlock);

const rooms = selectedBlockObj?.rooms || [];

/* =====================================================
   HOSTEL CRUD
===================================================== */
const addHostel = async () => {
  if (!newHostel.trim()) return;

  await axios.post(`${API}/api/hostels/add-hostel`, {
    name: newHostel,
    hostelType
  });

  fetchHostels();
  setNewHostel("");
};

const deleteHostel = async id => {
  await axios.delete(`${API}/api/hostels/delete-hostel/${id}`);
  fetchHostels();
};

const editHostel = async (id, newName) => {
  await axios.put(`${API}/api/hostels/edit-hostel`, {
    hostelId: id,
    newName
  });
  fetchHostels();
  setEditingHostel(null);
};

/* =====================================================
   BLOCK CRUD
===================================================== */
const addBlock = async () => {
  if (!selectedHostel || !newBlock.trim()) return;

  await axios.post(`${API}/api/hostels/add-block`, {
    hostelId: selectedHostel,
    blockName: newBlock
  });

  fetchHostels();
  setNewBlock("");
};

const deleteBlock = async (hostelId, blockName) => {
  await axios.delete(`${API}/api/hostels/delete-block`, {
    data: { hostelId, blockName }
  });
  fetchHostels();
};

const editBlock = async (hostelId, oldBlockName, newBlockName) => {
  await axios.put(`${API}/api/hostels/edit-block`, {
    hostelId,
    oldBlockName,
    newBlockName
  });
  fetchHostels();
  setEditingBlock(null);
};

/* =====================================================
   ROOM CRUD
===================================================== */
const addRoom = async () => {
  if (!selectedHostel || !selectedBlock || !newRoom || !beds) return;

  await axios.post(`${API}/api/hostels/add-room`, {
    hostelId: selectedHostel,
    blockName: selectedBlock,
    roomNo: newRoom,
    beds
  });

  fetchHostels();
  setNewRoom("");
  setBeds("");
};

const deleteRoom = async (hostelId, blockName, roomNo) => {
  await axios.delete(`${API}/api/hostels/delete-room`, {
    data: { hostelId, blockName, roomNo }
  });
  fetchHostels();
};

const editRoom = async (
  hostelId,
  blockName,
  oldRoomNo,
  roomNo,
  totalBeds
) => {

  await axios.put(`${API}/api/hostels/edit-room`, {
    hostelId,
    blockName,
    oldRoomNo,
    roomNo,
    totalBeds
  });

  fetchHostels();
  setEditingRoom(null);
};

/* =====================================================
   ALLOCATE ROOM
===================================================== */
const allocateRoom = async () => {

  if (!selectedRoom || !regNo || !year || !department) {
    alert("Fill all fields");
    return;
  }

  await axios.post(`${API}/api/hostels/allocate`, {
    hostelId: selectedHostel,
    blockName: selectedBlock,
    roomNo: selectedRoom,
    student: {
       name, 
      regNo,
      year,
      department,
      hostelType
    }
  });

  alert("Room Allocated");

  fetchHostels();

  setRegNo("");
  setYear("");
  setDepartment("");
  setSelectedRoom("");
};

/* =====================================================
   UI
===================================================== */
return (
<div className="executive-layout">
<ExecutiveSidebar />

<div className="executive-main1" style={{marginLeft:220,marginRight:-20}}>
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
            {hostels?.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
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
            {blocks?.map((b, i) => (
              <option key={i} value={b.name}>
                {b.name}
              </option>
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

        {/* HOSTEL */}
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
            {hostels?.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* BLOCK */}
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
              ?.find((h) => h._id === selectedHostel)
              ?.blocks?.map((b, i) => (
                <option key={i} value={b.name}>
                  {b.name}
                </option>
              ))}
          </select>
        </div>

        {/* ROOM */}
        <div className="form-group">
          <label>Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            disabled={!selectedBlock}
          >
            <option value="">Select Room</option>

            {hostels
              ?.find((h) => h._id === selectedHostel)
              ?.blocks?.find((b) => b.name === selectedBlock)
              ?.rooms?.map((r, i) => (
                <option
                  key={i}
                  value={r.roomNo}
                  disabled={r.totalBeds - r.occupied === 0}
                >
                  {r.roomNo} (Free: {r.totalBeds - r.occupied})
                </option>
              ))}
          </select>
        </div>
<div className="form-group">
  <label>Student Name</label>
  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter student name"
  />
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
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        {/* DEPARTMENT */}
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

{hostels.map((h,hi)=>(

<div key={h._id}>

<h4>
{editingHostel===hi?(
<>
<input value={tempName}
onChange={e=>setTempName(e.target.value)}/>
<button onClick={()=>editHostel(h._id,tempName)}>Save</button>
<button onClick={()=>setEditingHostel(null)}>Cancel</button>
</>
):(
<>
{h.name}
<button
  onClick={() => navigate(`/hostel/${h._id}`)}
  style={{ background: "#007bff", color: "#fff" }}
>
  View
</button>
<button onClick={()=>{
setEditingHostel(hi);
setTempName(h.name);
}}>Edit</button>

<button onClick={()=>{
if(window.confirm("Delete this hostel?"))
deleteHostel(h._id);
}}
style={{background:"red",color:"#fff"}}>
Delete
</button>
</>
)}
</h4>

{h.blocks?.map((b,bi)=>(
<div key={b.name} className="structure-block">

<strong>
{editingBlock &&
editingBlock.hostel===hi &&
editingBlock.block===bi?(
<>
<input value={tempName}
onChange={e=>setTempName(e.target.value)}/>
<button onClick={()=>editBlock(h._id,b.name,tempName)}>Save</button>
<button onClick={()=>setEditingBlock(null)}>Cancel</button>
</>
):(
<>
{b.name}
<button onClick={()=>{
setEditingBlock({hostel:hi,block:bi});
setTempName(b.name);
}}>Edit</button>

<button onClick={()=>{
if(window.confirm("Delete block?"))
deleteBlock(h._id,b.name);
}}
style={{background:"red",color:"#fff"}}>
Delete
</button>
</>
)}
</strong>

{b.rooms?.map((r,ri)=>(
<div key={r.roomNo} className="structure-room">

{editingRoom &&
editingRoom.hostel===hi &&
editingRoom.block===bi &&
editingRoom.room===ri?(
<>
<input
value={tempRoom.roomNo}
onChange={e=>setTempRoom({...tempRoom,roomNo:e.target.value})}
/>

<input
type="number"
value={tempRoom.totalBeds}
onChange={e=>setTempRoom({
...tempRoom,
totalBeds:Number(e.target.value)
})}
/>

<button onClick={()=>editRoom(
h._id,
b.name,
r.roomNo,
tempRoom.roomNo,
tempRoom.totalBeds
)}>Save</button>

<button onClick={()=>setEditingRoom(null)}>Cancel</button>
</>
):(
<>
<strong>
Room {r.roomNo} | Beds:{r.totalBeds} | Occupied:{r.occupied}
</strong>

{r.students?.filter(s => s.hostelType === hostelType).length > 0 && (
  <ul className="student-list">
    {r.students
      .filter(s => s.hostelType === hostelType)
      .map((s, i) => (
        <li key={i}>
          RegNo: {s.regNo} | Year: {s.year} | Dept: {s.department}
        </li>
      ))}
  </ul>
)}

<button onClick={()=>{
setEditingRoom({hostel:hi,block:bi,room:ri});
setTempRoom({
roomNo:r.roomNo,
totalBeds:r.totalBeds
});
}}>Edit</button>

<button onClick={()=>{
if(window.confirm("Delete room?"))
deleteRoom(h._id,b.name,r.roomNo);
}}
style={{background:"red",color:"#fff"}}>
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