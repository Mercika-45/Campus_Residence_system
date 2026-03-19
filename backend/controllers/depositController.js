import Deposit from "../models/Deposit.js";

export const createDeposit = async (req, res) => {
  const data = await Deposit.create(req.body);
  res.json(data);
};

export const getDeposit = async (req, res) => {
  const data = await Deposit.find().sort({ createdAt: -1 });
  res.json(data);
};

export const approveDeposit = async (req, res) => {
  await Deposit.findByIdAndUpdate(req.params.id, {
    status: "Approved",
  });
  res.json({ message: "Deposit approved" });
};