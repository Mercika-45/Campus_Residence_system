import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/PayFee.css";

function PayFee() {
  const navigate = useNavigate();

  const feeDetails = {
    hostelFee: 25000,
    messFee: 15000,
    maintenanceFee: 5000,
  };

  const totalFee =
    feeDetails.hostelFee +
    feeDetails.messFee +
    feeDetails.maintenanceFee;

  const handlePayment = () => {
    navigate("/student/bank-payment");   // ✅ correct route
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content1">
        <Topbar title="Fee Payment" />

        <div className="content">
          <h2>Fee Payment</h2>
          <p className="breadcrumb">Home / Fee Payment</p>

          <div className="fee-card">
            <h3>Hostel Fee Details</h3>

            <table className="fee-table">
              <tbody>
                <tr>
                  <td>Hostel Fee</td>
                  <td>₹ {feeDetails.hostelFee}</td>
                </tr>
                <tr>
                  <td>Mess Fee</td>
                  <td>₹ {feeDetails.messFee}</td>
                </tr>
                <tr>
                  <td>Maintenance Fee</td>
                  <td>₹ {feeDetails.maintenanceFee}</td>
                </tr>
                <tr className="total-row">
                  <td>Total Amount</td>
                  <td>₹ {totalFee}</td>
                </tr>
              </tbody>
            </table>

            {/* ✅ PAY BUTTON ONLY */}
            <button className="pay-btn" onClick={handlePayment}>
              Pay Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PayFee;
