// https://api.coingecko.com/api/v3/coins/markets
import { useEffect, useState } from "react";
import Loader from "./Loader";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <Loader />;
  if (error) return <div className="table-section"><p>Error loading data: {error}</p></div>;

  return (
    <section className="table-section">
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
          {coins.map((coin, index) => (
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
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CryptoTable;
