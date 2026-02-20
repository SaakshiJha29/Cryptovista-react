import { useEffect, useState } from "react";
import Loader from "./Loader";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter coins based on search input
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <div className="table-section"><p>Error loading data: {error}</p></div>;

  return (
    <section className="table-section">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2>📊 Market Overview</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            border: '1px solid var(--primary)',
            background: 'transparent',
            color: 'inherit',
            fontSize: '1rem',
            width: '250px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px var(--primary-glow)'}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24H</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td className="coin-name">
                    <img src={coin.image} width="25" alt={coin.name} />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td>${coin.current_price ? coin.current_price.toLocaleString() : "N/A"}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h > 0 ? "green" : "red"
                    }
                  >
                    {coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "N/A"}%
                  </td>
                  <td>${coin.market_cap ? coin.market_cap.toLocaleString() : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No coins found matching "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CryptoTable;