import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import CustomTimePicker from "./CustomTimePicker";

const BigLabel = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
`;

const TradeSection = styled.div`
  margin-bottom: 24px;
`;

const TradeTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textColor};
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const TimeGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.labelColor || theme.textColor};
`;

const SignalTime = () => {
  const { isDarkMode } = useThemeStore();
  const defaultSignalDuration = 30;
  const numberOfTrade = 2;

  const theme = isDarkMode ? darkTheme : lightTheme;

  const [startTimes, setStartTimes] = useState(Array(numberOfTrade).fill(""));

  const calculateEndTime = (startTime) => {
    if (!startTime) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + defaultSignalDuration;

    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;

    return `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartTimeChange = (index, value) => {
    const newStartTimes = [...startTimes];
    newStartTimes[index] = value;
    setStartTimes(newStartTimes);
  };

  return (
    <Container theme={theme}>
      <BigLabel theme={theme}>Time of Signal(s)</BigLabel>

      {Array(numberOfTrade)
        .fill(null)
        .map((_, index) => (
          <TradeSection key={index} theme={theme}>
            <TradeTitle theme={theme}>Trade {index + 1}</TradeTitle>
            <TimeGrid>
              <TimeGroup>
                <Label htmlFor={`start-time-${index}`} theme={theme}>
                  Start Time
                </Label>
                <CustomTimePicker
                  value={startTimes[index]}
                  onChange={(value) => handleStartTimeChange(index, value)}
                  theme={theme}
                />
              </TimeGroup>
              <TimeGroup>
                <Label htmlFor={`end-time-${index}`} theme={theme}>
                  End Time
                </Label>
                <CustomTimePicker
                  value={calculateEndTime(startTimes[index])}
                  disabled={true}
                  theme={theme}
                />
              </TimeGroup>
            </TimeGrid>
          </TradeSection>
        ))}
    </Container>
  );
};

export default SignalTime;
