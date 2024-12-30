import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import { parseISO, addDays, format } from "date-fns";

import useThemeStore from "./store/useThemeStore";
import MainContainer from "./pages/future/MainContainer";

const Container = styled.div`
  /* max-width: 1400px; */
  /* margin: 0 auto; */
  height: 100%;
  overflow-y: scroll;
  padding: 20px 0;
  font-family: Arial, sans-serif;
  /* background-color: ${(props) =>
    props.isDarkMode ? "#1e1e1e" : "#ffffff"}; */
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};

  p {
    font-size: 13px;
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const baseInputStyles = css`
  padding: 8px;
  border-radius: 4px;
`;

const Input = styled.input`
  ${baseInputStyles}
  border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
`;

const Select = styled.select`
  ${baseInputStyles}
  border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
`;

const CalculateButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.isDarkMode ? "#4caf50" : "#4caf50")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? "#6a6f83" : "#45a049")};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
    padding: 2px;
    font-size: 12px;
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
  }

  th {
    background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f2f2f2")};
    font-weight: bold;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  gap: 10px;

  button {
    padding: 8px 12px;
    background-color: ${(props) => (props.isDarkMode ? "#2a2a3f" : "#f2f2f2")};
    border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")};
    border-radius: 4px;
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.isDarkMode ? "#3a3a4f" : "#ddd")};
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${(props) =>
        props.isDarkMode ? "#1a1a2e" : "#e0e0e0"};
      color: ${(props) => (props.isDarkMode ? "#666" : "#999")};
    }
  }

  span {
    padding: 8px;
    font-size: 14px;
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")};
  }
`;

const formatCurrency = (value, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

const TradingProfitCalculator = () => {
  const { isDarkMode } = useThemeStore();

  const [startCapital, setStartCapital] = useState("0");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [multiplier, setMultiplier] = useState(1700);
  const [calculatedResults, setCalculatedResults] = useState({
    results: [],
  });
  const [monthlyBonus, setMonthlyBonus] = useState(0);

  const calculateTradingResults = () => {
    // ... (same implementation as original code)
    // This part remains unchanged from the previous implementation
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const results = [];
    let balance = parseFloat(startCapital);
    const dailyProfitRate = 0.01 * 0.86; // 1% of capital with 88% profit
    let totalProfit = 0;
    let lastMonthBonusPaid = null;

    for (let date = start; date <= end; date = addDays(date, 1)) {
      const currentMonth = format(date, "MM");
      const currentDay = format(date, "dd");

      // Check for monthly bonus
      const isBonusDay =
        (currentMonth !== "12" && currentDay === "24") ||
        (currentMonth === "12" && currentDay === "17");

      const shouldPayBonus = isBonusDay && currentMonth !== lastMonthBonusPaid;

      if (shouldPayBonus) {
        balance += monthlyBonus;
        lastMonthBonusPaid = currentMonth;
      }

      let dailyProfit = 0;
      let startingBalance = balance;

      // First trade
      const firstTradeTotalAmount = balance * 0.01;
      const firstTradeRemainingBalance = balance - firstTradeTotalAmount;
      const firstTradeProfit = firstTradeTotalAmount * 0.88;
      const capitalAfterFirstTrade =
        firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit;

      // Second trade
      const secondTradeTotalAmount = capitalAfterFirstTrade * 0.01;
      const secondTradeRemainingBalance =
        capitalAfterFirstTrade - secondTradeTotalAmount;
      const secondTradeProfit = secondTradeTotalAmount * 0.88;
      balance =
        secondTradeRemainingBalance +
        secondTradeTotalAmount +
        secondTradeProfit;

      // Calculate daily profit
      dailyProfit = firstTradeProfit + secondTradeProfit;
      totalProfit += dailyProfit;

      results.push({
        date: format(date, "yyyy-MM-dd"),
        startingCapital: startingBalance,
        monthlyBonus: shouldPayBonus ? monthlyBonus : 0,

        firstTradeAmount: firstTradeTotalAmount,
        firstTradeRemainingBalance,
        firstTradeProfit,
        capitalAfterFirstTrade,
        secondTradeAmount: secondTradeTotalAmount,
        secondTradeRemainingBalance,
        secondTradeProfit,
        capitalAfterSecondTrade: balance,
        dailyProfit,
        profitNaira: dailyProfit * multiplier,
      });
    }

    setCalculatedResults({
      results,
      totalProfit,
      finalCapital: balance,
      numberOfDays: results.length,
      finalCapitalInNaira: balance * multiplier,
      totalCapital: parseFloat(startCapital) + totalProfit,
    });

    setCurrentPage(1);
  };

  const paginatedResults = useMemo(() => {
    if (!calculatedResults) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return calculatedResults.results.slice(startIndex, startIndex + pageSize);
  }, [calculatedResults, currentPage, pageSize]);

  const totalPages = calculatedResults
    ? Math.ceil(calculatedResults.results.length / pageSize)
    : 0;

  return (
    <MainContainer>
      <Container isDarkMode={isDarkMode}>
        <InputContainer>
          <Input
            value={startCapital}
            onChange={(e) => setStartCapital(e.target.value)}
            placeholder="Starting Capital"
            isDarkMode={isDarkMode}
          />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            isDarkMode={isDarkMode}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            isDarkMode={isDarkMode}
          />
          <Input
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
            placeholder="Multiplier"
            isDarkMode={isDarkMode}
          />
          <Input
            value={monthlyBonus}
            onChange={(e) => setMonthlyBonus(Number(e.target.value))}
            placeholder="Monthly Bonus"
            isDarkMode={isDarkMode}
          />
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            isDarkMode={isDarkMode}
          >
            {[5, 10, 20, 50, 1000].map((size) => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </Select>
          <CalculateButton
            onClick={calculateTradingResults}
            isDarkMode={isDarkMode}
          >
            Calculate
          </CalculateButton>
        </InputContainer>
        <div>
          <p>Total Capital:</p>
          <strong>{formatCurrency(startCapital * multiplier)}</strong>
        </div>
        {calculatedResults && (
          <>
            <Table isDarkMode={isDarkMode}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Starting Capital</th>
                  <th>1st Trade Amount</th>
                  <th>1st Trade Profit</th>
                  <th>Capital After 1st Trade</th>
                  <th>2nd Trade Amount</th>
                  <th>2nd Trade Profit</th>
                  <th>Final Capital</th>
                  <th>Daily Profit</th>
                  <th>Daily Profit(NGN)</th>
                </tr>
              </thead>
              <tbody>
                {paginatedResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.date}</td>
                    <td>{result.startingCapital.toFixed(2)}</td>
                    <td>{result.firstTradeAmount.toFixed(2)}</td>
                    <td>{result.firstTradeProfit.toFixed(2)}</td>
                    <td>{result.capitalAfterFirstTrade.toFixed(2)}</td>
                    <td>{result.secondTradeAmount.toFixed(2)}</td>
                    <td>{result.secondTradeProfit.toFixed(2)}</td>
                    <td>{result.capitalAfterSecondTrade.toFixed(2)}</td>
                    <td>{result.dailyProfit.toFixed(2)}</td>
                    {formatCurrency(result.profitNaira.toFixed(2))}
                  </tr>
                ))}
              </tbody>
            </Table>
            {calculatedResults?.results.length > 0 && (
              <Pagination isDarkMode={isDarkMode}>
                {currentPage !== 1 && (
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Prev
                  </button>
                )}
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage !== totalPages && (
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                )}
              </Pagination>
            )}
          </>
        )}
        {calculatedResults?.results.length > 0 && (
          <div>
            <p>
              <strong>Number of Days:</strong> {calculatedResults?.numberOfDays}
            </p>
            <p>
              <strong>Final Capital (Naira):</strong>{" "}
              {formatCurrency(
                calculatedResults?.finalCapitalInNaira.toFixed(2)
              )}
            </p>
            <p>
              <strong>Total Capital:</strong>{" "}
              {calculatedResults?.totalCapital.toFixed(2)}
            </p>
          </div>
        )}
      </Container>
    </MainContainer>
  );
};

export default TradingProfitCalculator;
