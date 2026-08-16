import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import "../../styles/Admin.css";
import "../../styles/AllocateWarden.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

function AllocateWarden() {
  const [warden, setWarden] = useState("");
  const [hostel, setHostel] = useState("");
  const [wardenError, setWardenError] = useState("");
  const [wardenSuccess, setWardenSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hostelError, setHostelError] = useState("");
  const [hostelSuccess, setHostelSuccess] = useState("");
  const [allocError, setAllocError] = useState("");
  const [allocSuccess, setAllocSuccess] = useState("");
  const [allocations, setAllocations] = useState([]);
  const [showAddWarden, setShowAddWarden] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [showAddHostel, setShowAddHostel] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const [newHostel, setNewHostel] = useState({ name: "", type: "" });

  const DEFAULT_PROFILE =
    "https://ui-avatars.com/api/?name=Warden&background=0A1F44&color=fff";

  const departmentList = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electrical and Electronic Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "None",
  ];

  const [wardensList, setWardensList] = useState([]);

  const [newWarden, setNewWarden] = useState({
    name: "",
    dept: "",
    phone: "",
    email: "",
    role: "",
    hostelType:"",
    password: "",
    image: "",
  });

  // ===== Auto-hide messages =====
  useEffect(() => {
    if (wardenError || wardenSuccess) {
      const timer = setTimeout(() => {
        setWardenError("");
        setWardenSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wardenError, wardenSuccess]);

  useEffect(() => {
    if (hostelError || hostelSuccess) {
      const timer = setTimeout(() => {
        setHostelError("");
        setHostelSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hostelError, hostelSuccess]);

  useEffect(() => {
    if (allocError || allocSuccess) {
      const timer = setTimeout(() => {
        setAllocError("");
        setAllocSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allocError, allocSuccess]);

  // ===== Fetch data =====
  useEffect(() => {
    fetchWardens();
    fetchHostels();
    fetchAllocations();
  }, []);

  const fetchWardens = () => {
    axios
      .get("http://localhost:5000/api/wardens")
      .then((res) => setWardensList(res.data))
      .catch((err) => console.log(err));
  };

  const fetchHostels = () => {
    axios
      .get("http://localhost:5000/api/admin/hostels")
      .then((res) => setHostels(res.data))
      .catch((err) => console.log(err));
  };

  const fetchAllocations = () => {
    axios
      .get("http://localhost:5000/api/allocations")
      .then((res) => setAllocations(res.data))
      .catch((err) => console.log(err));
  };

  // ===== Handle Add/Edit Warden =====
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
      !newWarden.hostelType ||
      (!newWarden._id && !newWarden.password) // password required only on new warden
    ) {
      setWardenError("Please fill all required staff details");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newWarden.name);
      formData.append("dept", newWarden.dept);
      formData.append("phone", newWarden.phone);
      formData.append("email", newWarden.email);
      formData.append("role", newWarden.role);
      formData.append("hostelType", newWarden.hostelType);
      if (newWarden.password) formData.append("password", newWarden.password);
      if (newWarden.image instanceof File) formData.append("image", newWarden.image);

      if (newWarden._id) {
        // Edit
        await axios.put(`http://localhost:5000/api/wardens/${newWarden._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setWardenSuccess("Warden updated successfully");
      } else {
        // Add
        await axios.post("http://localhost:5000/api/wardens/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setWardenSuccess("New warden added successfully");
      }

      setShowAddWarden(false);
      setNewWarden({
        name: "",
        dept: "",
        phone: "",
        email: "",
        role: "",
        hostelType:"",
        password: "",
        image: "",
      });

      fetchWardens();
      fetchAllocations(); // <--- ADD THIS
    } catch (err) {
      console.error(err.response?.data);
      setWardenError(err.response?.data?.message || "Error saving warden");
    }
  };

  const handleEditWarden = (warden) => {
    setShowAddWarden(true);
    setNewWarden({
      ...warden,
      password: "", // don't prefill password
      image: warden.image || "",
    });
  };

  const handleDeleteWarden = async (id) => {
    try {
      const isAllocated = allocations.some((alloc) => alloc.warden?._id === id);
      if (isAllocated) {
        alert("Cannot delete allocated warden. Remove allocation first.");
        return;
      }
      await axios.delete(`http://localhost:5000/api/wardens/${id}`);
      fetchWardens();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete warden");
    }
  };

  // ===== Handle Hostels =====
 const handleAddHostel = async (e) => {
  e.preventDefault();
  setHostelError("");
  setHostelSuccess("");

  if (!newHostel.name || !newHostel.type) {
    setHostelError("Please fill hostel details");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/admin/hostels/add", {
      name: newHostel.name,
      type: newHostel.type.toLowerCase(), // save consistently
    });

    setHostelSuccess("Hostel added successfully");
    setNewHostel({ name: "", type: "" });
    fetchHostels();

    // Hide form after 2 seconds to show message
    setTimeout(() => setShowAddHostel(false), 2000);
  } catch (err) {
    setHostelError(err.response?.data?.message || "Error adding hostel");
  }
};
  const handleDeleteHostel = async (id) => {
    try {
      axios.delete(`http://localhost:5000/api/admin/hostels/${id}`);
      fetchHostels();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePhoneChange = (e) => {
  const value = e.target.value.replace(/\D/g, ""); // numbers only

  setNewWarden({ ...newWarden, phone: value });

  // realtime validation
  if (value.length === 0) {
    setPhoneError("Phone number is required");
  } else if (value.length < 10) {
    setPhoneError("Phone number must be 10 digits");
  } else {
    setPhoneError("");
  }
};

  // ===== Handle Allocation =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllocError("");
    setAllocSuccess("");
    if (!warden || !hostel) {
      setAllocError("Please select both warden and hostel");
      return;
    }

    try {
      const selectedWarden = wardensList.find((w) => w._id === warden);
      await axios.post("http://localhost:5000/api/allocations/allocate", {
        wardenId: selectedWarden._id,
        hostel,
      });

      setAllocSuccess(`Successfully allocated ${selectedWarden.name} to ${hostel}`);
      setWarden("");
      setHostel("");
      fetchAllocations();
    } catch (err) {
      setAllocError(err.response?.data?.message || "Allocation failed");
    }
  };

  const handleDeleteAllocation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/allocations/${id}`);
      fetchAllocations();
    } catch (err) {
      console.log(err);
    }
  };

  const selectedProfile = wardensList.find((w) => w._id === warden);

  // ===== Render =====
  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminTopbar title="Allocate Warden" />
        <div className="dashboard-content">
          <h2 className="page-title">Allocate Warden</h2>
          <p className="page-subtitle">Assign hostel responsibility to a warden</p>

          <button className="primary-btn wide" onClick={() => setShowAddWarden(true)}>
            Add New Warden
          </button>
          <button className="primary-btn wide" onClick={() => setShowAddHostel(true)}>
            Add Hostel
          </button>

          {/* Add/Edit Warden Form */}
          {showAddWarden && (
            <div className="add-warden-card">
              <h3>{newWarden._id ? "Edit Staff Profile" : "New Staff Profile"}</h3>
              <form onSubmit={handleAddWarden}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newWarden.name}
                  onChange={(e) => setNewWarden({ ...newWarden, name: e.target.value })}
                />
                <select
                  value={newWarden.dept}
                  onChange={(e) => setNewWarden({ ...newWarden, dept: e.target.value })}
                >
                  <option value="">-- Select Department --</option>
                  {departmentList.map((dept, idx) => (
                    <option key={idx} value={dept}>{dept}</option>
                  ))}
                </select>
               <input
  type="tel"
  placeholder="Phone"
  value={newWarden.phone}
  maxLength={10}
  required
  onChange={handlePhoneChange}
/>
{phoneError && (
  <p style={{ color: "red", fontSize: "14px" }}>
    {phoneError}
  </p>
)}
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newWarden.email}
                  onChange={(e) => setNewWarden({ ...newWarden, email: e.target.value })}
                />
                <select
                  value={newWarden.role}
                  onChange={(e) => setNewWarden({ ...newWarden, role: e.target.value })}
                >
                  <option value="">-- Select Role --</option>
                  <option>Executive Warden</option>
                  <option>Local Warden </option>
                </select>

                <select
  value={newWarden.hostelType}
  onChange={(e) =>
    setNewWarden({ ...newWarden, hostelType: e.target.value })
  }
>
  <option value="">-- Select Hostel Type --</option>
  <option value="boys">Boys Hostel</option>
  <option value="girls">Girls Hostel</option>
</select>

                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Set Login Password"
                    value={newWarden.password}
                    onChange={(e) => setNewWarden({ ...newWarden, password: e.target.value })}
                    style={{ paddingRight: "40px", width: "100%" }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#555",
                      fontSize: "18px",
                    }}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewWarden({ ...newWarden, image: e.target.files[0] })}
                />

                <img
                  src={
                    newWarden.image
                      ? newWarden.image instanceof File
                        ? URL.createObjectURL(newWarden.image)
                        : `http://localhost:5000${newWarden.image}`
                      : DEFAULT_PROFILE
                  }
                  alt="profile"
                  className="table-img"
                />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "15px" }}>
                  <button className="primary-btn" type="submit">Save Warden</button>
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => {
                      setShowAddWarden(false);
                      setNewWarden({ name: "", dept: "", phone: "", email: "", role: "",hostelType:"", password: "", image: "" });
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

          {/* Add Hostel Form */}
          
          {showAddHostel && (
            <div className="add-warden-card">
              <h3>Add Hostel</h3>
              <form onSubmit={handleAddHostel}>
                <input
                  type="text"
                  placeholder="Hostel Name"
                  value={newHostel.name}
                  onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })}
                />
                <select
                  value={newHostel.type}
                  onChange={(e) => setNewHostel({ ...newHostel, type: e.target.value })}
                >
                  <option value="">-- Select Type --</option>
                  <option value="Boys">Boys Hostel</option>
                  <option value="Girls">Girls Hostel</option>
                </select>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button className="primary-btn" type="submit">Save Hostel</button>
                  <button type="button" className="primary-btn" onClick={() => setShowAddHostel(false)}>Cancel</button>
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
                <select value={warden} onChange={(e) => setWarden(e.target.value)}>
                  <option value="">-- Select Warden --</option>
                  {wardensList.map((w) => (
                    <option key={w._id} value={w._id}>{w.name}</option>
                  ))}
                </select>
              </div>

              {selectedProfile && (
                <div className="staff-profile-preview">
                  <img
                    src={selectedProfile.image ? `http://localhost:5000${selectedProfile.image}` : DEFAULT_PROFILE}
                    alt="profile"
                  />
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
                <select value={hostel} onChange={(e) => setHostel(e.target.value)}>
                  <option value="">-- Select Hostel --</option>
                  {hostels.map((h) => (
                    <option key={h._id} value={h.name}>{h.name} ({h.type})</option>
                  ))}
                </select>
              </div>

              <button className="primary-btn">Allocate Warden</button>
              {allocError && <p className="allocError">{allocError}</p>}
              {allocSuccess && <p className="allocSuccess">{allocSuccess}</p>}
            </form>
          </div>

          {/* Warden List */}
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
                      <td><img src={w.image ? `http://localhost:5000${w.image}` : DEFAULT_PROFILE} alt="profile" className="table-img" /></td>
                      <td>{w.name}</td>
                      <td>{w.role}</td>
                      <td>{w.dept}</td>
                      <td>{w.phone}</td>
                      <td>{w.email}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditWarden(w)}>Edit</button>
                        <button className="remove-btn" onClick={() => handleDeleteWarden(w._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Hostel List */}
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
  src={
    item.warden?.image
      ? `http://localhost:5000${item.warden.image}`
      : DEFAULT_PROFILE
  }
  alt="profile"
  className="table-img"
/>
            </td>
            <td>{item.warden?.name}</td>
            <td>{item.warden?.role}</td>
            <td>{item.warden?.phone}</td>
            <td>{item.warden?.email}</td>
            <td>{item.hostel}</td>
            <td>
           <button
  className="remove-btn"
  onClick={() => handleDeleteAllocation(item._id)}
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