import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const role = searchParams.get("role");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ✅ Smart redirect based on role
    if (role === "admin") navigate("/admin/login");
    else if (role === "executive") navigate("/executive/login");
    else if (role === "warden") navigate("/warden/login");
    else navigate("/student-login"); // default
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="reset-btn" onClick={handleSubmit}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;