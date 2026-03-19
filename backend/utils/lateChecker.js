import OutEntry from "../models/OutEntry.js";
import InEntry from "../models/InEntry.js";
import twilio from "twilio";

export const checkLateStudents = async () => {

  try {

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const now = new Date();

    const outEntries = await OutEntry.find({
      lateAlertSent: false
    });

    for (const entry of outEntries) {

      const returned = await InEntry.findOne({
        outEntryId: entry._id
      });

      if (returned) continue;

      if (now > new Date(entry.returnDate)) {

        const cleanNumber = entry.parentMobile.toString().replace(/\D/g, "");

        await client.messages.create({
          body: `Hostel Alert 🚨

Your child ${entry.studentName} (${entry.regNo})
has not returned to the hostel at the expected time.

Expected Return:
${new Date(entry.returnDate).toLocaleString()}

Please contact them immediately.`,
          from: "whatsapp:+14155238886",
          to: `whatsapp:+91${cleanNumber}`
        });

        entry.lateAlertSent = true;

        await entry.save();

      }

    }

  } catch (error) {

    console.log("Late checker error:", error);

  }

};