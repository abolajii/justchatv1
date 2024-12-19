import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { parseISO, addDays, format } from "date-fns";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CalculateButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: right;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TotalSummary = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const TradingProfitCalculator = () => {
  const [startCapital, setStartCapital] = useState("130.16");
  const [startDate, setStartDate] = useState("2024-12-05");
  const [endDate, setEndDate] = useState("2024-12-18");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [multiplier, setMultiplier] = useState(1700);
  const [calculatedResults, setCalculatedResults] = useState(null);

  const calculateTradingResults = () => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const results = [];
    let currentCapital = parseFloat(startCapital);
    let totalProfit = 0;

    for (let date = start; date <= end; date = addDays(date, 1)) {
      // First trade at 1 PM
      const startingCapitalForDay = currentCapital;
      const firstTradeAmount = startingCapitalForDay * 0.01;
      const capitalAfterFirstTrade = startingCapitalForDay + firstTradeAmount;

      // Second trade at 5 PM
      const secondTradeAmount = capitalAfterFirstTrade * 0.01;
      currentCapital = capitalAfterFirstTrade + secondTradeAmount;

      const dailyProfit = firstTradeAmount + secondTradeAmount;
      totalProfit += dailyProfit;

      results.push({
        date: format(date, "yyyy-MM-dd"),
        startingCapital: startingCapitalForDay,
        firstTradeProfit: firstTradeAmount,
        capitalAfterFirstTrade,
        secondTradeProfit: secondTradeAmount,
        capitalAfterSecondTrade: currentCapital,
        dailyProfit,
      });
    }

    setCalculatedResults({
      results,
      totalProfit,
      finalCapital: currentCapital,
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
    <Container>
      <InputContainer>
        <Input
          type="number"
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
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          placeholder="Multiplier"
        />
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </Select>
        <CalculateButton onClick={calculateTradingResults}>
          Calculate
        </CalculateButton>
      </InputContainer>

      {calculatedResults && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Starting Capital</th>
                <th>1st Trade Profit</th>
                <th>Capital After 1st Trade</th>
                <th>2nd Trade Profit</th>
                <th>Capital After 2nd Trade</th>
                <th>Daily Profit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.date}</td>
                  <td>{result.startingCapital.toFixed(2)}</td>
                  <td>{result.firstTradeProfit.toFixed(2)}</td>
                  <td>{result.capitalAfterFirstTrade.toFixed(2)}</td>
                  <td>{result.secondTradeProfit.toFixed(2)}</td>
                  <td>{result.capitalAfterSecondTrade.toFixed(2)}</td>
                  <td>{result.dailyProfit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </PaginationButton>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <PaginationButton
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginationButton>
          </Pagination>

          <TotalSummary>
            <h3>Total Summary (Multiplied by {multiplier})</h3>
            <p>
              Total Profit: #
              {(calculatedResults.totalProfit * multiplier).toFixed(2)}
            </p>
            <p>
              Final Capital: #
              {(calculatedResults.finalCapital * multiplier).toFixed(2)}
            </p>
          </TotalSummary>
        </>
      )}
    </Container>
  );
};

export default TradingProfitCalculator;
