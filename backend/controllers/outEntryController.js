import OutEntry from "../models/OutEntry.js";
import twilio from "twilio";

/* ================= CREATE ================= */
export const createOutEntry = async (req, res) => {
  try {

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const {
      studentName,
      regNo,
      parentMobile,
      year,
      outDate,
      returnDate,
      reason,
    } = req.body;

    if (!studentName || !regNo || !parentMobile || !year || !outDate || !returnDate) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }
    

    const existingEntry = await OutEntry.findOne({
  regNo,
  outDate
});

if (existingEntry) {
  return res.status(400).json({
    message: "This Out Entry already exists"
  });
}

    const newEntry = await OutEntry.create({
      studentName,
      regNo,
      parentMobile,
      year,
      outDate,
      returnDate,
      reason,
    });

    try {

      const cleanNumber = parentMobile.toString().replace(/\D/g, "");

      await client.messages.create({
        body: `Hostel Alert:

Student: ${studentName}
Reg No: ${regNo}

Out Time: ${new Date(outDate).toLocaleString()}
Return Time: ${new Date(returnDate).toLocaleString()}

Reason: ${reason || "Not provided"}
        `,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${cleanNumber}`,
      });

    } catch (smsError) {}

    res.status(201).json({
      message: "Out entry recorded",
      data: newEntry,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= GET ================= */
export const getOutEntries = async (req, res) => {
  try {

    const entries = await OutEntry.find().sort({ createdAt: -1 });

    res.status(200).json(entries);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


/* ================= UPDATE ================= */
export const updateOutEntry = async (req, res) => {
  try {

    const updated = await OutEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


/* ================= DELETE ================= */
export const deleteOutEntry = async (req, res) => {
  try {

    await OutEntry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Entry deleted successfully",
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};