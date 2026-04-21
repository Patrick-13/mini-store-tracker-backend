require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://mini-store-tracker-frontend.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, true); // safe fallback
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB ERROR:", err));

// Schema
const IncomeSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  amount: Number,
});

const Income = mongoose.model("Income", IncomeSchema);

// Routes
app.post("/income", async (req, res) => {
  const { date, amount } = req.body;

  const data = await Income.findOneAndUpdate(
    { date },
    { amount },
    { upsert: true, new: true }
  );

  res.json(data);
});

app.get("/income", async (req, res) => {
  const data = await Income.find().sort({ date: -1 });
  res.json(data);
});

app.delete("/income/:id", async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// PORT FIX
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});