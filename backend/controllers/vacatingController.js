import Vacating from "../models/Vacating.js";

export const createVacating = async (req, res) => {
  const data = await Vacating.create(req.body);
  res.json(data);
};

export const getVacating = async (req, res) => {
  const data = await Vacating.find().sort({ createdAt: -1 });
  res.json(data);
};

export const approveVacating = async (req, res) => {
  await Vacating.findByIdAndUpdate(req.params.id, {
    status: "Approved",
  });
  res.json({ message: "Vacating approved" });
};