import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/Admin.css";
import "../../styles/AllocateWarden.css";

function AllocateWarden() {
  const [warden, setWarden] = useState("");
  const [hostel, setHostel] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [allocations, setAllocations] = useState([]);
  const [showAddWarden, setShowAddWarden] = useState(false);

  const [newWarden, setNewWarden] = useState({
    name: "",
    dept: "",
    phone: "",
    image: ""
  });

  const [wardensList, setWardensList] = useState([
    {
      name: "Ramesh Kumar",
      dept: "Computer Science Department",
      phone: "9876543210",
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Priya Sharma",
      dept: "Electronic and Communication Department",
      phone: "9876543211",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ]);

  const hostelList = [
    "Boys Hostel - A Block",
    "Boys Hostel - B Block",
    "Girls Hostel - A Block",
    "Girls Hostel - B Block"
  ];

  // Load saved allocations
  useEffect(() => {
    const saved = localStorage.getItem("wardenAllocations");
    if (saved) {
      setAllocations(JSON.parse(saved));
    }
  }, []);

  // Add New Warden
  const handleAddWarden = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newWarden.name || !newWarden.dept || !newWarden.phone) {
      setError("Please fill all staff details");
      return;
    }

    setWardensList([...wardensList, newWarden]);
    setNewWarden({ name: "", dept: "", phone: "", image: "" });
    setShowAddWarden(false);
    setSuccess("New warden added successfully");
  };

  // Allocate Warden
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!warden || !hostel) {
      setError("Please select both warden and hostel");
      return;
    }

    const alreadyAllocated = allocations.find(
      (item) => item.hostel === hostel
    );

    if (alreadyAllocated) {
      setError("This hostel is already assigned");
      return;
    }

    const newAllocation = {
      id: Date.now(),
      warden,
      hostel
    };

    const updatedAllocations = [...allocations, newAllocation];
    setAllocations(updatedAllocations);

    localStorage.setItem(
      "wardenAllocations",
      JSON.stringify(updatedAllocations)
    );

    setSuccess(`Successfully allocated ${warden} to ${hostel}`);
    setWarden("");
    setHostel("");
  };

  // Remove Allocation
  const handleDelete = (id) => {
    const updated = allocations.filter((item) => item.id !== id);
    setAllocations(updated);
    localStorage.setItem("wardenAllocations", JSON.stringify(updated));
  };

  // Get selected profile
  const selectedProfile = wardensList.find(
    (w) => w.name === warden
  );

  return (
    <div className="dashboard-container">
      <AdminSidebar />

      <div className="main-content">
        <Topbar title="Allocate Warden" />

        <div className="dashboard-content">
          <h2 className="page-title">Allocate Warden</h2>
          <p className="page-subtitle">
            Assign hostel responsibility to a warden
          </p>

          {/* Toggle Add Warden */}
          <button 
            className="primary-btn wide"
            onClick={() => setShowAddWarden(!showAddWarden)}
            style={{ marginBottom: "20px"}}
          >
            {showAddWarden ? "Cancel" : " Add New Warden"}
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
                <input
                  type="dept"
                  placeholder="dept"
                  value={newWarden.dept}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, dept: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newWarden.phone}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Profile Image URL (optional)"
                  value={newWarden.image}
                  onChange={(e) =>
                    setNewWarden({ ...newWarden, image: e.target.value })
                  }
                />

                <button className="primary-btn">
                  Save Warden
                </button>
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
                  {wardensList.map((w, index) => (
                    <option key={index} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Profile Preview */}
              {selectedProfile && (
                <div className="staff-profile-preview">
                  <img
                    src={
                      selectedProfile.image ||
                      "https://via.placeholder.com/100"
                    }
                    alt="profile"
                  />
                  <div>
                    <p><strong>{selectedProfile.name}</strong></p>
                    <p>{selectedProfile.dept}</p>
                    <p>{selectedProfile.phone}</p>
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
                  {hostelList.map((h, index) => (
                    <option key={index} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}

              <button className="primary-btn">
                Allocate Warden
              </button>
            </form>
          </div>

          {/* Allocated Wardens Display */}
          {allocations.length > 0 && (
            <div className="allocated-section">
              <h3>Allocated Wardens</h3>

              <div className="allocated-grid">
                {allocations.map((item) => {
                  const profile = wardensList.find(
                    (w) => w.name === item.warden
                  );

                  return (
                    <div key={item.id} className="allocated-card">
                      <img
                        src={
                          profile?.image ||
                          "https://via.placeholder.com/100"
                        }
                        alt="profile"
                      />

                      <h4>{item.warden}</h4>
                      <p>{profile?.dept}</p>
                      <p>{profile?.phone}</p>

                      <span className="allocated-hostel-badge">
                        {item.hostel}
                      </span>

                      <button
                        className="remove-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Remove Allocation
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AllocateWarden;
