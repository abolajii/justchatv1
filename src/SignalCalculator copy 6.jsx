import React, { useState } from "react";
import styled from "styled-components";
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
} from "lucide-react";

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const DayCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #eee;
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
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfitText = styled.span`
  color: ${(props) => (props.$isPositive ? "#10B981" : "#EF4444")};
  font-weight: 600;
  font-size: ${(props) => (props.$isLarge ? "1.25rem" : "1rem")};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DayHeader = styled.div`
  margin-bottom: 1rem;
`;

const DayTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const CurrencyToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #10b981;
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;

const WeeklyDetails = () => {
  const [isNGN, setIsNGN] = useState(false);
  const NGN_RATE = 1650; // NGN to USD exchange rate

  // Format currency based on selected currency
  const formatCurrency = (amount) => {
    if (isNGN) {
      const ngnAmount = amount * NGN_RATE;
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(ngnAmount);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Function to calculate profits based on initial balance
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

  // Generate weekly data
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

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>
            <BarChart2 size={24} />
            Weekly Trading Summary
          </CardTitle>
          <CurrencyToggle>
            <ToggleLabel>USD</ToggleLabel>
            <Switch>
              <ToggleInput
                type="checkbox"
                checked={isNGN}
                onChange={() => setIsNGN(!isNGN)}
              />
              <Slider />
            </Switch>
            <ToggleLabel>NGN</ToggleLabel>
          </CurrencyToggle>
        </CardHeader>
        <CardContent>
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
                    <div>Starting: {formatCurrency(day.startingCapital)}</div>
                    <div>Final: {formatCurrency(day.finalCapital)}</div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Signal Profits</SectionTitle>
                  <div>
                    <div className="flex">
                      Signal 1:{" "}
                      <ProfitText $isPositive={true}>
                        <ArrowUpRight size={16} />
                        {formatCurrency(day.firstSignalProfit)}
                      </ProfitText>
                    </div>
                    <div className="flex">
                      Signal 2:{" "}
                      <ProfitText $isPositive={true}>
                        <ArrowUpRight size={16} />
                        {formatCurrency(day.secondSignalProfit)}
                      </ProfitText>
                    </div>
                  </div>
                </Section>

                <Section>
                  <SectionTitle>Total Profit</SectionTitle>
                  <ProfitText $isPositive={day.totalProfit > 0} $isLarge={true}>
                    {day.totalProfit > 0 ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    {formatCurrency(day.totalProfit)}
                  </ProfitText>
                </Section>

                <Section>
                  <SectionTitle>Profit Difference</SectionTitle>
                  <ProfitText $isPositive={day.differenceInProfit > 0}>
                    {day.differenceInProfit > 0 ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    {formatCurrency(day.differenceInProfit)}
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
