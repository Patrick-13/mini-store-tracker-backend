// src/routes/incomeRoutes.js
const express = require("express");
const {
  saveIncome,
  getIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, saveIncome);
router.get("/", authMiddleware, getIncome);
router.delete("/:id", authMiddleware, deleteIncome);

module.exports = router;
