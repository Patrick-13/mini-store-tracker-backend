import { useState } from "react";
import IncomeForm from "./pages/IncomeForm";
import IncomeList from "./pages/IncomeList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Store Income Tracker</h1>

      <IncomeForm onSaved={() => setRefresh(!refresh)} />
      <IncomeList refresh={refresh} />
    </div>
  );
}

export default App;
