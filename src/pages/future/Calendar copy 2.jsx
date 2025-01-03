// components/Calendar/components/DayCell.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAlert } from "../../context/AlertContext";
import useSignalStore from "./store/useSignalStore";
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
  border-radius: 6px;
  padding: 24px;
  margin: 0 auto;
`;

const CalendarContainer = styled.div`
  margin-top: 25px;
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

const StyledDayCell = styled.button`
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

export const DayCell = ({
  date,
  today,
  folders,
  onSelectDate,
  onHoverDate,
}) => {
  const isCurrentDay = isSameDay(date, today);
  const hasItems = folders.some((folder) =>
    folder.items.some((item) => isSameDay(new Date(item.date), date))
  );

  return (
    <StyledDayCell
      isToday={isCurrentDay}
      hasItems={hasItems}
      onClick={() => onSelectDate(date)}
      onMouseEnter={() => onHoverDate(date)}
      onMouseLeave={() => onHoverDate(null)}
    >
      {format(date, "d")}
    </StyledDayCell>
  );
};

// // components/Calendar/components/CalendarHeader.js
// import React from "react";
// import styled from "styled-components";
// import { format } from "date-fns";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 10px;
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

export const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => (
  <HeaderContainer>
    <MonthNavigation>
      <NavButton onClick={onPrevMonth}>←</NavButton>
      <MonthHeader>{format(currentDate, "MMMM yyyy")}</MonthHeader>
      <NavButton onClick={onNextMonth}>→</NavButton>
    </MonthNavigation>
  </HeaderContainer>
);

// // components/Calendar/components/CalendarGrid.js
// import React from "react";
// import styled from "styled-components";
// import { DayCell } from "./DayCell";

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

const EmptyCell = styled.div`
  height: 2.5rem;
`;

export const CalendarGrid = ({
  weekDays,
  emptyDays,
  days,
  today,
  folders,
  onSelectDate,
  onHoverDate,
}) => (
  <>
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
          date={date}
          today={today}
          folders={folders}
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
        />
      ))}
    </DaysGrid>
  </>
);

// components/Calendar/utils/calculations.js
export const NGN_TO_USD_RATE = 1656.0;

export const calculateDailyProfits = (initialCapital, numSignals) => {
  let currentCapital = initialCapital;
  const profits = [];

  for (let i = 0; i < numSignals; i++) {
    const tradeAmount = currentCapital * 0.01;
    const remainingBalance = currentCapital - tradeAmount;
    const tradeProfit = tradeAmount * 0.88;
    currentCapital = remainingBalance + tradeAmount + tradeProfit;
    profits.push({
      tradeNumber: i + 1,
      profit: tradeProfit,
      newCapital: currentCapital,
    });
  }

  return {
    finalCapital: currentCapital,
    totalProfit: currentCapital - initialCapital,
    trades: profits,
  };
};

export const calculateDaysToTarget = (
  targetAmount,
  dailyCapitalInfo,
  currentCapital
) => {
  const dailyProfit = dailyCapitalInfo.totalProfit;
  const remainingAmount = targetAmount - currentCapital;

  if (remainingAmount <= 0) return 0;
  return Math.ceil(remainingAmount / dailyProfit);
};

export const calculateItemAffordability = (
  item,
  totalUserCapitalInDollars,
  totalUserSignalsInADay
) => {
  const itemPriceUSD =
    item.currency === "NGN" ? item.price / NGN_TO_USD_RATE : item.price;
  const dailyResults = calculateDailyProfits(
    totalUserCapitalInDollars,
    totalUserSignalsInADay
  );

  const canAfford = totalUserCapitalInDollars >= itemPriceUSD;
  const daysNeeded = calculateDaysToTarget(
    itemPriceUSD,
    dailyResults,
    totalUserCapitalInDollars
  );

  return {
    canAfford,
    daysNeeded,
    shortfall: canAfford ? 0 : itemPriceUSD - totalUserCapitalInDollars,
  };
};

// // components/Calendar/components/FolderModal.js
// import React from "react";
// import { format } from "date-fns";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalTitle,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   RadioGroup,
//   RadioLabel,
//   RadioInput,
//   Button,
// } from "../styles";

export const FolderModal = ({
  isOpen,
  onClose,
  showItemForm,
  folderName,
  setFolderName,
  itemName,
  setItemName,
  price,
  setPrice,
  currency,
  setCurrency,
  selectedDate,
  setSelectedDate,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{showItemForm ? "Add Item" : "Create Folder"}</ModalTitle>
        </ModalHeader>

        <Form onSubmit={onSubmit}>
          {!showItemForm ? (
            <FormGroup>
              <Label>Folder Name</Label>
              <Input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Accessories..."
                required
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
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
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

              <FormGroup>
                <Label>Expected Date</Label>
                <Input
                  type="date"
                  value={format(selectedDate, "yyyy-MM-dd")}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  required
                />
              </FormGroup>
            </>
          )}

          <Button type="submit">
            {showItemForm ? "Add Item" : "Create Folder"}
          </Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

// // components/Calendar/components/ItemsView.js
// import React from "react";
// import { format } from "date-fns";
// import styled from "styled-components";

const ItemsTable = styled.div`
  margin-top: 1rem;
`;

const ItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 0.5rem;
  background-color: #374151;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #d1d5db;
  font-weight: 500;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 0.5rem;
  border-bottom: 1px solid #374151;
`;

export const ItemsView = ({
  folder,
  totalUserCapitalInDollars,
  totalUserSignalsInADay,
}) => {
  const calculateTotalValue = () => {
    return folder.items.reduce((total, item) => {
      const valueInUSD =
        item.currency === "NGN" ? item.price / NGN_TO_USD_RATE : item.price;
      return total + valueInUSD;
    }, 0);
  };

  const dailyResults = calculateDailyProfits(
    totalUserCapitalInDollars,
    totalUserSignalsInADay
  );

  return (
    <>
      <ItemsTable>
        <ItemsHeader>
          <span>Item Name</span>
          <span>Expected Date</span>
          <span>Days Needed</span>
          <span>Price</span>
        </ItemsHeader>
        {folder.items.map((item) => {
          const affordability = calculateItemAffordability(
            item,
            totalUserCapitalInDollars,
            totalUserSignalsInADay
          );

          return (
            <ItemRow
              key={item._id}
              style={{ color: affordability.canAfford ? "#22c55e" : "#ef4444" }}
            >
              <span>{item.name}</span>
              <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
              <span>
                {affordability.canAfford
                  ? "Available now"
                  : `${affordability.daysNeeded} days needed`}
              </span>
              <span>
                {item.currency} {item.price.toFixed(2)}
                {!affordability.canAfford && (
                  <div style={{ fontSize: "0.8em" }}>
                    Shortfall: ${affordability.shortfall.toFixed(2)}
                  </div>
                )}
              </span>
            </ItemRow>
          );
        })}
      </ItemsTable>

      <SummarySection>
        <SummaryItem>
          <SummaryLabel>Total Items</SummaryLabel>
          <SummaryValue>{folder.items.length}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>Total Value (USD)</SummaryLabel>
          <SummaryValue>${calculateTotalValue().toFixed(2)}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>Daily Profit Potential</SummaryLabel>
          <SummaryValue>${dailyResults.totalProfit.toFixed(2)}</SummaryValue>
        </SummaryItem>
      </SummarySection>
    </>
  );
};

const Calendar = () => {
  const { showAlert } = useAlert();
  const { defaultValue: totalUserCapitalInDollars } = useSignalStore();
  const totalUserSignalsInADay = 2;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showItemForm, setShowItemForm] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await getAllFoldersList();
      setFolders(response.data);
    } catch (error) {
      showAlert("Error fetching folders", "error");
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowItemForm(false);
    setFolderName("");
    setItemName("");
    setPrice("");
    setCurrency("NGN");
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      await createFolderList({ name: folderName });
      showAlert("Folder created successfully", "success");
      handleModalClose();
      fetchFolders();
    } catch (error) {
      showAlert("Error creating folder", "error");
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!selectedFolder) return;

    const itemData = {
      name: itemName,
      price: parseFloat(price),
      currency,
      date: selectedDate,
      folderId: selectedFolder._id,
    };

    try {
      await addItemToFolderList(itemData);
      showAlert("Item added successfully", "success");
      handleModalClose();
      fetchFolders();
    } catch (error) {
      showAlert("Error adding item", "error");
    }
  };

  // Calendar calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const emptyDays = Array(monthStart.getDay()).fill(null);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Container>
      <CalendarContainer>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <CalendarGrid
          weekDays={weekDays}
          emptyDays={emptyDays}
          days={monthDays}
          today={new Date()}
          folders={folders}
          onSelectDate={handleSelectDate}
          onHoverDate={setHoveredDate}
        />

        <Button onClick={() => setIsModalOpen(true)}>Create New Folder</Button>
      </CalendarContainer>

      <FolderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        showItemForm={showItemForm}
        folderName={folderName}
        setFolderName={setFolderName}
        itemName={itemName}
        setItemName={setItemName}
        price={price}
        setPrice={setPrice}
        currency={currency}
        setCurrency={setCurrency}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onSubmit={showItemForm ? handleAddItem : handleCreateFolder}
      />

      {isViewModalOpen && selectedFolder && (
        <Modal onClick={() => setIsViewModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedFolder.name}</ModalTitle>
            </ModalHeader>

            <ItemsView
              folder={selectedFolder}
              totalUserCapitalInDollars={totalUserCapitalInDollars}
              totalUserSignalsInADay={totalUserSignalsInADay}
            />

            <ModalActions>
              <Button
                onClick={() => {
                  setShowItemForm(true);
                  setIsModalOpen(true);
                }}
              >
                Add Item
              </Button>
              <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Calendar;
