import React from "react";
import MainContainer from "./MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdChevronLeft } from "react-icons/md";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import useSignalStore from "./store/useSignalStore";

const BackButton = styled.div`
  cursor: pointer;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  padding: 4px;

  &:hover {
    background-color: #272727;
  }
`;

const Container = styled.div`
  margin-top: 60px;
  width: 98.5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: 20px;
    margin-right: 5px;
    color: #fff;
    margin-top: 8px;
  }
`;

const CapitalCard = styled.div`
  background: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
  padding: 16px 24px;
  min-width: 280px;
`;

const CapitalTitle = styled.div`
  color: #e0e0e0;
  font-size: 14px;
  margin-bottom: 8px;
`;

const CapitalAmount = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 500;
`;

const SignalTable = styled.div`
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr;
  padding: 16px;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    color: #888;
    font-size: 14px;
    font-weight: 500;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

const TableCell = styled.div`
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Status = styled.div`
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  background: ${(props) =>
    props.completed ? "rgba(34, 197, 94, 0.1)" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.completed ? "#22c55e" : "#e0e0e0")};
`;

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatCapital = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const DailySignal = () => {
  const { day } = useParams();
  const navigate = useNavigate();

  const { signals } = useSignalStore();

  // Example signals data - replace with your actual data
  //   const signals = [
  //     {
  //       _id: "676bfa268bcef26f39a96997",
  //       user: "6721f7014917e063ba3dc449",
  //       userTrade: true,
  //       capital: 316.349592,
  //       name: "Signal 1",
  //       reminder: true,
  //       time: "14:00 - 14:30",
  //       prevProfit: "0",
  //       profit: "88.00%",
  //       createdAt: "2024-12-25T12:27:18.428Z",
  //       updatedAt: "2024-12-25T15:08:35.074Z",
  //       __v: 0,
  //       status: "completed",
  //       prevCapital: 313.57,
  //     },
  //     {
  //       _id: "676bfa268bcef26f39a96999",
  //       user: "6721f7014917e063ba3dc449",
  //       userTrade: false,
  //       capital: 319.13346840959997,
  //       name: "Signal 2",
  //       reminder: true,
  //       time: "19:00 - 19:30",
  //       prevProfit: "0",
  //       profit: "0",
  //       createdAt: "2024-12-25T12:27:18.442Z",
  //       updatedAt: "2024-12-25T18:37:20.065Z",
  //       __v: 0,
  //       status: "completed",
  //       prevCapital: 316.349592,
  //     },
  //   ];

  const totalCapital = signals[signals.length - 1].capital;

  return (
    <MainContainer>
      <Container>
        <Header>
          <HeaderLeft>
            <BackButton onClick={() => navigate(-1)}>
              <MdChevronLeft size={20} />
            </BackButton>
            <h1>Daily Signal - {formatDate(day)}</h1>
          </HeaderLeft>
          <CapitalCard>
            <CapitalTitle>Total Capital</CapitalTitle>
            <CapitalAmount>{formatCapital(totalCapital)}</CapitalAmount>
          </CapitalCard>
        </Header>

        <SignalTable>
          <TableHeader>
            <span>Name</span>
            <span>Time</span>
            <span>Initial Capital</span>
            <span>Profit</span>
            <span>Final Amount</span>
            <span>Status</span>
          </TableHeader>
          {signals.map((signal) => {
            const completed = signal.status === "completed";
            return (
              <TableRow key={signal._id}>
                <TableCell>{signal.name}</TableCell>
                <TableCell>
                  <Clock size={16} />
                  {signal.time}
                </TableCell>
                <TableCell>
                  {formatCapital(completed ? signal.prevCapital : 0)}
                </TableCell>
                <TableCell>
                  {completed ? <TrendingUp size={16} /> : "-"}
                  {completed ? "88%" : "-"}
                </TableCell>
                <TableCell>
                  {formatCapital(completed ? signal.capital : 0)}
                </TableCell>

                <TableCell>
                  <Status completed={signal.status === "completed"}>
                    {signal.status}
                  </Status>
                </TableCell>
              </TableRow>
            );
          })}
        </SignalTable>
      </Container>
    </MainContainer>
  );
};

export default DailySignal;
