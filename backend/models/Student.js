import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  name: String,
  contact: String,
  relationship: String,
  email: String,
  aadhaarNumber: String,
  photo: String,
  aadhaarCard: String
});

const academicSchema = new mongoose.Schema({
  registerNumber: String,
  board: String,
  school: String,
  medium: String,
  schoolType: String,
  yearOfPassing: String,
  marksObtained: String,
  percentage: String,
  markSheet: String,
  transferCertificate: String,
  contactCertificate: String
});

const counsellingSchema = new mongoose.Schema({
  cutoff: String,
  counsellingRank: String
});

const diplomaSchema = new mongoose.Schema({
  collegeName: String,
  branch: String,
  yearOfPassing: String,
  percentageOrCGPA: String,
  markSheet: String,
  transferCertificate: String
});

const collegeSchema = new mongoose.Schema({
  collegeName: String,
  programmeLevel: String,
  degree: String,
  department: String,
  yearOfStudy: String,
  yearOfPassing: String,
  regulation: String,
  admissionYear: String
});

const familySchema = new mongoose.Schema({
  fatherName: String,
  fatherOccupation: String,
  fatherMobile: String,
  fatherEmail: String,

  motherName: String,
  motherOccupation: String,
  motherMobile: String,
  motherEmail: String,

  familyIncome: String,
  firstGraduate: String,

  incomeCertificate: String,
  communityCertificate: String,
  firstGraduateCertificate: String,
  nativityCertificate: String
});

const addressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  post: String,
  district: String,
  state: String,
  pincode: String
});

const hostelSchema = new mongoose.Schema({
  hostelName: String,
  block: String,
  floor: String,
  room: String,
  bedNumber: String,
  foodPreference: String,
  feeReceipt: {
    type: String,
    default: ""
  }
});

const studentSchema = new mongoose.Schema({
  studentName: String,
  photo: String,
  registerNumber: String,
  dob: String,
  age: String,
  gender: String,
  bloodGroup: String,
  nationality: String,
  religion: String,
  community: String,
  caste: String,
  aadhaarNumber: String,
  aadhaarCard: String,
  email: String,
  mobile: String,
  whatsapp: String,
  alternateContact: String,
  password: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  majorIllness: String,
  medicalNotes: String,
  allergy: String,
  allergyDetails: String,
  medicalDoc: String,

  disability: {
    type: String,
    enum: ["Yes", "No"],
    default: "No"
  },

  disabilityCertificate: {
    type: String,
    default: ""
  },

  motherTongue: String,
  otherLanguage: [String],

  guardians: [guardianSchema],

  tenth: academicSchema,
  twelfth: academicSchema,

  counselling: counsellingSchema,

  qualificationType: String,
  diploma: diplomaSchema,

  vacated: {
    type: Boolean,
    default: false
  },

  vacatedYear: {
    type: Number
  },

  college: collegeSchema,
  family: familySchema,
  address: addressSchema,

  hostel: hostelSchema,

  confirmDetails: {
    type: Boolean,
    default: false
  },

  agreeRules: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Student", studentSchema);