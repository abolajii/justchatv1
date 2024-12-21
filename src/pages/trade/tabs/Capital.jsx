import React, { useState } from "react";

import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import useCbexStore from "../../store/useCbexStore";
const FormGroup = styled.div`
  /* margin: 20px 0; */
`;

const Label = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
  margin: 0;
  cursor: pointer;
  border-radius: 50%;

  &:checked {
    background-color: ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
    }
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

const CustomInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 17px;
  border-radius: 4px;
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-top: 10px;
  color: ${({ theme }) => theme.textPrimary};
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

const Capital = () => {
  const {
    tradeSchedule,
    setTradeSchedule,
    secCustomTrade,
    setSecCustomTrade,
    startingCapital,
    setStartingCapital,
  } = useCbexStore();

  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleScheduleChange = (event) => {
    setTradeSchedule(event.target.value);
    if (event.target.value !== "inbetween") {
      secCustomTrade("");
    }
  };

  return (
    <FormGroup>
      <Label theme={theme}>What is your starting capital?</Label>

      <RadioGroup>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="schedule"
            value="before_after"
            checked={tradeSchedule === "before_after"}
            onChange={handleScheduleChange}
            isBlue={false}
          />
          Before/After Trade
        </RadioLabel>

        <RadioLabel>
          <RadioInput
            type="radio"
            name="schedule"
            value="inbetween"
            checked={tradeSchedule === "inbetween"}
            onChange={handleScheduleChange}
            isBlue={true}
          />
          In-between Trade
        </RadioLabel>
      </RadioGroup>

      <InputWrapper>
        <CustomInput
          value={startingCapital}
          onChange={(e) => setStartingCapital(e.target.value)}
          placeholder="What is your starting capital"
          theme={theme}
        />
        <Note theme={theme}>
          Starting capital as at {formatCurrentDateTime()}
        </Note>
      </InputWrapper>

      {tradeSchedule === "inbetween" && (
        <InputWrapper>
          <CustomInput
            value={secCustomTrade}
            onChange={(e) => setSecCustomTrade(e.target.value)}
            placeholder="Number of signal as at now"
            theme={theme}
          />
          <Note theme={theme}>Enter the number of signal made as at now</Note>
        </InputWrapper>
      )}
    </FormGroup>
  );
};

export default Capital;
