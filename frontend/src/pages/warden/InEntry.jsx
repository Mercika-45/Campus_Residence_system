import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function InEntry() {

  const API_URL = "http://localhost:5000/api/inentry";

  const [entries, setEntries] = useState([]);
  const [returnedEntries, setReturnedEntries] = useState([]);
  const [showView, setShowView] = useState(false);

  /* FETCH STUDENTS OUT */

  const fetchStudentsOut = async () => {
    try {

      const res = await axios.get(`${API_URL}/students-out`);
      setEntries(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  /* FETCH RETURNED */

  const fetchReturnedEntries = async () => {
    try {

      const res = await axios.get(`${API_URL}/returned`);
      setReturnedEntries(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudentsOut();
    fetchReturnedEntries();
  }, []);

  /* MARK IN */

 const markIn = async (id) => {

  try {

    const res = await axios.post(`${API_URL}/mark-in/${id}`);

    console.log(res.data);

    alert("Student marked as returned");

    await fetchStudentsOut();
    await fetchReturnedEntries();

  } catch (error) {

    console.error("Mark In Error:", error);

  }

};

  return (

    <div className="warden-layout">

      <WardenSidebar />

      <div className="warden-page">

        <div className="page-header">
          <h1>In Entry Management</h1>
          <p className="breadcrumb">Dashboard / In Entry</p>
        </div>

        <div className="live-counter">
          Students Currently Outside: {entries.length}
        </div>

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            className="action-btn"
            onClick={() => setShowView(!showView)}
          >
            {showView ? "Back to Mark In" : "View In Entries"}
          </button>
        </div>

        {/* STUDENTS OUT */}

        {!showView && (

          <div className="table-card">

            <h2>Students Currently Out</h2>

            <table className="warden-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Year</th>
                  <th>Out Time</th>
                  <th>Expected Return</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {entries.length > 0 ? (

                  entries.map((entry) => {

                    const late =
                      new Date() > new Date(entry.returnDate);

                    return (

                      <tr
                        key={entry._id}
                        className={late ? "late-row" : ""}
                      >

                        <td>{entry.studentName}</td>
                        <td>{entry.regNo}</td>
                        <td>{entry.year}</td>

                        <td>
                          {new Date(entry.outDate).toLocaleString()}
                        </td>

                        <td>
                          {new Date(entry.returnDate).toLocaleString()}
                        </td>

                        <td>
                          {late ? (
                            <span className="late-badge">Late</span>
                          ) : (
                            <span className="status-badge out">Out</span>
                          )}
                        </td>

                        <td>

                          <button
                            className="in-btn"
                            onClick={() => markIn(entry._id)}
                          >
                            Mark In
                          </button>

                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>
                    <td colSpan="7" style={{ textAlign:"center" }}>
                      No Out Entry Records
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

        {/* RETURNED STUDENTS */}

        {showView && (

          <div className="table-card">

            <h2>Returned Students</h2>

            <table className="warden-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reg No</th>
                  <th>Year</th>
                  <th>Out Time</th>
                  <th>Expected Return</th>
                  <th>Returned Time</th>
                </tr>
              </thead>

              <tbody>

                {returnedEntries.length > 0 ? (

                  returnedEntries.map((entry) => (

                    <tr key={entry._id}>

                      <td>{entry.studentName}</td>
                      <td>{entry.regNo}</td>
                      <td>{entry.year}</td>

                      <td>
                        {new Date(entry.outDate).toLocaleString()}
                      </td>

                      <td>
                        {new Date(entry.returnDate).toLocaleString()}
                      </td>

                      <td>
                        {new Date(entry.actualReturn).toLocaleString()}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="6" style={{ textAlign:"center" }}>
                      No In Entry Records
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
}

export default InEntry;