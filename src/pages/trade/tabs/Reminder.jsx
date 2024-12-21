import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import useCbexStore from "../../store/useCbexStore";

const Container = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
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
  border-radius: 50%;
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: white;
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const SignalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const SignalItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const SignalTime = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textPrimary};
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4caf50;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Reminder = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const {
    // signalTimeStartAndEndDate,
    reminderSettings,
    setReminderSettings,
    reminder,
    setReminder,
  } = useCbexStore();

  // Initialize reminder settings when signalTimeStartAndEndDate changes
  // useEffect(() => {
  //   if (Array.isArray(signalTimeStartAndEndDate)) {
  //     const initialSettings = signalTimeStartAndEndDate.map(
  //       (signal, index) => ({
  //         id: index + 1,
  //         time: signal.startTime || "",
  //         isEnabled: false,
  //         endTime: signal.endTime || "",
  //       })
  //     );
  //     setReminderSettings(initialSettings);
  //   }
  // }, [signalTimeStartAndEndDate]);

  const handleScheduleChange = (event) => {
    setReminder(event.target.value);
  };

  const handleToggle = (id) => {
    console.log(id);
    if (!Array.isArray(reminderSettings)) return;

    const updatedSettings = reminderSettings.map((setting) =>
      setting.id === id
        ? { ...setting, isEnabled: !setting.isEnabled }
        : setting
    );

    setReminderSettings(updatedSettings);
  };

  const formatTime = (time) => {
    if (!time) return "";
    return time;
  };

  console.log(reminderSettings);

  return (
    <Container theme={theme}>
      <Label theme={theme}>
        Would you like to set a reminder about signal?
      </Label>
      <RadioGroup>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="reminder"
            value="yes"
            checked={reminder === "yes"}
            onChange={handleScheduleChange}
            isBlue={false}
          />
          Yes
        </RadioLabel>
        <RadioLabel>
          <RadioInput
            type="radio"
            name="reminder"
            value="no"
            checked={reminder === "no"}
            onChange={handleScheduleChange}
            isBlue={true}
          />
          No
        </RadioLabel>
      </RadioGroup>
      {reminder === "yes" && (
        <SignalList theme={theme}>
          {reminderSettings.map((setting) => (
            <SignalItem key={setting.id} theme={theme}>
              <SignalTime theme={theme}>
                Signal {setting.id}: {formatTime(setting.time)}
              </SignalTime>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={setting.isEnabled}
                  onChange={() => handleToggle(setting.id)}
                />
                <Slider />
              </ToggleSwitch>
            </SignalItem>
          ))}
        </SignalList>
      )}
    </Container>
  );
};

export default Reminder;
