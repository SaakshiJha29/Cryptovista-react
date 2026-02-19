import { useEffect, useState } from "react";

const quotes = [
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Bill Gates" },
  { text: "In the future, people will mark their era as before Bitcoin and after Bitcoin.", author: "Roger Ver" },
  { text: "Bitcoin is a way to transact without powerful intermediaries getting in the middle.", author: "Jack Dorsey" },
  { text: "The cryptocurrency market is the freest market on the planet.", author: "John McAfee" },
  { text: "I think the internet is going to be one of the most important things in my lifetime.", author: "Bill Gates" },
];

const Hero = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero">
      <h1>
        Step Into The <span>Future of Crypto</span>
      </h1>

      <div className="quote-container">
        <p className="big-quote">"</p>
        <p className="changing-quote">{quotes[quoteIndex].text}</p>
        <p className="quote-author">— {quotes[quoteIndex].author}</p>
      </div>
    </header>
  );
};

export default Hero;
