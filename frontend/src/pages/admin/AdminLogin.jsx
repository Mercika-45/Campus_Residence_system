import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Login.css";

function AdminLogin() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

  // Generate 5-char captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let cap = "";
    for (let i = 0; i < 5; i++) {
      cap += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(cap);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
      );
      return;
    }

    if (captchaInput.toUpperCase() !== captcha) {
      setError("Invalid captcha");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    // Save admin data
    const adminData = { name: "Admin", email, role: "Administrator" };
    localStorage.setItem("admin", JSON.stringify(adminData));
    navigate("/admin/dashboard");
  };

  return (
    <div className="login-container">

      {/* Left side with overlay */}
      <div className="login-left">
        <div className="overlay">
          <h1>Campus Residence System</h1>
          <p>Smart Hostel Management Solution</p>
        </div>
      </div>

      {/* Right side login box */}
      <div className="login-right">
        <div className="login-box">
          <h2>Admin Login</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label>Email ID</label>
            <input
              type="email"
              value={email}
              placeholder="Enter admin email"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passwordRef.current.focus();
                }
              }}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  captchaRef.current.focus();
                }
              }}
              required
            />

            <div className="forgot-password">
              <Link to="/forgot-password?role=admin">Forgot Password?</Link>
            </div>

            <div className="captcha-row">
              <div className="captcha-text">{captcha}</div>
              <button
                type="button"
                className="refresh-btn"
                onClick={generateCaptcha}
              >
                ⟳
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter captcha"
              value={captchaInput}
              ref={captchaRef}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLogin();
                }
              }}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AdminLogin;
