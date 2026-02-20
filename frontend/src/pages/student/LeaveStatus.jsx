import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css";

function LeaveStatus() {

  const leaves = JSON.parse(localStorage.getItem("leaves")) || [];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="Leave Status" />

        <div className="content">

          <h2>Leave Status</h2>
          <p className="breadcrumb">Home / Leave Status</p>

          <div className="table-wrapper">

            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>

              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No leave records found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.leaveType}</td>
                      <td>{leave.fromDate}</td>
                      <td>{leave.toDate}</td>
                      <td>{leave.days}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={`status ${leave.status.toLowerCase()}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td>{leave.appliedOn}</td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default LeaveStatus;
