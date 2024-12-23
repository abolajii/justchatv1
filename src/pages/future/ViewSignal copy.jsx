import React, { useEffect, useState, useMemo } from "react";
import MainContainer from "./MainContainer";
import { FaArrowRightLong } from "react-icons/fa6";
import styled from "styled-components";
import useSignalStore from "./store/useSignalStore";
import { getSignalById, getUserSignal } from "../../api/request";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import { Spinner } from "../../components";

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
  /* padding: 8px; */
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

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const SignalWidget = ({ label, value, balance }) => (
  <Widget>
    <div>
      <div>{label}</div>
      <div>{value}</div>
    </div>
    <div>
      {label === "To" ? "Est. return" : "Balance"}: {balance}
    </div>
  </Widget>
);

const ViewSignal = () => {
  const { defaultValue, setDefaultValue } = useSignalStore();
  const [signal, setSignal] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setSignal(null);
    }
  }, [isLoading]);

  const NGN_TO_USD_RATE = 1656.0;

  const calculateSignalValues = (initialAmount) => {
    if (!initialAmount) return { current: 0, next: 0 };
    const tradingAmount = initialAmount * 0.01;
    const profitAmount = tradingAmount * 0.88;
    return {
      current: initialAmount,
      next: initialAmount + profitAmount,
    };
  };

  const { current, next } = useMemo(
    () => calculateSignalValues(defaultValue),
    [defaultValue]
  );

  const checkTimeStatus = (startTime, endTime) => {
    const now = new Date();
    const todayDate = now.toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format

    const start = new Date(`${todayDate}T${startTime}:00`); // Combine date and time
    const end = new Date(`${todayDate}T${endTime}:00`);

    if (now < start) {
      return { active: false, message: "Signal not active yet" };
    } else if (now > end) {
      return { active: false, message: "Signal has ended" };
    } else {
      return { active: true, message: "Signal is active" };
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserSignal();
        setDefaultValue(response?.startingCapital || 0);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, [setDefaultValue]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSignalById(id);
        setSignal(response?.data.signal || null);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, [id]);

  const { active, message } = checkTimeStatus(
    signal?.startTime,
    signal?.endTime
  );

  if (isLoading) {
    return (
      <MainContainer>
        <div className="mt-4">
          <Spinner size="20px" />
        </div>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <div>
        <BackButton onClick={() => navigate(-1)}>
          <MdChevronLeft size={20} />
        </BackButton>
        <Title>Signal Details</Title>
        <Duration>
          <IoTimeOutline />
          <span>
            {signal?.startTime} - {signal?.endTime}
          </span>
        </Duration>
        {signal && (
          <StatusBadge active={active}>
            <IoTimeOutline />
            {message}
          </StatusBadge>
        )}
        {message !== "Signal not active yet" && (
          <Container>
            <SignalWidget
              label="From"
              value={formatCurrency(current)}
              balance={formatCurrency(current * NGN_TO_USD_RATE, true)}
            />
            <IconWrapper>
              <FaArrowRightLong />
            </IconWrapper>
            <SignalWidget
              label="To"
              value={formatCurrency(next)}
              balance={formatCurrency(next * NGN_TO_USD_RATE, true)}
            />
          </Container>
        )}
      </div>
    </MainContainer>
  );
};

export default ViewSignal;
