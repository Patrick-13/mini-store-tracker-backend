// src/models/Income.js
const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: String,
  amount: Number,
});

module.exports = mongoose.model("Income", IncomeSchema);
