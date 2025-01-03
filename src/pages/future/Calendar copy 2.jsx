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
  max-width: 1000px;
  background-color: #151515;
  border-radius: 6px;
  padding: 24px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  background-color: #272727;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(34, 197, 94, 0.2);
  transition: all 0.2s;

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    background-color: #323232;
  }
`;

const MonthHeader = styled.h2`
  color: #ffffff;
  font-size: 1.25rem;
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

const DayCell = styled.button`
  position: relative;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${(props) => (props.isToday ? "9999px" : "8px")};
  background-color: ${(props) => (props.isToday ? "#22c55e" : "transparent")};
  color: ${(props) => (props.isToday ? "#ffffff" : "#d1d5db")};
  border: ${(props) =>
    props.hasItems ? "2px solid rgba(34, 197, 94, 0.5)" : "none"};

  &:hover {
    background-color: ${(props) => (props.isToday ? "#22c55e" : "#374151")};
  }
`;

const EmptyCell = styled.div`
  height: 2.5rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #d1d5db;
  font-size: 0.875rem;
`;

const Input = styled.input`
  background-color: #272727;
  border: 1px solid #374151;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d1d5db;
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
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
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    background-color: #323232;
  }
`;

const FoldersList = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FolderCard = styled.div`
  background-color: #272727;
  border-radius: 6px;
  padding: 1rem;
`;

const FolderTitle = styled.h4`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #d1d5db;
  font-size: 0.875rem;
  padding: 0.25rem 0;
`;

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [selectedDate, setSelectedDate] = useState(today);
  const [folders, setFolders] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = monthStart.getDay();
  const emptyDays = Array(startDay).fill(null);

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      setFolders([...folders, { name: folderName, items: [] }]);
      setFolderName("");
      setShowItemForm(true);
      setCurrentFolder(folders.length);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemName && price && currentFolder !== null) {
      const newFolders = [...folders];
      newFolders[currentFolder].items.push({
        name: itemName,
        price: parseFloat(price),
        currency,
        date: selectedDate,
      });
      setFolders(newFolders);
      setItemName("");
      setPrice("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {showItemForm ? "Add Item" : "Create Folder"}
              </ModalTitle>
            </ModalHeader>

            <Form onSubmit={showItemForm ? handleAddItem : handleCreateFolder}>
              {!showItemForm ? (
                <FormGroup>
                  <Label>Folder Name</Label>
                  <Input
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Accessories..."
                  />
                </FormGroup>
              ) : (
                <>
                  <FormGroup>
                    <Label>Item Name</Label>
                    <Input
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="Item name..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Currency</Label>
                    <RadioGroup>
                      <RadioLabel>
                        <RadioInput
                          type="radio"
                          value="NGN"
                          checked={currency === "NGN"}
                          onChange={(e) => setCurrency(e.target.value)}
                        />
                        NGN
                      </RadioLabel>
                      <RadioLabel>
                        <RadioInput
                          type="radio"
                          value="USD"
                          checked={currency === "USD"}
                          onChange={(e) => setCurrency(e.target.value)}
                        />
                        USD
                      </RadioLabel>
                    </RadioGroup>
                  </FormGroup>
                </>
              )}

              <Button type="submit">
                {showItemForm ? "Add Item" : "Create Folder"}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}

      <Container>
        <HeaderContainer>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setShowItemForm(false);
            }}
          >
            Create List
          </Button>

          <MonthNavigation>
            <NavButton
              onClick={() => setCurrentDate((prev) => subMonths(prev, 1))}
            >
              ←
            </NavButton>
            <MonthHeader>{format(currentDate, "MMMM yyyy")}</MonthHeader>
            <NavButton
              onClick={() => setCurrentDate((prev) => addMonths(prev, 1))}
            >
              →
            </NavButton>
          </MonthNavigation>
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

          {days.map((date) => {
            const isCurrentDay = isSameDay(date, today);
            const hasItems = folders.some((folder) =>
              folder.items.some((item) => isSameDay(new Date(item.date), date))
            );

            return (
              <DayCell
                key={date.toString()}
                isToday={isCurrentDay}
                hasItems={hasItems}
                onClick={() => {
                  setSelectedDate(date);
                  if (folders.length > 0) {
                    setIsModalOpen(true);
                    setShowItemForm(true);
                    setCurrentFolder(folders.length - 1);
                  }
                }}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                {format(date, "d")}
              </DayCell>
            );
          })}
        </DaysGrid>

        {folders.length > 0 && (
          <FoldersList>
            {folders.map((folder, index) => (
              <FolderCard key={index}>
                <FolderTitle>{folder.name}</FolderTitle>
                <ItemsList>
                  {folder.items.map((item, itemIndex) => (
                    <ItemRow key={itemIndex}>
                      <span>{item.name}</span>
                      <div>
                        <span style={{ marginRight: "1rem" }}>
                          {format(new Date(item.date), "MMM d, yyyy")}
                        </span>
                        <span>
                          {item.currency} {item.price.toFixed(2)}
                        </span>
                      </div>
                    </ItemRow>
                  ))}
                </ItemsList>
              </FolderCard>
            ))}
          </FoldersList>
        )}
      </Container>
    </>
  );
};

export default Calendar;
