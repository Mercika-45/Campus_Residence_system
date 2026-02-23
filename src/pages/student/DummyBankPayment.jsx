import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DummyBank.css";

function DummyBankPayment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    applicationNo: "",
    studentName: "",
    year: "",
    branch: "",
    semester: "",
    contact: "",
    email: "",
    paymentMode: "upi",
    upiId: "",
    cardNo: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !form.applicationNo ||
      !form.studentName ||
      !form.year ||
      !form.branch ||
      !form.semester ||
      !form.contact ||
      !form.email
    ) {
      alert("⚠ Please fill all student details");
      return false;
    }

    if (form.paymentMode === "upi" && !form.upiId) {
      alert("⚠ Enter UPI ID");
      return false;
    }

    if (
      form.paymentMode === "card" &&
      (!form.cardNo || !form.expiry || !form.cvv)
    ) {
      alert("⚠ Enter complete card details");
      return false;
    }

    return true;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const txnId = "TXN" + Math.floor(100000 + Math.random() * 900000);

      alert(`✅ Payment Successful!\nTransaction ID: ${txnId}`);
      navigate("/student/fee", { state: { txnId } });
    }, 2000);
  };

  return (
    <div className="iob-container">

      <div className="iob-card">
        <h3>University COE, Konam, Nagercoil</h3>
        <p><b>Payment Type:</b> Hostel Fees</p>

        <div className="iob-form">
          <input name="applicationNo" placeholder="Application No" onChange={handleChange} />
          <input name="studentName" placeholder="Student Name" onChange={handleChange} />
          <input name="year" placeholder="Year of Study" onChange={handleChange} />
          <input name="branch" placeholder="Branch" onChange={handleChange} />
          <input name="semester" placeholder="Semester" onChange={handleChange} />
          <input name="contact" placeholder="Contact Number" onChange={handleChange} />
          <input name="email" placeholder="Email ID" onChange={handleChange} />
        </div>

        <div className="payment-method">
          <h4>Select Payment Method</h4>

          <label>
            <input
              type="radio"
              name="paymentMode"
              value="upi"
              checked={form.paymentMode === "upi"}
              onChange={handleChange}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="paymentMode"
              value="card"
              checked={form.paymentMode === "card"}
              onChange={handleChange}
            />
            Debit / Credit Card
          </label>
        </div>

        {form.paymentMode === "upi" && (
          <input
            name="upiId"
            placeholder="Enter UPI ID (eg: gopika@upi)"
            onChange={handleChange}
          />
        )}

        {form.paymentMode === "card" && (
          <div className="card-box">
            <input
              name="cardNo"
              placeholder="Card Number"
              maxLength="16"
              onChange={handleChange}
            />
            <input
              name="expiry"
              placeholder="MM/YY"
              maxLength="5"
              onChange={handleChange}
            />
            <input
              name="cvv"
              placeholder="CVV"
              maxLength="3"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="fee-box">
          <p>Hostel Fee: ₹ 25,000</p>
          <p>Mess Fee: ₹ 15,000</p>
          <p>Maintenance Fee: ₹ 5,000</p>
          <h3>Total: ₹ 45,000</h3>
        </div>

        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing Payment..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
}

export default DummyBankPayment;
