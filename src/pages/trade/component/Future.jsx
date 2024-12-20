import React, { useState } from "react";

const AdPage = () => {
  const [capital, setCapital] = useState("");
  const [futureCapital, setFutureCapital] = useState(null);

  const calculateFutureCapital = (initialCapital) => {
    const tradesPerDay = 2;
    const days = 30; // Example: one month
    let currentCapital = initialCapital;

    for (let i = 0; i < tradesPerDay * days; i++) {
      const onePercent = currentCapital * 0.01;
      const eightyEightPercent = onePercent * 0.88;
      currentCapital = currentCapital - onePercent + eightyEightPercent;
    }

    return currentCapital.toFixed(2);
  };

  const handleCalculate = () => {
    const initialCapital = parseFloat(capital);
    if (!isNaN(initialCapital) && initialCapital > 0) {
      const result = calculateFutureCapital(initialCapital);
      setFutureCapital(result);
    } else {
      setFutureCapital(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>See the Future of Your Investment</h1>
      <p style={styles.description}>
        Discover how your investment grows over time with our unique trading
        strategy. Enter your starting capital and see your future wealth
        accumulate.
      </p>
      <div style={styles.inputContainer}>
        <input
          type="number"
          placeholder="Enter your starting capital ($)"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCalculate} style={styles.button}>
          Calculate
        </button>
      </div>
      {futureCapital !== null && (
        <div style={styles.result}>
          Your estimated capital after 30 days:{" "}
          <strong>${futureCapital}</strong>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#007bff",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  result: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#28a745",
  },
};

export default AdPage;
