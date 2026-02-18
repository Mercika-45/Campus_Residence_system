const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  year: String,
  gender: String,
  room: String,
  feeStatus: String
});

module.exports = mongoose.model("Student", studentSchema);
