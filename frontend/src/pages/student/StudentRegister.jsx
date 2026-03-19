import { useState, useEffect } from "react";

import "../../styles/StudentRegistration.css";

function StudentRegister() {
  const [step, setStep] = useState(1);
  
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  

  const [selectedBed, setSelectedBed] = useState("");
 
  const [block, setBlock] = useState("");




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


 const [student, setStudent] = useState({
    studentName: "",
    registerNumber: "",
    dob: "",
    age: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    community: "",
    caste: "",
    aadhaarNumber: "",
    email: "",
    mobile: "",
    whatsapp: "",
    alternateContact: "",
    password: "",
    confirmPassword: "",
     majorIllness: "",
     medicalNotes: "",
    allergy: "",
    allergyDetails: "",
     motherTongue: "",
    otherLanguage: [],
     photo: null,
    aadhaarCard: null,
    medicalDoc: null,
    disabilityCertificate: null,
    tenthRegister: "",
tenthBoard: "",
tenthSchoolType: "",
tenthSchool: "",
tenthMedium: "",
tenthYear: "",
tenthMarks: "",
tenthPercentage: "",
tenthMarkSheet: null,
tenthTransferCertificate: null,

qualification: "",

twelfthRegister: "",
twelfthBoard: "",
twelfthSchool: "",
twelfthMedium: "",
twelfthSchoolType: "",
twelfthYear: "",
twelfthMarks: "",
twelfthPercentage: "",
twelfthMarkSheet: null,
twelfthTransferCertificate: null,
twelfthConductCertificate: null,

diplomaCollege: "",
diplomaBranch: "",
diplomaYearOfPassing: "",
diplomaPercentage: "",
diplomaMarkSheet: null,
diplomaTransferCertificate: null,

department: "",
course: "",
year: "",
    section: "",
    rollNumber: "",
    
    firstGraduate: "",
   

hostel: {
  hostelName: "",
  block: "",
  floor: "",
  room: "",
  bedNumber: "",  
  
  foodPreference: "",
  feeReceipt: null
},




incomeCertificate: null,
communityCertificate: null,
firstGraduateCertificate: null,
nativityCertificate: null,

   counsellingCutoff: "",
counsellingRank: "",
    physicallyChallenged: "",
    collegeYearOfPassing: "", 
    fatherName: "",
    fatherOccupation: "",
    fatherMobile: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherMobile: "",
    motherEmail: "",
    guardianName: "",
    guardianRelation: "",
    guardianMobile: "",
    guardianEmail: "",
    familyIncome: "",
    addressLine1: "",
addressLine2: "",
    village: "",
    post: "",
    taluk: "",
    district: "",
    state: "",
    pincode: "",
    country: "",
    gender: "",
   
   
     confirmDetails: false,
  agreeRules: false
  });
 const handleSubmitStep1 = (e) => {
  e.preventDefault();
  next();
};
 
const handleFileChange = (e, fieldName) => {
  const file = e.target.files[0];

  setStudent((prev) => ({
    ...prev,
    [fieldName || e.target.name]: file
  }));
};
const handleChange = (e) => {
  const { name, value } = e.target;

  setStudent(prev => ({
    ...prev,
    [name]: value
  }));
};
const handleBedSelect = (floor, roomNo, bedIndex) => {
  const bedNumber = `Bed ${bedIndex + 1} (${floor} - Room ${roomNo})`;
  
  setSelectedBed(bedNumber);

  setStudent(prev => ({
    ...prev,
    hostel: {
      ...prev.hostel,
      bedNumber: bedNumber
    }
  }));
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
  Boys: {
    junior: { name: "Boys Hostel - Junior", blocks: { A: generateHostel(), B: generateHostel() } },
    senior: { name: "Boys Hostel - Senior", blocks: { A: generateHostel(), B: generateHostel() } }
  },
  Girls: {
    junior: { name: "Girls Hostel - Junior", blocks: { A: generateHostel(), B: generateHostel() } },
    senior: { name: "Girls Hostel - Senior", blocks: { A: generateHostel(), B: generateHostel() } }
  }
});
const goToStep = (stepNumber) => {
  setStep(stepNumber);
};

useEffect(() => {
  if (student.gender && student.year) {
    const hostel = hostelData?.[student.gender]?.[student.year];

    if (hostel) {
      setStudent(prev => ({
        ...prev,
        hostel: {
          ...prev.hostel,
          hostelName: hostel.name
        }
      }));
    }
  }
}, [student.gender, student.year, hostelData]);

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
              Student Name
<input
name="studentName"
placeholder="Student Name"
value={student.studentName}
onChange={handleChange}
/>


      Profile Photo
   

 <div style={{ display: "flex", flexDirection: "column" }}>
  <input
    type="file"
    name="photo"
    accept=".png,.jpg,.jpeg"
    onChange={(e) => handleFileChange(e, "photo")}
    style={{ padding: "4px" }}
  />

  {student.photo && (
    <a
      href={URL.createObjectURL(student.photo)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "13px",
        color: "#007bff",
        textDecoration: "underline",
        cursor: "pointer",
        marginTop: "3px"
      }}
    >
      Uploaded: {student.photo.name}
    </a>
  )}
</div>
Register Number
<input
name="registerNumber"
placeholder="Register Number"
value={student.registerNumber}
onChange={handleChange}
/>

Date of Birth
<input
type="date"
name="dob"
value={student.dob}
onChange={handleChange}
/>

Age
<input
name="age"
placeholder="Age"
value={student.age}
onChange={handleChange}
/>

Gender
<select name="gender" value={student.gender} onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="Boys">Male</option>
<option value="Girls">Female</option>
  <option value="Other">Other</option>
</select>

Blood Group
<select
name="bloodGroup"
value={student.bloodGroup}
onChange={handleChange}
>
<option value="">Blood Group</option>
<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>O+</option>
<option>O-</option>
<option>AB+</option>
<option>AB-</option>
</select>

Nationality
<input
name="nationality"
placeholder="Nationality"
value={student.nationality}
onChange={handleChange}
/>

Religion
<select
name="religion"
value={student.religion}
onChange={handleChange}
>
<option value="">Religion</option>
<option>Hindu</option>
<option>Christian</option>
<option>Muslim</option>
<option>Others</option>
</select>

Community
<select
name="community"
value={student.community}
onChange={handleChange}
>
<option value="">Community</option>
<option>OC</option>
<option>BC</option>
<option>MBC</option>
<option>SC</option>
<option>ST</option>
</select>

Caste
<input
name="caste"
placeholder="Caste"
value={student.caste}
onChange={handleChange}
/>

Aadhaar Number
<input
name="aadhaarNumber"
placeholder="Aadhaar Number"
value={student.aadhaarNumber}
onChange={handleChange}
/>

Aadhaar Card
<div style={{ display: "flex", flexDirection: "column" }}>
  <input 
    type="file" 
    name="aadhaarCard" 
    accept=".pdf,.png,.jpg,.jpeg" 
    onChange={(e) => handleFileChange(e, "aadhaarCard")} 
    style={{ padding: "4px" }} 
  />
  {student.aadhaarCard && (
    <a 
      href={URL.createObjectURL(student.aadhaarCard)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.aadhaarCard.name}
    </a>
  )}
</div>

            </div>
            <h4 className="section-title">Contact Details</h4>
            <div className="grid">
             Email ID
<input
name="email"
placeholder="youremail@gmail.com"
value={student.email}
onChange={handleChange}
/>

Password
<input
type="password"
name="password"
placeholder="Password"
value={student.password}
onChange={handleChange}
/>

Confirm Password
<input
type="password"
name="confirmPassword"
placeholder="Confirm Password"
onChange={handleChange}
/>

Mobile Number
<input
name="mobile"
placeholder="Mobile Number"
value={student.mobile}
onChange={handleChange}
/>

WhatsApp Number
<input
name="whatsapp"
placeholder="WhatsApp Number"
value={student.whatsapp}
onChange={handleChange}
/>

Alternate Contact Number
<input
name="alternateContact"
placeholder="Alternate Contact Number"
value={student.alternateContact}
onChange={handleChange}
/>

            </div>
            <h4 className="section-title">Health Details</h4>
            <div className="grid">
             
  Any Major Illness?
  <select
    name="majorIllness"
    value={student.majorIllness}
    onChange={handleChange}
  >
    <option value="">Any Major Illness?</option>
    <option>Yes</option>
    <option>No</option>
  </select>

  {student.majorIllness === "Yes" && (
   
    <input
      name="medicalNotes"
      placeholder="Emergency Medical Condition"
      value={student.medicalNotes}
      onChange={handleChange}
    />
   
  )}

  Allergic to any medicine?
  <select
    name="allergy"
    value={student.allergy}
    onChange={handleChange}
  >
    <option value="">Allergic to any medicine?</option>
    <option>Yes</option>
    <option>No</option>
  </select>

  {student.allergy === "Yes" && (
    
    <input
      name="allergyDetails"
      placeholder="If yes, specify medicine"
      onChange={handleChange}
    />
  )}

  
  Medical / Health Documents
  <div style={{ display: "flex", flexDirection: "column" }}>
  <input 
    type="file" 
    name="medicalDoc" 
    accept=".pdf,.png,.jpg,.jpeg" 
    onChange={(e) => handleFileChange(e, "medicalDoc")} 
    style={{ padding: "4px" }} 
  />
  {student.medicalDoc && (
    <a 
      href={URL.createObjectURL(student.medicalDoc)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.medicalDoc.name}
    </a>
  )}
</div>
{/* Disability */}
  Disability?
  <select
    name="disability"
    value={student.disability}
    onChange={handleChange}
  >
    <option value="">Select Disability</option>
    <option>No</option>
    <option>Yes</option>
  </select>

  {student.disability === "Yes" && (
    <div>
      Disability Certificate
      <input
        type="file"
        name="disabilityCertificate"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => handleFileChange(e, "disabilityCertificate")}
        style={{ padding: "4px" }}
      />
      {student.disabilityCertificate && (
        <a
          href={URL.createObjectURL(student.disabilityCertificate)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "13px",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
            marginTop: "3px",
          }}
        >
          Uploaded: {student.disabilityCertificate.name}
        </a>
      )}
    </div>
  )}

            </div>
            <h4 className="section-title">Language & Education</h4>
            <div className="grid">
             Mother Tongue
<select
  name="motherTongue"
  value={student.motherTongue}
  onChange={handleChange}
>
  <option value="">Select Mother Tongue</option>
  <option>Tamil</option>
  <option>English</option>
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
</select>
             Other Languages Known
<select
  multiple
  name="otherLanguage"
  value={student.otherLanguage}
  onChange={(e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setStudent({ ...student, otherLanguage: values });
  }}
>

  <option>Tamil</option>
  <option>English</option>
  <option>Hindi</option>
  <option>Malayalam</option>
  <option>Telugu</option>
  <option>Kannada</option>
  <option>Urdu</option>
  <option>Bengali</option>

</select>

            </div>
           <h4 className="section-title guardian-title">Guardian Details</h4>
{guardians.map((guardian, index) => (
  <div className="guardian-box" key={index}>
    <div className="guardian-row">
      <div>
        Name of Guardian
        <input 
  name="name"
  placeholder="Name of Guardian" 
  value={guardian.name}
  onChange={e => handleGuardianChange(index, "name", e.target.value)}
/>
      </div>
      <div>
        Contact Number
       <input 
  name="contact"
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
  name="email"
  placeholder="Email Address" 
  value={guardian.email}
  onChange={e => handleGuardianChange(index, "email", e.target.value)}
/>
      </div>
    </div>

    
      
     <div className="guardian-row-full" style={{ display: "flex", flexDirection: "column" }}>
  Upload Guardian Photo <input 
    type="file" 
    accept=".png,.jpg,.jpeg" 
    onChange={(e) => handleGuardianChange(index, "photo", e.target.files[0])} 
    style={{ padding: "4px" }} 
  />
  {guardian.photo && (
    <a 
      href={URL.createObjectURL(guardian.photo)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {guardian.photo.name}
    </a>
  )}
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
        <div style={{ display: "flex", flexDirection: "column" }}>
  <input 
    type="file" 
    accept=".pdf" 
    onChange={(e) => handleGuardianChange(index, "aadhaarCard", e.target.files[0])} 
    style={{ padding: "4px" }} 
  />
  {guardian.aadhaarCard && (
    <a 
      href={URL.createObjectURL(guardian.aadhaarCard)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {guardian.aadhaarCard.name}
    </a>
  )}
</div>

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
              <button className="btn next" onClick={handleSubmitStep1}>
Next
</button>
            </div>
          </>
        )}
        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3>Academic Details</h3>
            <h4 className="section-title">10th Academic Details</h4>
            <div className="grid">
              10th Register Number <input
        name="tenthRegister"
        placeholder="10th Register Number"
        value={student.tenthRegister}
        onChange={handleChange}
      />

               Board of Examination 
               <select
        name="tenthBoard"
        value={student.tenthBoard}
        onChange={handleChange}
      >
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

              School Comes Under <select
        name="tenthSchoolType"
        value={student.tenthSchoolType}
        onChange={handleChange}
      >
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
              10th School Name <input
        name="tenthSchool"
        placeholder="School Studied In (10th)"
        value={student.tenthSchool}
        onChange={handleChange}
      />
      Medium of Study
<select  name="tenthMedium"
  value={student.tenthMedium}
  onChange={handleChange}>
  <option value="">Select Medium</option>
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
              Year of Passing (10th)
<input
        type="number"
        name="tenthYear"
        placeholder="Year of Passing (10th)"
        value={student.tenthYear}
        onChange={handleChange}
      />

              Marks Obtained in 10th <input
        name="tenthMarks"
        placeholder="Marks Obtained in 10th"
        value={student.tenthMarks}
        onChange={handleChange}
      />
              Total Percentage in 10th <input
        name="tenthPercentage"
        placeholder="Total Percentage in 10th"
        value={student.tenthPercentage}
        onChange={handleChange}
      />
              
                10th Mark Sheet<div style={{ display: "flex", flexDirection: "column" }}>
  <label>10th Mark Sheet</label>
  <input 
    type="file" 
    name="tenthMarkSheet" 
    accept=".pdf" 
    onChange={(e) => handleFileChange(e, "tenthMarkSheet")} 
    style={{ padding: "4px" }} 
  />
  {student.tenthMarkSheet && (
    <a 
      href={URL.createObjectURL(student.tenthMarkSheet)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.tenthMarkSheet.name}
    </a>
  )}
</div>

              
              
                10th Transfer Certificate<div style={{ display: "flex", flexDirection: "column" }}>
  <label>10th Transfer Certificate</label>
  <input 
    type="file" 
    name="tenthTransferCertificate" 
    accept=".pdf" 
    onChange={(e) => handleFileChange(e,"tenthTransferCertificate")} 
    style={{ padding: "4px" }} 
  />
  {student.tenthTransferCertificate && (
    <a 
      href={URL.createObjectURL(student.tenthTransferCertificate)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.tenthTransferCertificate.name}
    </a>
  )}
</div>

              
            </div>
            
            <h4 className="section-title">Counselling Details</h4>
<div className="grid">

  Cutoff
  <input
    name="counsellingCutoff"
    placeholder="Counselling Cutoff"
    value={student.cutoff}
    onChange={handleChange}
  />

  Counselling Rank
  <input
    name="counsellingRank"
    placeholder="Counselling Rank"
    value={student.counsellingRank}
    onChange={handleChange}
  />

</div>

            
           <h4 className="section-title">Qualification Type</h4>

<div className="grid">
  Qualification
  <select
        name="qualification"
        value={student.qualification}
        onChange={handleChange}
      >
        <option value="">Select Qualification</option>
        <option value="12th">12th</option>
        <option value="Diploma">Diploma</option>
        <option value="Both">Both</option>
      </select>
</div>

 {(student.qualification === "12th" || student.qualification === "Both") && (
              <>
               <h4 className="section-title">12th Academic Details</h4>
            <div className="grid">
              12th Register Number <input
            name="twelfthRegister"
            placeholder="12th Register Number"
            value={student.twelfthRegister}
            onChange={handleChange}
          />
               Board of Examination 
               <select
            name="twelfthBoard"
            value={student.twelfthBoard}
            onChange={handleChange}
          >
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
            <option>Other</option>
          </select>
              School Studied In <input
            name="twelfthSchool"
            placeholder="School Studied In"
            value={student.twelfthSchool}
            onChange={handleChange}
          />
              Medium of Study  <select
            name="twelfthMedium"
            value={student.twelfthMedium}
            onChange={handleChange}
          >
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
              School Comes Under <select
  name="twelfthSchoolType"
  value={student.twelfthSchoolType}
  onChange={handleChange}
>
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
<input
            type="number"
            name="twelfthYear"
            placeholder="Year of Passing (12th)"
            value={student.twelfthYear}
            onChange={handleChange}
          />
              Marks Obtained in 12th<input
            name="twelfthMarks"
            placeholder="Marks Obtained in 12th"
            value={student.twelfthMarks}
            onChange={handleChange}
          />
              Total Percentage in 12th<input
            name="twelfthPercentage"
            placeholder="Total Percentage in 12th"
            value={student.twelfthPercentage}
            onChange={handleChange}
          />
              
                <div style={{ display: "flex", flexDirection: "column" }}>
  <label>12th Mark Sheet</label>
  <input 
    type="file" 
    name="twelfthMarkSheet" 
    accept=".pdf" 
    onChange={(e) => handleFileChange(e, "twelfthMarkSheet")} 
    style={{ padding: "4px" }} 
  />
  {student.twelfthMarkSheet && (
    <a 
      href={URL.createObjectURL(student.twelfthMarkSheet)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.twelfthMarkSheet.name}
    </a>
  )}
</div>
              
              
               <div style={{ display: "flex", flexDirection: "column" }}>
  <label>12th Transfer Certificate</label>
  <input 
    type="file" 
    name="twelfthTransferCertificate" 
    accept=".pdf" 
    onChange={(e) => handleFileChange(e, "twelfthTransferCertificate")} 
    style={{ padding: "4px" }} 
  />
  {student.twelfthTransferCertificate && (
    <a 
      href={URL.createObjectURL(student.twelfthTransferCertificate)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.twelfthTransferCertificate.name}
    </a>
  )}
</div>
              
                Conduct Certificate<div style={{ display: "flex", flexDirection: "column" }}>
  <label>Conduct Certificate</label>
  <input 
    type="file" 
    name="twelfthConductCertificate"
    accept=".pdf" 
onChange={(e) => handleFileChange(e, "twelfthConductCertificate")}
    
    
    style={{ padding: "4px" }} 
  />
  {student.twelfthConductCertificate && (
    <a 
      href={URL.createObjectURL(student.twelfthConductCertificate)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.twelfthConductCertificate.name}
    </a>
  )}
</div>

              
            </div>
              </>
            )}

           {(student.qualification === "Diploma" || student.qualification === "Both") && (

              <>
                <h4 className="section-title">Diploma Details</h4>
                <div className="grid">
                   College Name<input
            name="diplomaCollege"
            placeholder="Diploma College Name"
            value={student.diplomaCollege}
            onChange={handleChange}
          />
                 Branch  <input
            name="diplomaBranch"
            placeholder="Branch"
            value={student.diplomaBranch}
            onChange={handleChange}
          />
                  Year of Passing <input
           name="diplomaYearOfPassing"
            placeholder="Year of Passing"
           value={student.diplomaYearOfPassing}
            onChange={handleChange}
          />
                  Percentage / CGPA  <input
            name="diplomaPercentage"
            placeholder="Percentage / CGPA"
            value={student.diplomaPercentage}
            onChange={handleChange}
          />
                  <div style={{ display: "flex", flexDirection: "column" }}>
  Diploma Mark Sheet
  <input 
    type="file" 
    name="diplomaMarkSheet" 
    accept=".pdf" 
    onChange={(e) => handleFileChange(e, "diplomaMarkSheet")} 
    style={{ padding: "4px" }} 
  />
  {student.diplomaMarkSheet && (
    <a 
      href={URL.createObjectURL(student.diplomaMarkSheet)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.diplomaMarkSheet.name}
    </a>
  )}
</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
  Diploma Transfer Certificate
  <input 
    type="file" 
    name="diplomaTransferCertificate"
    accept=".pdf"
onChange={(e) => handleFileChange(e, "diplomaTransferCertificate")}
    style={{ padding: "4px" }} 
  />
  {student.diplomaTransferCertificate && (
    <a 
      href={URL.createObjectURL(student.diplomaTransferCertificate)} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ 
        fontSize: "13px", 
        color: "#007bff", 
        textDecoration: "underline", 
        cursor: "pointer", 
        marginTop: "3px" 
      }}
    >
      Uploaded: {student.diplomaTransferCertificate.name}
    </a>
  )}
</div>
                </div>
              </>
            )}
            <h4 className="section-title">College Details (Joining)</h4>
            <div className="grid">
              College Name  <input
        name="collegeName"
        placeholder="College Name"
        value={student.collegeName}
        onChange={handleChange}
      />
              Programme Level  <select
        name="programmeLevel"
        value={student.programmeLevel}
        onChange={handleChange}
      >
                <option value="">Programme Level</option>
                <option>UG</option>
                <option>PG</option>
              </select>
              Degree <select
        name="degree"
        value={student.degree}
        onChange={handleChange}
      >
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
            Department<select
        name="department"
        value={student.department}
        onChange={handleChange}
      >
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
            </select>

           Year of Study

<select
  name="yearOfStudy"
  value={student.yearOfStudy}
  onChange={(e) => {

    const year = e.target.value;

    const hostelCategory =
      year === "1" || year === "2"
        ? "junior"
        : year === "3" || year === "4"
        ? "senior"
        : "";

    setStudent(prev => ({
      ...prev,
      yearOfStudy: year,
      year: hostelCategory
    }));

  }}
>
  <option value="">Select Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>

            Year of Passing 
           <select
  name="collegeYearOfPassing"
  value={student.collegeYearOfPassing}
  onChange={handleChange}
>
  <option value="">Year of Passing</option>
  <option value="2021 - 2025">2021 - 2025</option>
  <option value="2022 - 2026">2022 - 2026</option>
  <option value="2023 - 2027">2023 - 2027</option>
  <option value="2024 - 2028">2024 - 2028</option>
  <option value="2025 - 2029">2025 - 2029</option>
  <option value="2026 - 2030">2026 - 2030</option>
</select>
          Regulation 
           <select
  name="collegeRegulation"
  value={student.collegeRegulation}
  onChange={handleChange}
>
  <option value="">Regulation</option>
  <option>2017 Regulation</option>
  <option>2021 Regulation</option>
  <option>2025 Regulation</option>
</select>
            Admission Year 
            <select
  name="collegeAdmissionYear"
  value={student.collegeAdmissionYear}
  onChange={handleChange}
>
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
            Father's Name<input name="fatherName" placeholder="Father's Name" value={student.fatherName || ""} onChange={handleChange} />
            Father's Occupation<input name="fatherOccupation" placeholder="Father's Occupation" value={student.fatherOccupation || ""} onChange={handleChange} />
            Father's Mobile Number<input name="fatherMobile" placeholder="Father's Mobile Number" value={student.fatherMobile || ""} onChange={handleChange} />
            Father's Email ID<input name="fatherEmail" placeholder="Father's Email ID" value={student.fatherEmail || ""} onChange={handleChange} />
            Mother's Name<input name="motherName" placeholder="Mother's Name" value={student.motherName || ""} onChange={handleChange} />
            Mother's Occupation<input name="motherOccupation" placeholder="Mother's Occupation" value={student.motherOccupation || ""} onChange={handleChange} />
            Mother's Mobile Number<input name="motherMobile" placeholder="Mother's Mobile Number" value={student.motherMobile || ""} onChange={handleChange} />
            Mother's Email ID<input name="motherEmail" placeholder="Mother's Email ID" value={student.motherEmail || ""} onChange={handleChange} />
            Family Income<input name="familyIncome" placeholder="Family Income" value={student.familyIncome || ""} onChange={handleChange} />
              Income Certificate
              <input
  type="file"
  name="incomeCertificate"
  accept=".pdf"
  onChange={(e) => handleFileChange(e, "incomeCertificate")}
  style={{ padding: "4px" }}
/>

{student.incomeCertificate && (
  <a
    href={URL.createObjectURL(student.incomeCertificate)}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: "13px",
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "3px",
      display: "block"
    }}
  >
    Uploaded: {student.incomeCertificate.name}
  </a>
)}
            
            
              Community Certificate
             <input
  type="file"
  name="communityCertificate"
  accept=".pdf"
  onChange={(e) => handleFileChange(e, "communityCertificate")}
  style={{ padding: "4px" }}
/>

{student.communityCertificate && (
  <a
    href={URL.createObjectURL(student.communityCertificate)}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: "13px",
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "3px",
      display: "block"
    }}
  >
    Uploaded: {student.communityCertificate.name}
  </a>
)}
           
        
           <div>
 First Graduate
  <select
  name="firstGraduate"
  value={student.firstGraduate}
  onChange={handleChange}
>
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

{student.firstGraduate === "Yes" && (
  <div className="doc-item">
    <label>First Graduation Certificate</label>
    <input
      type="file"
      name="firstGraduateCertificate"
      accept=".pdf"
      onChange={(e) => handleFileChange(e, "firstGraduateCertificate")}
      style={{ padding: "4px" }}
    />

    {student.firstGraduateCertificate && (
      <a
        href={URL.createObjectURL(student.firstGraduateCertificate)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "13px",
          color: "#007bff",
          textDecoration: "underline",
          cursor: "pointer",
          display: "block",
          marginTop: "3px"
        }}
      >
        Uploaded: {student.firstGraduateCertificate.name}
      </a>
    )}
  </div>
)}
        
           
              
             Nativity Certificate
<input
  type="file"
  name="nativityCertificate"
  accept=".pdf"
  onChange={(e) => handleFileChange(e, "nativityCertificate")}
  style={{ padding: "4px" }}
/>

{student.nativityCertificate && (
  <a
    href={URL.createObjectURL(student.nativityCertificate)}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: "13px",
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "3px",
      display: "block"
    }}
  >
    Uploaded: {student.nativityCertificate.name}
  </a>
)}
           
          </div>
          <h3>Address Details</h3>
          <div className="grid">
            AddressLine1<input name="addressLine1" placeholder="Address Line 1" value={student.addressLine1 || ""} onChange={handleChange} />
            AddressLine2<input name="addressLine2" placeholder="Address Line 2" value={student.addressLine2 || ""} onChange={handleChange} />
           Post<input name="post" placeholder="Post" value={student.post || ""} onChange={handleChange} />
           District<input name="district" placeholder="District" value={student.district || ""} onChange={handleChange} />
           State<input name="state" placeholder="State" value={student.state || ""} onChange={handleChange} />
           Pincode<input name="pincode" placeholder="Pin Code" value={student.pincode || ""} onChange={handleChange} />
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

    {!student.gender || !student.year ? (
      <p style={{ color: "red" }}>
        Please complete Basic & Academic details (Gender + Year of Study)
      </p>
    ) : (
      <>
        <div className="grid">
          Hostel Name
          <input
            value={
              student.gender && student.year
                ? hostelData[student.gender][student.year].name
                : ""
            }
            readOnly
          />

          Preferred Hostel Block
          <select
            value={block}
            onChange={(e) => {
  setBlock(e.target.value);
  setSelectedBed("");

  setStudent((prev) => ({
    ...prev,
    hostel: {
      ...prev.hostel,
      block: e.target.value,
      floor: "",
      room: "",
      bedNumber: ""
    }
  }));
}}
          >
            <option value="">Select Block</option>
            <option value="A">Block A</option>
            <option value="B">Block B</option>
          </select>

          Food Preference
          <select
            value={student.hostel.foodPreference}
            onChange={(e) =>
              setStudent((prev) => ({
                ...prev,
                hostel: {
                  ...prev.hostel,
                  foodPreference: e.target.value,
                },
              }))
            }
          >
            <option value="">Food Preference</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Mixed">Mixed</option>
          </select>

          Upload Fee Receipt
          <input
            type="file"
            name="feeReceipt"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              setStudent((prev) => ({
                ...prev,
                hostel: {
                  ...prev.hostel,
                  feeReceipt: file,
                },
              }));
            }}
            style={{ padding: "4px" }}
          />

          {student.hostel.feeReceipt && (
            <a
              href={URL.createObjectURL(student.hostel.feeReceipt)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                color: "#007bff",
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "3px",
                display: "block",
              }}
            >
              Uploaded: {student.hostel.feeReceipt.name}
            </a>
          )}
        </div>

       {block && (
  <>
    <h4 style={{ marginTop: "20px" }}>Choose Room & Bed</h4>

    {Object.entries(hostelData[student.gender][student.year].blocks[block]).map(
      ([floor, rooms]) => (
        <div key={floor} className="floor-block">
          <h5>{floor}</h5>
          <div className="room-grid">
            {Object.entries(rooms).map(([room, beds]) => (
              <div key={room} className="room-card">
                <div className="room-title">Room {room}</div>
                <div className="bed-row">
                  {beds.map((status, i) => {
  const bedNumber = `Bed ${i + 1}`;
  const bedLabel = `${floor} - Room ${room} - ${bedNumber}`;

  const isSelected =
    student.hostel.floor === floor &&
    student.hostel.room === room &&
    student.hostel.bedNumber === bedNumber;

  return (
    <button
      key={i}
      className={`bed ${status} ${isSelected ? "selected" : ""}`}
      disabled={status === "occupied"}
      onClick={() => {
        setSelectedBed(bedLabel);

        setStudent((prev) => ({
          ...prev,
          hostel: {
            ...prev.hostel,
            floor,
            room,
            bedNumber: bedNumber,
            block,
            hostelName: prev.hostel.hostelName || hostelData[student.gender][student.year].name
          }
        }));
      }}
    >
      {i + 1}
    </button>
  );
})}
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
      <button className="btn prev" onClick={prev}>
        Previous
      </button>
      <button className="btn next" onClick={next}>
        Next
      </button>
    </div>
  </>
)}

        {/* STEP 5 */}
        {step === 5 && (
  <>
    <h3>Disclaimer</h3>

    <div className="disclaimer-box">
      <label className="disclaimer-row">
        <input
          type="checkbox"
          checked={student.confirmDetails}
          onChange={(e) =>
  setStudent(prev => ({
    ...prev,
    confirmDetails: e.target.checked
  }))
}
        />
        <span>I confirm all details are correct</span>
      </label>

      <label className="disclaimer-row">
        <input
          type="checkbox"
          checked={student.agreeRules}
          onChange={(e) =>
            setStudent(prev => ({
              ...prev,
              agreeRules: e.target.checked
            }))
          }
        />
        <span>I agree to hostel rules</span>
      </label>
    </div>

    <div className="btn-row">
      <button className="btn prev" onClick={prev}>Previous</button>
     <button
  className="btn next"
  onClick={() => {
    if (!student.confirmDetails || !student.agreeRules) {
  alert("Please accept the disclaimer");
  return;
}
    next();
  }}
>
  Next
</button>
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
              <button
  className="btn register"
onClick={async () => {

  if (captchaInput !== captcha) {
    setError("Invalid Captcha");
    generateCaptcha();
    setCaptchaInput("");
    return;
  }

  try {

    const formData = new FormData();

    const finalStudent = {
      ...student,
      
      status: "pending"
    };

  for (const key in finalStudent) {

  const value = finalStudent[key];

  if (value === null || value === undefined) continue;

  if (key === "hostel") {

  const { feeReceipt, ...hostelData } = value;

  // send hostel object as JSON
  formData.append("hostel", JSON.stringify(hostelData));

  if (feeReceipt) {
    formData.append("feeReceipt", feeReceipt);
  }

}

  else if (value instanceof File) {
    formData.append(key, value);
  }
  else if (Array.isArray(value)) {
    formData.append(key, JSON.stringify(value));
  }

  else if (typeof value === "boolean") {
  formData.append(key, value ? "true" : "false");
}

else {
  formData.append(key, value);
}

}
    formData.append("guardians", JSON.stringify(guardians));

    guardians.forEach((guardian, index) => {

      if (guardian.photo)
        formData.append(`guardianPhoto_${index}`, guardian.photo);

      if (guardian.aadhaarCard)
        formData.append(`guardianAadhaar_${index}`, guardian.aadhaarCard);

    });

    const response = await fetch(
      "http://localhost:5000/api/student/register",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    alert("Student Registered Successfully 🎉");

  } catch (err) {

    console.log("REGISTER ERROR:", err);
    alert(err.message);

  }

}}
>
  Register
</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default StudentRegister;