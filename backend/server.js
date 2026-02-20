// attendance-backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for demo
let sessions = {}; // sessionId => { studentId: { name, status, timestamp } }

// 1️⃣ Create a new attendance session
app.post("/create-session", (req, res) => {
  const sessionId = uuidv4();
  sessions[sessionId] = {}; // empty session
  res.send({ sessionId });
});

// 2️⃣ Mark attendance from mobile (after fingerprint)
app.post("/mark-attendance", (req, res) => {
  const { sessionId, studentId, name } = req.body;
  if (!sessions[sessionId]) return res.status(400).send({ success: false });

  sessions[sessionId][studentId] = {
    name,
    status: "Present (Biometric)",
    timestamp: new Date().toISOString(),
  };

  res.send({ success: true });
});

// 3️⃣ Get attendance for a session
app.get("/attendance/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  res.send(sessions[sessionId] || {});
});

app.listen(5000, () => console.log("Backend running on port 5000"));