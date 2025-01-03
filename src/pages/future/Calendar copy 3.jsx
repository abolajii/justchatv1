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
import AnimateModal from "../../components/AnimateModal";

const Container = styled.div`
  margin-top: 80px;
  color: #abb3c0;
  width: 80%;
  height: 380px;
  background-color: #151515;
  border-radius: 6px;
  padding: 15px;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  /* margin-bottom: 1.5rem; */
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
  margin-top: 1.5rem;
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

const Button = styled.button`
  background-color: #272727;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  .title {
    font-size: 14px;
    /* font-weight: 600; */
    color: #e9e9e9;
  }

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const renderBody = () => {
  // over here show an input field to create a folder "Accessories..."
  // after creating show add item to the folder name..
  // if user want to add show modal with input, price then also show a desgined radio to check if price is naira or dolars
  // then a date to pick the date when user want to get the aacessirores
  // add button
  return (
    <div>
      <button>Create</button>
    </div>
  );
};

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    <>
      <AnimateModal
        isOpen={modalVisible}
        closeModal={() => setModalVisible(false)}
        title="Create folder"
        body={renderBody()}
      />
      <Container>
        <HeaderContainer>
          <Button onClick={() => setModalVisible(true)}>Create List</Button>
        </HeaderContainer>
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
    </>
  );
};

export default Calendar;
