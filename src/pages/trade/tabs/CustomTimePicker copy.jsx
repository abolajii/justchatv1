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
  width: 240px;
`;

const Grid = styled.div``;

const Section = styled.div``;

const SectionTitle = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textSecondary};
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

const TimeCell = styled.div`
  padding: 4px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ isSelected, theme }) =>
    isSelected ? theme.primaryColor : "transparent"};
  color: ${({ isSelected, theme }) =>
    isSelected ? "#fff" : theme.textSecondary};
  transition: all 0.2s;

  &:hover {
    background: ${({ isSelected, theme }) =>
      isSelected ? theme.primaryColor : `${theme.primaryColor}20`};
  }
`;

const CustomTimePicker = ({ value, onChange, disabled, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h);
      setMinutes(m);
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

  const handleTimeChange = (newHours, newMinutes) => {
    const formattedTime = `${newHours.padStart(2, "0")}:${newMinutes.padStart(
      2,
      "0"
    )}`;
    onChange(formattedTime);
    setIsOpen(false);
  };

  return (
    <TimePickerContainer ref={dropdownRef}>
      <TimeDisplay
        theme={theme}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value ? `${hours}:${minutes}` : "--:--"}
      </TimeDisplay>

      {isOpen && !disabled && (
        <DropdownContainer theme={theme}>
          <div className="flex">
            <div className="flex-1">
              <div>Hour</div>
              <div>
                <div>00</div>
                <div>01</div>
              </div>
            </div>
            <div className="flex-1">
              <div>Min</div>
            </div>
          </div>
        </DropdownContainer>
      )}
    </TimePickerContainer>
  );
};

export default CustomTimePicker;
