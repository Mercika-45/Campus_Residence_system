import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/ApplyLeave.css"; // reuse existing styles

function ApplyVacating() {
  // Utility: get current date in DD/MM/YYYY
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hostel Vacating Form State
  const [vacatingData, setVacatingData] = useState({
    studentName: "",
    fatherName: "",
    address: "",
    branch: "",
    year: "",
    semester: "",
    registerNo: "",
    hostelName: "",
    roomNo: "",
    dateJoining: "",
    dateVacating: "",
    reason: "",
    noDues: "",
    remarks: "",
    bankAcc: "",
    ifsc: "",
    mobile: "",
    appliedOn: getCurrentDate(),
    status: "Pending",
  });

  // Caution Deposit Refund Form State
  const [depositData, setDepositData] = useState({
    studentName: "",
    branchYearSemester: "",
    registerNo: "",
    department: "",
    appliedOn: getCurrentDate(),
    status: "Pending",
  });

  const [vacatingRequests, setVacatingRequests] = useState(
    JSON.parse(localStorage.getItem("vacatingRequests")) || []
  );
  const [depositRequests, setDepositRequests] = useState(
    JSON.parse(localStorage.getItem("depositRequests")) || []
  );

  // Handle form changes
  const handleVacatingChange = (e) => {
    const { name, value } = e.target;
    setVacatingData({ ...vacatingData, [name]: value });
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  };

  // Submit Vacating Form
  const submitVacating = (e) => {
    e.preventDefault();
    const requiredFields = [
      "studentName",
      "fatherName",
      "address",
      "branch",
      "year",
      "semester",
      "registerNo",
      "hostelName",
      "roomNo",
      "dateJoining",
      "dateVacating",
      "reason",
    ];
    for (let field of requiredFields) {
      if (!vacatingData[field]) {
        alert("Please fill all required fields in Vacating Form.");
        return;
      }
    }

    const newRequest = { id: Date.now(), ...vacatingData };
    const updatedRequests = [newRequest, ...vacatingRequests];
    setVacatingRequests(updatedRequests);
    localStorage.setItem("vacatingRequests", JSON.stringify(updatedRequests));
    alert("Hostel Vacating Form submitted successfully!");
    setVacatingData({ ...vacatingData, appliedOn: getCurrentDate(), studentName:"", fatherName:"", address:"", branch:"", year:"", semester:"", registerNo:"", hostelName:"", roomNo:"", dateJoining:"", dateVacating:"", reason:"", noDues:"", remarks:"", bankAcc:"", ifsc:"", mobile:"" });
  };

  // Submit Caution Deposit Form
  const submitDeposit = (e) => {
    e.preventDefault();
    const requiredFields = ["studentName", "branchYearSemester", "registerNo", "department"];
    for (let field of requiredFields) {
      if (!depositData[field]) {
        alert("Please fill all required fields in Caution Deposit Form.");
        return;
      }
    }

    const newRequest = { id: Date.now(), ...depositData };
    const updatedRequests = [newRequest, ...depositRequests];
    setDepositRequests(updatedRequests);
    localStorage.setItem("depositRequests", JSON.stringify(updatedRequests));
    alert("Caution Deposit Refund Form submitted successfully!");
    setDepositData({ ...depositData, appliedOn: getCurrentDate(), studentName:"", branchYearSemester:"", registerNo:"", department:"" });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content1">
        <Topbar title="Hostel Vacating & Caution Deposit Forms" />
        <div className="content">
          {/* Hostel Vacating Form */}
          <h2>Hostel Vacating Form</h2>
          <p className="breadcrumb">Home / Hostel Vacating Form</p>
          <form className="leave-form" onSubmit={submitVacating}>
            <label>Applied On</label>
            <input type="text" value={vacatingData.appliedOn} disabled />

            <label>Name of the Student</label>
            <input type="text" name="studentName" value={vacatingData.studentName} onChange={handleVacatingChange} />

            <label>Father’s Name</label>
            <input type="text" name="fatherName" value={vacatingData.fatherName} onChange={handleVacatingChange} />

            <label>Address</label>
            <textarea rows="2" name="address" value={vacatingData.address} onChange={handleVacatingChange}></textarea>

            <label>Branch</label>
            <input type="text" name="branch" value={vacatingData.branch} onChange={handleVacatingChange} />

            <label>Year of Study</label>
            <input type="text" name="year" value={vacatingData.year} onChange={handleVacatingChange} />

            <label>Semester</label>
            <input type="text" name="semester" value={vacatingData.semester} onChange={handleVacatingChange} />

            <label>Register No</label>
            <input type="text" name="registerNo" value={vacatingData.registerNo} onChange={handleVacatingChange} />

            <label>Hostel Name</label>
            <input type="text" name="hostelName" value={vacatingData.hostelName} onChange={handleVacatingChange} />

            <label>Room No</label>
            <input type="text" name="roomNo" value={vacatingData.roomNo} onChange={handleVacatingChange} />

            <label>Date of Joining the Hostel</label>
            <input type="date" name="dateJoining" value={vacatingData.dateJoining} onChange={handleVacatingChange} />

            <label>Date of Vacating the Hostel</label>
            <input type="date" name="dateVacating" value={vacatingData.dateVacating} onChange={handleVacatingChange} />

            <label>Reason of Vacating the Hostel</label>
            <textarea rows="2" name="reason" value={vacatingData.reason} onChange={handleVacatingChange}></textarea>

            <label>No Dues</label>
            <input type="text" name="noDues" value={vacatingData.noDues} onChange={handleVacatingChange} />

            <label>Remarks by Deputy Warden</label>
            <textarea rows="2" name="remarks" value={vacatingData.remarks} onChange={handleVacatingChange}></textarea>

            <label>Student Bank Account No.</label>
            <input type="text" name="bankAcc" value={vacatingData.bankAcc} onChange={handleVacatingChange} />

            <label>IFSC Code</label>
            <input type="text" name="ifsc" value={vacatingData.ifsc} onChange={handleVacatingChange} />

            <label>Mobile No.</label>
            <input type="text" name="mobile" value={vacatingData.mobile} onChange={handleVacatingChange} />

            <button type="submit">Submit Vacating Form</button>
          </form>

          <hr style={{ margin: "40px 0" }} />

          {/* Caution Deposit Refund Form */}
          <h2>Caution Deposit Refund Form</h2>
          <p className="breadcrumb">Home / Caution Deposit Refund</p>
          <form className="leave-form" onSubmit={submitDeposit}>
            <label>Applied On</label>
            <input type="text" value={depositData.appliedOn} disabled />

            <label>Name of the Student</label>
            <input type="text" name="studentName" value={depositData.studentName} onChange={handleDepositChange} />

            <label>Branch / Year / Semester</label>
            <input type="text" name="branchYearSemester" value={depositData.branchYearSemester} onChange={handleDepositChange} />

            <label>Register No</label>
            <input type="text" name="registerNo" value={depositData.registerNo} onChange={handleDepositChange} />

            <label>Department</label>
            <input type="text" name="department" value={depositData.department} onChange={handleDepositChange} />

            <button type="submit">Submit Caution Deposit Form</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyVacating;