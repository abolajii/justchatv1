import React from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import CustomTimePicker from "./CustomTimePicker";
import useCbexStore from "../../store/useCbexStore";

const BigLabel = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  overflow: scroll;
  height: 420px;

  &::-webkit-scrollbar {
    width: 0px;
  }
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

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 8px;
  margin-top: -3px;
`;

const SignalTime = () => {
  const { isDarkMode } = useThemeStore();
  const {
    numberOfSignals,
    setSignalTimeStartAndEndDate,
    signalTimeStartAndEndDate,
  } = useCbexStore();

  const defaultSignalDuration = 30;
  const theme = isDarkMode ? darkTheme : lightTheme;

  const calculateEndTime = (startTime) => {
    if (!startTime) return "";

    try {
      const [hours, minutes] = startTime.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + defaultSignalDuration;

      const endHours = Math.floor(totalMinutes / 60) % 24;
      const endMinutes = totalMinutes % 60;

      return `${endHours.toString().padStart(2, "0")}:${endMinutes
        .toString()
        .padStart(2, "0")}`;
    } catch (error) {
      console.error("Error calculating end time:", error);
      return "";
    }
  };

  const handleStartTimeChange = (index, value) => {
    const newSignalTimes = Array.isArray(signalTimeStartAndEndDate)
      ? [...signalTimeStartAndEndDate]
      : new Array(numberOfSignals).fill(null);

    // Update the signal time at the specified index
    newSignalTimes[index] = {
      startTime: value,
      endTime: calculateEndTime(value),
      time: `${value}-${calculateEndTime(value)}`,
      id: signalTimeStartAndEndDate.length + 1,
    };

    setSignalTimeStartAndEndDate(newSignalTimes);
  };

  // Ensure signalTimeStartAndEndDate is always an array
  const signalTimes = Array.isArray(signalTimeStartAndEndDate)
    ? signalTimeStartAndEndDate
    : new Array(numberOfSignals).fill(null);

  return (
    <Container theme={theme}>
      <BigLabel theme={theme}>Time of Signal(s)</BigLabel>
      <Note theme={theme}>{numberOfSignals} signals per day</Note>

      {Array(Number(numberOfSignals))
        .fill(null)
        .map((_, index) => (
          <TradeSection key={index} theme={theme}>
            <TradeTitle theme={theme}>Signal {index + 1}</TradeTitle>
            <TimeGrid>
              <TimeGroup>
                <Label htmlFor={`start-time-${index}`} theme={theme}>
                  Start Time
                </Label>
                <CustomTimePicker
                  value={signalTimes[index]?.startTime || ""}
                  onChange={(value) => handleStartTimeChange(index, value)}
                  theme={theme}
                />
              </TimeGroup>
              <TimeGroup>
                <Label htmlFor={`end-time-${index}`} theme={theme}>
                  End Time
                </Label>
                <CustomTimePicker
                  value={signalTimes[index]?.endTime || ""}
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
