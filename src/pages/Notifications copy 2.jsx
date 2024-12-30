import React, { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MonthTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
`;

const NavigationButton = styled.button`
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};

  &:hover {
    background-color: ${(props) =>
      props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  }
`;

const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
  font-size: 0.875rem;
  cursor: ${(props) => (props.isDay ? "pointer" : "default")};
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  background-color: ${(props) => {
    if (props.isToday) {
      return props.isDarkMode
        ? "rgba(59, 130, 246, 0.5)"
        : "rgba(59, 130, 246, 0.1)";
    }
    return "transparent";
  }};
  border-radius: 4px;
  font-weight: ${(props) => (props.isToday ? "600" : "normal")};

  &:hover {
    background-color: ${(props) =>
      props.isDay &&
      (props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)")};
  }
`;

const Calendar = ({ isDarkMode = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDetails = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { year, month, firstDay, daysInMonth };
  };

  const generateDays = () => {
    const { firstDay, daysInMonth } = getMonthDetails();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <CalendarContainer>
      <Header>
        <NavigationButton
          isDarkMode={isDarkMode}
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeft size={20} />
        </NavigationButton>

        <MonthTitle isDarkMode={isDarkMode}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthTitle>

        <NavigationButton
          isDarkMode={isDarkMode}
          onClick={() => changeMonth(1)}
        >
          <ChevronRight size={20} />
        </NavigationButton>
      </Header>

      <WeekDaysGrid>
        {weekDays.map((day) => (
          <WeekDay key={day} isDarkMode={isDarkMode}>
            {day}
          </WeekDay>
        ))}
      </WeekDaysGrid>

      <DaysGrid>
        {generateDays().map((day, index) => (
          <DayCell
            key={index}
            isDarkMode={isDarkMode}
            isDay={day !== null}
            isToday={isToday(day)}
          >
            {day}
          </DayCell>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default Calendar;
