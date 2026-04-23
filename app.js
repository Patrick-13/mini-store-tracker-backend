// src/app.js
const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const authRoutes = require("./src/routes/authRoute");
const incomeRoutes = require("./src/routes/incomeRoute");
const transactionRoutes = require("./src/routes/transactionRoute");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-store-tracker-frontend-8w3r167c8.vercel.app",
      "https://mini-store-tracker-frontend.vercel.app",
    ],
  }),
);

app.use(express.json());

// log middleware
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url);
  next();
});

// routes
app.use("/auth", authRoutes);
app.use("/income", incomeRoutes);
app.use("/transaction", transactionRoutes);

app.use(errorHandler);

module.exports = app;
