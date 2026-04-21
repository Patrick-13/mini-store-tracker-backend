import axios from "axios";
import { useState, useEffect } from "react";
import API from "../api";

export default function IncomeForm({ onSaved }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/income`, {
        date,
        amount: Number(amount),
      });

      setAmount("");
      onSaved();
    } catch (error) {
      console.error(error);
      alert("Failed to save!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total Income ₱"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
