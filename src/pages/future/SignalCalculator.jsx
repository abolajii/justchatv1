import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";
import { parseISO, addDays, format } from "date-fns";

import useThemeStore from "../../store/useThemeStore";
import MainContainer from "../../pages/future/MainContainer";
import useSignalStore from "./store/useSignalStore";

const Container = styled.div`
  /* max-width: 1400px; */
  /* margin: 0 auto; */
  /* height: 100%; */
  /* overflow-y: scroll; */
  padding: 20px 0;
  font-family: Arial, sans-serif;
  /* background-color: ${(props) =>
    props.isDarkMode ? "#1e1e1e" : "#ffffff"}; */
  color: #e0e0e0;

  p {
    font-size: 13px;
    color: #e0e0e0;
  }

  overflow: scroll;
  height: calc(100% - 80px);
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
  border: 1px solid #444;
  color: #e0e0e0;
  background-color: #1e1e1e;
`;

const Select = styled.select`
  ${baseInputStyles}
  border: 1px solid #444;
  color: #e0e0e0;
  background-color: #1e1e1e;
`;

const CalculateButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #444;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #444;
    color: #e0e0e0;
    background-color: #1e1e1e;
    /* border: 1px solid ${(props) => (props.isDarkMode ? "#444" : "#ddd")}; */
    padding: 2px;
    font-size: 12px;
    /* color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#000000")}; */
  }

  th {
    background-color: #1e1e1e;
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
    border: 1px solid #444;
    color: #e0e0e0;
    background-color: #1e1e1e;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1e1e1e;
    }
  }

  span {
    padding: 8px;
    font-size: 14px;
    color: #e0e0e0;
  }
`;

const formatCurrency = (value, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

const SignalCalculator = () => {
  const { defaultValue } = useSignalStore();

  const [startCapital, setStartCapital] = useState(defaultValue);
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
    const dailyProfitRate = 0.01 * 0.87; // 1% of capital with 88% profit
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
      <div>
        <h1 className="mb-4 mt-3">Welcome to Signal Calculator.</h1>
        <Container>
          <InputContainer>
            <Input
              value={startCapital}
              onChange={(e) => setStartCapital(e.target.value)}
              placeholder="Starting Capital"
            />
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Input
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value))}
              placeholder="Multiplier"
            />
            <Input
              value={monthlyBonus}
              onChange={(e) => setMonthlyBonus(Number(e.target.value))}
              placeholder="Monthly Bonus"
            />
            <Select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 50, 1000].map((size) => (
                <option key={size} value={size}>
                  {size} rows
                </option>
              ))}
            </Select>
            <CalculateButton onClick={calculateTradingResults}>
              Calculate
            </CalculateButton>
          </InputContainer>
          <div>
            <p>Total Capital:</p>
            <strong>{formatCurrency(startCapital * multiplier)}</strong>
          </div>
          {calculatedResults && (
            <>
              <Table>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
              {calculatedResults?.results.length > 0 && (
                <Pagination>
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
                <strong>Number of Days:</strong>{" "}
                {calculatedResults?.numberOfDays}
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
      </div>
    </MainContainer>
  );
};

export default SignalCalculator;
