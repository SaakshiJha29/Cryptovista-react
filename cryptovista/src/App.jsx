import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import CryptoTable from "./components/CryptoTable";
import CryptoChart from "./components/CryptoChart";


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // Error handler
  useEffect(() => {
    const handleError = (event) => {
      console.error("Global error:", event.error);
      setError(event.error?.message || "An error occurred");
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {error && (
        <div style={{
          background: "#ef4444",
          color: "white",
          padding: "20px",
          margin: "10px"
        }}>
          <strong>Error:</strong> {error}
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      )}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Trending />
      <CryptoTable />
      <CryptoChart darkMode={darkMode} />
    </div>
  );
}

export default App;
