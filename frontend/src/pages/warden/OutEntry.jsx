import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function OutEntry() {
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [year, setYear] = useState("1");
  const [outDate, setOutDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [reason, setReason] = useState("");

  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [showView, setShowView] = useState(false);

  const [filterDate, setFilterDate] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/outentry";

  /* ================= FETCH ENTRIES ================= */
  const fetchEntries = async () => {
    try {
      let query = "";

      if (filterYear) query += `year=${filterYear}`;
      if (filterDate) {
        if (query) query += "&";
        query += `date=${filterDate}`;
      }

      const res = await axios.get(query ? `${API_URL}?${query}` : API_URL);
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    if (showView) {
      fetchEntries();
    }
  }, [filterYear, filterDate, showView]);

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentName || !regNo || !parentMobile || !outDate || !returnDate) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, {
          studentName,
          regNo,
          parentMobile,
          year,
          outDate,
          returnDate,
          reason,
        });
        setMessage("Entry updated successfully!");
      } else {
        await axios.post(API_URL, {
          studentName,
          regNo,
          parentMobile,
          year,
          outDate,
          returnDate,
          reason,
        });
        setMessage("Out entry recorded & Parent notified successfully!");
      }

      setStudentName("");
      setRegNo("");
      setParentMobile("");
      setYear("1");
      setOutDate("");
      setReturnDate("");
      setReason("");
      setEditId(null);

      setTimeout(() => setMessage(""), 3000);

      if (showView) fetchEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
      setMessage("Something went wrong!");
    }
  };

  /* ================= HANDLE DELETE ================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* ================= HANDLE EDIT ================= */
  const handleEdit = (entry) => {
    setEditId(entry._id);
    setStudentName(entry.studentName);
    setRegNo(entry.regNo);
    setParentMobile(entry.parentMobile);
    setYear(entry.year);
    setOutDate(entry.outDate.slice(0, 16));
    setReturnDate(entry.returnDate.slice(0, 16));
    setReason(entry.reason || "");
    setShowView(false);
  };

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <div className="page-header">
          <h1>Out Entry Management</h1>
          <p className="breadcrumb">Dashboard / Out Entry</p>
        </div>

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button className="action-btn" onClick={() => setShowView(!showView)}>
            {showView ? "Add Entry" : "View Entries"}
          </button>
        </div>

        {/* ================= ADD ENTRY ================= */}
        {!showView && (
          <div className="form-card">
            <form className="warden-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
              </div>

              <div className="form-group">
                <label>Register Number</label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="Enter register number"
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>

              <div className="form-group">
                <label>Parent Mobile</label>
                <input
                  type="tel"
                  value={parentMobile}
                  onChange={(e) => setParentMobile(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="form-group">
                <label>Out Date & Time</label>
                <input
                  type="datetime-local"
                  value={outDate}
                  onChange={(e) => setOutDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Return Date & Time</label>
                <input
                  type="datetime-local"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>

              <div className="form-group full">
                <label>Reason</label>
                <textarea
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason (optional)"
                />
              </div>

              <button type="submit" className="primary-btn">
                {editId ? "Update Entry" : "Save & Notify Parent"}
              </button>

              {message && <div className="success-message">{message}</div>}
            </form>
          </div>
        )}

        {/* ================= VIEW ENTRY ================= */}
        {showView && (
          <>
            <div className="attendance-controls1">
              <div>
                <label>Filter by Date</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>

              <div>
                <label>Filter by Year</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  <option value="">All Years</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
            </div>

            <div className="table-card">
              <h2>Out Entry Records</h2>

              <table className="warden-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Reg No</th>
                    <th>Year</th>
                    <th>Out Time</th>
                    <th>Return Time</th>
                    <th>Parent Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <tr key={entry._id}>
                        <td>{entry.studentName}</td>
                        <td>{entry.regNo}</td>
                        <td>{entry.year} Year</td>
                        <td>{new Date(entry.outDate).toLocaleString()}</td>
                        <td>{new Date(entry.returnDate).toLocaleString()}</td>
                        <td>{entry.parentMobile}</td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEdit(entry)}>
                            Edit
                          </button>
                          <button
                            className="delete-btn1"
                            onClick={() => handleDelete(entry._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OutEntry;