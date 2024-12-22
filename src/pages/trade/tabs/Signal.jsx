import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import useCbexStore from "../../store/useCbexStore";

const FormGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  font-size: 15px;
  /* margin-bottom: 4px; */
  color: ${({ theme }) => theme.textPrimary};
`;

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
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
  font-size: 14px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ $isBlue }) => ($isBlue ? "#2196F3" : "#4CAF50")};
  margin: 0;
  cursor: pointer;
  border-radius: 50%;

  &:checked {
    background-color: ${({ $isBlue }) => ($isBlue ? "#2196F3" : "#4CAF50")};
    border: 1px solid ${({ $isBlue }) => ($isBlue ? "#2196F3" : "#4CAF50")};
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

const CustomInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 17px;
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textPrimary};

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Signal = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const {
    selectedOption,
    setSelectedOption,
    customTrades,
    setCustomTrades,
    setNumberOfSignals,
    setSignalTimeStartAndEndDate,
    signalTimeStartAndEndDate,
  } = useCbexStore();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "default") {
      setCustomTrades("");
      setNumberOfSignals(2);
      signalTimeStartAndEndDate.unshift();
      setSignalTimeStartAndEndDate(signalTimeStartAndEndDate);
    }
  };

  return (
    <FormGroup>
      <Label theme={theme}>How many signals in a day?</Label>
      <Note theme={theme}>Default is 2 signal per day</Note>

      <RadioContainer>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="trades"
            value="default"
            checked={selectedOption === "default"}
            onChange={handleOptionChange}
            $isBlue={false}
          />
          2 signals
        </RadioLabel>

        <RadioLabel>
          <RadioInput
            type="radio"
            name="trades"
            value="custom"
            checked={selectedOption === "custom"}
            onChange={handleOptionChange}
            $isBlue={true}
          />
          More
        </RadioLabel>
      </RadioContainer>

      {selectedOption === "custom" && (
        <CustomInput
          value={customTrades}
          onChange={(e) => setCustomTrades(e.target.value)}
          placeholder="Enter number of signals"
          min="3"
          theme={theme}
        />
      )}
    </FormGroup>
  );
};

export default Signal;
