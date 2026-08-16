import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import User from "../models/User.js";
import Hostel from "../models/Hostel.js";
export const registerStudent = async (req, res) =>  {
  try {

    


// Convert hostel JSON string to object FIRST
if (req.body.hostel && typeof req.body.hostel === "string") {
  try {
    req.body.hostel = JSON.parse(req.body.hostel);
  } catch (err) {
    console.log("Hostel parse error:", err);
    req.body.hostel = {};
  }
}
    let guardians = [];

    if (req.body.guardians) {
      try {
        guardians = JSON.parse(req.body.guardians);
      } catch {
        guardians = [];
      }
    }

    if (req.files && req.files.length > 0) {

      req.files.forEach(file => {

        if (file.fieldname === "photo") {
          req.body.photo = file.filename;
        }

        if (file.fieldname === "aadhaarCard") {
          req.body.aadhaarCard = file.filename;
        }

        if (file.fieldname === "medicalDoc") {
          req.body.medicalDoc = file.filename;
        }

        if (file.fieldname.startsWith("guardianPhoto_")) {
          const index = parseInt(file.fieldname.split("_")[1]);
          if (guardians[index]) {
            guardians[index].photo = file.filename;
          }
        }

        if (file.fieldname.startsWith("guardianAadhaar_")) {
          const index = parseInt(file.fieldname.split("_")[1]);
          if (guardians[index]) {
            guardians[index].aadhaarCard = file.filename;
          }
        }

        if (file.fieldname === "tenthMarkSheet") req.body.tenthMarkSheet = file.filename;
        if (file.fieldname === "tenthTransferCertificate") req.body.tenthTransferCertificate = file.filename;

        if (file.fieldname === "twelfthMarkSheet") req.body.twelfthMarkSheet = file.filename;
        if (file.fieldname === "twelfthTransferCertificate") req.body.twelfthTransferCertificate = file.filename;
        if (file.fieldname === "twelfthConductCertificate")
  req.body.twelfthConductCertificate = file.filename;

        if (file.fieldname === "diplomaMarkSheet") req.body.diplomaMarkSheet = file.filename;
        if (file.fieldname === "diplomaTransferCertificate") req.body.diplomaTransferCertificate = file.filename;
        if (file.fieldname === "incomeCertificate")
  req.body.incomeCertificate = file.filename;

if (file.fieldname === "communityCertificate")
  req.body.communityCertificate = file.filename;

if (file.fieldname === "firstGraduateCertificate")
  req.body.firstGraduateCertificate = file.filename;

if (file.fieldname === "nativityCertificate")
  req.body.nativityCertificate = file.filename;
if (file.fieldname === "disabilityCertificate") {
  req.body.disabilityCertificate = file.filename;
}
  if (file.fieldname === "feeReceipt") {
  if (!req.body.hostel) req.body.hostel = {};
  req.body.hostel.feeReceipt = file.filename;
}


      });

    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
// hash password
const hashedPassword = await bcrypt.hash(req.body.password, 10);
req.body.password = hashedPassword;

// check existing user
const existingUser = await User.findOne({
  email: req.body.email.toLowerCase()
});

if (existingUser) {
  return res.status(400).json({ message: "Email already registered" });
}

delete req.body.confirmPassword;

// ✅ parse otherLanguage BEFORE using
let otherLanguage = [];

if (req.body.otherLanguage) {
  try {
    otherLanguage = JSON.parse(req.body.otherLanguage);
  } catch {
    otherLanguage = [];
  }
}

    // Convert hostel JSON string to object
// Convert hostel JSON string to object
// Convert hostel JSON string to object ONLY if it is string

const newUser = new User({
  name: req.body.studentName,   // ✅ FIX HERE
  email: req.body.email.toLowerCase(),
  password: hashedPassword,
  role: "student"
});
const savedUser = await newUser.save();
const newStudent = new Student({
      
      ...req.body,
      email: req.body.email.toLowerCase(),
      status: "pending", 
      guardians,
      otherLanguage,
       
        disability: req.body.disability,
  disabilityCertificate: req.body.disabilityCertificate,
      tenth: {
        registerNumber: req.body.tenthRegister,
        board: req.body.tenthBoard,
        schoolType: req.body.tenthSchoolType,
        school: req.body.tenthSchool,
        medium: req.body.tenthMedium,
        yearOfPassing: req.body.tenthYear,
       
        marksObtained: req.body.tenthMarks,
        percentage: req.body.tenthPercentage,
        markSheet: req.body.tenthMarkSheet,
        transferCertificate: req.body.tenthTransferCertificate
      },

      twelfth: {
       registerNumber: req.body.twelfthRegister,
        board: req.body.twelfthBoard,
        school: req.body.twelfthSchool,
        medium: req.body.twelfthMedium,
        schoolType: req.body.twelfthSchoolType,
        yearOfPassing: req.body.twelfthYear,
       marksObtained: req.body.twelfthMarks,   
        percentage: req.body.twelfthPercentage,
        markSheet: req.body.twelfthMarkSheet,
        transferCertificate: req.body.twelfthTransferCertificate,
        conductCertificate: req.body.twelfthConductCertificate
      },

      counselling: {
         cutoff: req.body.cutoff,
  counsellingRank: req.body.counsellingRank
      },

      qualificationType: req.body.qualification,

      diploma: {
        collegeName: req.body.diplomaCollege,
        branch: req.body.diplomaBranch,
        yearOfPassing: req.body.diplomaYearOfPassing,
        percentageOrCGPA: req.body.diplomaPercentage,
        markSheet: req.body.diplomaMarkSheet,
        transferCertificate: req.body.diplomaTransferCertificate
      },

      college: {
  collegeName: req.body.collegeName,
  programmeLevel: req.body.programmeLevel,
  degree: req.body.degree,
  department: req.body.department,
  yearOfStudy: req.body.yearOfStudy,
  semester: req.body.semester,
  yearOfPassing: req.body.collegeYearOfPassing,
  regulation: req.body.collegeRegulation,
  admissionYear: req.body.collegeAdmissionYear
},

      family: {
  fatherName: req.body.fatherName,
  fatherOccupation: req.body.fatherOccupation,
  fatherMobile: req.body.fatherMobile,
  fatherEmail: req.body.fatherEmail,
  motherName: req.body.motherName,
  motherOccupation: req.body.motherOccupation,
  motherMobile: req.body.motherMobile,
  motherEmail: req.body.motherEmail,
  familyIncome: req.body.familyIncome,
  firstGraduate: req.body.firstGraduate,
  incomeCertificate: req.body.incomeCertificate,
  communityCertificate: req.body.communityCertificate,
  firstGraduateCertificate: req.body.firstGraduateCertificate,
  nativityCertificate: req.body.nativityCertificate
},

address: {
  addressLine1: req.body.addressLine1,
  addressLine2: req.body.addressLine2,
  post: req.body.post,
  district: req.body.district,
  state: req.body.state,
  pincode: req.body.pincode
},
hostel: {
  hostelType: req.body.hostel?.hostelType,   // ✅ ADD THIS
  hostelName: req.body.hostel?.hostelName,
  block: req.body.hostel?.block,
  floor: req.body.hostel?.floor,
  room: req.body.hostel?.room,
  bedNumber: req.body.hostel?.bedNumber || "",
  foodPreference: req.body.hostel?.foodPreference,
  feeReceipt: req.body.hostel?.feeReceipt || ""
},
confirmDetails: req.body.confirmDetails,
agreeRules: req.body.agreeRules


    });


newStudent.userId = savedUser._id;
await newStudent.save();


    res.status(201).json({
      message: "Student Registered Successfully 🎉"
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }
};


export const getNewStudents = async (req, res) => {
  try {
    const students = await Student.find({ status: "pending" });
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
};

export const getApprovedStudents = async (req, res) => {
  try {

    const students = await Student.find({
      status: "approved",
      vacated: false   // only current hostel students
    });

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching approved students",
      error: error.message
    });

  }
};
export const getOldStudents = async (req, res) => {
  try {

    const students = await Student.find({
      vacated: true
    }).sort({ vacatedYear: -1 });

    res.json(students || []);

  } catch (error) {

    console.error("OLD STUDENTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch old students",
      error: error.message
    });

  }
};
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student",
      error: error.message
    });
  }
};



export const acceptStudent = async (req, res) => {
  try {
    console.log("Accept ID:", req.params.id);
    const student = await Student.findById(req.params.id).populate("userId");
    console.log("Student Found:", student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { hostelName, block, room } = student.hostel || {};

    if (!hostelName || !block || !room) {
      return res.status(400).json({
        message: "Hostel details missing for student"
      });
    }

   const hostelData = await Hostel.findOne({
  name: { $regex: `^${hostelName}$`, $options: "i" }
});

    if (!hostelData) {
      return res.status(404).json({ message: "Hostel not found" });
    }

   console.log("Hostel Found:", hostelData?.name);

console.log(
  "Available Blocks:",
  hostelData?.blocks.map(b => b.name)
);

const blockData = hostelData.blocks.find(
  b => b.name.toLowerCase().includes(block.toLowerCase())
);

console.log("Matched Block:", blockData);

if (blockData) {
  console.log(
    "Available Rooms:",
    blockData.rooms.map(r => r.roomNo)
  );
}

const roomData = blockData?.rooms.find(
  r => String(r.roomNo) === String(room)
);

console.log("Matched Room:", roomData);
    if (!roomData) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (roomData.students.length >= roomData.totalBeds) {
      return res.status(400).json({ message: "No beds available" });
    }

    // ✅ APPROVE STUDENT
    student.status = "approved";

    roomData.students.push({
      regNo: student.regNo || student.registerNumber || "",
      studentName: student.userId?.name || "Unknown",
      year: student.college?.yearOfStudy || "",
      department: student.college?.department || "Not Assigned",
      hostelType: student.hostel?.hostelType || ""
    });

    roomData.occupied = roomData.students.length;

    await hostelData.save();
    await student.save();

    return res.json({ message: "Student approved successfully" });

  } catch (err) {
    console.error("ACCEPT ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
export const rejectStudent = async (req, res) => {
  try {

    await Student.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({
      message: "Student Rejected"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error rejecting student",
      error: error.message
    });

  }
};
// PROMOTE ALL STUDENTS
export const promoteYear = async (req, res) => {
  try {

    const students = await Student.find({
      status: "approved",
      vacated: false
    });

    const currentYear = new Date().getFullYear();

    for (const student of students) {

      const year = Number(student?.college?.yearOfStudy);

      if (!year) continue;

      // 1 -> 2
      // 2 -> 3
      // 3 -> 4
      if (year < 4) {
        student.college.yearOfStudy = year + 1;
      }

      // 4 -> remove from control login
      else if (year === 4) {
        student.vacated = true;
        student.vacatedYear = currentYear;
      }

      await student.save();
    }

    res.json({ message: "Students promoted successfully" });

  } catch (error) {

    console.error("PROMOTE ERROR:", error);

    res.status(500).json({
      message: "Promotion failed",
      error: error.message
    });

  }
};

export const promoteSemester = async (req, res) => {
  try {
    const students = await Student.find({
      status: "approved",
      vacated: false,
    });

    let updatedCount = 0;

    for (const student of students) {
      let sem = student?.college?.semester;

      // convert safely (handles "1", 1, "Semester 1")
      sem = Number(String(sem).match(/\d+/)?.[0]);

      if (!sem) continue;

      if (sem < 8) {
        await Student.updateOne(
          { _id: student._id },
          { $set: { "college.semester": sem + 1 } }
        );
        updatedCount++;
      }
    }

    res.json({
      message: "Semester promoted successfully",
      updatedCount
    });

  } catch (err) {
    console.error("PROMOTE SEM ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
// GET OLD / VACATED STUDENTS

export const updateStudent = async (req, res) => {
  try {

    console.log("UPDATE BODY:", req.body);

    // convert JSON strings back to objects
    if (req.body.guardians) req.body.guardians = JSON.parse(req.body.guardians);
    if (req.body.otherLanguage) req.body.otherLanguage = JSON.parse(req.body.otherLanguage);

    if (req.body.tenth) req.body.tenth = JSON.parse(req.body.tenth);
    if (req.body.twelfth) req.body.twelfth = JSON.parse(req.body.twelfth);
    if (req.body.diploma) req.body.diploma = JSON.parse(req.body.diploma);

    if (req.body.college) req.body.college = JSON.parse(req.body.college);
    if (req.body.family) req.body.family = JSON.parse(req.body.family);
    if (req.body.address) req.body.address = JSON.parse(req.body.address);
   // ✅ SAFE hostel parsing
if (req.body.hostel && typeof req.body.hostel === "string") {
  try {
    req.body.hostel = JSON.parse(req.body.hostel);
  } catch (err) {
    console.log("Hostel parse error:", err);
    req.body.hostel = {};
  }
}

    if (req.body.counselling) req.body.counselling = JSON.parse(req.body.counselling);

    // handle file uploads
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {

        if (file.fieldname === "photo")
          req.body.photo = file.filename;

        if (file.fieldname === "aadhaarCard")
          req.body.aadhaarCard = file.filename;

        if (file.fieldname === "medicalDoc")
          req.body.medicalDoc = file.filename;

        if (file.fieldname === "disabilityCertificate")
          req.body.disabilityCertificate = file.filename;

      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);

  } catch (error) {

    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Error updating student",
      error: error.message
    });

  }
};
// GET STUDENT BY REGISTER NUMBER
export const getStudentByRegNo = async (req, res) => {
  try {
    const regNo = req.params.regNo.trim();

    const student = await Student.findOne({
      registerNumber: { $regex: `^${regNo}$`, $options: "i" }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};