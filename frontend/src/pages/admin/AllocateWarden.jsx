import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";
import "../../styles/AllocateWarden.css";

function AllocateWarden() {
  const [warden, setWarden] = useState("");
  const [hostel, setHostel] = useState("");
   const [wardenError, setWardenError] = useState("");
  const [wardenSuccess, setWardenSuccess] = useState("");

  const [hostelError, setHostelError] = useState("");
  const [hostelSuccess, setHostelSuccess] = useState("");

  const [allocError, setAllocError] = useState("");
  const [allocSuccess, setAllocSuccess] = useState("");
  const [allocations, setAllocations] = useState([]);
  const [showAddWarden, setShowAddWarden] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [showAddHostel, setShowAddHostel] = useState(false);

const [newHostel, setNewHostel] = useState({
  name: "",
  type: ""
});

  const DEFAULT_PROFILE =
    "https://ui-avatars.com/api/?name=Warden&background=0A1F44&color=fff";

  const departmentList = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electrical and Electronic Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering"
  ];


  const [wardensList, setWardensList] = useState([]);

  const [newWarden, setNewWarden] = useState({
    name: "",
    dept: "",
    phone: "",
    email: "",
    role: "",
    password: "",
    image: ""
  });


  // ✅ Auto hide warden messages
useEffect(() => {
  if (wardenError || wardenSuccess) {
    const timer = setTimeout(() => {
      setWardenError("");
      setWardenSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [wardenError, wardenSuccess]);

// ✅ Auto hide hostel messages
useEffect(() => {
  if (hostelError || hostelSuccess) {
    const timer = setTimeout(() => {
      setHostelError("");
      setHostelSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [hostelError, hostelSuccess]);

// ✅ Auto hide allocation messages
useEffect(() => {
  if (allocError || allocSuccess) {
    const timer = setTimeout(() => {
      setAllocError("");
      setAllocSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [allocError, allocSuccess]);

  // ✅ Load wardens from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/wardens")
      .then((res) => setWardensList(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ Load allocations from backend
  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = () => {
    axios
      .get("http://localhost:5000/api/allocations")
      .then((res) => setAllocations(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
  fetchHostels();
}, []);

const fetchHostels = () => {
  axios
    .get("http://localhost:5000/api/hostels")
    .then((res) => setHostels(res.data))
    .catch((err) => console.log(err));
};

const handleDeleteWarden = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/wardens/${id}`);
    setWardensList(wardensList.filter((w) => w._id !== id));
  } catch (err) {
    console.log(err);
  }
};

const handleEditWarden = (warden) => {
  setShowAddWarden(true);
  setNewWarden({
    ...warden,
    password: "", // don't prefill password
  });
};

const handleAddHostel = async (e) => {
  e.preventDefault();
  setHostelError("");
  setHostelSuccess("");

  if (!newHostel.name || !newHostel.type) {
    setHostelError("Please fill hostel details");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/hostels/add", newHostel);

    setHostelSuccess("Hostel added successfully");

    setNewHostel({ name: "", type: "" });
    setShowAddHostel(false);

    fetchHostels();

  } catch (err) {
    setHostelError(err.response?.data?.message || "Error adding hostel");
  }
};

const handleDeleteHostel = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/hostels/${id}`);
    fetchHostels();
  } catch (err) {
    console.log(err);
  }
};
 const handleAddWarden = async (e) => {
  e.preventDefault();
  setWardenError("");
  setWardenSuccess("");

  if (
    !newWarden.name ||
    !newWarden.dept ||
    !newWarden.phone ||
    !newWarden.email ||
    !newWarden.role ||
    !newWarden.password
  ) {
    setWardenError("Please fill all staff details");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", newWarden.name);
    formData.append("dept", newWarden.dept);
    formData.append("phone", newWarden.phone);
    formData.append("email", newWarden.email);
    formData.append("role", newWarden.role);
    formData.append("password", newWarden.password);

    // ✅ image file
    if (newWarden.image) {
      formData.append("image", newWarden.image);
    }

    await axios.post(
      "http://localhost:5000/api/wardens/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    setWardenSuccess("New warden added successfully");

    setNewWarden({
      name: "",
      dept: "",
      phone: "",
      email: "",
      role: "",
      password: "",
      image: ""
    });

    setShowAddWarden(false);

    const res = await axios.get(
      "http://localhost:5000/api/wardens"
    );
    setWardensList(res.data);

  } catch (err) {
    setWardenError(err.response?.data?.message || "Error adding warden");
  }
};


  // ✅ Allocate Warden
  const handleSubmit = async (e) => {
  e.preventDefault();
  setAllocError("");
  setAllocSuccess("");

  if (!warden || !hostel) {
    setAllocError("Please select both warden and hostel");
    return;
  }

  try {
    const selectedWarden = wardensList.find(
      (w) => w._id === warden
    );

    await axios.post(
      "http://localhost:5000/api/allocations/allocate",
      {
        wardenId: selectedWarden._id,
        hostel
      }
    );

    setAllocSuccess(
      `Successfully allocated ${selectedWarden.name} to ${hostel}`
    );

    setWarden("");
    setHostel("");

    fetchAllocations();

  } catch (err) {
    setAllocError(err.response?.data?.message || "Allocation failed");
  }
};
  // ✅ Remove Allocation
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/allocations/${id}`
      );
      fetchAllocations();
    } catch (err) {
      console.log(err);
    }
  };

  const selectedProfile = wardensList.find(
    (w) => w._id === warden
  );

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <AdminTopbar title="Allocate Warden" />

        <div className="dashboard-content">
          <h2 className="page-title">Allocate Warden</h2>
          <p className="page-subtitle">
            Assign hostel responsibility to a warden
          </p>
<button
  className="primary-btn wide"
  onClick={() => setShowAddWarden(true)}
  style={{ marginBottom: "20px" }}
>
  Add New Warden
</button>
<button
  className="primary-btn wide"
  onClick={() => setShowAddHostel(true)}
  style={{ marginBottom: "20px" }}
>
  Add Hostel
</button>
          {/* Add Warden Form */}
          {showAddWarden && (
            <div className="add-warden-card">
              <h3>New Staff Profile</h3>
              <form onSubmit={handleAddWarden}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newWarden.name}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, name: e.target.value })
                  }
                />

                <select
                  value={newWarden.dept}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, dept: e.target.value })
                  }
                >
                  <option value="">-- Select Department --</option>
                  {departmentList.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Phone"
                  value={newWarden.phone}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, phone: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={newWarden.email}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, email: e.target.value })
                  }
                />

                <select
                  value={newWarden.role}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, role: e.target.value })
                  }
                >
                  <option value="">-- Select Role --</option>
                  <option>Executive Warden (Boys)</option>
                  <option>Executive Warden (Girls)</option>
                  <option>Local Warden (Boys)</option>
                  <option>Local Warden (Girls)</option>
                </select>

                <input
                  type="password"
                  placeholder="Set Login Password"
                  value={newWarden.password}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, password: e.target.value })
                  }
                />

               <label>Profile Image</label>
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setNewWarden({ ...newWarden, image: e.target.files[0] })
  }
/>
               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
  <button className="primary-btn" type="submit">
    Save Warden
  </button>

  <button
    type="button"
    className="primary-btn"
    onClick={() => {
      setShowAddWarden(false);
      setNewWarden({
        name: "",
        dept: "",
        phone: "",
        email: "",
        role: "",
        password: "",
        image: ""
      });
      setWardenError("");
      setWardenSuccess("");
    }}
  >
    Cancel
  </button>
</div>
{wardenError && <p className="wardenError">{wardenError}</p>}
{wardenSuccess && <p className="wardenSuccess">{wardenSuccess}</p>}
              </form>
            </div>
          )}

          {showAddHostel && (
  <div className="add-warden-card">
    <h3>Add Hostel</h3>

    <form onSubmit={handleAddHostel}>
      <input
        type="text"
        placeholder="Hostel Name"
        value={newHostel.name}
        onChange={(e) =>
          setNewHostel({ ...newHostel, name: e.target.value })
        }
      />

      <select
        value={newHostel.type}
        onChange={(e) =>
          setNewHostel({ ...newHostel, type: e.target.value })
        }
      >
        <option value="">-- Select Type --</option>
        <option value="Boys">Boys Hostel</option>
        <option value="Girls">Girls Hostel</option>
      </select>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="primary-btn" type="submit">
          Save Hostel
        </button>

        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setShowAddHostel(false);
            setNewHostel({ name: "", type: "" });
          }}
        >
          Cancel
        </button>
      </div>
        {hostelError && <p className="hostelError">{hostelError}</p>}
        {hostelSuccess && <p className="hostelSuccess">{hostelSuccess}</p>}
    </form>
  </div>
)}



          {/* Allocation Form */}
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Warden</label>
                <select
                  value={warden}
                  onChange={(e) => setWarden(e.target.value)}
                >
                  <option value="">-- Select Warden --</option>
                  {wardensList.map((w) => (
                    <option key={w._id} value={w._id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProfile && (
                <div className="staff-profile-preview">
                  <img src={selectedProfile.image} alt="profile" />
                  <div>
                    <p><strong>{selectedProfile.name}</strong></p>
                    <p>{selectedProfile.dept}</p>
                    <p>{selectedProfile.role}</p>
                    <p>{selectedProfile.phone}</p>
                    <p>{selectedProfile.email}</p>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Select Hostel</label>
                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="">-- Select Hostel --</option>
                  {hostels.map((h) => (
  <option key={h._id} value={h.name}>
    {h.name} ({h.type})
  </option>
))}
                </select>
              </div>

            

              <button className="primary-btn">
                Allocate Warden
              </button>
              {allocError && <p className="allocError">{allocError}</p>}
              {allocSuccess && <p className="allocSuccess">{allocSuccess}</p>}
            </form>
          </div>



    {wardensList.length > 0 && (
  <div className="allocated-section">
    <h3>Warden List</h3>

    <table className="custom-table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {wardensList.map((w) => (
          <tr key={w._id}>
            <td>
              <img src={w.image || DEFAULT_PROFILE} alt="profile" className="table-img" />
            </td>
            <td>{w.name}</td>
            <td>{w.role}</td>
            <td>{w.dept}</td>
            <td>{w.phone}</td>
            <td>{w.email}</td>
            <td>
              <button
                className="edit-btn"
                onClick={() => handleEditWarden(w)}
              >
                Edit
              </button>
              <button
                className="remove-btn"
                onClick={() => handleDeleteWarden(w._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    

   {hostels.length > 0 && (
  <div className="allocated-section">
    <h3>Hostel List</h3>

    <table className="custom-table">
      <thead>
        <tr>
          <th>Hostel Name</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {hostels.map((h) => (
          <tr key={h._id}>
            <td>{h.name}</td>
            <td>{h.type}</td>
            <td>
              <button
                className="remove-btn"
                onClick={() => handleDeleteHostel(h._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

        {allocations.length > 0 && (
  <div className="allocated-section">
    <h3>Allocated Wardens</h3>

    <table className="custom-table">
      <thead>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Hostel</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {allocations.map((item) => (
          <tr key={item._id}>
            <td>
              <img
                src={item.warden?.image || DEFAULT_PROFILE}
                alt="profile"
                className="table-img"
              />
            </td>
            <td>{item.warden?.name}</td>
            <td>{item.warden?.role}</td>
            <td>{item.warden?.dept}</td>
            <td>{item.warden?.phone}</td>
            <td>{item.warden?.email}</td>
            <td>{item.hostel}</td>
            <td>
              <button
                className="remove-btn"
                onClick={() => handleDelete(item._id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default AllocateWarden;