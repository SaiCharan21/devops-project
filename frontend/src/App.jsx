import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "";

  console.log("API_URL = ", import.meta.env.VITE_API_URL);

  useEffect(() => {
    fetch(`${API_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Frontend (React + Vite)</h1>
      <p>Talking to Backend:</p>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
