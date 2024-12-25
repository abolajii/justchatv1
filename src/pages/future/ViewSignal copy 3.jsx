import React, { useEffect, useState, useMemo } from "react";
import MainContainer from "./MainContainer";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import styled from "styled-components";
import { getSignalById } from "../../api/request";

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  height: ${(props) => (props.small ? "30px" : "40px")};
  width: ${(props) => (props.small ? "30px" : "40px")};
  border-radius: 50%;
  border: 1px solid rgba(34, 197, 94, 0.2);
  background-color: #272727;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: ${(props) => (props.small ? "14px" : "18px")};
  flex-shrink: 0;
`;

const Widget = styled.div`
  padding: 16px;
  gap: 10px;
  min-height: 100px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  width: 230px;
  border-radius: 9px;
  background-color: #151515;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.active ? "rgba(34, 197, 94, 0.1)" : "#272727"};
  color: ${(props) => (props.active ? "#22c55e" : "#e0e0e0")};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
`;

const Duration = styled.div`
  color: #e0e0e0;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BackButton = styled.div`
  cursor: pointer;
  border-radius: 4px;
  margin-top: 30px;
  display: inline-flex;
  align-items: center;
  &:hover {
    background-color: #272727;
  }
`;

const formatCurrency = (number, includeSymbol = false) => {
  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return includeSymbol ? `₦${formatted}` : formatted;
};

const ConfirmationContainer = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 9px;
`;

const Question = styled.div`
  color: #fff;
  font-size: 16px;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;

  background-color: ${(props) =>
    props.variant === "yes"
      ? "rgba(34, 197, 94, 1)"
      : props.variant === "no"
      ? "#dc2626"
      : "#272727"};

  color: white;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SignalWidget = ({ label, value, balance }) => (
  <Widget>
    <div>
      <div>{label}</div>
      <div>{value}</div>
    </div>
    <div>
      {label === "To" ? "Est. Profit" : "Capital"}: {balance}
    </div>
  </Widget>
);

const ViewSignal = () => {
  const [signal, setSignal] = useState(null);
  const [signalReceived, setSignalReceived] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const calculateSignalValues = (capital, profit) => {
    return {
      current: parseFloat(capital) || 0,
      next: parseFloat(profit) || 0,
    };
  };

  const checkTimeStatus = (timeRange) => {
    if (!timeRange) return { active: false, message: "Invalid time range" };

    const [startTime, endTime] = timeRange.split(" - ");
    const now = new Date();
    const currentTime =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    if (currentTime < startTime) {
      return { active: false, message: "Signal not active yet" };
    } else if (currentTime > endTime) {
      return { active: false, message: "Signal has ended" };
    } else {
      return { active: true, message: "Signal is active" };
    }
  };

  const handleSignalResponse = async (received) => {
    try {
      setSignalReceived(received);
      // Here you would typically make an API call to update the signal status
      // await updateSignalStatus(id, received);
      console.log(`Signal ${received ? "received" : "not received"}`);
    } catch (error) {
      console.error("Error updating signal status:", error);
    }
  };

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await getSignalById(id);
        setSignal(response.data.signal);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchSignal();
  }, [id]);

  const { current, next } = useMemo(
    () => calculateSignalValues(signal?.capital, signal?.profit),
    [signal]
  );

  const { active, message } = checkTimeStatus(signal?.time);

  if (isLoading) {
    return <MainContainer>Loading...</MainContainer>;
  }

  return (
    <MainContainer>
      <div>
        <BackButton onClick={() => navigate(-1)}>
          <MdChevronLeft size={20} />
        </BackButton>
        <Title>{signal?.name}</Title>
        <Duration>
          <IoTimeOutline />
          <span>{signal?.time}</span>
        </Duration>
        <StatusBadge active={active}>
          <IoTimeOutline />
          {message}
        </StatusBadge>

        <Container>
          <SignalWidget
            label="Capital"
            value={formatCurrency(current)}
            balance={formatCurrency(current, true)}
          />
          <IconWrapper>
            <FaArrowRightLong />
          </IconWrapper>
          <SignalWidget
            label="Profit"
            value={formatCurrency(next)}
            balance={formatCurrency(next, true)}
          />
        </Container>

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
      </div>
    </MainContainer>
  );
};

export default ViewSignal;
