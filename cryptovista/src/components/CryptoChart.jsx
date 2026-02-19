import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const coins = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "solana", name: "Solana" },
  { id: "cardano", name: "Cardano" },
];

const CryptoChart = ({ darkMode }) => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setError(false);

    fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("API Error");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.prices) {
          throw new Error("No price data");
        }

        const prices = data.prices.map((p) => p[1]);

        setChartData({
          labels: prices.map((_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: `${selectedCoin.toUpperCase()} - Last 7 Days`,
              data: prices,
              borderColor: "#8b5cf6",
              backgroundColor: "rgba(139,92,246,0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [selectedCoin]);

  return (
    <section className="chart-section">
      <div className="chart-header">
        <h2>📊 Market Trend</h2>

        <div className="custom-dropdown">
          <div
            className={`dropdown-selected ${darkMode ? 'dark' : 'light'}`}
            onClick={() => setOpen(!open)}
          >
            {coins.find((c) => c.id === selectedCoin)?.name}
          </div>

          {open && (
            <div className={`dropdown-options ${darkMode ? 'dark' : 'light'}`}>
              {coins.map((coin) => (
                <div
                  key={coin.id}
                  className={`dropdown-option ${darkMode ? 'dark' : 'light'}`}
                  onClick={() => {
                    setSelectedCoin(coin.id);
                    setOpen(false);
                  }}
                >
                  {coin.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p>⚠ API limit reached. Please refresh after 1 minute.</p>
      )}

      {!error && chartData && <Line data={chartData} />}

      {!error && !chartData && <p>Loading chart...</p>}
    </section>
  );
};

export default CryptoChart;
