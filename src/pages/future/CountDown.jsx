import React, { useState } from "react";
import {
  Calculator,
  ArrowRight,
  MinusCircle,
  DollarSign,
  CreditCard,
  RefreshCcw,
  TrendingUp,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { addDays, differenceInDays, format, parse, addMonths } from "date-fns";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #151515;
`;

const StyledCard = styled.div`
  background-color: #1c1c1c;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Alert = styled.div`
  background-color: #2c2c2c;
  border-left: 4px solid #10b981;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
`;

const AlertTitle = styled.div`
  color: #10b981;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fff;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex: 1;
  min-width: 200px;
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
  }
`;

const ResultCard = styled(StyledCard)`
  background-color: #232323;
`;

const ComparisonCard = styled(ResultCard)`
  border-left: 4px solid #10b981;
`;

const GreenText = styled.span`
  color: #10b981;
  font-weight: 500;
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
  const [comparisonResults, setComparisonResults] = useState(null);

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
      const tradeAmount = currentCapital * 0.01;
      const remainingBalance = currentCapital - tradeAmount;
      const tradeProfit = tradeAmount * 0.88;
      const initialTradeCapital = currentCapital;
      currentCapital = remainingBalance + tradeAmount + tradeProfit;

      profits.push({
        tradeNumber: `Signal ${i + 1}`,
        tradeAmount,
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

  const calculateForPeriod = (startCap, startD, endD, signals) => {
    const start = parse(startD, "yyyy-MM-dd", new Date());
    const end = parse(endD, "yyyy-MM-dd", new Date());
    const adjustedStart = addDays(start, 2);
    const numDays = differenceInDays(end, adjustedStart);
    let totalCapital = startCap;
    const dailyResults = [];

    for (let i = 0; i < numDays; i++) {
      const dayResult = calculateDailyProfits(totalCapital, signals);
      totalCapital = dayResult.finalCapital;
      dailyResults.push({
        day: format(addDays(adjustedStart, i), "MMM dd, yyyy"),
        ...dayResult,
      });
    }

    return {
      dailyResults,
      totalDays: numDays,
      finalCapital: totalCapital,
      startingCapital: startCap,
      totalProfit: totalCapital - startCap,
    };
  };

  const handleCalculate = () => {
    if (!startingCapital || !numSignals || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    const results = calculateForPeriod(
      parseFloat(startingCapital),
      startDate,
      endDate,
      parseInt(numSignals)
    );

    setResults(results);
    setShowResults(true);
  };

  const handleDeduct = () => {
    if (!deduction || !results) return;

    const newStartDate = format(
      addDays(parse(endDate, "yyyy-MM-dd", new Date()), 1),
      "yyyy-MM-dd"
    );
    const newEndDate = format(
      addMonths(parse(newStartDate, "yyyy-MM-dd", new Date()), 5),
      "yyyy-MM-dd"
    );

    const deductionAmount = parseFloat(deduction);
    const newStartingCapital = results.finalCapital - deductionAmount;

    // Calculate results with deduction
    const newResults = calculateForPeriod(
      newStartingCapital,
      newStartDate,
      newEndDate,
      parseInt(numSignals)
    );

    // Calculate results without deduction
    const comparisonResults = calculateForPeriod(
      results.finalCapital,
      newStartDate,
      newEndDate,
      parseInt(numSignals)
    );

    setStartingCapital(newStartingCapital.toString());
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setResults(newResults);
    setComparisonResults(comparisonResults);
    setDeduction("");
    setShowResults(true);
  };

  return (
    <Container>
      <StyledCard>
        <Title>
          <Calculator size={24} /> Trading Calculator
        </Title>

        <Grid>
          <InputGroup>
            <Label>Starting Capital {showUSD ? "(USD)" : "(NGN)"}</Label>
            <Input
              type="number"
              value={startingCapital}
              onChange={(e) => setStartingCapital(e.target.value)}
              placeholder={`Enter starting capital`}
            />
            <div style={{ fontSize: "0.875rem", color: "#666" }}>
              {showUSD
                ? `≈ ₦${(
                    parseFloat(startingCapital || 0) * NGN_TO_USD_RATE
                  ).toFixed(2)}`
                : `≈ $${(
                    parseFloat(startingCapital || 0) / NGN_TO_USD_RATE
                  ).toFixed(2)}`}
            </div>
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
          <Calculator size={16} /> Calculate Profits
        </Button>

        {results && (
          <>
            <ResultCard>
              <Title>Results Summary</Title>
              <Grid>
                <div>
                  <Label>Total Days</Label>
                  <div style={{ fontSize: "1.25rem", color: "#fff" }}>
                    {results.totalDays}
                  </div>
                </div>
                <div>
                  <Label>Total Profit</Label>
                  <GreenText style={{ fontSize: "1.25rem" }}>
                    {formatCurrency(results.totalProfit, showUSD)}
                  </GreenText>
                </div>
                <div>
                  <Label>Final Capital</Label>
                  <GreenText style={{ fontSize: "1.25rem" }}>
                    {formatCurrency(results.finalCapital, showUSD)}
                  </GreenText>
                </div>
              </Grid>
            </ResultCard>

            <StyledCard>
              <Title>Deduct & Continue</Title>
              <Grid>
                <InputGroup>
                  <Label>Amount to Deduct</Label>
                  <Input
                    type="number"
                    value={deduction}
                    onChange={(e) => setDeduction(e.target.value)}
                    placeholder={`Amount to deduct (${
                      showUSD ? "USD" : "NGN"
                    })`}
                  />
                </InputGroup>
                <Button
                  onClick={handleDeduct}
                  style={{ alignSelf: "flex-end" }}
                >
                  <MinusCircle size={16} /> Deduct & Calculate Next Period
                </Button>
              </Grid>
            </StyledCard>

            {comparisonResults && (
              <ComparisonCard>
                <AlertTitle>
                  <AlertTriangle size={16} /> Opportunity Cost Analysis
                </AlertTitle>
                <Grid>
                  <div>
                    <Label>Profit with Deduction</Label>
                    <GreenText>
                      {formatCurrency(results.totalProfit, showUSD)}
                    </GreenText>
                  </div>
                  <div>
                    <Label>Profit without Deduction</Label>
                    <GreenText>
                      {formatCurrency(comparisonResults.totalProfit, showUSD)}
                    </GreenText>
                  </div>
                  <div>
                    <Label>Opportunity Cost</Label>
                    <GreenText>
                      {formatCurrency(
                        comparisonResults.finalCapital - results.finalCapital,
                        showUSD
                      )}
                    </GreenText>
                  </div>
                </Grid>
              </ComparisonCard>
            )}
          </>
        )}
      </StyledCard>
    </Container>
  );
};

export default TradingCalculator;
