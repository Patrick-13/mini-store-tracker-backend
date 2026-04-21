import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function IncomeList({ refresh }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${API}/income`);

    console.log("API RESPONSE:", res.data);

    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const safeData = Array.isArray(data) ? data : [];

  const today = new Date().toISOString().split("T")[0];

  const todayTotal = safeData
    .filter((d) => d.date === today)
    .reduce((sum, d) => sum + d.amount, 0);

  const now = new Date();

  const monthlyTotal = safeData
    .filter((d) => {
      const dDate = new Date(d.date);
      return (
        dDate.getMonth() === now.getMonth() &&
        dDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, d) => sum + d.amount, 0);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/income/${id}`);
    fetchData();
  };

  return (
    <div>
      <h2>Today: ₱{todayTotal}</h2>
      <h2>This Month: ₱{monthlyTotal}</h2>

      <hr />

      {safeData.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <strong>{item.date}</strong> - ₱{item.amount}
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
