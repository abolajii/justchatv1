import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AlertCircle } from "lucide-react";
import useModalStore from "../store/useModalStore";
import ReusableModal from "./ResuableModal";
import { Spinner } from "../../components";
import usePostStore from "../store/usePostStore";
import { schedulePost } from "../../api/request";
import { useAlert } from "../../context/AlertContext";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const ScheduleInfo = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin: 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const SelectGroup = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns || "repeat(3, 1fr)"};
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 0.875rem;
  border: 1px solid ${(props) => (props.$hasError ? "#dc2626" : "#d1d5db")};
  border-radius: 8px;
  background-color: white;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:focus {
    border-color: ${(props) => (props.$hasError ? "#dc2626" : "#2563eb")};
    box-shadow: 0 0 0 1px
      ${(props) => (props.$hasError ? "#dc2626" : "#2563eb")};
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  option {
    padding: 8px;
    color: #000;
  }
`;

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 7px;
  border-radius: 8px;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #991b1b;
  font-size: 0.875rem;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  color: #15803d;
  background-color: transparent;
  border: 1px solid #15803d;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dcfce7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Schedule = () => {
  const { isScheduleModalOpen, closeScheduleModal } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const { content, file, setContent, setFile, setImage } = usePostStore();
  const { showAlert } = useAlert();

  const [scheduledDateTime, setScheduledDateTime] = useState("");

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

  const [touched, setTouched] = useState({
    date: false,
    time: false,
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
    if (touched.date || touched.time) {
      validateSchedule();
    }
    updateScheduledDateTime();
  }, [scheduleDate, scheduleTime, touched]);

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

    return scheduledDate >= new Date(now.getTime() + 5 * 60000);
  };

  const validateSchedule = () => {
    const newErrors = { date: "", time: "" };
    let hasError = false;

    if (!scheduleDate.month || !scheduleDate.day || !scheduleDate.year) {
      newErrors.date = "Please select a valid date.";
      hasError = true;
    }

    if (!scheduleTime.hour || !scheduleTime.minute) {
      newErrors.time = "Please select a valid time.";
      hasError = true;
    } else if (!isValidScheduleTime()) {
      newErrors.time =
        "Schedule time must be at least 5 minutes in the future.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleTimeChange = (field, value) => {
    setTouched((prev) => ({ ...prev, time: true }));
    setScheduleTime((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field, value) => {
    setTouched((prev) => ({ ...prev, date: true }));
    setScheduleDate((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setTouched({ date: true, time: true });
    if (validateSchedule()) {
      if (!content || !file) {
        showAlert("error", "Please provide a post content and image.");
        return;
      }

      setIsLoading(true);

      console.log("Scheduled for:", { scheduleTime, scheduleDate, content });

      const formatScheduledTime = new Date(
        Number(scheduleDate.year),
        Number(scheduleDate.month) - 1, // JavaScript months are 0-indexed
        Number(scheduleDate.day),
        Number(scheduleTime.hour),
        Number(scheduleTime.minute)
      );
      // Add your submit logic here

      const formData = new FormData();
      formData.append("content", content);
      formData.append("scheduledTime", formatScheduledTime);

      if (file) {
        formData.append("imagePost", file);
      }

      try {
        const response = await schedulePost(formData);
        console.log(response);
        closeScheduleModal();
        setContent("");
        setFile(null);
        setImage(null);
        showAlert("success", "Post schedule successfully");
      } catch (error) {
        console.error(error);
        showAlert("error", "Failed to schedule post.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ReusableModal isOpen={isScheduleModalOpen} closeModal={closeScheduleModal}>
      <Container>
        <Header>Schedule Post</Header>

        {scheduledDateTime && (
          <ScheduleInfo>Post will be sent on {scheduledDateTime}</ScheduleInfo>
        )}

        <FormSection>
          <Label>Date</Label>
          <SelectGroup>
            <Select
              value={scheduleDate.month}
              onChange={(e) => handleDateChange("month", e.target.value)}
              $hasError={errors.date && touched.date}
            >
              {months.map((month, index) => (
                <option key={month} value={String(index + 1).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </Select>

            <Select
              value={scheduleDate.day}
              onChange={(e) => handleDateChange("day", e.target.value)}
              $hasError={errors.date && touched.date}
            >
              {[...Array(31)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </Select>

            <Select
              value={scheduleDate.year}
              onChange={(e) => handleDateChange("year", e.target.value)}
              $hasError={errors.date && touched.date}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </SelectGroup>
          {errors.date && touched.date && (
            <ErrorAlert>
              <AlertCircle />
              {errors.date}
            </ErrorAlert>
          )}
        </FormSection>

        <FormSection>
          <Label>Time</Label>
          <SelectGroup $columns="repeat(2, 1fr)">
            <Select
              value={scheduleTime.hour}
              onChange={(e) => handleTimeChange("hour", e.target.value)}
              $hasError={errors.time && touched.time}
            >
              {[...Array(24)].map((_, i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </Select>

            <Select
              value={scheduleTime.minute}
              onChange={(e) => handleTimeChange("minute", e.target.value)}
              $hasError={errors.time && touched.time}
            >
              {[...Array(60)].map((_, i) => (
                <option key={i} value={String(i).padStart(2, "0")}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </Select>
          </SelectGroup>
          {errors.time && touched.time && (
            <ErrorAlert>
              <AlertCircle />
              {errors.time}
            </ErrorAlert>
          )}
        </FormSection>
        <SubmitButton onClick={handleSubmit}>
          {isLoading ? <Spinner size="20px" /> : "Schedule Post"}
        </SubmitButton>
      </Container>
    </ReusableModal>
  );
};

export default Schedule;
