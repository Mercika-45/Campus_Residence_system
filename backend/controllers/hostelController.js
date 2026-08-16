import Hostel from "../models/Hostel.js";

/* ================================
   GET HOSTELS BY TYPE
================================ */
export const getHostelsByType = async (req, res) => {
  try {
    const { type } = req.params;

    const hostels = await Hostel.find({ hostelType: type });

    res.status(200).json(hostels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   ADD HOSTEL
================================ */
export const addHostel = async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const { name, hostelType } = req.body;

    if (!name || !hostelType) {
      return res.status(400).json({
        message: "Hostel name and type required"
      });
    }

    const exists = await Hostel.findOne({ name, hostelType });

    if (exists)
      return res.status(400).json({
        message: "Hostel already exists"
      });

    const hostel = await Hostel.create({
      name,
      hostelType,
      blocks: []
    });

    res.status(201).json(hostel);

  } catch (err) {
    console.error("ADD HOSTEL ERROR:", err);   // ⭐ IMPORTANT
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   ADD BLOCK
================================ */
export const addBlock = async (req, res) => {
  try {
    const { hostelId, blockName } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel)
      return res.status(404).json({ message: "Hostel not found" });

    const exists = hostel.blocks.find(b => b.name === blockName);
    if (exists)
      return res.status(400).json({ message: "Block already exists" });

    hostel.blocks.push({
      name: blockName,
      rooms: []
    });

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   ADD ROOM
================================ */
export const addRoom = async (req, res) => {
  try {
    const { hostelId, blockName, roomNo, beds } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel)
      return res.status(404).json({ message: "Hostel not found" });

    const block = hostel.blocks.find(b => b.name === blockName);
    if (!block)
      return res.status(404).json({ message: "Block not found" });

    const exists = block.rooms.find(r => r.roomNo === roomNo);
    if (exists)
      return res.status(400).json({ message: "Room already exists" });

    block.rooms.push({
      roomNo,
      totalBeds: Number(beds),
      occupied: 0,
      students: []
    });

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   ALLOCATE ROOM
================================ */
export const allocateRoom = async (req, res) => {
  try {
    const { hostelId, blockName, roomNo, student } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel)
      return res.status(404).json({ message: "Hostel not found" });

    const block = hostel.blocks.find(
      b => b.name.toLowerCase() === blockName.toLowerCase()
    );

    if (!block)
      return res.status(404).json({ message: "Block not found" });

    const room = block.rooms.find(
      r => r.roomNo.toString() === roomNo.toString()
    );

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    if (!student.regNo || !student.year || !student.department)
      return res.status(400).json({ message: "Student details incomplete" });

    if (room.occupied >= room.totalBeds)
      return res.status(400).json({ message: "No beds available" });

    if (!room.students) room.students = [];

    const alreadyExists = room.students.find(
      s => s.regNo === student.regNo
    );

    if (alreadyExists)
      return res.status(400).json({ message: "Student already allocated" });

    room.occupied += 1;

    room.students.push({
      regNo: student.regNo,
      name: student.name || "NA",
      year: student.year,
      department: student.department,
      hostelType: student.hostelType
    });

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   DELETE HOSTEL
================================ */
export const deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.hostelId);
    res.json({ message: "Hostel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   DELETE BLOCK
================================ */
export const deleteBlock = async (req, res) => {
  try {
    const { hostelId, blockName } = req.body;

    const hostel = await Hostel.findById(hostelId);

    hostel.blocks = hostel.blocks.filter(
      b => b.name !== blockName
    );

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   DELETE ROOM
================================ */
export const deleteRoom = async (req, res) => {
  try {
    const { hostelId, blockName, roomNo } = req.body;

    const hostel = await Hostel.findById(hostelId);

    const block = hostel.blocks.find(b => b.name === blockName);

    block.rooms = block.rooms.filter(
      r => r.roomNo !== roomNo
    );

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   EDIT HOSTEL
================================ */
export const editHostel = async (req, res) => {
  try {
    const { hostelId, newName } = req.body;

    const hostel = await Hostel.findById(hostelId);
    if (!hostel)
      return res.status(404).json({ message: "Hostel not found" });

    hostel.name = newName;

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   EDIT BLOCK
================================ */
export const editBlock = async (req, res) => {
  try {
    const { hostelId, oldBlockName, newBlockName } = req.body;

    const hostel = await Hostel.findById(hostelId);

    const block = hostel.blocks.find(
      b => b.name === oldBlockName
    );

    if (!block)
      return res.status(404).json({ message: "Block not found" });

    block.name = newBlockName;

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================
   EDIT ROOM
================================ */
export const editRoom = async (req, res) => {
  try {
    const { hostelId, blockName, oldRoomNo, roomNo, totalBeds } = req.body;

    const hostel = await Hostel.findById(hostelId);

    const block = hostel.blocks.find(b => b.name === blockName);

    const room = block.rooms.find(r => r.roomNo === oldRoomNo);

    room.roomNo = roomNo;
    room.totalBeds = Number(totalBeds);

    await hostel.save();

    res.json(hostel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};