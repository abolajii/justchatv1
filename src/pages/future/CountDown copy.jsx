import React, { useState } from "react";
import styled from "styled-components";
import {
  Calendar,
  ArrowRight,
  Calculator,
  MinusCircle,
  DollarSign,
  CreditCard,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";
import { addDays, differenceInDays, format, parse } from "date-fns";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #151515;
`;

const Card = styled.div`
  background-color: #1c1c1c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const Grid = styled.div`
  display: flex;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #ccc;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  background-color: #2c2c2c;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #374151;
    cursor: not-allowed;
  }
`;

const CurrencyToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #2c2c2c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #3c3c3c;
    transform: translateY(-1px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: #151515;
  color: #ccc;
  border-radius: 8px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1c1c1c;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
`;

const ResultCard = styled.div`
  background-color: #1c1c1c;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const SignalCard = styled(ResultCard)`
  background-color: #232323;
  margin-top: 1rem;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const USDConversion = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
`;

const GreenText = styled.span`
  color: #10b981;
  font-weight: 500;
`;

const SignalTitle = styled.h4`
  color: #10b981;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DeductSection = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const ProfitIndicator = styled.span`
  color: #10b981;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TradingCalculator = () => {
  const [startingCapital, setStartingCapital] = useState("");
  const [numSignals, setNumSignals] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deduction, setDeduction] = useState("");
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showUSD, setShowUSD] = useState(false);

  const NGN_TO_USD_RATE = 1656.0;

  const formatCurrency = (amount, showUSD = false) => {
    if (showUSD) {
      return `$${(amount / NGN_TO_USD_RATE).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;
  };

  const calculateDailyProfits = (initialCapital, numSignals) => {
    let currentCapital = initialCapital;
    const profits = [];

    for (let i = 0; i < numSignals; i++) {
      const tradeAmount = currentCapital * 0.01; // 1% of current capital
      const remainingBalance = currentCapital - tradeAmount;
      const tradeProfit = tradeAmount * 0.88; // 88% profit on trade amount
      const initialTradeCapital = currentCapital; // Store initial capital before this trade
      currentCapital = remainingBalance + tradeAmount + tradeProfit;

      profits.push({
        tradeNumber: `Signal ${i + 1}`,
        tradeAmount: tradeAmount,
        profit: tradeProfit,
        profitPercentage: ((tradeProfit / tradeAmount) * 100).toFixed(2),
        initialCapital: initialTradeCapital,
        newCapital: currentCapital,
        absoluteProfit: currentCapital - initialTradeCapital,
      });
    }

    return {
      finalCapital: currentCapital,
      totalProfit: currentCapital - initialCapital,
      trades: profits,
    };
  };

  const handleCalculate = () => {
    if (!startingCapital || !numSignals || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    const start = parse(startDate, "yyyy-MM-dd", new Date());
    const end = parse(endDate, "yyyy-MM-dd", new Date());
    const adjustedStart = addDays(start, 2);

    if (adjustedStart >= end) {
      alert(
        "End date must be after the adjusted start date (start date + 2 days)"
      );
      return;
    }

    const numDays = differenceInDays(end, adjustedStart);
    let totalCapital = parseFloat(startingCapital);
    const dailyResults = [];

    for (let i = 0; i < numDays; i++) {
      const dayResult = calculateDailyProfits(
        totalCapital,
        parseInt(numSignals)
      );
      totalCapital = dayResult.finalCapital;
      dailyResults.push({
        day: format(addDays(adjustedStart, i), "MMM dd, yyyy"),
        ...dayResult,
      });
    }

    setResults({
      dailyResults,
      totalDays: numDays,
      finalCapital: totalCapital,
      startingCapital: parseFloat(startingCapital),
      totalProfit: totalCapital - parseFloat(startingCapital),
    });
    setShowResults(true);
  };

  const handleDeduct = () => {
    if (!deduction || !results) return;

    const newStartingCapital = results.finalCapital - parseFloat(deduction);
    setStartingCapital(newStartingCapital.toString());
    setResults(null);
    setShowResults(false);
    setDeduction("");
  };

  const handleCurrencyToggle = () => {
    setShowUSD(!showUSD);
  };

  return (
    <Container>
      <Card>
        <Title style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calculator size={24} /> Trading Calculator
        </Title>

        <CurrencyToggle onClick={handleCurrencyToggle}>
          {showUSD ? <DollarSign size={16} /> : <CreditCard size={16} />}
          {showUSD ? "Switch to NGN" : "Switch to USD"}
          <RefreshCcw size={16} />
        </CurrencyToggle>

        <Grid>
          <InputGroup>
            <Label>Starting Capital ({showUSD ? "USD" : "NGN"})</Label>
            <Input
              type="number"
              value={startingCapital}
              onChange={(e) => setStartingCapital(e.target.value)}
              placeholder={`Enter starting capital (${
                showUSD ? "USD" : "NGN"
              })`}
            />
            <USDConversion>
              {showUSD
                ? `≈ ₦${(
                    parseFloat(startingCapital || 0) * NGN_TO_USD_RATE
                  ).toFixed(2)}`
                : `≈ $${(
                    parseFloat(startingCapital || 0) / NGN_TO_USD_RATE
                  ).toFixed(2)}`}
            </USDConversion>
          </InputGroup>

          <InputGroup>
            <Label>Number of Signals per Day</Label>
            <Input
              type="number"
              value={numSignals}
              onChange={(e) => setNumSignals(e.target.value)}
              placeholder="Enter number of signals"
              min="1"
            />
          </InputGroup>

          <InputGroup>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </InputGroup>
        </Grid>

        <Button onClick={handleCalculate}>
          <Calculator size={16} />
          Calculate Profits
        </Button>
      </Card>

      {showResults && (
        <Modal onClick={() => setShowResults(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Title
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Calculator size={24} /> Calculation Results
            </Title>

            <p>
              Trading results from{" "}
              {format(
                parse(startDate, "yyyy-MM-dd", new Date()),
                "MMM dd, yyyy"
              )}{" "}
              to{" "}
              {format(parse(endDate, "yyyy-MM-dd", new Date()), "MMM dd, yyyy")}
            </p>

            <Grid style={{ marginTop: "1rem" }}>
              <ResultCard>
                <Label>Total Days</Label>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {results?.totalDays}
                </div>
              </ResultCard>

              <ResultCard>
                <Label>Total Profit</Label>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  <GreenText style={{ fontSize: "1.5rem" }}>
                    {formatCurrency(results?.totalProfit || 0, showUSD)}
                  </GreenText>
                </div>
              </ResultCard>

              <ResultCard>
                <Label>Final Capital</Label>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  <GreenText style={{ fontSize: "1.5rem" }}>
                    {formatCurrency(results?.finalCapital || 0, showUSD)}
                  </GreenText>
                </div>
              </ResultCard>
            </Grid>

            {results?.dailyResults.map((day, index) => (
              <ResultCard key={index}>
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Calendar size={20} /> {day.day}
                </h3>

                <FlexBetween>
                  <span>Starting Capital:</span>
                  <span style={{ color: "#fff" }}>
                    {formatCurrency(
                      index === 0
                        ? results.startingCapital
                        : results.dailyResults[index - 1].finalCapital,
                      showUSD
                    )}
                  </span>
                </FlexBetween>

                {day.trades.map((trade, tradeIndex) => (
                  <SignalCard key={tradeIndex}>
                    <SignalTitle>
                      <ArrowRight size={16} /> {trade.tradeNumber}
                    </SignalTitle>
                    <FlexBetween>
                      <span>Initial Capital:</span>
                      <span style={{ color: "#fff" }}>
                        {formatCurrency(trade.initialCapital, showUSD)}
                      </span>
                    </FlexBetween>
                    <FlexBetween>
                      <span>Trade Amount (1%):</span>
                      <span style={{ color: "#fff" }}>
                        {formatCurrency(trade.tradeAmount, showUSD)}
                      </span>
                    </FlexBetween>
                    <FlexBetween>
                      <span>Signal Profit:</span>
                      <ProfitIndicator>
                        <TrendingUp size={14} />
                        {formatCurrency(trade.profit, showUSD)}
                        <span style={{ color: "#666" }}>
                          ({trade.profitPercentage}%)
                        </span>
                      </ProfitIndicator>
                    </FlexBetween>
                    <FlexBetween>
                      <span>Total Profit This Signal:</span>
                      <ProfitIndicator>
                        <TrendingUp size={14} />
                        {formatCurrency(trade.absoluteProfit, showUSD)}
                      </ProfitIndicator>
                    </FlexBetween>
                    <FlexBetween>
                      <span>Capital After Signal:</span>
                      <span style={{ color: "#fff" }}>
                        {formatCurrency(trade.newCapital, showUSD)}
                      </span>
                    </FlexBetween>
                  </SignalCard>
                ))}

                <FlexBetween style={{ marginTop: "1rem" }}>
                  <span>Daily Total Profit:</span>
                  <GreenText>
                    {formatCurrency(day.totalProfit, showUSD)}
                  </GreenText>
                </FlexBetween>

                <FlexBetween>
                  <span>End Capital:</span>
                  <span style={{ color: "#fff", fontWeight: "bold" }}>
                    {formatCurrency(day.finalCapital, showUSD)}
                  </span>
                </FlexBetween>
              </ResultCard>
            ))}

            <DeductSection>
              <Input
                type="number"
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
                placeholder={`Enter amount to deduct (${
                  showUSD ? "USD" : "NGN"
                })`}
              />
              <Button onClick={handleDeduct} style={{ width: "auto" }}>
                <MinusCircle size={16} />
                Deduct & Start New Calculation
              </Button>
            </DeductSection>

            <Button onClick={() => setShowResults(false)}>Close Results</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default TradingCalculator;
