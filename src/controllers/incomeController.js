// src/controllers/incomeController.js
const Income = require("../models/Income");

exports.saveIncome = async (req, res) => {
  const { date, amount } = req.body;

  const data = await Income.findOneAndUpdate(
    { userId: req.user.id, date },
    { userId: req.user.id, date, amount },
    { upsert: true, new: true },
  );

  res.json(data);
};

exports.getIncome = async (req, res) => {
  const data = await Income.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(data);
};

exports.deleteIncome = async (req, res) => {
  await Income.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.json({ message: "Deleted" });
};
