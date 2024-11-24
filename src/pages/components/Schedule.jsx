import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReuseableModal from "./ResuableModal";
import useModalStore from "../store/useModalStore";

// Styled components remain the same
const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ScheduleHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const ScheduleInfo = styled.p`
  /* text-align: center; */
  color: #000;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 10px 2px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 8px;
  outline: none;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  color: #000;

  option {
    color: #000;
  }

  &:focus {
    border-color: #097528;
    box-shadow: 0px 0px 4px rgba(9, 117, 40, 0.5);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 10px;
  color: #1d7937;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #1d7937;
  &:hover {
    background-color: #d8eadd;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Schedule = () => {
  const { isScheduleModalOpen, closeScheduleModal } = useModalStore();
  const [scheduledDateTime, setScheduledDateTime] = useState("");

  // States for schedule date and time
  const [scheduleDate, setScheduleDate] = useState({
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
    day: new Date().getDate().toString().padStart(2, "0"),
    year: new Date().getFullYear().toString(),
  });

  const [scheduleTime, setScheduleTime] = useState({
    hour: new Date().getHours().toString().padStart(2, "0"),
    minute: new Date().getMinutes().toString().padStart(2, "0"),
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) =>
    (currentYear + i).toString()
  );

  useEffect(() => {
    updateScheduledDateTime();
  }, [scheduleDate, scheduleTime]);

  const updateScheduledDateTime = () => {
    const scheduledDate = new Date(
      parseInt(scheduleDate.year),
      parseInt(scheduleDate.month) - 1,
      parseInt(scheduleDate.day),
      parseInt(scheduleTime.hour),
      parseInt(scheduleTime.minute)
    );

    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    setScheduledDateTime(scheduledDate.toLocaleString("en-US", options));
  };

  const isValidScheduleTime = () => {
    const now = new Date();
    const scheduledDate = new Date(
      parseInt(scheduleDate.year),
      parseInt(scheduleDate.month) - 1,
      parseInt(scheduleDate.day),
      parseInt(scheduleTime.hour),
      parseInt(scheduleTime.minute)
    );

    // Add 5 minutes to current time
    const minScheduleTime = new Date(now.getTime() + 5 * 60000);

    return scheduledDate >= minScheduleTime;
  };

  const validateSchedule = () => {
    let hasError = false;
    const newErrors = { date: "", time: "" };

    if (!scheduleDate.month || !scheduleDate.day || !scheduleDate.year) {
      newErrors.date = "Please select a valid date.";
      hasError = true;
    }

    if (!scheduleTime.hour || !scheduleTime.minute) {
      newErrors.time = "Please select a valid time.";
      hasError = true;
    }

    if (!isValidScheduleTime()) {
      newErrors.time =
        "Schedule time must be at least 5 minutes in the future.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (validateSchedule()) {
      console.log("Scheduled for:", scheduleTime);
      console.log("Scheduled for:", scheduleDate);
      closeScheduleModal();
    }
  };

  return (
    <ReuseableModal
      isOpen={isScheduleModalOpen}
      closeModal={closeScheduleModal}
    >
      <ScheduleContainer>
        <ScheduleHeader>Schedule Post</ScheduleHeader>

        {scheduledDateTime && (
          <ScheduleInfo>Post will be sent on {scheduledDateTime}</ScheduleInfo>
        )}

        {/* Date Section */}
        <div>
          <label className="label">Date</label>
          <div className="flex gap">
            <Dropdown
              value={scheduleDate.month}
              onChange={(e) =>
                setScheduleDate({ ...scheduleDate, month: e.target.value })
              }
              hasError={!!errors.date}
            >
              {months.map((month, index) => (
                <option key={month} value={String(index + 1).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </Dropdown>

            <Dropdown
              value={scheduleDate.day}
              onChange={(e) =>
                setScheduleDate({ ...scheduleDate, day: e.target.value })
              }
              hasError={!!errors.date}
            >
              {[...Array(31).keys()].map((i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </Dropdown>

            <Dropdown
              value={scheduleDate.year}
              onChange={(e) =>
                setScheduleDate({ ...scheduleDate, year: e.target.value })
              }
              hasError={!!errors.date}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Dropdown>
          </div>
          {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        </div>

        {/* Time Section */}
        <div>
          <label className="label">Time</label>
          <div className="flex gap">
            <Dropdown
              value={scheduleTime.hour}
              onChange={(e) =>
                setScheduleTime({ ...scheduleTime, hour: e.target.value })
              }
              hasError={!!errors.time}
            >
              {[...Array(24).keys()].map((i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </Dropdown>

            <Dropdown
              value={scheduleTime.minute}
              onChange={(e) =>
                setScheduleTime({ ...scheduleTime, minute: e.target.value })
              }
              hasError={!!errors.time}
            >
              {[...Array(60).keys()].map((i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </Dropdown>
          </div>
          {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
        </div>

        <SubmitButton onClick={handleSubmit} disabled={!isValidScheduleTime()}>
          Schedule Post
        </SubmitButton>
      </ScheduleContainer>
    </ReuseableModal>
  );
};

export default Schedule;
