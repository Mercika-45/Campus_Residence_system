import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jsPDF from "jspdf";
import "../../styles/PaymentSuccess.css";

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ Prevent crash on refresh
  useEffect(() => {
    if (!state) {
      navigate("/student/student-fee");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { txnId, form, total } = state;

  const date = new Date().toLocaleString();

  // ✅ DOWNLOAD RECEIPT
  const downloadReceipt = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(30, 136, 229);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("Indian Overseas Bank", 20, 20);

    doc.setTextColor(0, 0, 0);

    // Title
    doc.setFontSize(14);
    doc.text("Payment Receipt", 20, 40);

    doc.line(20, 45, 190, 45);

    let y = 55;

    const addRow = (label, value) => {
      doc.text(label, 20, y);
      doc.text(String(value || "-"), 120, y);
      y += 10;
    };

    addRow("Transaction ID:", txnId);
    addRow("Date:", date);
    addRow("Application No:", form?.applicationNo);
    addRow("Student Name:", form?.studentName);
    addRow("Year:", form?.year);
    addRow("Branch:", form?.branch);
    addRow("Semester:", form?.semester);
    addRow("Payment Mode:", form?.paymentMode?.toUpperCase());

    // Total box
    doc.rect(20, y + 5, 170, 15);
    doc.setFontSize(13);
    doc.text(`Total Paid: Rs. ${total}`, 25, y + 15);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your payment!", 20, 280);

    doc.save(`Receipt_${txnId}.pdf`);
  };

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <h2>✅ Payment Successful</h2>
        <h3>Indian Overseas Bank</h3>

        <div className="receipt-box">
          <p><span>Transaction ID</span><span>{txnId}</span></p>
          <p><span>Date & Time</span><span>{date}</span></p>
          <p><span>Application No</span><span>{form?.applicationNo}</span></p>
          <p><span>Student Name</span><span>{form?.studentName}</span></p>
          <p><span>Year</span><span>{form?.year}</span></p>
          <p><span>Branch</span><span>{form?.branch}</span></p>
          <p><span>Semester</span><span>{form?.semester}</span></p>
          <p><span>Payment Mode</span><span>{form?.paymentMode?.toUpperCase()}</span></p>

          <hr />

          <h3 className="total">Total Paid: ₹ {total}</h3>
        </div>

        <div className="receipt-actions">
          <button onClick={downloadReceipt}>
            ⬇ Download Receipt
          </button>

          <button onClick={() => window.print()}>
            🖨 Print
          </button>

          <button onClick={() => navigate("/student/student-fee", { state: { refresh: true } })}>
  Go to Fee Page
</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;