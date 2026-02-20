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

  useEffect(() => {
    const handleError = (event) => {
      console.error("Global error:", event.error);
      setError(event.error?.message || "An error occurred");
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <span className="error-emoji">🌋</span>
          <h2>Something erupted</h2>
          <p>{error}</p>
          <button className="error-btn" onClick={() => window.location.reload()}>
            <span>↻</span> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <Trending />
        <CryptoTable />
        <CryptoChart darkMode={darkMode} />
      </main>
    </div>
  );
}

export default App;