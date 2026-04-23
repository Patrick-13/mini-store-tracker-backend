const Transaction = require("../models/Transaction");

// ➕ Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, type, category, note } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id, // from JWT middleware
      amount,
      date,
      type,
      category,
      note,
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
