import React, { useState } from "react";
import styled from "styled-components";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
// Styled Components
const Container = styled.div`
  padding: 1rem;
  margin: 0 auto;
  background-color: #111827;
  min-height: 100vh;
`;

const Card = styled.div`
  background: #1f2937;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  border: 1px solid #374151;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #374151;
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
  background: #283548;
  color: #f3f4f6;
  border: 1px solid #374151;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: #374151;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const WeeklySummary = styled.div`
  background: #283548;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  border: 1px solid #374151;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryLabel = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SummaryValue = styled.span`
  color: #f3f4f6;
  font-size: 1.25rem;
  font-weight: 600;
`;

const DayCard = styled.div`
  background: #1f2937;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #374151;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
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
  background: #283548;
  border-radius: 8px;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProfitText = styled.span`
  color: ${(props) => (props.$isPositive ? "#34D399" : "#F87171")};
  font-weight: 600;
  font-size: ${(props) => (props.$isLarge ? "1.5rem" : "1.125rem")};
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
  background: #374151;
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

const WeeklyDetails = () => {
  const [currency, setCurrency] = useState("USD");
  const NGN_RATE = 1656;

  const formatCurrency = (amount) => {
    if (currency === "USD") {
      return `$${amount.toFixed(2)}`;
    }
    return `₦${(amount * NGN_RATE).toFixed(2)}`;
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

  const generateWeeklyData = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date("2025-01-19");
    const currentDay = currentDate.getDay();
    let weeklyData = [];
    let runningCapital = 956.99;

    for (let i = 0; i < 7; i++) {
      const dayIndex = (i + currentDay) % 7;
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (currentDay - i));

      const dayProfits = calculateDayProfits(runningCapital);

      const dayData = {
        day: `${days[dayIndex]}, ${date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`,
        startingCapital: runningCapital,
        totalProfit: dayProfits.totalProfit,
        finalCapital: dayProfits.finalBalance,
        status: i <= currentDay ? "Complete" : "Pending",
        firstSignalProfit: dayProfits.signal1Profit,
        secondSignalProfit: dayProfits.signal2Profit,
        differenceInPofiit: dayProfits.signal2Profit - dayProfits.signal1Profit,
      };

      weeklyData.push(dayData);
      runningCapital = dayProfits.finalBalance;
    }

    return weeklyData;
  };

  const weeklyData = generateWeeklyData();

  const weeklyTotals = weeklyData.reduce(
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

  return (
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
        <CardContent>
          <WeeklySummary>
            <SummaryItem>
              <SummaryLabel>Total Weekly Profit</SummaryLabel>
              <SummaryValue>
                {formatCurrency(weeklyTotals.totalProfit)}
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Final Capital</SummaryLabel>
              <SummaryValue>
                {formatCurrency(weeklyTotals.totalCapital)}
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Total Signal 1 Profits</SummaryLabel>
              <SummaryValue>
                {formatCurrency(weeklyTotals.totalFirstSignal)}
              </SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Total Signal 2 Profits</SummaryLabel>
              <SummaryValue>
                {formatCurrency(weeklyTotals.totalSecondSignal)}
              </SummaryValue>
            </SummaryItem>
          </WeeklySummary>

          {weeklyData.map((day, index) => (
            <DayCard key={index}>
              <DayHeader>
                <DayTitle>{day.day}</DayTitle>
                <StatusText>{day.status}</StatusText>
              </DayHeader>

              <Grid>
                <Section>
                  <SectionTitle>Capital</SectionTitle>
                  <SignalGrid>
                    <ValueText>
                      Starting: {formatCurrency(day.startingCapital)}
                    </ValueText>
                    <ValueText>
                      Final: {formatCurrency(day.finalCapital)}
                    </ValueText>
                  </SignalGrid>
                </Section>

                <Section>
                  <SectionTitle>Signal Profits</SectionTitle>
                  <SignalGrid>
                    <ValueText>
                      Signal 1:{" "}
                      <ProfitText $isPositive={true}>
                        +{formatCurrency(day.firstSignalProfit)}
                      </ProfitText>
                    </ValueText>
                    <ValueText>
                      Signal 2:{" "}
                      <ProfitText $isPositive={true}>
                        +{formatCurrency(day.secondSignalProfit)}
                      </ProfitText>
                    </ValueText>
                  </SignalGrid>
                </Section>

                <Section>
                  <SectionTitle>Total Profit</SectionTitle>
                  <ValueText>
                    <ProfitText
                      $isPositive={day.totalProfit > 0}
                      $isLarge={true}
                    >
                      {day.totalProfit > 0 ? "+" : ""}
                      {formatCurrency(day.totalProfit)}
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
                  <ProfitText $isPositive={day.differenceInPofiit > 0}>
                    {day.differenceInPofiit > 0 ? "+" : ""}
                    {formatCurrency(day.differenceInPofiit)}
                  </ProfitText>
                </Section>
              </Grid>
            </DayCard>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default WeeklyDetails;
