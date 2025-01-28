import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  format,
  isWeekend,
  addDays,
  isWednesday,
  getDaysInMonth,
  startOfMonth,
  isSameDay,
  differenceInDays,
  setDate,
  isFriday,
  subDays,
  nextFriday,
  previousFriday,
} from "date-fns";
import { darkTheme, lightTheme } from "../../store/useThemeStore";

const Container = styled.div`
  padding: 2rem;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.avatarBorder};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const MonthCard = styled(Card)`
  &:hover {
    box-shadow: 0 4px 6px ${({ theme }) => theme.avatarBorder};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const MonthTitle = styled.h3`
  font-weight: 600;
  color: ${({ theme }) => theme.primaryColor};
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.25rem 0;
`;

const HolidayList = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0.5rem;
`;

const TotalCard = styled(Card)`
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.primaryColor};
`;

const TotalText = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1.1rem;
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.btnColor};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

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

const getPayday = (month) => {
  let payday = setDate(month, 24);

  if (isWeekend(payday)) {
    payday = previousFriday(payday);
  }

  return payday;
};

const CountdownText = styled.div`
  background: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.background};
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  width: fit-content;
  margin-bottom: 20px;
`;

const MonthlyView = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const DAILY_FEEDING = 1500;
  const DAILY_TRANSPORT = 2000;
  const MONTHLY_SALARY = 536000;

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [countdown, setCountdown] = useState("");

  const isHoliday = (date) => {
    return Object.keys(holidaysWithDates).some((key) =>
      isSameDay(new Date(key), date)
    );
  };

  const getMonthHolidays = (month) => {
    return Object.entries(holidaysWithDates)
      .filter(([key]) => new Date(key).getMonth() === month)
      .map(([_, value]) => value.name);
  };

  const calculateWorkdays = (month) => {
    const daysInMonth = getDaysInMonth(month);
    const firstDay = startOfMonth(month);
    let workdays = 0;
    let transportDays = 0;
    let holidaysInMonth = [];

    for (let i = 0; i < daysInMonth; i++) {
      const currentDay = addDays(firstDay, i);
      const isWorkday = !isWeekend(currentDay) && !isHoliday(currentDay);

      if (isWorkday) {
        workdays++;
        if (!isWednesday(currentDay)) {
          transportDays++;
        }
      }
    }

    holidaysInMonth = getMonthHolidays(month.getMonth());

    const payday = getPayday(month);
    return { workdays, transportDays, holidays: holidaysInMonth, payday };
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      let nextPayday = getPayday(new Date(currentYear, currentMonth));

      if (now > nextPayday) {
        nextPayday = getPayday(new Date(currentYear, currentMonth + 1));
      }

      const daysLeft = differenceInDays(nextPayday, now);
      setCountdown(
        `${daysLeft} days until next payday (${format(
          nextPayday,
          "MMMM dd, yyyy"
        )})`
      );
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const months = [];
    for (let month = 1; month < 12; month++) {
      const date = new Date(2025, month);
      const { workdays, transportDays, holidays, payday } =
        calculateWorkdays(date);

      const transportCost = transportDays * DAILY_TRANSPORT;
      const feedingCost = workdays * DAILY_FEEDING;
      const netSalary = MONTHLY_SALARY - transportCost - feedingCost;

      const monthData = {
        month: format(date, "MMMM"),
        workdays,
        transportDays,
        feeding: feedingCost,
        transport: transportCost,
        salary: MONTHLY_SALARY,
        netSalary,
        holidays,
        payday: format(payday, "MMM dd"),
      };
      months.push(monthData);
    }
    setMonthlyData(months);
  }, []);

  const totalRemainingSalary = monthlyData.reduce(
    (sum, month) => sum + month.netSalary,
    0
  );

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Card>
          <CountdownText>{countdown}</CountdownText>
          <Header>
            <Title>Monthly Breakdown 2025 (Feb-Dec)</Title>
          </Header>

          {monthlyData.map((month) => (
            <MonthCard key={month.month}>
              <Grid>
                <Section>
                  <MonthTitle>{month.month}</MonthTitle>
                  <Text>Workdays Days: {month.transportDays}</Text>
                </Section>
                <Section>
                  <Text>Transport: ₦{month.transport.toLocaleString()}</Text>
                  <Text>Feeding: ₦{month.feeding.toLocaleString()}</Text>
                  <Text>Net Salary: ₦{month.netSalary.toLocaleString()}</Text>
                </Section>
                <Section>
                  <Text>Gross Salary: ₦{month.salary.toLocaleString()}</Text>
                  {month.holidays.length > 0 && (
                    <HolidayList>
                      Holidays: {month.holidays.join(", ")}
                    </HolidayList>
                  )}
                </Section>
              </Grid>
            </MonthCard>
          ))}

          <TotalCard>
            <TotalText>
              Total Remaining Net Salary (Feb-Dec): ₦
              {totalRemainingSalary.toLocaleString()}
            </TotalText>
          </TotalCard>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default MonthlyView;
