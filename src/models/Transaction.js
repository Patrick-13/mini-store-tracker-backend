// models/Transaction.js

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    date: {
      type: Date,
      required: true,
    },

    note: String,
  },
  { timestamps: true },
);

// 🔥 important for performance
TransactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Transaction", TransactionSchema);
