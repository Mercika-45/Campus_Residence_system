import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      setSuccess("");
      return;
    }

    emailjs.send(
      "service_cpo2txg",
      "template_2604de8",
      {
        user_email: email,
        reset_link: `http://localhost:5173/reset-password?role=${role}`,
      },
      "793KBQ5flZBb8sbOA"
    )
    .then(() => {
      setError("");
      setSuccess("Password reset link has been sent to your email.");
      setEmail("");
    })
    .catch(() => {
      setSuccess("");
      setError("Failed to send email. Please try again.");
    });
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={handleReset}>
        <h2>Password Reset</h2>

        <input
          type="email"
          placeholder="E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button className="reset-btn" type="submit">
          Reset My Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;