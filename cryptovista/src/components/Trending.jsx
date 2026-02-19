import { useEffect, useState } from "react";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setTrending(data?.coins || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <section className="trending-section">
      <h2>🔥 Trending Coins</h2>
      {error ? (
        <p>Error loading trending coins: {error}</p>
      ) : (
        <div className="trending-grid">
          {trending.map((coin) => (
            <div key={coin.item.id} className="trend-card">
              <img src={coin.item.small} alt={coin.item.name} />
              <h4>{coin.item.name}</h4>
              <p>Rank: {coin.item.market_cap_rank}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Trending;
