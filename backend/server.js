import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import path from "path";

import { checkLateStudents } from "./utils/lateChecker.js";

import authRoutes from "./routes/authRoutes.js";
import foodMenuRoutes from "./routes/foodMenuRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import vacatingRoutes from "./routes/vacatingRoutes.js";
import depositRoutes from "./routes/depositRoutes.js";
import outEntryRoutes from "./routes/outEntryRoutes.js";
import inEntryRoutes from "./routes/inEntryRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"
import wardenRoutes from "./routes/wardenRoutes.js";
import allocationRoutes from "./routes/allocationRoutes.js";
import hostelRoutes from "./routes/hostelRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static("uploads"));

/* ================= MONGODB CONNECTION ================= */

mongoose
  .connect("mongodb://localhost:27017/campus")
  .then(() => {
    console.log("MongoDB Connected");

    /* ================= CRON JOB ================= */

    cron.schedule("*/1 * * * *", async () => {
      await checkLateStudents();
    });

  })
  .catch((err) => console.log(err));

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/foodmenu", foodMenuRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api", vacatingRoutes);
app.use("/api", leaveRoutes);
app.use("/api", depositRoutes);
app.use("/api/outentry", outEntryRoutes);
app.use("/api/inentry", inEntryRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/wardens", wardenRoutes);
app.use("/api/allocations", allocationRoutes);
app.use("/api/hostels", hostelRoutes);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});