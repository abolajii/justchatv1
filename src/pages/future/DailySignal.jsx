import React, { useState } from "react";
import MainContainer from "./MainContainer";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdChevronLeft } from "react-icons/md";
import { Clock, DollarSign, TrendingUp, Eye } from "lucide-react";
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
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr 80px;
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
  grid-template-columns: 1fr 1fr 1.5fr 1fr 1fr 1fr 80px;
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
    props.completed
      ? "rgba(34, 197, 94, 0.1)"
      : props.failed
      ? "rgba(220, 38, 38, 0.1)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) =>
    props.completed ? "#22c55e" : props.failed ? "#dc2626" : "#e0e0e0"};
`;

const ViewButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #151515;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 20px;
  padding: 4px;
  margin-left: 16px;

  &:hover {
    color: #fff;
  }
`;

const DetailCard = styled.div`
  padding: 16px;
  background: #272727;
  border-radius: 9px;
`;

const ModalDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Label = styled.div`
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Value = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

const NairaValue = styled.div`
  color: #22c55e;
  font-size: 12px;
  margin-top: 8px;
`;

const ProfitCard = styled(DetailCard)`
  grid-column: 1 / -1;
  margin-top: 16px;
`;

const ProfitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfitPercentage = styled.span`
  color: #22c55e;
  font-size: 14px;
`;

const ConfirmationContainer = styled.div`
  grid-column: 1 / -1;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Question = styled.p`
  color: #fff;
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;

  background-color: ${(props) =>
    props.variant === "yes"
      ? "rgba(34, 197, 94, 0.1)"
      : "rgba(220, 38, 38, 0.1)"};
  color: ${(props) => (props.variant === "yes" ? "#22c55e" : "#dc2626")};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.variant === "yes"
        ? "rgba(34, 197, 94, 0.2)"
        : "rgba(220, 38, 38, 0.2)"};
  }
`;

const NGN_TO_USD_RATE = 1656.0;

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

const calculateProfit = (signal) => {
  if (signal.status !== "completed") return 0;

  const firstTradeTotalAmount = signal.capital * 0.01;
  const firstTradeRemainingBalance = signal.capital - firstTradeTotalAmount;
  const firstTradeProfit = firstTradeTotalAmount * 0.88;
  const finalAmount =
    firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit;
  return finalAmount - signal.capital;
};

const DailySignal = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { signals } = useSignalStore();
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [signalReceived, setSignalReceived] = useState(null);

  const totalCapital = signals[signals.length - 1]?.capital;

  const handleOpenModal = (signal) => {
    setSelectedSignal(signal);
    setSignalReceived(null);
  };

  const handleCloseModal = () => {
    setSelectedSignal(null);
    setSignalReceived(null);
  };

  const handleSignalResponse = (received) => {
    setSignalReceived(received);
  };

  const isTimeElapsed = (signal) => {
    const [_, endTime] = signal.time.split(" - ");
    const now = new Date();

    const currentTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log({ endTime, currentTime });

    return currentTime > endTime;
  };

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
            <span>Actions</span>
          </TableHeader>
          {signals.map((signal) => (
            <TableRow key={signal._id}>
              <TableCell>{signal.name}</TableCell>
              <TableCell>
                <Clock size={16} />
                {signal.time}
              </TableCell>
              <TableCell>{formatCapital(signal.prevCapital)}</TableCell>
              <TableCell>
                {signal.status === "completed" ? (
                  <>
                    <TrendingUp size={16} />
                    {(
                      (calculateProfit(signal) / signal.prevCapital) *
                      100
                    ).toFixed(2)}
                    %
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{formatCapital(signal.capital)}</TableCell>
              <TableCell>
                <Status
                  completed={signal.status === "completed"}
                  failed={signal.status === "failed"}
                >
                  {signal.status}
                </Status>
              </TableCell>
              <TableCell>
                <ViewButton onClick={() => handleOpenModal(signal)}>
                  <Eye size={14} />
                  View
                </ViewButton>
              </TableCell>
            </TableRow>
          ))}
        </SignalTable>

        {selectedSignal && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <div className="flex gap-sm">
                  <ModalTitle>Signal Details</ModalTitle>
                  <Status
                    completed={selectedSignal.status === "completed"}
                    failed={selectedSignal.status === "failed"}
                  >
                    {selectedSignal.status}
                  </Status>
                </div>
                <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
              </ModalHeader>

              <ModalDetail>
                <DetailCard>
                  <Label>Initial Capital</Label>
                  <Value>{formatCapital(selectedSignal.prevCapital)}</Value>
                  <NairaValue>
                    ₦
                    {(
                      selectedSignal.prevCapital * NGN_TO_USD_RATE
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </NairaValue>
                </DetailCard>

                <DetailCard>
                  <Label>Final Amount</Label>
                  <Value>{formatCapital(selectedSignal.capital)}</Value>
                  <NairaValue>
                    ₦
                    {(selectedSignal?.capital * NGN_TO_USD_RATE).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </NairaValue>
                </DetailCard>

                {selectedSignal.status === "completed" && (
                  <ProfitCard>
                    <ProfitHeader>
                      <Label>Profit Generated</Label>
                      <ProfitPercentage>
                        +
                        {(
                          (calculateProfit(selectedSignal) /
                            selectedSignal.prevCapital) *
                          100
                        ).toFixed(2)}
                        %
                      </ProfitPercentage>
                    </ProfitHeader>
                    <Value>
                      {formatCapital(calculateProfit(selectedSignal))}
                    </Value>
                    <NairaValue>
                      ₦
                      {(
                        calculateProfit(selectedSignal) * NGN_TO_USD_RATE
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </NairaValue>
                  </ProfitCard>
                )}

                {isTimeElapsed(selectedSignal) &&
                  selectedSignal.status === "pending" && (
                    <ConfirmationContainer>
                      <Question>Did you receive this signal?</Question>
                      <ButtonGroup>
                        <Button
                          variant="yes"
                          onClick={() => handleSignalResponse(true)}
                          disabled={signalReceived !== null}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="no"
                          onClick={() => handleSignalResponse(false)}
                          disabled={signalReceived !== null}
                        >
                          No
                        </Button>
                      </ButtonGroup>
                    </ConfirmationContainer>
                  )}
                {selectedSignal.status === "failed" && (
                  <FailedSignalMessage>
                    This signal has failed. Please check the details and try
                    again.
                  </FailedSignalMessage>
                )}
                {/* {isTimeElapsed(selectedSignal) && (
                  <TimeElapsedMessage>
                    This signal has expired. Please check the details and try
                    again.
                  </TimeElapsedMessage>
                )} */}
              </ModalDetail>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </MainContainer>
  );
};

export default DailySignal;
