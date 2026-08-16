import OutEntry from "../models/OutEntry.js";
import InEntry from "../models/InEntry.js";

/* GET STUDENTS CURRENTLY OUT */

export const getStudentsOut = async (req, res) => {
  try {
    const { wardenType } = req.query;

    let filter = { status: "Out" };

    if (wardenType) {
      filter.wardenType = wardenType.toLowerCase();
    }

    const data = await OutEntry.find(filter);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* GET RETURNED STUDENTS */

export const getReturnedEntries = async (req, res) => {
  try {
    const { wardenType } = req.query;

    let filter = { status: "In" };

    if (wardenType) {
      filter.wardenType = wardenType.toLowerCase();
    }

    const data = await OutEntry.find(filter);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* MARK STUDENT IN */

export const markStudentIn = async (req, res) => {

  try {

    const id = req.params.id;

    const outEntry = await OutEntry.findById(id);

    if (!outEntry) {
      return res.status(404).json({ message: "Out Entry not found" });
    }

    const existing = await InEntry.findOne({
      outEntryId: id
    });

    if (existing) {
      return res.json({ message: "Student already returned" });
    }

    const newEntry = new InEntry({

      studentName: outEntry.studentName,
      regNo: outEntry.regNo,
      year: outEntry.year,

      outEntryId: outEntry._id,

      outDate: outEntry.outDate,
      returnDate: outEntry.returnDate,

      actualReturn: new Date(),
      status: "Returned"

    });

    await newEntry.save();

    res.json({
      message: "Student marked in successfully",
      data: newEntry
    });

  } catch (error) {

    console.log("MARK IN ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};