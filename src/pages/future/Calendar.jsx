import React, { useState } from "react";
import styled from "styled-components";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

const Container = styled.div`
  margin-top: 80px;
  color: #abb3c0;
  width: 80%;
  height: 350px;
  background-color: #151515;
  border-radius: 6px;
  padding: 15px;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: end;
`;

const MonthHeader = styled.h2`
  color: #ffffff;
  text-align: end;
  font-size: 1.5rem;
  font-weight: bold;
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
  position: relative;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${(props) => (props.isToday ? "9999px" : "8px")};
  background-color: ${(props) => (props.isToday ? "#22c55e" : "transparent")};
  color: ${(props) => (props.isToday ? "#ffffff" : "#d1d5db")};

  &:hover {
    background-color: ${(props) => (props.isToday ? "#22c55e" : "#374151")};
  }
`;

const EmptyCell = styled.div`
  height: 2.5rem;
`;

const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${(props) => (props.isToday ? "9999px" : "8px")};
  background-color: ${(props) => (props.isToday ? "#22c55e" : "transparent")};
  color: #ffffff;
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  /* align-items: center; */
  /* justify-content: center; */
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${DayCell}:hover & {
    opacity: 1;
  }
`;

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [hoveredDate, setHoveredDate] = useState(null);

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
    <Container>
      <HeaderContainer>
        <MonthHeader>{format(currentDate, "MMMM yyyy")}</MonthHeader>
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
          <DayCell
            key={date.toString()}
            isToday={isSameDay(date, today)}
            onMouseEnter={() => setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {format(date, "d")}
            <HoverContent
              isVisible={isSameDay(date, hoveredDate)}
              isToday={isSameDay(date, today)}
            >
              -{/* {format(date, "MMM d")} */}
            </HoverContent>
          </DayCell>
        ))}
      </DaysGrid>
    </Container>
  );
};

export default Calendar;
