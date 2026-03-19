import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Login.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ExecutiveWardenLogin() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const passwordRef = useRef(null);

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

  const handleLogin = async () => {
    setError("");

    // ✅ CAPTCHA VALIDATION
    if (captchaInput !== captcha) {
      setError("Invalid Captcha");
      generateCaptcha();
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, user } = res.data;

      // ✅ Allow only executive role
      if (user.role !== "executive") {
        setError("Access denied. Not an Executive account.");
        return;
      }

      // ✅ Store specifically for executive dashboard
      localStorage.setItem("token", token);
      localStorage.setItem("executiveWarden", JSON.stringify(user));

      navigate("/executive/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      generateCaptcha();
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="overlay">
          <h1>Campus Residence System</h1>
          <p>Executive Warden Panel</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Executive Warden Login</h2>

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
              placeholder="Enter warden email"
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

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter password"
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password?role=executive">
                Forgot Password?
              </Link>
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
              onChange={(e) => setCaptchaInput(e.target.value)}
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

export default ExecutiveWardenLogin;