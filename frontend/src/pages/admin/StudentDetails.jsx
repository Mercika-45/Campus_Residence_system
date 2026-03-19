import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";
import ExecutiveSidebar from "../../components/ExecutiveSidebar";
import ExecutiveTopbar from "../../components/ExecutiveTopbar";
import "../../styles/Admin.css";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
const location = useLocation();
const isExecutive = location.pathname.includes("/executive");
const params = new URLSearchParams(location.search);
const tab = params.get("tab");
const handleHostelChange = (field, value) => {
  setUpdatedStudent((prev) => ({
    ...prev,
    hostel: {
      ...prev.hostel,
      [field]: value,
    },
  }));
};
const handleTwelfthChange = (field, value) => {
  setUpdatedStudent((prev) => ({
    ...prev,
    twelfth: {
      ...prev.twelfth,
      [field]: value
    }
  }));
};


const handleAccept = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/student/accept/${id}`, {
      method: "PUT",
    });

    fetchNewStudents();     // refresh new students
    fetchApprovedStudents(); // refresh existing students
  } catch (error) {
    console.error("Error approving student", error);
  }
};
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false); // <- edit mode state
  const [updatedStudent, setUpdatedStudent] = useState({}); // <- temporary edits
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/student/${id}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();
        setStudent(data);
        setUpdatedStudent(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load student details");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <h2>Loading student details...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!student) return <h2>No student data found</h2>;
  const handleTenthChange = (field, value) => {
  setUpdatedStudent((prev) => ({
    ...prev,
    tenth: {
      ...prev.tenth,
      [field]: value,
    },
  }));
};
const handleCollegeChange = (field, value) => {
  setUpdatedStudent((prev) => ({
    ...prev,
    college: {
      ...prev.college,
      [field]: value
    }
  }));
};

   const handleChange = (e) => {
  const { name, value } = e.target;

  setUpdatedStudent((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleGuardianChange = (index, field, value) => {
  const updatedGuardians = [...updatedStudent.guardians];
  updatedGuardians[index][field] = value;

  setUpdatedStudent({
    ...updatedStudent,
    guardians: updatedGuardians,
  });
};
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setUpdatedStudent((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const saveChanges = async () => {
  try {
    const formData = new FormData();

    Object.entries(updatedStudent).forEach(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        formData.append(key, JSON.stringify(value)); // convert object to JSON
      } else {
        formData.append(key, value);
      }
    });

    const res = await fetch(`http://localhost:5000/api/student/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Student updated successfully");
      setStudent(data);
      setUpdatedStudent(data);
      setEditMode(false);
    } else {
      console.error(data);
      alert(data.message || "Failed to update student");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
 const renderDocumentLink = (label, file, fieldName) =>
  editMode ? (
    <>
      <label>{label}:</label>
      <input type="file" name={fieldName} onChange={handleFileChange} />
    </>
  ) : file ? (
    <p>
      <b>{label}:</b>{" "}
      <a href={`http://localhost:5000/uploads/${file}`} target="_blank" rel="noopener noreferrer">
        View Document
      </a>
    </p>
  ) : null;
  
  return (
    <div className="dashboard-container">
      {isExecutive ? <ExecutiveSidebar /> : <AdminSidebar />}

<div className="main-content">
  {isExecutive ? (
    <ExecutiveTopbar title="Student Details" />
  ) : (
    <AdminTopbar title="Student Details" />
  )}

       <div className="dashboard-content student-details-page">

  <div className="top-actions">
    
    <button className="student-back-btn" onClick={() => navigate(-1)}>
      ← Back
    </button>

    <div className="top-buttons">
      <button
        className="edit-btn"
        onClick={() => {
          if (editMode) setUpdatedStudent(student);
          setEditMode((prev) => !prev);
        }}
      >
        {editMode ? "Cancel Edit" : "Edit"}
      </button>

      {editMode && (
        <button className="save-btn" onClick={saveChanges}>
          Save Changes
        </button>
      )}
    </div>

  </div>

          <div className="student-details-card">
            <h2 className="student-details-title">
              Student Application Datasheet
            </h2>
            <hr />

            {/* PERSONAL DETAILS */}
            <h3 className="student-section-title">Personal Details</h3>
           <div className="student-photo">
  {student.photo && !editMode && (
    <img
      src={`http://localhost:5000/uploads/${student.photo}`}
      alt="student"
    />
  )}

  {editMode && (
    <>
      {student.photo && (
        <img
          src={`http://localhost:5000/uploads/${student.photo}`}
          alt="student"
          style={{ display: "block", marginBottom: "10px" }}
        />
      )}

      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  )}
</div>

            <div className="student-info">
              <p>
  <b>Name:</b>{" "}
  {editMode ? (
    <input type="text" name="studentName" value={updatedStudent.studentName || ""} onChange={handleChange} />
  ) : (
    student.studentName || "-"
  )}
</p>
             <p>
  <b>Register Number:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="registerNumber"
      value={updatedStudent.registerNumber || ""}
      onChange={handleChange}
    />
  ) : (
    student.registerNumber || "-"
  )}
</p>

<p>
  <b>DOB:</b>{" "}
  {editMode ? (
    <input
      type="date"
      name="dob"
      value={updatedStudent.dob || ""}
      onChange={handleChange}
    />
  ) : (
    student.dob || "-"
  )}
</p>

<p>
  <b>Age:</b>{" "}
  {editMode ? (
    <input
      type="number"
      name="age"
      value={updatedStudent.age || ""}
      onChange={handleChange}
    />
  ) : (
    student.age || "-"
  )}
</p>

<p>
  <b>Gender:</b>{" "}
  {editMode ? (
    <select
      name="gender"
      value={updatedStudent.gender || ""}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  ) : (
    student.gender || "-"
  )}
</p>

<p>
  <b>Blood Group:</b>{" "}
  {editMode ? (
    <select
      name="bloodGroup"
      value={updatedStudent.bloodGroup || ""}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option>A+</option>
      <option>A-</option>
      <option>B+</option>
      <option>B-</option>
      <option>O+</option>
      <option>O-</option>
      <option>AB+</option>
      <option>AB-</option>
    </select>
  ) : (
    student.bloodGroup || "-"
  )}
</p>

<p>
  <b>Nationality:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="nationality"
      value={updatedStudent.nationality || ""}
      onChange={handleChange}
    />
  ) : (
    student.nationality || "-"
  )}
</p>

<p>
  <b>Religion:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="religion"
      value={updatedStudent.religion || ""}
      onChange={handleChange}
    />
  ) : (
    student.religion || "-"
  )}
</p>

<p>
  <b>Community:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="community"
      value={updatedStudent.community || ""}
      onChange={handleChange}
    />
  ) : (
    student.community || "-"
  )}
</p>

<p>
  <b>Caste:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="caste"
      value={updatedStudent.caste || ""}
      onChange={handleChange}
    />
  ) : (
    student.caste || "-"
  )}
</p>

<p>
  <b>Aadhaar Number:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="aadhaarNumber"
      value={updatedStudent.aadhaarNumber || ""}
      onChange={handleChange}
    />
  ) : (
    student.aadhaarNumber || "-"
  )}
</p>

{renderDocumentLink("Aadhaar Card", student.aadhaarCard, "aadhaarCard")}
            </div>

            <hr />

            {/* CONTACT DETAILS */}
            <h3 className="student-section-title">Contact Details</h3>
            <div className="student-info">
              <p>
  <b>Email:</b>{" "}
  {editMode ? (
    <input
      type="email"
      name="email"
      value={updatedStudent.email || ""}
      onChange={handleChange}
    />
  ) : (
    student.email || "-"
  )}
</p>

<p>
  <b>Password:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="password"
      value={updatedStudent.password || ""}
      onChange={handleChange}
    />
  ) : (
    student.password || "-"
  )}
</p>

<p>
  <b>Confirm Password:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="confirmPassword"
      value={updatedStudent.confirmPassword || ""}
      onChange={handleChange}
    />
  ) : (
    student.confirmPassword || "-"
  )}
</p>

<p>
  <b>Mobile:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="mobile"
      value={updatedStudent.mobile || ""}
      onChange={handleChange}
    />
  ) : (
    student.mobile || "-"
  )}
</p>

<p>
  <b>WhatsApp:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="whatsapp"
      value={updatedStudent.whatsapp || ""}
      onChange={handleChange}
    />
  ) : (
    student.whatsapp || "-"
  )}
</p>

<p>
  <b>Alternate Contact:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="alternateContact"
      value={updatedStudent.alternateContact || ""}
      onChange={handleChange}
    />
  ) : (
    student.alternateContact || "-"
  )}
</p>
            </div>

            <hr />

            {/* HEALTH DETAILS */}
            <h3 className="student-section-title">Health Details</h3>
            <div className="student-info">
             <p>
  <b>Major Illness:</b>{" "}
  {editMode ? (
    <select
      name="majorIllness"
      value={updatedStudent.majorIllness || "No"}
      onChange={handleChange}
    >
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>
  ) : (
    student.majorIllness || "No"
  )}
</p>

{(editMode
  ? updatedStudent.majorIllness
  : student.majorIllness) === "Yes" && (
  <p>
    <b>Medical Notes:</b>{" "}
    {editMode ? (
      <input
        type="text"
        name="medicalNotes"
        value={updatedStudent.medicalNotes || ""}
        onChange={handleChange}
      />
    ) : (
      student.medicalNotes || "-"
    )}
  </p>
)}

<p>
  <b>Allergy:</b>{" "}
  {editMode ? (
    <select
      name="allergy"
      value={updatedStudent.allergy || "No"}
      onChange={handleChange}
    >
      <option value="No">No</option>
      <option value="Yes">Yes</option>
    </select>
  ) : (
    student.allergy || "No"
  )}
</p>

{(editMode ? updatedStudent.allergy : student.allergy) === "Yes" && (
  <p>
    <b>Allergy Details:</b>{" "}
    {editMode ? (
      <input
        type="text"
        name="allergyDetails"
        value={updatedStudent.allergyDetails || ""}
        onChange={handleChange}
      />
    ) : (
      student.allergyDetails || "-"
    )}
  </p>
)}

{renderDocumentLink("Medical Document", student.medicalDoc, "medicalDoc")}

<div className="student-info">
  <p>
    <b>Disability:</b>{" "}
    {editMode ? (
      <select
        name="disability"
        value={updatedStudent.disability || "No"}
        onChange={handleChange}
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    ) : (
      student.disability || "No"
    )}
  </p>

  {(editMode ? updatedStudent.disability : student.disability) === "Yes" &&
    renderDocumentLink(
      "Disability Certificate",
      student.disabilityCertificate,
      "disabilityCertificate"
    )}
</div>
            </div>

            <hr />

            {/* LANGUAGE */}
            <h3 className="student-section-title">Language Details</h3>
            <div className="student-info">
             <p>
  <b>Mother Tongue:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="motherTongue"
      value={updatedStudent.motherTongue || ""}
      onChange={handleChange}
    />
  ) : (
    student.motherTongue || "-"
  )}
</p>

<p>
  <b>Other Languages:</b>{" "}
  {editMode ? (
    <input
      type="text"
      name="otherLanguage"
      value={updatedStudent.otherLanguage?.join(", ") || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          otherLanguage: e.target.value.split(",").map((lang) => lang.trim()),
        }))
      }
      placeholder="Tamil, English, Hindi"
    />
  ) : (
    student.otherLanguage?.join(", ") || "-"
  )}
</p>
            </div>

            <hr />

            {/* GUARDIANS */}
            <h3 className="student-section-title">Guardian Details</h3>
            {student.guardians?.length ? (
  student.guardians.map((g, index) => (
    <div key={index} className="guardian-box">

      <p>
        <b>Name:</b>{" "}
        {editMode ? (
          <input
            type="text"
            value={updatedStudent.guardians[index]?.name || ""}
            onChange={(e) => handleGuardianChange(index, "name", e.target.value)}
          />
        ) : (
          g.name || "-"
        )}
      </p>

      <p>
        <b>Relationship:</b>{" "}
        {editMode ? (
          <input
            type="text"
            value={updatedStudent.guardians[index]?.relationship || ""}
            onChange={(e) =>
              handleGuardianChange(index, "relationship", e.target.value)
            }
          />
        ) : (
          g.relationship || "-"
        )}
      </p>

      <p>
        <b>Contact:</b>{" "}
        {editMode ? (
          <input
            type="text"
            value={updatedStudent.guardians[index]?.contact || ""}
            onChange={(e) =>
              handleGuardianChange(index, "contact", e.target.value)
            }
          />
        ) : (
          g.contact || "-"
        )}
      </p>

      <p>
        <b>Email:</b>{" "}
        {editMode ? (
          <input
            type="email"
            value={updatedStudent.guardians[index]?.email || ""}
            onChange={(e) =>
              handleGuardianChange(index, "email", e.target.value)
            }
          />
        ) : (
          g.email || "-"
        )}
      </p>

      <p>
        <b>Aadhaar:</b>{" "}
        {editMode ? (
          <input
            type="text"
            value={updatedStudent.guardians[index]?.aadhaarNumber || ""}
            onChange={(e) =>
              handleGuardianChange(index, "aadhaarNumber", e.target.value)
            }
          />
        ) : (
          g.aadhaarNumber || "-"
        )}
      </p>

      {g.photo && (
        <div className="student-photo">
          <img
            src={`http://localhost:5000/uploads/${g.photo}`}
            alt="guardian"
          />
        </div>
      )}

      {renderDocumentLink("Aadhaar Card", g.aadhaarCard)}
    </div>
  ))
) : (
  <p>No guardian data available</p>
)}

            <hr />

            {/* 10TH DETAILS */}
           <h3 className="student-section-title">10th Details</h3>
<div className="student-info">
  <p>
  <b>Register Number:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.registerNumber || ""}
      onChange={(e) => handleTenthChange("registerNumber", e.target.value)}
    />
  ) : (
    student.tenth?.registerNumber || "-"
  )}
</p>

<p>
  <b>Board:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.board || ""}
      onChange={(e) => handleTenthChange("board", e.target.value)}
    />
  ) : (
    student.tenth?.board || "-"
  )}
</p>

<p>
  <b>School Comes Under:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.schoolType || ""}
      onChange={(e) => handleTenthChange("schoolType", e.target.value)}
    />
  ) : (
    student.tenth?.schoolType || "-"
  )}
</p>

<p>
  <b>School:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.school || ""}
      onChange={(e) => handleTenthChange("school", e.target.value)}
    />
  ) : (
    student.tenth?.school || "-"
  )}
</p>

<p>
  <b>Medium:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.medium || ""}
      onChange={(e) => handleTenthChange("medium", e.target.value)}
    />
  ) : (
    student.tenth?.medium || "-"
  )}
</p>

<p>
  <b>Year of Passing:</b>{" "}
  {editMode ? (
    <input
      type="number"
      value={updatedStudent.tenth?.yearOfPassing || ""}
      onChange={(e) => handleTenthChange("yearOfPassing", e.target.value)}
    />
  ) : (
    student.tenth?.yearOfPassing || "-"
  )}
</p>

<p>
  <b>Marks Obtained:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.marksObtained || ""}
      onChange={(e) => handleTenthChange("marksObtained", e.target.value)}
    />
  ) : (
    student.tenth?.marksObtained || "-"
  )}
</p>


<p>
  <b>Total Percentage:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.tenth?.percentage || ""}
      onChange={(e) => handleTenthChange("percentage", e.target.value)}
    />
  ) : (
    student.tenth?.percentage || "-"
  )}
</p>

{/* Documents */}
{renderDocumentLink("10th Marksheet", student.tenth?.markSheet, "tenthMarkSheet")}
{renderDocumentLink("10th Transfer Certificate", student.tenth?.transferCertificate, "tenthTransferCertificate")}

</div>

            <hr />
            {/* ================= COUNSELLING DETAILS ================= */}
<h3 className="student-section-title">Counselling Details</h3>
<div className="student-info">

<p>
<b>Cutoff:</b>{" "}
{editMode ? (
  <input
    name="cutoff"
    value={updatedStudent.counselling?.cutoff || ""}
    onChange={(e) =>
      setUpdatedStudent((prev) => ({
        ...prev,
        counselling: {
          ...prev.counselling,
          cutoff: e.target.value
        }
      }))
    }
  />
) : (
  student.counselling?.cutoff || "-"
)}
</p>

<p>
  <b>Counselling Rank:</b>{" "}
  {editMode ? (
    <input
      name="counsellingRank"
      value={updatedStudent.counselling?.counsellingRank || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          counselling: {
            ...prev.counselling,
            counsellingRank: e.target.value
          }
        }))
      }
    />
  ) : (
    student.counselling?.counsellingRank || "-"
  )}
</p>

</div>

<hr />
           {/* QUALIFICATION TYPE */}
<h4 className="section-title">Qualification Type</h4>
<div className="student-info">
  <p>
  <b>Qualification:</b>{" "}
  {editMode ? (
    <select
      name="qualificationType"
      value={updatedStudent.qualificationType || ""}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="12th">12th</option>
      <option value="Diploma">Diploma</option>
      <option value="Both">Both</option>
    </select>
  ) : (
    student.qualificationType || "-"
  )}
</p>

</div>

{/* 12TH DETAILS */}
{(student.qualificationType === "12th" || student.qualificationType === "Both") && (
  <>
    <h3 className="student-section-title">12th Details</h3>

    <div className="student-info">

      <p>
  <b>Register Number:</b>{" "}
  {editMode ? (
    <input
      name="twelfthRegister"
      value={updatedStudent.twelfth?.registerNumber || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.registerNumber || "-"
  )}
</p>

<p>
  <b>Board:</b>{" "}
  {editMode ? (
    <input
      name="twelfthBoard"
      value={updatedStudent.twelfth?.board || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.board || "-"
  )}
</p>

<p>
  <b>School:</b>{" "}
  {editMode ? (
    <input
      name="twelfthSchool"
      value={updatedStudent.twelfth?.school || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.school || "-"
  )}
</p>

<p>
  <b>Medium:</b>{" "}
  {editMode ? (
    <input
      name="twelfthMedium"
      value={updatedStudent.twelfth?.medium || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.medium || "-"
  )}
</p>

<p>
  <b>Year of Passing:</b>{" "}
  {editMode ? (
    <input
      name="twelfthYear"
      value={updatedStudent.twelfth?.yearOfPassing || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.yearOfPassing || "-"
  )}
</p>

<p>
  <b>Marks:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent.twelfth?.marksObtained || ""}
      onChange={(e) => handleTwelfthChange("marksObtained", e.target.value)}
    />
  ) : (
    student.twelfth?.marksObtained || "-"
  )}
</p>


<p>
  <b>Percentage:</b>{" "}
  {editMode ? (
    <input
      name="twelfthPercentage"
      value={updatedStudent.twelfth?.percentage || ""}
      onChange={handleChange}
    />
  ) : (
    student.twelfth?.percentage || "-"
  )}
</p>

{renderDocumentLink(
  "12th Mark Sheet",
  student.twelfth?.markSheet,
  "twelfthMarkSheet"
)}

{renderDocumentLink(
  "12th Transfer Certificate",
  student.twelfth?.transferCertificate,
  "twelfthTransferCertificate"
)}

{renderDocumentLink(
  "Conduct Certificate",
  student.twelfth?.contactCertificate,
  "twelfthContactCertificate"
)}

    </div>

    <hr />
  </>
)}

{/* DIPLOMA DETAILS */}
{(student.qualificationType === "Diploma" || student.qualificationType === "Both") && (
  <>
    <h3 className="student-section-title">Diploma Details</h3>

    <div className="student-info">

     <p>
  <b>College Name:</b>{" "}
  {editMode ? (
    <input
      name="diplomaCollege"
      value={updatedStudent.diplomaCollege || student.diploma?.collegeName || ""}
      onChange={handleChange}
    />
  ) : (
    student.diploma?.collegeName || "-"
  )}
</p>

<p>
  <b>Branch:</b>{" "}
  {editMode ? (
    <input
      name="diplomaBranch"
      value={updatedStudent.diplomaBranch || student.diploma?.branch || ""}
      onChange={handleChange}
    />
  ) : (
    student.diploma?.branch || "-"
  )}
</p>

<p>
  <b>Year of Passing:</b>{" "}
  {editMode ? (
    <input
      name="diplomaYear"
      value={updatedStudent.diplomaYear || student.diploma?.yearOfPassing || ""}
      onChange={handleChange}
    />
  ) : (
    student.diploma?.yearOfPassing || "-"
  )}
</p>

<p>
  <b>Percentage / CGPA:</b>{" "}
  {editMode ? (
    <input
      name="diplomaPercentage"
      value={updatedStudent.diplomaPercentage || student.diploma?.percentageOrCGPA || ""}
      onChange={handleChange}
    />
  ) : (
    student.diploma?.percentageOrCGPA || "-"
  )}
</p>

{renderDocumentLink("Diploma Mark Sheet", student.diploma?.markSheet)}
{renderDocumentLink("Diploma Transfer Certificate", student.diploma?.transferCertificate)}


    </div>

    <hr />
  </>
)}

            {/* COLLEGE DETAILS */}
          
<h3 className="student-section-title">College Details</h3>
<div className="student-info">
  <p>
  <b>College Name:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.collegeName || ""}
      onChange={(e) => handleCollegeChange("collegeName", e.target.value)}
    />
  ) : (
    student.college?.collegeName || student.collegeName || "-"
  )}
</p>

<p>
  <b>Programme Level:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.programmeLevel || ""}
      onChange={(e) => handleCollegeChange("programmeLevel", e.target.value)}
    />
  ) : (
    student.college?.programmeLevel || student.programmeLevel || "-"
  )}
</p>

<p>
  <b>Degree:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.degree || ""}
      onChange={(e) => handleCollegeChange("degree", e.target.value)}
    />
  ) : (
    student.college?.degree || student.degree || "-"
  )}
</p>

<p>
  <b>Department:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.department || ""}
      onChange={(e) => handleCollegeChange("department", e.target.value)}
    />
  ) : (
    student.college?.department || student.department || "-"
  )}
</p>

<p>
  <b>Year of Study:</b>{" "}
  {editMode ? (
    <select
      value={updatedStudent.college?.yearOfStudy || ""}
      onChange={(e) => {
        const year = e.target.value;

        const hostelCategory =
          year === "1" || year === "2"
            ? "junior"
            : year === "3" || year === "4"
            ? "senior"
            : "";

        setUpdatedStudent((prev) => ({
          ...prev,
          college: {
            ...prev.college,
            yearOfStudy: year,
            year: hostelCategory
          }
        }));
      }}
    >
      <option value="">Select Year</option>
      <option value="1">1st Year</option>
      <option value="2">2nd Year</option>
      <option value="3">3rd Year</option>
      <option value="4">4th Year</option>
    </select>
  ) : (
    student.college?.yearOfStudy || "-"
  )}
</p>

<p>
  <b>Year of Passing:</b>{" "}
  {editMode ? (
    <input
      type="text"
      value={updatedStudent?.college?.yearOfPassing || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          college: {
            ...prev.college,
            yearOfPassing: e.target.value
          }
        }))
      }
    />
  ) : (
    student?.college?.yearOfPassing || "-"
  )}
</p>

<p>
  <b>Regulation:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.regulation || ""}
      onChange={(e) =>
        handleCollegeChange("regulation", e.target.value)
      }
    />
  ) : (
    student.college?.regulation || "-"
  )}
</p>

<p>
  <b>Admission Year:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.college?.admissionYear || ""}
      onChange={(e) =>
        handleCollegeChange("admissionYear", e.target.value)
      }
    />
  ) : (
    student.college?.admissionYear || "-"
  )}
</p>

</div>
            <hr />
            {/* FAMILY & ADDRESS DETAILS */}
<h3 className="student-section-title">Family Details</h3>
<div className="student-info">
 <p>
  <b>Father's Name:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.family?.fatherName || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          family: {
            ...prev.family,
            fatherName: e.target.value
          }
        }))
      }
    />
  ) : (
    student.family?.fatherName || "-"
  )}
</p>

<p>
  <b>Father's Occupation:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.family?.fatherOccupation || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          family: {
            ...prev.family,
            fatherOccupation: e.target.value
          }
        }))
      }
    />
  ) : (
    student.family?.fatherOccupation || "-"
  )}
</p>

<p>
  <b>Father's Mobile Number:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.family?.fatherMobile || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          family: {
            ...prev.family,
            fatherMobile: e.target.value
          }
        }))
      }
    />
  ) : (
    student.family?.fatherMobile || "-"
  )}
</p>

<p>
  <b>Father's Email ID:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.family?.fatherEmail || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          family: {
            ...prev.family,
            fatherEmail: e.target.value
          }
        }))
      }
    />
  ) : (
    student.family?.fatherEmail || "-"
  )}
</p>


<p>
  <b>Mother's Name:</b>{" "}
  {editMode ? (
    <input
      name="motherName"
      value={updatedStudent.motherName || ""}
      onChange={handleChange}
    />
  ) : (
    student.family?.motherName || "-"
  )}
</p>

<p>
  <b>Mother's Occupation:</b>{" "}
  {editMode ? (
    <input
      name="motherOccupation"
      value={updatedStudent.motherOccupation || ""}
      onChange={handleChange}
    />
  ) : (
    student.family?.motherOccupation || "-"
  )}
</p>

<p>
  <b>Mother's Mobile Number:</b>{" "}
  {editMode ? (
    <input
      name="motherMobile"
      value={updatedStudent.motherMobile || ""}
      onChange={handleChange}
    />
  ) : (
    student.family?.motherMobile || "-"
  )}
</p>

<p>
  <b>Mother's Email ID:</b>{" "}
  {editMode ? (
    <input
      name="motherEmail"
      value={updatedStudent.motherEmail || ""}
      onChange={handleChange}
    />
  ) : (
    student.family?.motherEmail || "-"
  )}
</p>

<p>
  <b>Family Income:</b>{" "}
  {editMode ? (
    <input
      name="familyIncome"
      value={updatedStudent.familyIncome || ""}
      onChange={handleChange}
    />
  ) : (
    student.family?.familyIncome || "-"
  )}
</p>

{renderDocumentLink("Income Certificate", student.family?.incomeCertificate)}
{renderDocumentLink("Community Certificate", student.family?.communityCertificate)}

<p>
  <b>First Graduate:</b>{" "}
  {editMode ? (
    <select
      name="firstGraduate"
      value={updatedStudent.firstGraduate || ""}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  ) : (
    student.family?.firstGraduate || "-"
  )}
</p>

{student.family?.firstGraduate === "Yes" &&
  renderDocumentLink("First Graduation Certificate", student.family?.firstGraduateCertificate)}

{renderDocumentLink("Nativity Certificate", student.family?.nativityCertificate)}
</div>

<hr />

<h3 className="student-section-title">Address Details</h3>
<div className="student-info">
 <p>
  <b>Address Line 1:</b>{" "}
  {editMode ? (
    <input
      name="addressLine1"
      value={updatedStudent.addressLine1 || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.addressLine1 || "-"
  )}
</p>

<p>
  <b>Address Line 2:</b>{" "}
  {editMode ? (
    <input
      name="addressLine2"
      value={updatedStudent.addressLine2 || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.addressLine2 || "-"
  )}
</p>

<p>
  <b>Post:</b>{" "}
  {editMode ? (
    <input
      name="post"
      value={updatedStudent.post || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.post || "-"
  )}
</p>

<p>
  <b>District:</b>{" "}
  {editMode ? (
    <input
      name="district"
      value={updatedStudent.district || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.district || "-"
  )}
</p>

<p>
  <b>State:</b>{" "}
  {editMode ? (
    <input
      name="state"
      value={updatedStudent.state || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.state || "-"
  )}
</p>

<p>
  <b>Pincode:</b>{" "}
  {editMode ? (
    <input
      name="pincode"
      value={updatedStudent.pincode || ""}
      onChange={handleChange}
    />
  ) : (
    student.address?.pincode || "-"
  )}
</p>
</div>
<hr />
            {/* HOSTEL DETAILS */}
<h3 className="student-section-title">Hostel Details</h3>
<div className="student-info">
 <p>
  <b>Hostel:</b>{" "}
  {editMode ? (
    <input
      name="hostelName"
      value={updatedStudent.hostelName || ""}
      onChange={handleChange}
    />
  ) : (
    student.hostel?.hostelName || student.hostelName || "-"
  )}
</p>

<p>
  <b>Block:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.hostel?.block || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          hostel: {
            ...prev.hostel,
            block: e.target.value,
          },
        }))
      }
    />
  ) : (
    student.hostel?.block || "-"
  )}
</p>


<p>
  <b>Floor:</b>{" "}
  {editMode ? (
    <input
      name="floor"
      value={updatedStudent.floor || ""}
      onChange={handleChange}
    />
  ) : (
    student.hostel?.floor || student.floor || "-"
  )}
</p>

<p>
  <b>Room:</b>{" "}
  {editMode ? (
    <input
      name="room"
      value={updatedStudent.room || ""}
      onChange={handleChange}
    />
  ) : (
    student.hostel?.room || student.room || "-"
  )}
</p>

<p>
  <b>Bed:</b>{" "}
  {editMode ? (
    <input
      value={updatedStudent.hostel?.bedNumber || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          hostel: {
            ...prev.hostel,
            bedNumber: e.target.value,
          },
        }))
      }
    />
  ) : (
    student.hostel?.bedNumber || "-"
  )}
</p>

<p>
  <b>Food Preference:</b>{" "}
  {editMode ? (
    <select
      value={updatedStudent.hostel?.foodPreference || ""}
      onChange={(e) =>
        setUpdatedStudent((prev) => ({
          ...prev,
          hostel: {
            ...prev.hostel,
            foodPreference: e.target.value,
          },
        }))
      }
    >
      <option value="">Select</option>
      <option value="Veg">Veg</option>
      <option value="Non-Veg">Non-Veg</option>
      <option value="Eggetarian">Eggetarian</option>
    </select>
  ) : (
    student.hostel?.foodPreference || "-"
  )}
</p>

{renderDocumentLink("Fee Receipt", student.hostel?.feeReceipt)}

</div>
<hr />
{/* DISCLAIMER */}
<h3 className="student-section-title">Disclaimer</h3>
<div className="student-info">
  <p>
    <b>Details Confirmed:</b> {student.confirmDetails ? "Yes" : "No"}
  </p>
  <p>
    <b>Agreed to Hostel Rules:</b> {student.agreeRules ? "Yes" : "No"}
  </p>
</div>
<hr />
{/* ACCEPT / REJECT BUTTONS */}
{/* ACCEPT / REJECT BUTTONS */}
{!editMode && tab !== "existing" && (
  <div className="btn-row" style={{ marginTop: "20px" }}>
    <button
      className="reject"
      onClick={async () => {
        if (!student._id) return;
        try {
          const res = await fetch(
            `http://localhost:5000/api/student/reject/${student._id}`,
            { method: "PUT" }
          );

          if (res.ok) {
            alert("Student rejected successfully");
            navigate(
  isExecutive
    ? "/executive/view-students?tab=new"
    : "/admin/view-students?tab=new"
);
          } else {
            alert("Failed to reject student");
          }
        } catch (error) {
          console.error(error);
          alert("Server error");
        }
      }}
    >
      Reject
    </button>

    <button
      className="accept-btn"
      onClick={async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/student/accept/${id}`,
            { method: "PUT" }
          );

          if (!res.ok) throw new Error("Failed to accept student");

          alert("Student approved successfully!");

         navigate(
  isExecutive
    ? "/executive/view-students"
    : "/admin/view-students"
);
        } catch (err) {
          console.error(err);
          alert("Error approving student");
        }
      }}
    >
      Accept
    </button>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;