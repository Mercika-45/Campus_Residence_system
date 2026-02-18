import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      setSuccess("");
      return;
    }

    emailjs
      .send(
        "service_cpo2txg",
        "template_2604de8",
        {
          user_email: email,
          reset_link: "http://localhost:5173/reset-password",
        },
        "793KBQ5flZBb8sbOA"
      )
      .then(() => {
        setError("");
        setSuccess("Password reset link has been sent to your email.");
        setEmail("");
      })
      .catch((err) => {
        console.error(err);
        setSuccess("");
        setError("Failed to send email. Please try again.");
      });
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={handleReset}>
        <h2>Password Reset</h2>
        <p>Enter your registered email address</p>

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
