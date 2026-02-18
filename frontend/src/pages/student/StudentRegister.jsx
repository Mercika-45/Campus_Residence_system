import { useState, useEffect } from "react";
import "../../styles/StudentRegistration.css";

function StudentRegister() {
  const [step, setStep] = useState(1);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [nativityCert, setNativityCert] = useState(null);

  const [majorIllness, setMajorIllness] = useState("");
  const [allergy, setAllergy] = useState("");
  const [qualification, setQualification] = useState([]);
  const [firstGraduate, setFirstGraduate] = useState("");
  const [gender, setGender] = useState("");
  const [block, setBlock] = useState("");

const [year, setYear] = useState("");
const [hostelType, setHostelType] = useState("");
const [selectedBed, setSelectedBed] = useState("");
const [semester, setSemester] = useState("");

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);
  const [guardians, setGuardians] = useState([
  {
    name: "",
    contact: "",
    relationship: "",
    email: "",
    photo: null,
    aadhaarNumber: "",
    aadhaarCard: null
  }
]);
const handleGuardianChange = (index, field, value) => {
  const updated = [...guardians];
  updated[index][field] = value;
  setGuardians(updated);
};


  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let cap = "";
    for (let i = 0; i < 5; i++) {
      cap += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(cap);
  };
const handleQualificationChange = (e) => {
  const value = e.target.value;
  setQualification(prev =>
    prev.includes(value)
      ? prev.filter(q => q !== value)
      : [...prev, value]
  );
};
const generateHostel = () => {
  const floors = {};
  const floorNames = ["Ground Floor", "First Floor", "Second Floor", "Third Floor"];

  floorNames.forEach((floor, fIndex) => {
    floors[floor] = {};

    for (let r = 1; r <= 5; r++) {
      const roomNo = `${fIndex + 1}${String(r).padStart(2, "0")}`;
      floors[floor][roomNo] = Array.from({ length: 4 }, () =>
        Math.random() > 0.5 ? "free" : "occupied"
      );
    }
  });

  return floors;
};

const [hostelData, setHostelData] = useState({
  boys: {
    junior: { name: "Boys Hostel - Junior", blocks: { A: generateHostel(), B: generateHostel() } },
    senior: { name: "Boys Hostel - Senior", blocks: { A: generateHostel(), B: generateHostel() } }
  },
  girls: {
    junior: { name: "Girls Hostel - Junior", blocks: { A: generateHostel(), B: generateHostel() } },
    senior: { name: "Girls Hostel - Senior", blocks: { A: generateHostel(), B: generateHostel() } }
  }
});
const goToStep = (stepNumber) => {
  setStep(stepNumber);
};



  useEffect(() => {
    if (step === 5) generateCaptcha();
  }, [step]);

  return (
    <div className="reg-container">

      <div className="reg-header">
        🎓 Campus Residence System – Student Registration
        <p>Please fill all required information accurately</p>
      </div>

   <div className="reg-steps">
  <span
    className={step === 1 ? "active" : ""}
    onClick={() => goToStep(1)}
  >
    Basic
  </span>

  <span
    className={step === 2 ? "active" : ""}
    onClick={() => goToStep(2)}
  >
    Academic
  </span>

  <span
    className={step === 3 ? "active" : ""}
    onClick={() => goToStep(3)}
  >
    Family Details
  </span>

  <span
    className={step === 4 ? "active" : ""}
    onClick={() => goToStep(4)}
  >
    Hostel
  </span>

  <span
    className={step === 5 ? "active" : ""}
    onClick={() => goToStep(5)}
  >
    Disclaimer
  </span>

  <span
    className={step === 6 ? "active" : ""}
    onClick={() => goToStep(6)}
  >
    Register
  </span>
</div>

      <div className="reg-card">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3>Basic Details</h3>
            <h4 className="section-title">Personal Details</h4>
            <div className="grid">
              Student Name <input placeholder="Student Name" />
              Profile Photo<input type="file" />
              Register Number<input placeholder="Register Number" />
              Date of Birth <input type="date" />
              Age <input placeholder="Age" />
              Gender
<select value={gender} onChange={(e) => setGender(e.target.value)}>
  <option value="">Gender</option>
  <option value="boys">Male</option>
  <option value="girls">Female</option>
  <option value="other">Other</option>
</select>

              Blood Group<select>
                <option value="">Blood Group</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>O+</option><option>O-</option>
                <option>AB+</option><option>AB-</option>
              </select>
              Nationality<input placeholder="Nationality" />
              Religion<select>
                <option value="">Religion</option>
                <option>Hindu</option><option>Christian</option>
                <option>Muslim</option><option>Others</option>
              </select>
              Community<select>
                <option value="">Community</option>
                <option>OC</option><option>BC</option>
                <option>MBC</option><option>SC</option><option>ST</option>
              </select>
              Caste<input placeholder="Caste" />
              Aadhaar Number<input placeholder="Aadhaar Number" />
              Aadhaar Card<input type="file" />  
            </div>
            <h4 className="section-title">Contact Details</h4>
            <div className="grid">
              Email ID<input placeholder="youremail@gmail.com" />
              Mobile Number<input placeholder="Mobile Number" />
              Password<input type="password" placeholder="Password" />
              Confirm Password<input type="password" placeholder="Confirm Password" />
              Mobile Number<input placeholder="Mobile Number" />
              WhatsApp Number<input placeholder="WhatsApp Number" />
              Alternate Contact Number<input placeholder="Alternate Contact Number" />
            </div>
            <h4 className="section-title">Health Details</h4>
            <div className="grid">
              Any Major Illness?<select value={majorIllness} onChange={e => setMajorIllness(e.target.value)}>
                <option value="">Any Major Illness?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {majorIllness === "Yes" && (
                <input placeholder="Emergency Medical Condition" />
              )}
              Allergic to any medicine?<select value={allergy} onChange={e => setAllergy(e.target.value)}>
                <option value="">Allergic to any medicine?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {allergy === "Yes" && (
                <input placeholder="If yes, specify medicine" />
              )}
              <label>Medical / Health Documents</label>
              <input type="file" />
            </div>
            <h4 className="section-title">Language & Education</h4>
            <div className="grid">
              Mother Tongue<input placeholder="Mother Tongue" />
              Other Language Known<input placeholder="Other Language Known" />
            </div>
           <h4 className="section-title guardian-title">Guardian Details</h4>
{guardians.map((guardian, index) => (
  <div className="guardian-box" key={index}>
    <div className="guardian-row">
      <div>
        Name of Guardian
        <input 
          placeholder="Name of Guardian" 
          value={guardian.name}
          onChange={e => handleGuardianChange(index, "name", e.target.value)}
        />
      </div>
      <div>
        Contact Number
        <input 
          placeholder="Contact Number" 
          value={guardian.contact}
          onChange={e => handleGuardianChange(index, "contact", e.target.value)}
        />
      </div>
    </div>

    <div className="guardian-row">
      <div>
        Relationship
        <select
          value={guardian.relationship}
          onChange={e => handleGuardianChange(index, "relationship", e.target.value)}
        >
          <option value="">Select Relationship</option>
          <option>Father</option>
          <option>Mother</option>
          <option>Local Guardian</option>
          <option>Relative</option>
        </select>
      </div>
      <div>
        Email Address
        <input 
          placeholder="Email Address" 
          value={guardian.email}
          onChange={e => handleGuardianChange(index, "email", e.target.value)}
        />
      </div>
    </div>

    <div className="guardian-row-full">
      Upload Guardian Photo
      <input 
        type="file" 
        onChange={e => handleGuardianChange(index, "photo", e.target.files[0])}
      />
    </div>

    <div className="guardian-row">
      <div>
        Aadhaar Number of Guardian
        <input 
          placeholder="Aadhaar Number of Guardian" 
          value={guardian.aadhaarNumber}
          onChange={e => handleGuardianChange(index, "aadhaarNumber", e.target.value)}
        />
      </div>
      <div>
        Aadhaar Card
        <input 
          type="file"
          onChange={e => handleGuardianChange(index, "aadhaarCard", e.target.files[0])}
        />
      </div>
    </div>
  </div>
))}

<button 
  type="button" 
  className="btn add-guardian" 
  onClick={() => setGuardians([...guardians, {
    name: "",
    contact: "",
    relationship: "",
    email: "",
    photo: null,
    aadhaarNumber: "",
    aadhaarCard: null
  }])}
>
  + Add Guardian
</button>
          
            <div className="btn-row">
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}
        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3>Academic Details</h3>
            <h4 className="section-title">10th Academic Details</h4>
            <div className="grid">
              10th Register Number <input placeholder="10th Register Number" />
               Board of Examination 
              <select>
                <option value="">Select Board of Examination</option>
                <option>CBSE – Central Board of Secondary Education</option>
                <option>ICSE – Indian Certificate of Secondary Education</option>
                <option>ISC – Indian School Certificate</option>
                <option>State Board</option>
                <option>NIOS – National Institute of Open Schooling</option>
                <option>Kendriya Vidyalaya (KV)</option>
                <option>Navodaya Vidyalaya (JNV)</option>
                <option>IB – International Baccalaureate</option>
                <option>Cambridge (IGCSE)</option>
                <option>Anglo Indian Board</option>
                <option>Madras University Board (Old System)</option>
                <option>Tamil Nadu State Board</option>
                <option>Kerala State Board</option>
                <option>Karnataka State Board</option>
                <option>Andhra Pradesh State Board</option>
                <option>Telangana State Board</option>
                <option>Maharashtra State Board</option>
                <option>West Bengal State Board</option>
                <option>Other</option>
              </select>
              School Comes Under <select>
                <option value="">School Comes Under</option>
                <option>Government</option>
                <option>Government Aided</option>
                <option>Private</option>
                <option>Private Unaided</option>
                <option>Central Government</option>
                <option>Public School</option>
                <option>Trust / Minority Institution</option>
                <option>Corporation School</option>
                <option>Municipality School</option>
              </select>
              Year of Passing (10th)
<input type="number" placeholder="e.g. 2023" />

              Marks Obtained in 10th<input placeholder="Marks Obtained in 10th" />
              Total Percentage in 10th<input placeholder="Total Percentage in 10th" />
              
                10th Mark Sheet<input type="file" />
              
              
                10th Transfer Certificate<input type="file" />
              
            </div>
            
            <h4 className="section-title">Counselling Details</h4>
            <div className="grid">
            Cutoff <input placeholder="Counselling Cutoff" />
            Counselling Rank <input placeholder="Counselling Rank" />
            </div>
           <h4 className="section-title">Qualification Type</h4>

<div className="grid">
  Qualification
  <select value={qualification} onChange={e => setQualification(e.target.value)}>
    <option value="">Select Qualification</option>
    <option value="12th">12th</option>
    <option value="Diploma">Diploma</option>
    <option value="Both">Both</option>
  </select>
</div>

{(qualification === "12th" || qualification === "Both") && (

              <>
               <h4 className="section-title">12th Academic Details</h4>
            <div className="grid">
              12th Register Number<input placeholder="12th Register Number" />
               Board of Examination 
              <select>
                <option value="">Select Board of Examination</option>
                <option>CBSE – Central Board of Secondary Education</option>
                <option>ICSE – Indian Certificate of Secondary Education</option>
                <option>ISC – Indian School Certificate</option>
                <option>State Board</option>
                <option>NIOS – National Institute of Open Schooling</option>
                <option>Kendriya Vidyalaya (KV)</option>
                <option>Navodaya Vidyalaya (JNV)</option>
                <option>IB – International Baccalaureate</option>
                <option>Cambridge (IGCSE)</option>
                <option>Anglo Indian Board</option>
                <option>Madras University Board (Old System)</option>
                <option>Tamil Nadu State Board</option>
                <option>Kerala State Board</option>
                <option>Karnataka State Board</option>
                <option>Andhra Pradesh State Board</option>
                <option>Telangana State Board</option>
                <option>Maharashtra State Board</option>
                <option>West Bengal State Board</option>
                <option>Other</option>
              </select>
              School Studied In <input placeholder="School Studied In" />
              Medium of Study <select>
                <option value="">Medium of Study</option>
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
                <option>Malayalam</option>
                <option>Telugu</option>
                <option>Kannada</option>
                <option>Urdu</option>
                <option>Marathi</option>
                <option>Gujarati</option>
                <option>Bengali</option>
                <option>Punjabi</option>
                <option>Odia</option>
                <option>Assamese</option>
                <option>Konkani</option>
                <option>Manipuri</option>
                <option>Sanskrit</option>
                <option>Other</option>
              </select>
              School Comes Under <select>
                <option value="">School Comes Under</option>
                <option>Government</option>
                <option>Government Aided</option>
                <option>Private</option>
                <option>Private Unaided</option>
                <option>Central Government</option>
                <option>Public School</option>
                <option>Trust / Minority Institution</option>
                <option>Corporation School</option>
                <option>Municipality School</option>
              </select>
             Year of Passing (12th)
<input type="number" placeholder="e.g. 2023" />

              Marks Obtained in 12th<input placeholder="Marks Obtained in 12th" />
              Total Percentage in 12th<input placeholder="Total Percentage in 12th" />
              
                12th Mark Sheet<input type="file" />
              
              
                12th Transfer Certificate<input type="file" />
              
              
                Contact Certificate<input type="file" />
              
            </div>
              </>
            )}

           {(qualification === "Diploma" || qualification === "Both") && (

              <>
                <h4 className="section-title">Diploma Details</h4>
                <div className="grid">
                  <input placeholder="Diploma College Name" />
                  <input placeholder="Branch" />
                  <input placeholder="Year of Passing" />
                  <input placeholder="Percentage / CGPA" />
                  Diploma Mark Sheet<input type="file" />
                  Diploma transfer certificate<input type="file" />
                </div>
              </>
            )}
            <h4 className="section-title">College Details (Joining)</h4>
            <div className="grid">
              College Name <input placeholder="College Name" />
              Programme Level <select>
                <option value="">Programme Level</option>
                <option>UG</option>
                <option>PG</option>
              </select>
              Degree<select>
              <option value="">Degree</option>
              <option>B.E</option>
              <option>B.Tech</option>
              <option>B.Sc</option>
              <option>B.Com</option>
              <option>B.A</option>
              <option>BBA</option>
              <option>BCA</option>
              <option>B.Arch</option>
              <option>M.E</option>
              <option>M.Tech</option>
              <option>M.Sc</option>
              <option>M.Com</option>
              <option>M.A</option>
              <option>MBA</option>
              <option>MCA</option>
              <option>M.Arch</option>
              <option>Ph.D</option>
            </select>
            Department<select>
              <option value="">Department</option>

              {/* Engineering */}
              <option>Civil Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Electrical and Electronics Engineering (EEE)</option>
              <option>Electronics and Communication Engineering (ECE)</option>
              <option>Computer Science and Engineering (CSE)</option>
              <option>Information Technology (IT)</option>
              <option>Artificial Intelligence & Data Science (AI & DS)</option>
              <option>Artificial Intelligence & Machine Learning (AI & ML)</option>
              <option>Robotics and Automation</option>
              <option>Mechatronics</option>
              <option>Biomedical Engineering</option>
              <option>Biotechnology</option>
              <option>Chemical Engineering</option>
              <option>Aeronautical Engineering</option>
              <option>Automobile Engineering</option>

              {/* Science */}
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>Statistics</option>
              <option>Computer Science</option>
              <option>Data Science</option>

              {/* Commerce & Management */}
              <option>Commerce</option>
              <option>Accounting & Finance</option>
              <option>Business Administration</option>
              <option>Corporate Secretaryship</option>
              <option>Banking & Insurance</option>

              {/* Arts */}
              <option>English</option>
              <option>Tamil</option>
              <option>History</option>
              <option>Economics</option>
              <option>Political Science</option>
              <option>Psychology</option>
              <option>Visual Communication</option>
              <option>Journalism</option>

              {/* Others */}
              <option>Law</option>
              <option>Education</option>
              <option>Hotel Management</option>
              <option>Fashion Technology</option>
              <option>Architecture</option>
              <option>Pharmacy</option>
            </select>

            Semester 
<select
  value={semester}
  onChange={(e) => {
    const sem = Number(e.target.value);
    setSemester(sem);

    // Auto assign year based on semester
    if (sem >= 1 && sem <= 4) setYear("junior");
    else if (sem >= 5 && sem <= 8) setYear("senior");
    else setYear("");
  }}
>
  <option value="">Select Semester</option>
  {[1,2,3,4,5,6,7,8].map(s => (
    <option key={s} value={s}>{s}</option>
  ))}
</select>


            Year of Passing 
            <select>
              <option value="">Year of Passing</option>
              <option>2021 - 2025</option>
              <option>2022 - 2026</option>
              <option>2023 - 2027</option>
              <option>2024 - 2028</option>
              <option>2025 - 2029</option>
              <option>2026 - 2030</option>
            </select>

            {/* Regulation */}
            <select>
              <option value="">Regulation</option>
              <option>2017 Regulation</option>
              <option>2021 Regulation</option>
              <option>2025 Regulation</option>
            </select>

            {/* Admission Year */}
            <select>
              <option value="">Admission Year</option>
              {[2020,2021,2022,2023,2024,2025,2026].map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>

          </div>
            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}
        {/* STEP 3 */}
        {step === 3 && (
        <>
          
          <h3 style={{ marginTop: "30px" }}>Family Details</h3>
          <div className="grid">
            Father's Name<input placeholder="Father's Name" />
            Father's Occupation<input placeholder="Father's Occupation" />
            Father's Mobile Number<input placeholder="Father's Mobile Number" />
            Father's Email ID<input placeholder="Father's Email ID" />
            Mother's Name<input placeholder="Mother's Name" />
            Mother's Occupation<input placeholder="Mother's Occupation" />
            Mother's Mobile Number<input placeholder="Mother's Mobile Number" />
            Mother's Email ID<input placeholder="Mother's Email ID" />
            Family Income<input placeholder="Family Income " />
            
              Income Certificate
              <input type="file" />
            
            
            
              Community Certificate
              <input type="file" />
           
        
           First Graduation Certificate <select value={firstGraduate} onChange={e => setFirstGraduate(e.target.value)}>
            <option value="">First Graduate</option>
            <option>Yes</option>
            <option>No</option>
          </select>
            {firstGraduate === "Yes" && (
            <div className="doc-item">
             <label>First Graduation Certificate</label>
             <input type="file" />
            </div>
            )}
        
           
              Nativity Certificate
              <input type="file" />
           
          </div>
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
        {step === 4 && (
  <>
    <h3>Hostel Details</h3>

    {!gender || !year ? (
      <p style={{ color: "red" }}>
        Please complete Basic & Academic details (Gender + Year of Study)
      </p>
    ) : (
      <>
        <div className="grid">
          Hostel Name
          <input value={hostelData[gender][year].name} readOnly />

          Preferred Hostel Block
          <select value={block} onChange={(e) => setBlock(e.target.value)}>
            <option value="">Select Block</option>
            <option value="A">Block A</option>
            <option value="B">Block B</option>
          </select>

          Food Preference
          <select>
            <option value="">Food Preference</option>
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Mixed</option>
          </select>
        </div>

        {block && (
          <>
            <h4 style={{ marginTop: "20px" }}>Choose Room & Bed</h4>

            {Object.entries(hostelData[gender][year].blocks[block]).map(
              ([floor, rooms]) => (
                <div key={floor} className="floor-block">
                  <h5>{floor}</h5>

                  <div className="room-grid">
                    {Object.entries(rooms).map(([room, beds]) => (
                      <div key={room} className="room-card">
                        <div className="room-title">Room {room}</div>

                        <div className="bed-row">
                          {beds.map((status, i) => (
  <button
    key={i}
    className={`bed ${status}`}
    disabled={status === "occupied"} // only occupied beds are disabled
onClick={() => {
  if (selectedBed) {
    // Free previously selected bed
    const [prevFloor, prevRoom, prevBed] = selectedBed.split(" - ").map(s => s.trim());
    setHostelData(prev => {
      const newData = { ...prev };
      const bedIndex = Number(prevBed.split(" ")[1]) - 1;
      newData[gender][year].blocks[prevFloor][prevRoom][bedIndex] = "free";
      return newData;
    });
  }

  // Mark new bed as occupied
  setHostelData(prev => {
    const newData = { ...prev };
    newData[gender][year].blocks[block][floor][room][i] = "occupied";
    return newData;
  });

  // Save new selection
  setSelectedBed(`${floor} - Room ${room} - Bed ${i + 1}`);
}}

  >
    {i + 1}
  </button>
))}


                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}

            {selectedBed && (
              <p className="selected-bed">
                Selected Bed: <strong>{selectedBed}</strong>
              </p>
            )}
          </>
        )}
      </>
    )}

    <div className="btn-row">
      <button className="btn prev" onClick={prev}>Previous</button>
      <button className="btn next" onClick={next}>Next</button>
    </div>
  </>
)}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <h3>Disclaimer</h3>
            <div className="disclaimer-box">
              <label className="disclaimer-row">
                <input type="checkbox" />
                <span>I confirm all details are correct</span>
              </label>
              <label className="disclaimer-row">
                <input type="checkbox" />
                <span>I agree to hostel rules</span>
              </label>
            </div>
            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn next" onClick={next}>Next</button>
            </div>
          </>
        )}
        {/* STEP 6 */}
        {step === 6 && (
          <>
            <h3>Security Verification</h3>
            <div className="captcha-row">
              <div className="captcha-text">{captcha}</div>
              <button onClick={generateCaptcha}>⟳</button>
            </div>
            <input
              placeholder="Enter Captcha"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="btn-row">
              <button className="btn prev" onClick={prev}>Previous</button>
              <button className="btn register" onClick={() => {
                if (captchaInput !== captcha) {
                  setError("Invalid Captcha");
                  generateCaptcha();
                  setCaptchaInput("");
                } else {
                  alert("Student Registered Successfully 🎉");
                }
              }}>Register</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default StudentRegister;
