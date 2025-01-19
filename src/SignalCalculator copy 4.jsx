import React from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #1e1e1e;
  min-height: 100vh;
`;

const Card = styled.div`
  background: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  color: #ffffff;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #404040;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const SummaryCard = styled.div`
  background: #2d2d2d;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #404040;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryLabel = styled.span`
  color: #a0aec0;
  font-size: 0.875rem;
`;

const SummaryValue = styled.span`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
`;

const DayCard = styled.div`
  background: #363636;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #404040;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  color: #a0aec0;
  margin: 0;
`;

const ProfitText = styled.span`
  color: ${(props) => (props.$isPositive ? "#10B981" : "#EF4444")};
  font-weight: 600;
  font-size: ${(props) => (props.$isLarge ? "1.25rem" : "1rem")};
`;

const DayHeader = styled.div`
  margin-bottom: 1rem;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: #a0aec0;
`;

const WeeklyDetails = () => {
  // Format number helper function
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
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
        differenceInProfit: dayProfits.signal2Profit - dayProfits.signal1Profit,
      };

      weeklyData.push(dayData);
      runningCapital = dayProfits.finalBalance;
    }

    return weeklyData;
  };

  const weeklyData = generateWeeklyData();

  // Calculate weekly summary
  const weeklySummary = weeklyData.reduce(
    (acc, day) => {
      if (day.status === "Complete") {
        acc.totalProfit += day.totalProfit;
        acc.totalFirstSignal += day.firstSignalProfit;
        acc.totalSecondSignal += day.secondSignalProfit;
        acc.completedDays += 1;
      }
      return acc;
    },
    {
      totalProfit: 0,
      totalFirstSignal: 0,
      totalSecondSignal: 0,
      completedDays: 0,
    }
  );

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trading Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryCard>
            <SummaryGrid>
              <SummaryItem>
                <SummaryLabel>Total Profit</SummaryLabel>
                <SummaryValue>
                  ${formatNumber(weeklySummary.totalProfit)}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>First Signal Total</SummaryLabel>
                <SummaryValue>
                  ${formatNumber(weeklySummary.totalFirstSignal)}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Second Signal Total</SummaryLabel>
                <SummaryValue>
                  ${formatNumber(weeklySummary.totalSecondSignal)}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Completed Days</SummaryLabel>
                <SummaryValue>{weeklySummary.completedDays}</SummaryValue>
              </SummaryItem>
            </SummaryGrid>
          </SummaryCard>

          {weeklyData.map((day, index) => (
            <DayCard key={index}>
              <DayHeader>
                <DayTitle>{day.day}</DayTitle>
                <StatusText>Status: {day.status}</StatusText>
              </DayHeader>

              <Grid>
                <Section>
                  <SectionTitle>Capital</SectionTitle>
                  <div>
                    <div>Starting: ${formatNumber(day.startingCapital)}</div>
                    <div>Final: ${formatNumber(day.finalCapital)}</div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Signal Profits</SectionTitle>
                  <div>
                    <div>
                      Signal 1:{" "}
                      <ProfitText $isPositive={true}>
                        +${formatNumber(day.firstSignalProfit)}
                      </ProfitText>
                    </div>
                    <div>
                      Signal 2:{" "}
                      <ProfitText $isPositive={true}>
                        +${formatNumber(day.secondSignalProfit)}
                      </ProfitText>
                    </div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Total Profit</SectionTitle>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <ProfitText
                      $isPositive={day.totalProfit > 0}
                      $isLarge={true}
                    >
                      {day.totalProfit > 0 ? "+" : ""}$
                      {formatNumber(day.totalProfit)}
                    </ProfitText>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Profit Difference</SectionTitle>
                  <ProfitText $isPositive={day.differenceInProfit > 0}>
                    {day.differenceInProfit > 0 ? "+" : ""}$
                    {formatNumber(day.differenceInProfit)}
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
