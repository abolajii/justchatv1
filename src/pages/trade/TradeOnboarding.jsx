import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";
import useUserStore from "../../store/useUserStore";
import Stepper from "../../components/Stepper";

const Container = styled.div`
  height: 100vh;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: calc(100vh - 30px);
  max-width: 660px;
  width: 100%;
  padding: 30px;

  h1 {
    font-size: 26px;
  }
`;

const FormGroup = styled.div`
  margin: 20px 0;
`;

const Label = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 13px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 13px;
  height: 13px;
  border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    position: relative;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textPrimary};
  margin-top: 10px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBackground || "#4CAF50"};
  color: ${(props) => props.theme.buttonTextColor || "#fff"};
  border: none;
  padding: 9px 12px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme.buttonHoverBackground || "#45a049"};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.buttonDisabledBackground || "#cccccc"};
    cursor: not-allowed;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const InputWrapper = styled.div`
  margin-top: 12px;
  max-width: 300px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const formatCurrentDateTime = () => {
  const now = new Date();

  const formatTime = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formatDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formatDate} - ${formatTime}`;
};

const TradeOnboarding = () => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [tradeSchedule, setTradeSchedule] = useState("before_after");
  const [customTrades, setCustomTrades] = useState("");

  const handleScheduleChange = (event) => {
    setTradeSchedule(event.target.value);
    if (event.target.value !== "inbetween") {
      setCustomTrades("");
    }
  };

  return (
    <Container theme={theme}>
      <Inner theme={theme}>
        <h1>Welcome, {user.name}!</h1>
        <p>See the Future of Your Investment</p>
        <p>
          Discover how your investment grows over time with our unique trading
          strategy
        </p>

        <Stepper />
      </Inner>
    </Container>
  );
};

export default TradeOnboarding;
