import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import MainContainer from "../future/MainContainer";
import useSignalStore from "../future/store/useSignalStore";
import SignalWidget from "../future/SignalWidget";
import { getUserSignal } from "../../api/request";
import { getCapitalForBeginningOfTheWeek } from "../../helpers";
import { generateWeeklyData } from "../../utils";
import MonthlyView from "./MonthlyView";

// Styled Components
const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  overflow: scroll;
`;

const Card = styled.div`
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  padding-top: 1.5rem;
  padding-right: 1.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f3f4f6;
  margin: 0;
`;

const CurrencyToggle = styled.button`
  color: #f3f4f6;
  background: #2d2d2d;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    background: #374151;
  }
`;

const CardContent = styled.div`
  padding-top: 1.5rem;
  padding-right: 1rem;
`;

const WeeklySummary = styled.div`
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #2d2d2d;
  padding: 1rem;
  border-radius: 8px;
`;

const SummaryLabel = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SummaryValue = styled.span`
  color: #34d399;
  font-size: 1.25rem;
  font-weight: 600;
`;

const DayCard = styled.div`
  background: #2d2d2d;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: #1e1e1e;
  border-radius: 8px;
`;

const SectionTitle = styled.h4`
  font-size: 0.805rem;
  color: #9ca3af;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProfitText = styled.span`
  color: ${(props) => (props.$isPositive ? "#34D399" : "#F87171")};
  font-weight: 600;
  font-size: ${(props) => (props.$isLarge ? "1rem" : "1rem")};
  text-shadow: 0 0 10px
    ${(props) =>
      props.$isPositive
        ? "rgba(52, 211, 153, 0.3)"
        : "rgba(248, 113, 113, 0.3)"};
`;

const DayHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #f3f4f6;
  margin-bottom: 0.5rem;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
  background: #1e1e1e;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

const ValueText = styled.div`
  color: #d1d5db;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SignalGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const StatusTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.6rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;

  ${(props) => {
    switch (props.$status.toLowerCase()) {
      case "not started":
      case "awaiting next signal":
        return `
          background-color: #416cc1d8;
          color: #bbc2ff;
        `;
      case "pending":
        return `
          background-color: #374151;
          color: #9CA3AF;
        `;
      case "inprogress":
        return `
          background-color: #854D0E;
          color: #FDE68A;
        `;
      case "done":
      case "completed":
        return `
      background-color: #065F46;
          color: #A7F3D0;
        `;
      default:
        return `
          background-color: #374151;
          color: #9CA3AF;
        `;
    }
  }}
`;

const NextWeekButton = styled.button`
  background-color: #34d399;
  color: #1e1e1e;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #10b981;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(52, 211, 153, 0.2);
  }
`;

// Example usage in the component

// Currency formatter utility
const formatCurrency = (amount, currency) => {
  const conversionRate = 1656; // 1 USD = 1656 NGN
  let convertedAmount = amount;

  if (currency === "NGN") {
    convertedAmount = amount * conversionRate;
  } else if (currency !== "USD") {
    throw new Error(`Unsupported currency: ${currency}`);
  }

  const symbol = currency === "USD" ? "$" : "₦";
  return `${symbol}${Number(convertedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Weekly = () => {
  const { setWeeklyCapital, weeklyCapital, setDefaultValue } = useSignalStore();
  const [completedSignals, setCompletedSignals] = useState(0);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await getUserSignal();
        if (response?.startingCapital) {
          // Initially show Naira as primary currency
          setWeeklyCapital(response.weeklyCapital);
          setDefaultValue(response.startingCapital);
          // setBalance(dollarAmount);
        }
      } catch (error) {
        console.error("Failed to fetch signal:", error);
      }
    };

    fetchSignal();
  }, []);

  // Test with your actual values
  // // Test with actual values
  // console.log("Test 1:", getCapitalForBeginningOfTheWeek(defaultValue, 1));

  // const weekly = getCapitalForBeginningOfTheWeek(defaultValue, 1);
  // console.log(weekly);

  const [currency, setCurrency] = useState("USD");
  const [signalsStatus, setSignalsStatus] = useState("not started");
  const [currentWeekData, setCurrentWeekData] = useState(null);

  // Track week progression
  const [weekNumber, setWeekNumber] = useState(1);

  const weeklyData = generateWeeklyData(weeklyCapital, signalsStatus);

  const [showMonthly, setShowMonthly] = useState(false);

  const displayData = currentWeekData || weeklyData;

  console.log(currentWeekData, weeklyData);

  const weeklyTotals = displayData.reduce(
    (totals, day) => ({
      totalProfit: totals.totalProfit + day.totalProfit,
      totalCapital: day.finalCapital,
      totalFirstSignal: totals.totalFirstSignal + day.firstSignalProfit,
      totalSecondSignal: totals.totalSecondSignal + day.secondSignalProfit,
    }),
    {
      totalProfit: 0,
      totalCapital: 0,
      totalFirstSignal: 0,
      totalSecondSignal: 0,
    }
  );

  const formatAmount = (amount) => {
    return formatCurrency(amount, currency);
  };

  const generateNextWeekResult = () => {
    // Get the last day's date from the current week's data
    const lastDayDate = displayData[displayData.length - 1].date;

    // console.log(lastDayDate);

    // Generate new weekly data, passing the last day's date
    const nextWeekData = generateWeeklyData(
      weeklyTotals.totalCapital,
      "not started",
      lastDayDate
    );

    // Update state with the new week's data
    setCurrentWeekData(nextWeekData);

    // Increment week number
    setWeekNumber((prev) => prev + 1);

    // Update weekly capital in the store
    setWeeklyCapital(weeklyTotals.totalCapital);
  };

  return (
    <MainContainer>
      <Container>
        <Card>
          <CardHeader>
            <HeaderContainer>
              <CardTitle>Weekly Trading Summary</CardTitle>
              <CurrencyToggle
                onClick={() =>
                  setCurrency((curr) => (curr === "USD" ? "NGN" : "USD"))
                }
              >
                {currency === "USD" ? "Switch to NGN" : "Switch to USD"}
              </CurrencyToggle>
            </HeaderContainer>
          </CardHeader>

          <div className="flex justify-between align-center">
            <SignalWidget
              setSignalsStatus={setSignalsStatus}
              signalsStatus={signalsStatus}
              setCompletedSignals={setCompletedSignals}
            />
            <div className="mr-4 pr-3">
              <CurrencyToggle onClick={() => setShowMonthly(true)}>
                View Month
              </CurrencyToggle>
            </div>
          </div>
          {!showMonthly && <p>Week ({weekNumber})</p>}
          {!showMonthly && (
            <NextWeekButton
              onClick={() => {
                // get next week result start from the
                // weeklyTotals.totalCapital , etc.
                generateNextWeekResult();
              }}
            >
              Get Next Week Result
              <IoIosTrendingUp size={20} />
            </NextWeekButton>
          )}

          {showMonthly && <MonthlyView />}

          {!showMonthly && (
            <CardContent>
              <WeeklySummary>
                <SummaryItem>
                  <SummaryLabel>Starting Capital</SummaryLabel>
                  <SummaryValue>{formatAmount(weeklyCapital)}</SummaryValue>
                </SummaryItem>

                <SummaryItem>
                  <SummaryLabel>Final Capital</SummaryLabel>
                  <SummaryValue>
                    {formatAmount(weeklyTotals.totalCapital)}
                  </SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Total Weekly Profit</SummaryLabel>
                  <SummaryValue>
                    {formatAmount(weeklyTotals.totalProfit)}
                  </SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Total Signal 1 Profits</SummaryLabel>
                  <SummaryValue>
                    {formatAmount(weeklyTotals.totalFirstSignal)}
                  </SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Total Signal 2 Profits</SummaryLabel>
                  <SummaryValue>
                    {formatAmount(weeklyTotals.totalSecondSignal)}
                  </SummaryValue>
                </SummaryItem>
              </WeeklySummary>

              {displayData.map((day, index) => {
                const today =
                  day.date.toLocaleDateString() ===
                  new Date().toLocaleDateString();

                return (
                  <DayCard key={index}>
                    <DayHeader>
                      <div className="flex justify-between align-center">
                        <DayTitle>{day.day}</DayTitle>
                        {today && <StatusTag $status={"done"}>Today</StatusTag>}
                      </div>
                      <StatusTag $status={day.status}>
                        {day.status.toLocaleUpperCase()}
                      </StatusTag>
                    </DayHeader>

                    <Grid>
                      <Section>
                        <SectionTitle>Capital</SectionTitle>
                        <SignalGrid>
                          <ValueText>
                            Starting: {formatAmount(day.startingCapital)}
                          </ValueText>
                          <ValueText>
                            Final: {formatAmount(day.finalCapital)}
                          </ValueText>
                        </SignalGrid>
                      </Section>

                      <Section>
                        <SectionTitle>Signal Profits</SectionTitle>
                        <SignalGrid>
                          <ValueText>
                            Signal 1:{" "}
                            <ProfitText $isPositive={true}>
                              +{formatAmount(day.firstSignalProfit)}
                            </ProfitText>
                          </ValueText>
                          <ValueText>
                            Signal 2:{" "}
                            <ProfitText $isPositive={true}>
                              +{formatAmount(day.secondSignalProfit)}
                            </ProfitText>
                          </ValueText>
                        </SignalGrid>
                      </Section>

                      <Section>
                        <SectionTitle>Total Profit</SectionTitle>
                        <ValueText>
                          <ProfitText $isPositive={day.totalProfit > 0}>
                            {day.totalProfit > 0 ? "+" : ""}
                            {formatAmount(day.totalProfit)}
                          </ProfitText>
                          {day.totalProfit > 0 ? (
                            <IoIosTrendingUp size={20} color="#34D399" />
                          ) : (
                            <IoIosTrendingDown size={20} color="#F87171" />
                          )}
                        </ValueText>
                      </Section>

                      <Section>
                        <SectionTitle>Profit Difference</SectionTitle>
                        <ProfitText $isPositive={day.differenceInProfit > 0}>
                          {day.differenceInProfit > 0 ? "+" : ""}
                          {formatAmount(day.differenceInProfit)}
                        </ProfitText>
                      </Section>
                    </Grid>
                  </DayCard>
                );
              })}
            </CardContent>
          )}
        </Card>
      </Container>
    </MainContainer>
  );
};

export default Weekly;
