import "../../styles/WardenPages.css";
import WardenSidebar from "../../components/WardenSidebar";

function LeaveRequests() {
  const handleForward = (name) => {
    alert(`Leave request of ${name} forwarded to Deputy Warden`);
  };

  return (
    <div className="warden-layout">
      <WardenSidebar />

      <div className="warden-page">
        <h1>Leave Requests</h1>

        <div className="table-card">
          <table className="warden-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason</th>
                <th>Days</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Anitha</td>
                <td>Medical</td>
                <td>2</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleForward("Anitha")}
                  >
                    Forward to Deputy
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default LeaveRequests;
