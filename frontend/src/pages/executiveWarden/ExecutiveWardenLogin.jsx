import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Login.css";

function ExecutiveWardenLogin() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Refs for focus control
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

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

    // ✅ Empty validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // ✅ Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include 1 uppercase letter and 1 number"
      );
      return;
    }

    // ✅ Captcha validation
    if (captchaInput !== captcha) {
      setError("Invalid captcha");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    const executiveData = {
      name: "Executive Warden",
      email: email,
      role: "ExecutiveWarden"
    };

    localStorage.setItem(
      "executiveWarden",
      JSON.stringify(executiveData)
    );

    navigate("/executive/dashboard");
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

          {/* ✅ Form for Enter key support */}
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
            />

            <div className="forgot-password">
              <Link to="/forgot-password?role=executive">Forgot Password?</Link>
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
              onChange={(e) => setCaptchaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLogin();
                }
              }}
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
