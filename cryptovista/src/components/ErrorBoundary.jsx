import { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div style={{
        padding: "20px",
        color: "red",
        backgroundColor: "#ffe6e6",
        borderRadius: "8px",
        margin: "20px"
      }}>
        <h3>⚠️ Something went wrong</h3>
        <p>{error.message}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  try {
    return children;
  } catch (err) {
    setError(err);
    return null;
  }
};

export default ErrorBoundary;
