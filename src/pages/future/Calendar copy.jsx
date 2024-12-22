import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import styled from "styled-components";

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 370px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const MonthHeader = styled.h2`
  color: #ffffff;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChevronButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const WeekDay = styled.div`
  color: #9ca3af;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

const DayCell = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${(props) => (props.isToday ? "9999px" : "8px")};
  background-color: ${(props) => (props.isToday ? "#2563eb" : "transparent")};
  color: ${(props) => (props.isToday ? "#ffffff" : "#d1d5db")};

  &:hover {
    background-color: ${(props) => (props.isToday ? "#2563eb" : "#374151")};
  }
`;

const EmptyCell = styled.div`
  height: 2.5rem;
`;

const CalendarGrid = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = monthStart.getDay();
  const emptyDays = Array(startDay).fill(null);

  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <ChevronButton onClick={prevMonth}>
          ← {/* You can replace this with an actual chevron icon */}
        </ChevronButton>
        <MonthHeader>{format(currentDate, "MMMM yyyy")}</MonthHeader>
        <ChevronButton onClick={nextMonth}>
          → {/* You can replace this with an actual chevron icon */}
        </ChevronButton>
      </HeaderContainer>

      <WeekDaysGrid>
        {weekDays.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDaysGrid>

      <DaysGrid>
        {emptyDays.map((_, index) => (
          <EmptyCell key={`empty-${index}`} />
        ))}

        {days.map((date) => (
          <DayCell key={date.toString()} isToday={isSameDay(date, today)}>
            {format(date, "d")}
          </DayCell>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default CalendarGrid;
