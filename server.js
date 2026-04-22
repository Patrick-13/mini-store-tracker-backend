// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://mini-store-tracker-frontend-8w3r167c8.vercel.app",
//       "https://mini-store-tracker-frontend.vercel.app",
//     ],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ important fix
//   }),
// );

// app.use(express.json());

// // ===================== LOG MIDDLEWARE =====================
// app.use((req, res, next) => {
//   console.log("➡️ REQUEST:", req.method, req.url);
//   next();
// });

// // ===================== MONGO =====================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("DB ERROR:", err));

// // ===================== USER =====================
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// const User = mongoose.model("User", UserSchema);

// // ===================== INCOME =====================
// const IncomeSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   date: String,
//   amount: Number,
// });

// const Income = mongoose.model("Income", IncomeSchema);

// // ===================== JWT =====================
// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ===================== AUTH MIDDLEWARE =====================
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ===================== REGISTER =====================
// app.post("/auth/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already used" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.json({
//       user,
//       token: generateToken(user),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ===================== LOGIN =====================
// app.post("/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Wrong password" });
//     }

//     res.json({
//       user,
//       token: generateToken(user),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ===================== INCOME =====================
// app.post("/income", authMiddleware, async (req, res) => {
//   const { date, amount } = req.body;

//   const data = await Income.findOneAndUpdate(
//     {
//       userId: req.user.id, // 🔥 isolate per user
//       date,
//     },
//     {
//       userId: req.user.id,
//       date,
//       amount,
//     },
//     { upsert: true, new: true },
//   );

//   res.json(data);
// });

// app.get("/income", authMiddleware, async (req, res) => {
//   const data = await Income.find({
//     userId: req.user.id, // 🔥 only this user’s data
//   }).sort({ date: -1 });

//   res.json(data);
// });

// app.delete("/income/:id", authMiddleware, async (req, res) => {
//   await Income.findOneAndDelete({
//     _id: req.params.id,
//     userId: req.user.id, // 🔥 prevent deleting others
//   });

//   res.json({ message: "Deleted" });
// });

// // ===================== START =====================
// app.listen(5001, () => console.log("Server running on port 5001"));

// src/server.js
require("dotenv").config();
const app = require("./app");
const connectDB = require("./src/config/db");

connectDB();

app.listen(5001, () => console.log("Server running on port 5001"));
