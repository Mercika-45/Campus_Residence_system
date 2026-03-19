import Announcement from "../models/Announcement.js";

/* ================================
   CREATE ANNOUNCEMENT
================================ */
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, target, createdBy } = req.body;

    if (!title || !message || !target || !createdBy) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newAnnouncement = await Announcement.create({
      title,
      message,
      target,
      createdBy,
    });

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ================================
   GET ANNOUNCEMENTS BY ROLE
   (student / warden / executive / admin)
================================ */
export const getAnnouncementsByRole = async (req, res) => {
  try {
    const { role, createdBy } = req.query;

    // 🔹 If fetching own announcements
    if (createdBy) {
      const myData = await Announcement.find({ createdBy })
        .sort({ createdAt: -1 });
      return res.json(myData);
    }

    // 🔹 Role-based filtering
    if (!role) {
      return res.status(400).json({ message: "Role required" });
    }

    const data = await Announcement.find({
      $or: [
        { target: role },
        { target: "all" }
      ]
    }).sort({ createdAt: -1 });

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ================================
   DELETE ANNOUNCEMENT
================================ */
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Announcement.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};