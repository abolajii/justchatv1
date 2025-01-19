import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
  background: #121212;
  min-height: 100vh;
  color: #fff;
  font-size: 15px;
`;

const Card = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #374151;
  border-radius: 4px;
  font-size: 1rem;
  background: #2d2d2d;
  color: #fff;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const SubtractSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #2d2d2d;
  border-radius: 4px;
`;

const SubtractButton = styled.button`
  background: #3a8179;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #397870;
  }
`;

const SubtractInput = styled(Input)`
  max-width: 300px;
  margin-top: 0.5rem;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ToggleLabel = styled.label`
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 160px;
  height: 40px;
  background: #2d2d2d;
  border-radius: 20px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    left: ${(props) => (props.isNaira ? "84px" : "4px")};
    top: 4px;
    width: 72px;
    height: 32px;
    background: #3a8179;
    border-radius: 16px;
    transition: all 0.3s ease;
  }
`;

const CurrencyOption = styled.span`
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 76px;
  text-align: center;
  color: ${(props) => (props.active ? "#fff" : "#9ca3af")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  transition: all 0.3s ease;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #2d2d2d;
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
  border-bottom: 2px solid #374151;
  color: #9ca3af;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #374151;
  color: #fff;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background: #2d2d2d;
  border-radius: 4px;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PageButton = styled.button`
  background: ${(props) => (props.active ? "#3a8179" : "#1e1e1e")};
  color: ${(props) => (props.active ? "#fff" : "#9db9b6")};
  border: 1px solid #374151;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? "#9db9b6" : "#374151")};
  }
`;

const PageInfo = styled.span`
  color: #9ca3af;
  margin: 0 1rem;
`;

const RowSelector = styled.select`
  padding: 0.5rem;
  border: 1px solid #374151;
  border-radius: 4px;
  background: #1e1e1e;
  color: #fff;
  cursor: pointer;
`;

const Summary = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #2d2d2d;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryLabel = styled.span`
  color: #4dc5b9;
  font-size: 0.875rem;
`;

const SummaryValue = styled.strong`
  color: #fff;
  font-size: 1.125rem;
`;

const HolidayTag = styled.div`
  padding: 0.5rem;
  background: #1e1e1e;
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const HolidayName = styled.span`
  color: #6ac7bc;
  font-weight: 500;
`;

const HolidayDate = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
`;

const HolidayIndicator = styled.span`
  background: #3a8179;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  display: inline-block;
`;

const HolidayInfo = styled.span`
  color: #6ac7bc;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const DateCell = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
// const isHoliday = (date) => {
//   const formattedDate = date.toISOString().split("T")[0];
//   return formattedDate in holidays;
// };

// const getHolidayName = (date) => {
//   const formattedDate = date.toISOString().split("T")[0];
//   return holidays[formattedDate];
// };

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (amount, isNaira) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: isNaira ? "NGN" : "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const isHoliday = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate in adjustedHolidays;
};

const getHolidayInfo = (date) => {
  const formattedDate = date.toISOString().split("T")[0];
  return adjustedHolidays[formattedDate];
};
const calculateDaysUntilHoliday = (currentDate, holidayDate) => {
  const diffTime = holidayDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateDayProfits = (initialBalance) => {
  const firstTradeTotalAmount = initialBalance * 0.01;
  const firstTradeRemainingBalance = initialBalance - firstTradeTotalAmount;
  const firstTradeProfit = firstTradeTotalAmount * 0.88;
  const capitalAfterFirstTrade =
    firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit;

  const secondTradeTotalAmount = capitalAfterFirstTrade * 0.01;
  const secondTradeRemainingBalance =
    capitalAfterFirstTrade - secondTradeTotalAmount;
  const secondTradeProfit = secondTradeTotalAmount * 0.88;
  const finalBalance =
    secondTradeRemainingBalance + secondTradeTotalAmount + secondTradeProfit;

  return {
    signal1Capital: firstTradeTotalAmount,
    signal1Profit: firstTradeProfit,
    signal2Capital: secondTradeTotalAmount,
    signal2Profit: secondTradeProfit,
    totalProfit: finalBalance - initialBalance,
    finalBalance,
  };
};

const adjustHolidayDate = (date) => {
  const day = date.getDay();
  let adjustedDate = new Date(date);
  //   console.log(day);

  // If it's Saturday (6) or Sunday (0), move to next available weekday
  if (day === 6 || day === 0) {
    console.log(day);

    //     // Saturday -> Monday
    //     adjustedDate.setDate(date.getDate() + 2);
  } else if (day === 0) {
    //     // Sunday -> Monday
    //     adjustedDate.setDate(date.getDate() + 1);
  }

  return adjustedDate;
};

const holidaysWithDates = {
  "2025-01-01": {
    name: "New Year's Day",
    originalDate: new Date("2025-01-01"),
  },
  "2025-03-31": { name: "Eid El-Fitr", originalDate: new Date("2025-03-31") },
  "2025-04-01": {
    name: "Id el Fitr holiday",
    originalDate: new Date("2025-04-01"),
  },
  "2025-04-18": { name: "Good Friday", originalDate: new Date("2025-04-18") },
  "2025-04-21": { name: "Easter Monday", originalDate: new Date("2025-04-21") },
  "2025-05-01": { name: "Workers' Day", originalDate: new Date("2025-05-01") },
  "2025-06-07": { name: "Id el Kabir", originalDate: new Date("2025-06-07") },
  "2025-06-08": {
    name: "Id el Kabir additional holiday",
    originalDate: new Date("2025-06-08"),
  },
  "2025-06-12": { name: "Democracy Day", originalDate: new Date("2025-06-12") },
  "2025-09-05": { name: "Id el Maulud", originalDate: new Date("2025-09-05") },
  "2025-10-01": { name: "National Day", originalDate: new Date("2025-10-01") },
  "2025-12-25": { name: "Christmas Day", originalDate: new Date("2025-12-25") },
  "2025-12-26": { name: "Boxing Day", originalDate: new Date("2025-12-26") },
};

const isLeaveDay = (date) => {
  return leaveDays.some((leave) => {
    const currentDate = new Date(date);
    return currentDate >= leave.startDate && currentDate <= leave.endDate;
  });
};

const leaveDays = [
  {
    title: "First leave",
    startDate: new Date("2025-02-20"),
    endDate: new Date("2025-02-25"),
    length: 4,
  },
  {
    title: "Second leave",
    startDate: new Date("2025-08-18"),
    endDate: new Date("2025-08-29"),
    length: 10,
  },
  {
    title: "Third leave",
    startDate: new Date("2025-10-20"),
    endDate: new Date("2025-10-28"),
    length: 7,
  },
];
const adjustedHolidays = Object.entries(holidaysWithDates).reduce(
  (acc, [key, value]) => {
    const adjustedDate = adjustHolidayDate(value.originalDate);
    acc[adjustedDate.toISOString().split("T")[0]] = {
      ...value,
      adjustedDate,
      isAdjusted: adjustedDate.getTime() !== value.originalDate.getTime(),
    };
    return acc;
  },
  {}
);

const SignalCalculator = () => {
  const [capital, setCapital] = useState("940.23");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isNaira, setIsNaira] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSubtractInput, setShowSubtractInput] = useState(false);
  const [amountToSubtract, setAmountToSubtract] = useState("");
  const [newCapitalAfterSubtract, setNewCapitalAfterSubtract] = useState(0);
  const NGN_TO_USD = 1656;

  const getUpcomingHolidays = (startDate, endDate) => {
    if (!startDate || !endDate) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    return Object.values(adjustedHolidays)
      .filter(
        (holiday) =>
          holiday.adjustedDate >= start && holiday.adjustedDate <= end
      )
      .sort((a, b) => a.adjustedDate - b.adjustedDate);
  };

  const handleCurrencyChange = () => {
    const newIsNaira = !isNaira;
    setIsNaira(newIsNaira);

    if (capital) {
      const currentCapital = parseFloat(capital);
      const newCapital = newIsNaira
        ? currentCapital * NGN_TO_USD
        : currentCapital / NGN_TO_USD;
      setCapital(newCapital.toString());
    }
  };

  const generateDateRange = (start, end) => {
    const dates = [];
    const workingDays = [];
    const holidayDates = [];
    const leaveDates = [];

    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      const currentDate = new Date(current);
      const day = currentDate.getDay();
      const isWeekday = day === 1 || day === 2 || day === 4 || day === 5;

      if (isWeekday) {
        if (isHoliday(currentDate)) {
          holidayDates.push(currentDate);
        } else if (isLeaveDay(currentDate)) {
          leaveDates.push(currentDate);
        } else {
          workingDays.push(currentDate);
        }
      }
      dates.push(currentDate);
      current.setDate(current.getDate() + 1);
    }
    return { dates, workingDays, holidayDates, leaveDates };
  };

  const calculateDailyProfits = () => {
    if (!startDate || !endDate || !capital)
      return { profits: [], workingDays: [], holidayDates: [], leaveDates: [] };

    const { dates, workingDays, holidayDates, leaveDates } = generateDateRange(
      startDate,
      endDate
    );
    let runningBalance = parseFloat(capital);

    const profits = workingDays.map((date) => {
      const dayResults = calculateDayProfits(runningBalance);
      runningBalance = dayResults.finalBalance;
      return {
        date,
        ...dayResults,
      };
    });

    return { profits, workingDays, holidayDates, leaveDates };
  };

  const handleSubtract = () => {
    if (!amountToSubtract || !finalBalance) return;

    const subtractAmount = parseFloat(amountToSubtract);
    const newCapital = finalBalance - subtractAmount;

    setNewCapitalAfterSubtract(newCapital);
    setCapital(newCapital.toString());
    setStartDate(endDate);
    setEndDate("");
    setAmountToSubtract("");
    setShowSubtractInput(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const {
    profits: dailyProfits,
    workingDays,
    holidayDates,
    leaveDates,
  } = calculateDailyProfits();
  const totalProfits = dailyProfits.reduce(
    (sum, day) => sum + day.totalProfit,
    0
  );
  const totalDays = dailyProfits.length;
  const totalWorkingDays = workingDays.length;
  const totalLeaveDays = leaveDays.length;
  const finalBalance =
    dailyProfits.length > 0
      ? dailyProfits[dailyProfits.length - 1].finalBalance
      : 0;

  const totalPages = Math.ceil(dailyProfits.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, dailyProfits.length);
  const currentData = dailyProfits.slice(startIndex, endIndex);

  return (
    <Container>
      <Card>
        <CardHeader>
          <Title>Signal Profit Calculator</Title>
        </CardHeader>

        <InputGroup>
          <FormGroup>
            <Label>Capital Amount ({isNaira ? "NGN" : "USD"})</Label>
            <Input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="Enter capital amount"
            />
          </FormGroup>

          <FormGroup>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormGroup>
        </InputGroup>

        <ToggleContainer>
          <Label>Select Currency:</Label>
          <ToggleLabel>
            <ToggleInput
              type="checkbox"
              checked={isNaira}
              onChange={handleCurrencyChange}
            />
            <ToggleSwitch isNaira={isNaira} className="center">
              <CurrencyOption active={!isNaira}>USD</CurrencyOption>
              <CurrencyOption active={isNaira}>NGN</CurrencyOption>
            </ToggleSwitch>
          </ToggleLabel>
        </ToggleContainer>

        <div style={{ margin: "1rem 0" }}>
          <div style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
            Current Capital
          </div>
          <div style={{ fontSize: "1.25rem", color: "#fff" }}>
            {formatCurrency(finalBalance, isNaira)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <FormGroup style={{ width: "auto" }}>
            <Label>Rows per page</Label>
            <RowSelector value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={1000}>1000</option>
            </RowSelector>
          </FormGroup>
        </div>

        {dailyProfits.length > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Signal 1 Capital</Th>
                  <Th>Signal 1 Profit</Th>
                  <Th>Signal 2 Capital</Th>
                  <Th>Signal 2 Profit</Th>
                  <Th>Total Profit</Th>
                  <Th>Balance</Th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((day, index) => {
                  const holidayInfo = getHolidayInfo(day.date);
                  return (
                    <tr key={index}>
                      <Td>
                        <DateCell>
                          {formatDate(day.date)}
                          {holidayInfo && (
                            <>
                              <HolidayIndicator>
                                {holidayInfo.name}
                                {holidayInfo.isAdjusted &&
                                  " (Moved from weekend)"}
                              </HolidayIndicator>
                            </>
                          )}
                        </DateCell>
                      </Td>
                      <Td>{formatCurrency(day.signal1Capital, isNaira)}</Td>
                      <Td>{formatCurrency(day.signal1Profit, isNaira)}</Td>
                      <Td>{formatCurrency(day.signal2Capital, isNaira)}</Td>
                      <Td>{formatCurrency(day.signal2Profit, isNaira)}</Td>
                      <Td>{formatCurrency(day.totalProfit, isNaira)}</Td>
                      <Td>{formatCurrency(day.finalBalance, isNaira)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <PaginationContainer>
              <PaginationControls>
                <PageButton
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </PageButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PageButton
                      key={page}
                      active={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PageButton>
                  )
                )}
                <PageButton
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </PageButton>
              </PaginationControls>
              <PageInfo>
                Showing {startIndex + 1} to {endIndex} of {dailyProfits.length}{" "}
                entries
              </PageInfo>
            </PaginationContainer>

            <Summary>
              <SummaryItem>
                <SummaryLabel>Total Days</SummaryLabel>
                <SummaryValue>{totalDays}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel> Working Days</SummaryLabel>
                <SummaryValue>{totalWorkingDays}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Leave Days</SummaryLabel>
                <SummaryValue>{totalLeaveDays}</SummaryValue>
              </SummaryItem>

              <SummaryItem>
                <SummaryLabel>Initial Capital</SummaryLabel>
                <SummaryValue>
                  {formatCurrency(parseFloat(capital), isNaira)}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Total Profits</SummaryLabel>
                <SummaryValue>
                  {formatCurrency(totalProfits, isNaira)}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Final Balance</SummaryLabel>
                <SummaryValue>
                  {formatCurrency(finalBalance, isNaira)}
                </SummaryValue>
              </SummaryItem>
            </Summary>
          </>
        )}
        {/* {holidayDates.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#2d2d2d",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#4dc5b9" }}>
              Holidays in Selected Range:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {holidayDates.map((date, index) => (
                <HolidayTag key={index}>
                  <HolidayName>{getHolidayName(date)}</HolidayName>
                  <HolidayDate>{formatDate(date)}</HolidayDate>
                </HolidayTag>
              ))}
            </div>
          </div>
        )} */}

        {startDate && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#2d2d2d",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#4dc5b9" }}>
              Upcoming Holidays:
            </h3>
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {getUpcomingHolidays(startDate, endDate).map((holiday, index) => {
                const daysUntil = calculateDaysUntilHoliday(
                  new Date(startDate),
                  holiday.adjustedDate
                );
                return (
                  <div
                    key={index}
                    // style={{ display: "flex", alignItems: "center" }}
                  >
                    <HolidayTag>
                      <HolidayName>
                        {holiday.name}
                        {holiday.isAdjusted && " (Moved from weekend)"}
                      </HolidayName>
                      <HolidayDate>
                        {formatDate(holiday.adjustedDate)}
                      </HolidayDate>
                    </HolidayTag>
                    <HolidayInfo>
                      {daysUntil > 0 ? `${daysUntil} days away` : "Today"}
                    </HolidayInfo>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {leaveDates.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#2d2d2d",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#4dc5b9" }}>
              Leave Days in Selected Range:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {leaveDates.map((date, index) => (
                <HolidayTag key={index}>
                  <HolidayName>
                    {
                      leaveDays.find(
                        (leave) =>
                          date >= leave.startDate && date <= leave.endDate
                      )?.title
                    }
                  </HolidayName>
                  <HolidayDate>{formatDate(date)}</HolidayDate>
                </HolidayTag>
              ))}
            </div>
          </div>
        )}

        {finalBalance > 0 && (
          <SubtractSection>
            <SubtractButton
              onClick={() => setShowSubtractInput(!showSubtractInput)}
            >
              {showSubtractInput ? "Cancel" : "Subtract Amount"}
            </SubtractButton>

            {showSubtractInput && (
              <div style={{ marginTop: "1rem" }}>
                <Label>Amount to Subtract ({isNaira ? "NGN" : "USD"})</Label>
                <SubtractInput
                  type="number"
                  value={amountToSubtract}
                  onChange={(e) => setAmountToSubtract(e.target.value)}
                  placeholder={`Enter amount to subtract`}
                />
                <SubtractButton
                  onClick={handleSubtract}
                  style={{ marginTop: "0.5rem" }}
                >
                  Confirm Subtraction
                </SubtractButton>
              </div>
            )}
          </SubtractSection>
        )}
      </Card>
    </Container>
  );
};

export default SignalCalculator;
