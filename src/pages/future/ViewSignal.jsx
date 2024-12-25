import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";
import styled from "styled-components";
import { getSignalById, updateSignalById } from "../../api/request";
import { useAlert } from "../../context/AlertContext";
import MainContainer from "./MainContainer";
import SignalResult from "./SignalResults";
import { RiSignalTowerFill } from "react-icons/ri";
import SignalNotActive from "./SignalNotActive";

const Container = styled.div`
  margin-top: 60px;
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
  margin-top: 60px;
  display: inline-flex;
  align-items: center;
  padding: 4px;

  &:hover {
    background-color: #272727;
  }
`;

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

// Utility functions
const calculateSignalValues = (initialAmount = 0) => {
  const tradingAmount = initialAmount * 0.01;
  const profitAmount = tradingAmount * 0.88;
  return {
    current: initialAmount,
    next: initialAmount + profitAmount,
  };
};

const checkTimeStatus = (timeRange) => {
  if (!timeRange) return { active: false, message: "Invalid time range" };

  const [startTime, endTime] = timeRange.split(" - ");
  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  if (currentTime < startTime) {
    return { active: false, message: "Signal not active yet" };
  } else if (currentTime > endTime) {
    return { active: false, message: "Signal has ended" };
  }
  return { active: true, message: "Signal is active" };
};

const formatCurrency = (number, includeSymbol = false, currency = "usd") => {
  if (typeof number !== "number" || isNaN(number)) return "0.00";

  // Get the whole number part and decimal part
  const parts = number.toFixed(2).split(".");
  const wholeNumber = parts[0];
  const decimal = parts[1];

  // Add commas to the whole number
  const formattedWholeNumber = wholeNumber.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine whole number and decimal
  const formatted = `${formattedWholeNumber}.${decimal}`;

  if (currency === "naira") {
    return `₦${formatted}`;
  }
  return includeSymbol ? `$${formatted}` : formatted;
};
// Sub-components

const SignalWidget = ({ label, value, balance }) => (
  <Widget>
    <div>
      <div style={{ color: "#e0e0e0", marginBottom: "8px" }}>{label}</div>
      <div style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>
        {value}
      </div>
    </div>
    <div style={{ color: "#22c55e", fontSize: "14px", marginTop: "auto" }}>
      {label === "To" ? "Est. Profit" : "Capital"}: {balance}
    </div>
  </Widget>
);

// Main component
const ViewSignal = () => {
  const [signal, setSignal] = useState(null);
  const [signalReceived, setSignalReceived] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const NGN_TO_USD_RATE = 1656.0;

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await getSignalById(id);
        if (!response?.data?.signal) {
          throw new Error("Signal not found");
        }
        setSignal(response.data.signal);
      } catch (error) {
        console.error("Error fetching signal:", error);
        setError(error.message || "Failed to fetch signal details");
        showAlert("error", "Failed to fetch signal details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchSignal();
    }
  }, [id, showAlert]);

  const handleSignalResponse = async (received) => {
    try {
      setSignalReceived(received);
      if (received) {
        await updateSignalById(id);
        const updatedSignal = { ...signal, status: "completed" };
        setSignal(updatedSignal);
        showAlert("success", "Signal updated successfully");
      }
    } catch (error) {
      console.error("Error updating signal status:", error);
      showAlert("error", "Failed to update signal status");
      setSignalReceived(null); // Reset on error
    }
  };

  if (isLoading) {
    return (
      <MainContainer>
        <Container>Loading...</Container>
      </MainContainer>
    );
  }

  if (error || !signal) {
    return (
      <MainContainer>
        <BackButton onClick={() => navigate(-1)}>
          <MdChevronLeft size={20} />
        </BackButton>
        <div style={{ color: "#fff", marginTop: "20px" }}>
          {error || "Signal not found"}
        </div>
      </MainContainer>
    );
  }

  const { current, next } = calculateSignalValues(signal.capital);
  const { active, message } = checkTimeStatus(signal.time);

  const v1 = formatCurrency(current, true);
  const b1 = formatCurrency(current * NGN_TO_USD_RATE, true, "naira");

  const v2 = formatCurrency(next, true);
  const b2 = formatCurrency(next * NGN_TO_USD_RATE, true, "naira");

  return (
    <MainContainer>
      <div>
        <BackButton onClick={() => navigate(-1)}>
          <MdChevronLeft size={20} />
        </BackButton>
        <Title>{signal.name}</Title>
        <Duration>
          <IoTimeOutline />
          <span>{signal.time}</span>
        </Duration>
        <StatusBadge active={active}>
          <RiSignalTowerFill />
          {message}
        </StatusBadge>

        {message === "Signal not active yet" && <SignalNotActive />}

        {message === "Signal is active" && (
          <SignalNotActive v1={v1} v2={v2} b1={b1} b2={b2} active />
        )}

        {/* 
        {message === "Signal has ended" && (
          <SignalNotActive v1={v1} v2={v2} b1={b1} b2={b2} active />
        )} */}

        {message === "Signal has ended" && signal.status !== "pending" && (
          <SignalResult signal={signal} />
        )}

        {message === "Signal has ended" && signal.status === "pending" && (
          <>
            <SignalNotActive v1={v1} v2={v2} b1={b1} b2={b2} active />
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
          </>
        )}
      </div>
    </MainContainer>
  );
};

export default ViewSignal;
