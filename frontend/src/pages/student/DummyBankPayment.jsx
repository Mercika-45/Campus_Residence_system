import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/DummyBank.css";

function DummyBankPayment() {
  const navigate = useNavigate();
  const { state } = useLocation(); // ✅ get feeType & period

  const [form, setForm] = useState({
  applicationNo: state?.regNo || "", // 🔥 AUTO FILL
    studentName: "",
    year: "",
    branch: "",
    semester: "",
    contact: "",
    email: "",
    paymentMode: "upi",
    paymentType: state?.feeType || "", // ✅ auto set
    upiId: "",
    cardNo: "",
    expiry: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Fee Logic
  const getFeeDetails = () => {
    switch (form.paymentType) {
      case "hostel":
        return { hostel: 25000, mess: 0, maintenance: 5000 };
      case "mess":
        return { hostel: 0, mess: 15000, maintenance: 0 };
      case "both":
        return { hostel: 25000, mess: 15000, maintenance: 5000 };
      default:
        return { hostel: 0, mess: 0, maintenance: 0 };
    }
  };

  const fees = getFeeDetails();
  const total = fees.hostel + fees.mess + fees.maintenance;

  const validateForm = () => {
    if (
      !form.applicationNo ||
      !form.studentName ||
      !form.year ||
      !form.branch ||
      !form.semester ||
      !form.contact ||
      !form.email ||
      !form.paymentType
    ) {
      alert("⚠ Please fill all details");
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

  // ✅ MAIN FIX HERE
  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    setTimeout(async () => {
      const txnId = "TXN" + Math.floor(100000 + Math.random() * 900000);

      try {
        // ✅ SAVE PAYMENT IN DB
        await axios.post("http://localhost:5000/api/fees/pay", {
  regNo: state?.regNo,   // 🔥 use actual logged-in regNo
  studentName: form.studentName,
  feeType: form.paymentType.toLowerCase(),
 period: state?.period?.trim(), // 🔥 IMPORTANT FIX
  amount: total,
  status: "Paid", // 🔥 MUST
  txnId
});

        alert(`✅ Payment Successful!\nTransaction ID: ${txnId}`);

        // ✅ GO TO RECEIPT PAGE
        navigate("/student/payment-success", {
  state: { txnId, form, total, refresh: true }
});

      } catch (err) {
        console.error(err);
        alert("❌ Payment failed");
      }

      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
  const fetchStudent = async () => {
    try {
      if (!state?.regNo) return;

      const res = await axios.get(`http://localhost:5000/api/student/reg/${state.regNo}`)

      const s = res.data;

      setForm((prev) => ({
        ...prev,
        applicationNo: s.registerNumber,
        studentName: s.studentName,
        year: `Year ${s?.college?.yearOfStudy || ""}`,
        branch: s?.college?.department || "",
        semester: `Semester ${s?.college?.semester || ""}`,
        contact: s.mobile || "",
        email: s.email || "",
      }));

    } catch (err) {
      console.error("Auto fetch error:", err);
    }
  };

  fetchStudent();
}, [state]);

  return (
    <div className="dummy-bank-page">
      <div className="dummy-card">
        <h2>Indian Overseas Bank</h2>
        <h3>University COE, Konam, Nagercoil</h3>

        {/* PAYMENT TYPE */}
        <div className="dropdown-box">
          <label>Select Payment</label>
          <select name="paymentType" value={form.paymentType} onChange={handleChange}>
            <option value="">--select--</option>
            <option value="hostel">HOSTEL FEES</option>
            <option value="mess">MESS FEES</option>
            <option value="both">HOSTEL + MESS FEES</option>
          </select>
        </div>

        {/* FORM */}
        <div className="dummy-form">
          <input
  name="applicationNo"
  value={form.applicationNo}
  onChange={handleChange}
/>

<input
  name="year"
  value={form.year}
  onChange={handleChange}
/>

<input
  name="branch"
  value={form.branch}
  onChange={handleChange}
/>

<input
  name="semester"
  value={form.semester}
  onChange={handleChange}
/>

<input
  name="contact"
  value={form.contact}
  onChange={handleChange}
/>

<input
  name="email"
  value={form.email}
  onChange={handleChange}
/>
        </div>

        {/* PAYMENT MODE */}
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
            Card
          </label>
        </div>

        {/* UPI */}
        {form.paymentMode === "upi" && (
          <input
            className="full-input"
            name="upiId"
            placeholder="Enter UPI ID"
            onChange={handleChange}
          />
        )}

        {/* CARD */}
        {form.paymentMode === "card" && (
          <div className="card-box">
            <input name="cardNo" placeholder="Card Number" maxLength="16" onChange={handleChange} />
            <input name="expiry" placeholder="MM/YY" maxLength="5" onChange={handleChange} />
            <input name="cvv" placeholder="CVV" maxLength="3" onChange={handleChange} />
          </div>
        )}

        {/* FEES */}
        {form.paymentType && (
          <div className="fee-box">
            {fees.hostel > 0 && <p><span>Hostel Fee</span><span>₹ {fees.hostel}</span></p>}
            {fees.mess > 0 && <p><span>Mess Fee</span><span>₹ {fees.mess}</span></p>}
            {fees.maintenance > 0 && <p><span>Maintenance</span><span>₹ {fees.maintenance}</span></p>}
            <h3><span>Total</span><span>₹ {total}</span></h3>
          </div>
        )}

        <button className="pay-btn" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
}

export default DummyBankPayment;