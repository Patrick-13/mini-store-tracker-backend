require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mini-store-tracker-frontend-5rhdwynsa.vercel.app", "https://mini-store-tracker-frontend.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

// ✅ connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB ERROR:", err));

// ✅ Schema
const IncomeSchema = new mongoose.Schema({
  date: { type: String, unique: true }, // one per day
  amount: Number,
});

const Income = mongoose.model("Income", IncomeSchema);

// ✅ CREATE or UPDATE (important)
app.post("/income", async (req, res) => {
  const { date, amount } = req.body;

  const data = await Income.findOneAndUpdate(
    { date },
    { amount },
    { upsert: true, new: true },
  );

  res.json(data);
});

// ✅ GET ALL
app.get("/income", async (req, res) => {
  const data = await Income.find().sort({ date: -1 });
  res.json(data);
});

// DELETE income by ID
app.delete("/income/:id", async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5001, () => console.log("Server running on port 5001"));
