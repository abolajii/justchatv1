import React, { useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import styled from "styled-components";
import useThemeStore from "../store/useThemeStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Inner = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f5f5f5")};
  height: 100%;
  padding: 20px;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
`;

const MonthTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
`;

const NavigationButton = styled.button`
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  gap: 0;
  margin-top: 50px;
`;

const WeekDay = styled.div`
  color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
  height: 40px;
  width: 40px;
  padding-top: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: end;
  font-size: 13px;
`;

const DayCell = styled.div`
  position: relative;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 40px;
  width: 40px;
  padding-top: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: end;
  font-size: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const HoverContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const Calendar = () => {
  const { isDarkMode } = useThemeStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);

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

  return (
    <MainContainer>
      <Header>
        <Inner isDarkMode={isDarkMode}>
          <CalendarHeader isDarkMode={isDarkMode}>
            <NavigationButton
              isDarkMode={isDarkMode}
              onClick={() => changeMonth(-1)}
            >
              <ChevronLeft size={20} />
            </NavigationButton>

            <MonthTitle>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </MonthTitle>

            <NavigationButton
              isDarkMode={isDarkMode}
              onClick={() => changeMonth(1)}
            >
              <ChevronRight size={20} />
            </NavigationButton>
          </CalendarHeader>

          <GridContainer>
            {weekDays.map((day) => (
              <WeekDay key={day} isDarkMode={isDarkMode}>
                {day}
              </WeekDay>
            ))}

            {generateDays().map((day, index) =>
              day !== null ? (
                <DayCell
                  key={index}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {day}
                  <HoverContent
                    isDarkMode={isDarkMode}
                    isVisible={hoveredDay === day}
                  >
                    Hi!
                  </HoverContent>
                </DayCell>
              ) : (
                <DayCell key={index} />
              )
            )}
          </GridContainer>
        </Inner>
      </Header>
    </MainContainer>
  );
};

export default Calendar;
