import React, { useEffect, useState } from "react";
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
import {
  createFolderList,
  getAllFoldersList,
  addItemToFolderList,
} from "../../api/request";
import { useAlert } from "../../context/AlertContext";

const Container = styled.div`
  margin-top: 80px;
  color: #abb3c0;
  width: 80%;
  max-width: 1000px;
  border-radius: 6px;
  padding: 24px;
  margin: 0 auto;
`;

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

const CalendarContainer = styled.div`
  margin-top: 25px;
`;

const Bg = styled.div`
  background-color: #151515;
  margin-top: 10px;
  padding: 15px 10px;
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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FolderCard = styled.div`
  background-color: #272727;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FolderInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const FolderTitle = styled.h4`
  color: white;
  font-size: 1rem;
  font-weight: bold;
`;

const FolderStats = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const ViewButton = styled(Button)`
  padding: 6px 12px;
  background-color: #374151;
`;

const ItemsModal = styled(ModalContent)`
  max-width: 600px;
`;

const ItemsTable = styled.div`
  margin-top: 1rem;
`;

const ItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 0.5rem;
  background-color: #374151;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #d1d5db;
  font-weight: 500;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 0.5rem;
  border-bottom: 1px solid #374151;
  color: #d1d5db;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const SummarySection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  color: #d1d5db;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryLabel = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const SummaryValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
`;

// Inside the Calendar component, add this helper function
const calculateDaysFromNow = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const Calendar = () => {
  const { showAlert } = useAlert();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [selectedDate, setSelectedDate] = useState(today);
  const [folders, setFolders] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [viewingFolder, setViewingFolder] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = monthStart.getDay();
  const emptyDays = Array(startDay).fill(null);

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const foldersData = await getAllFoldersList();
        console.log(foldersData);
        setFolders(foldersData);
      } catch (error) {
        console.error("Error loading folders:", error);
        // Add error handling as needed
      }
    };

    loadFolders();
  }, []);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    // if (folderName.trim()) {
    //   setFolders([...folders, { name: folderName, items: [] }]);
    //   setFolderName("");
    //   setShowItemForm(true);
    //   setCurrentFolder(folders.length);
    // }

    try {
      if (folderName.trim()) {
        const newFolder = await createFolderList(folderName);
        setFolders([...folders, newFolder]);
        setFolderName("");
        setShowItemForm(true);
        setCurrentFolder(folders.length);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      showAlert("error", "Error creating folder...");
      // Add error handling as needed
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      if (itemName && price && currentFolder !== null) {
        const itemData = {
          name: itemName,
          price: parseFloat(price),
          currency,
          date: selectedDate,
        };

        const updatedFolder = await addItemToFolderList(
          folders[currentFolder]._id,
          itemData
        );

        const newFolders = [...folders];
        newFolders[currentFolder] = updatedFolder;
        setFolders(newFolders);

        setItemName("");
        setPrice("");
        setIsModalOpen(false);
        setIsViewModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      showAlert("error", "Error creating item...");

      // Add error handling as needed
    }
  };

  const openFolderView = (folderIndex) => {
    setViewingFolder(folderIndex);
    setIsViewModalOpen(true);
  };

  const addItemToFolder = (folderIndex) => {
    setCurrentFolder(folderIndex);
    setShowItemForm(true);
    setIsModalOpen(true);
    setIsViewModalOpen(false);
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
                      onChange={(e) =>
                        setSelectedDate(new Date(e.target.value))
                      }
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
      )}

      {isViewModalOpen && viewingFolder !== null && (
        <Modal onClick={() => setIsViewModalOpen(false)}>
          <ItemsModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{folders[viewingFolder].name}</ModalTitle>
            </ModalHeader>

            <ItemsTable>
              <ItemsHeader>
                <span>Item Name</span>
                <span>Expected Date</span>
                <span>Days Left</span>
                <span>Price</span>
              </ItemsHeader>
              {folders[viewingFolder].items.map((item, index) => {
                const daysLeft = calculateDaysFromNow(item.date);
                return (
                  <ItemRow key={index}>
                    <span>{item.name}</span>
                    <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
                    <span
                      style={{
                        color:
                          daysLeft < 0
                            ? "#ef4444"
                            : daysLeft === 0
                            ? "#22c55e"
                            : "#d1d5db",
                      }}
                    >
                      {daysLeft < 0
                        ? `${Math.abs(daysLeft)} days ago`
                        : daysLeft === 0
                        ? "Today"
                        : `${daysLeft} days left`}
                    </span>
                    <span>
                      {item.currency} {item.price.toFixed(2)}
                    </span>
                  </ItemRow>
                );
              })}
            </ItemsTable>

            <SummarySection>
              <SummaryItem>
                <SummaryLabel>Total Items</SummaryLabel>
                <SummaryValue>
                  {folders[viewingFolder].items.length}
                </SummaryValue>
              </SummaryItem>

              {["NGN", "USD"].map((curr) => {
                const totalAmount = folders[viewingFolder].items
                  .filter((item) => item.currency === curr)
                  .reduce((sum, item) => sum + item.price, 0);

                if (totalAmount > 0) {
                  return (
                    <SummaryItem key={curr}>
                      <SummaryLabel>Total in {curr}</SummaryLabel>
                      <SummaryValue>
                        {curr} {totalAmount.toFixed(2)}
                      </SummaryValue>
                    </SummaryItem>
                  );
                }
                return null;
              })}
            </SummarySection>

            <ModalActions>
              <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
              <Button onClick={() => addItemToFolder(viewingFolder)}>
                Add Item
              </Button>
            </ModalActions>
          </ItemsModal>
        </Modal>
      )}

      <Container>
        <CalendarContainer>
          <div className="flex jc-end flex-1">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setShowItemForm(false);
              }}
            >
              Create List
            </Button>
          </div>

          <Bg>
            <HeaderContainer>
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
                  folder.items.some((item) =>
                    isSameDay(new Date(item.date), date)
                  )
                );

                return (
                  <DayCell
                    key={date.toString()}
                    isToday={isCurrentDay}
                    hasItems={hasItems}
                    onClick={() => {
                      setSelectedDate(date);
                    }}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    {format(date, "d")}
                  </DayCell>
                );
              })}
            </DaysGrid>
          </Bg>
        </CalendarContainer>

        {folders.length > 0 && (
          <FoldersList>
            {folders.map((folder, index) => (
              <FolderCard key={index}>
                <FolderInfo>
                  <FolderTitle>{folder.name}</FolderTitle>
                  <FolderStats>{folder.items.length} items</FolderStats>
                </FolderInfo>
                <ViewButton onClick={() => openFolderView(index)}>
                  View
                </ViewButton>
              </FolderCard>
            ))}
          </FoldersList>
        )}
      </Container>
    </>
  );
};

export default Calendar;
