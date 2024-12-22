import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const TimePickerContainer = styled.div`
  position: relative;
`;

const TimeDisplay = styled.div`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background: ${({ theme, disabled }) =>
    disabled ? theme.disabledBackground : theme.backgroundSecondary};
  color: ${({ theme, disabled }) =>
    disabled ? theme.disabledColor : theme.textSecondary};
  transition: all 0.2s;

  &:hover {
    ${({ disabled, theme }) =>
      !disabled &&
      `
      border-color: ${theme.primaryColor};
    `}
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  z-index: 50;
  margin-top: 4px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 280px;
`;

const SelectionGrid = styled.div`
  display: flex;
  gap: 16px;
`;

const SelectionColumn = styled.div`
  flex: 1;
`;

const ColumnTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textSecondary};
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundPrimary};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.borderColor};
    border-radius: 2px;
  }
`;

const TimeCell = styled.div`
  padding: 6px 4px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.primaryColor : "transparent"};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? "#fff" : theme.textSecondary};
  transition: all 0.2s;
  font-size: 13px;

  &:hover {
    background: ${({ $isSelected, theme }) =>
      $isSelected ? theme.primaryColor : `${theme.primaryColor}20`};
  }
`;

const CustomTimePicker = ({ value, onChange, disabled, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setSelectedHour(h);
      setSelectedMinute(m);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeSelection = (hour, minute) => {
    const formattedTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
    onChange(formattedTime);
  };

  // Generate arrays for hours (00-23) and minutes (00-59)
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <TimePickerContainer ref={dropdownRef}>
      <TimeDisplay
        theme={theme}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value || "--:--"}
      </TimeDisplay>

      {isOpen && !disabled && (
        <DropdownContainer theme={theme}>
          <SelectionGrid>
            <SelectionColumn>
              <ColumnTitle theme={theme}>Hour</ColumnTitle>
              <TimeGrid theme={theme}>
                {hours.map((hour) => (
                  <TimeCell
                    key={hour}
                    $isSelected={hour === selectedHour}
                    theme={theme}
                    onClick={() => {
                      setSelectedHour(hour);
                      if (selectedMinute) {
                        handleTimeSelection(hour, selectedMinute);
                      }
                    }}
                  >
                    {hour}
                  </TimeCell>
                ))}
              </TimeGrid>
            </SelectionColumn>
            <SelectionColumn>
              <ColumnTitle theme={theme}>Minute</ColumnTitle>
              <TimeGrid theme={theme}>
                {minutes.map((minute) => (
                  <TimeCell
                    key={minute}
                    $isSelected={minute === selectedMinute}
                    theme={theme}
                    onClick={() => {
                      setSelectedMinute(minute);
                      if (selectedHour) {
                        handleTimeSelection(selectedHour, minute);
                      }
                    }}
                  >
                    {minute}
                  </TimeCell>
                ))}
              </TimeGrid>
            </SelectionColumn>
          </SelectionGrid>
        </DropdownContainer>
      )}
    </TimePickerContainer>
  );
};

export default CustomTimePicker;
