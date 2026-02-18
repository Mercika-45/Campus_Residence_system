import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ExecutiveWarden.css";
import "../../styles/FeeStatusEW.css";

function FeeStatus() {
  return (
    <div className="executive-layout">
      <ExecutiveSidebar />

      <div className="executive-main" style={{ flex: 1, background: "#f5f7fb",marginLeft:220 }}>
        <Topbar title="Fee Status" />

        <div className="dashboard-content">
          <div className="card">

            <table className="fee-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Siva Gomathi</td>
                  <td>ECE</td>
                  <td>₹35,000</td>
                  <td className="pending">Pending</td>
                </tr>

                <tr>
                  <td>Gopika R</td>
                  <td>CSE</td>
                  <td>₹35,000</td>
                  <td className="paid">Paid</td>
                </tr>

                <tr>
                  <td>Vijay Selvan</td>
                  <td>EEE</td>
                  <td>₹35,000</td>
                  <td className="pending">Pending</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeStatus;
