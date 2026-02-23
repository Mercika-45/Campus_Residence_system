import { useState } from "react";
import "../styles/Register.css";

function Register() {
  const [step, setStep] = useState(1);

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  return (
    <div className="reg-container">

      {/* HEADER */}
      <div className="reg-header">
        🎓 Hostel Management System Online Registration
        <p>Please fill out all required information accurately</p>
      </div>

      {/* STEPS */}
      <div className="reg-steps">
        <span className={step === 1 ? "active" : ""}>Basic Details</span>
        <span className={step === 2 ? "active" : ""}>Academic Details</span>
        <span className={step === 3 ? "active" : ""}>Address Details</span>
        <span className={step === 4 ? "active" : ""}>Document Upload</span>
        <span className={step === 5 ? "active" : ""}>Disclaimer</span>
        <span className={step === 6 ? "active" : ""}>Register</span>
      </div>

      {/* CARD */}
      <div className="reg-card">

        {/* STEP 1 — BASIC */}
        {step === 1 && (
          <>
            <h3>Basic Details</h3>
            <div className="grid">
              <input placeholder="Student Name" />
              <input placeholder="Aadhaar No" />
              <input placeholder="Email ID" />
              <input placeholder="Confirm Email ID" />
              <input placeholder="Mobile No" />
              <input type="date" />
              <select>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
              </select>
              <select>
                <option>Blood Group</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>

            <h4>Guardian Information</h4>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Local Guardian</td>
                  <td><input /></td>
                  <td><input /></td>
                </tr>
                <tr>
                  <td>Father</td>
                  <td><input /></td>
                  <td><input /></td>
                </tr>
                <tr>
                  <td>Mother</td>
                  <td><input /></td>
                  <td><input /></td>
                </tr>
              </tbody>
            </table>

            <div className="btn-row">
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}

        {/* STEP 2 — ACADEMIC */}
        {step === 2 && (
          <>
            <h3>Academic Details</h3>
            <div className="grid">
              <select><option>Admission Year</option></select>
              <select><option>School / Center</option></select>
              <select><option>Programme Level</option></select>
              <select><option>Programme</option></select>
              <select><option>Semester</option></select>
            </div>

            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}

        {/* STEP 3 — ADDRESS */}
        {step === 3 && (
          <>
            <h3>Address Details</h3>
            <div className="grid">
              <input placeholder="Address Line 1" />
              <input placeholder="Address Line 2" />
              <input placeholder="Post" />
              <input placeholder="District" />
              <input placeholder="State" />
              <input placeholder="Pin Code" />
            </div>

            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}

        {/* STEP 4 — DOCUMENT */}
        {step === 4 && (
          <>
            <h3>Document Upload</h3>
            <div className="grid">
              <input type="file" />
              <input type="file" />
            </div>

            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}

        {/* STEP 5 — DISCLAIMER */}
        {step === 5 && (
          <>
            <h3>Disclaimer</h3>
            <label>
              <input type="checkbox" /> I confirm all details are correct.
            </label>
            <label>
              <input type="checkbox" /> I agree to rules & regulations.
            </label>

            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}

        {/* STEP 6 — REGISTER */}
        {step === 6 && (
          <>
            <h3>Security Verification</h3>
            <input placeholder="Enter Captcha" />

            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn register">Register</button>
              <button className="btn reset">Reset</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Register;
