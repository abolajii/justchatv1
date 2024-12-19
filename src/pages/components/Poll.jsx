import React, { useState } from "react";
import styled from "styled-components";
import ReuseableModal from "./ResuableModal";
import useModalStore from "../store/useModalStore";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { createPoll } from "../../api/request";
import { useAlert } from "../../context/AlertContext";
import { Spinner } from "../../components";
import useThemeStore from "../../store/useThemeStore";

const PollContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isDarkMode ? "#1a1a1a" : "white")};
  color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#333")};

  .label {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
    color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#000")};
  }

  .poll-length {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#000")};
  }

  .poll-duration {
    display: flex;
  }

  .flex {
    display: flex;
    gap: 10px;
  }

  .choices {
    margin-top: 10px;
  }

  .title {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#000")};
  }

  .flex-1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .error {
    color: ${(props) => (props.isDarkMode ? "#f87171" : "#dc2626")};
    font-size: 12px;
    margin-top: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid
    ${(props) =>
      props.hasError ? "red" : props.isDarkMode ? "#404040" : "#ccc"};
  border-radius: 8px;
  outline: none;
  background-color: ${(props) => (props.isDarkMode ? "#262626" : "white")};
  color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#333")};

  &:focus {
    border-color: #097528;
    box-shadow: 0px 0px 4px rgba(9, 117, 40, 0.5);
  }
`;

const PollHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   font-size: 1rem;
//   border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
//   border-radius: 8px;
//   outline: none;
//   &:focus {
//     border-color: #097528; /* Green focus border */
//     box-shadow: 0px 0px 4px rgba(9, 117, 40, 0.5); /* Green shadow */
//   }
// `;

const OptionContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: end;
  margin-bottom: 8px;
`;

const OptionInput = styled(Input)`
  flex: 1;
`;

const AddButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: #097528; /* Green hover effect */
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1px solid
    ${(props) => {
      if (props.$hasError) return "#dc2626";
      return props.isDarkMode ? "#404040" : "#d1d5db";
    }};
  border-radius: 8px;
  outline: none;
  appearance: none;
  background-color: ${(props) => (props.isDarkMode ? "#262626" : "white")};
  color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#333")};

  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  option {
    /* color: #000; */
    color: ${(props) => (props.isDarkMode ? "#e5e5e5" : "#000")};
    background-color: ${(props) => (props.isDarkMode ? "#262626" : "white")};
  }
  &:focus {
    border-color: #097528; /* Green focus border */
    box-shadow: 0px 0px 4px rgba(9, 117, 40, 0.5); /* Green shadow */
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 10px;
  color: #1d7937;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #1d7937;
  cursor: pointer;
  &:hover {
    background-color: #d8eadd;
  }
`;

const Poll = () => {
  const { isPollModalOpen, closePollModal } = useModalStore();
  const { isDarkMode } = useThemeStore();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [pollDays, setPollDays] = useState(0);
  const [pollHours, setPollHours] = useState(0);
  const [pollMinutes, setPollMinutes] = useState(0);
  const [errors, setErrors] = useState({
    question: "",
    options: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { showAlert } = useAlert();

  const addOption = () => setOptions([...options, ""]);

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  const validatePoll = () => {
    let hasError = false;
    const newErrors = { question: "", options: "", duration: "" };

    if (!question.trim()) {
      newErrors.question = "Question is required.";
      hasError = true;
    }

    if (options.length < 1 || options.some((opt) => !opt.trim())) {
      newErrors.options = "At least one option is required.";
      hasError = true;
    }

    const totalMinutes = pollDays * 24 * 60 + pollHours * 60 + pollMinutes;
    if (totalMinutes < 5) {
      newErrors.duration = "Poll duration must be at least 5 minutes.";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async () => {
    if (validatePoll()) {
      // Current date/time as the poll's start date
      setIsLoading(true);
      const startDate = new Date();

      // Calculate poll duration
      const pollDuration = `${pollDays} days, ${pollHours} hours, ${pollMinutes} minutes`;

      // Compute the end date based on the duration
      const pollEndDate = calculatePollEndDate(startDate, pollDuration);

      // Log the data with the calculated end date
      const data = {
        question,
        options,
        startTime: Date.now(),
        endTime: pollEndDate,
      };

      try {
        const response = await createPoll(data);
        console.log(response);

        showAlert("success", "Poll created successfully");

        closePollModal();

        // Reset the form
        setQuestion("");
        setOptions([""]);
        setPollDays(0);
        setPollHours(0);
        setPollMinutes(0);
      } catch (error) {
        showAlert("error", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Helper function to calculate poll end date
  const calculatePollEndDate = (startDate, pollDuration) => {
    const start = new Date(startDate);

    const durationParts = pollDuration.match(
      /(\d+)\s*days?,\s*(\d+)\s*hours?,\s*(\d+)\s*minutes?/
    );
    if (!durationParts) {
      throw new Error("Invalid poll duration format");
    }

    const [_, days, hours, minutes] = durationParts.map(Number);

    start.setDate(start.getDate() + days);
    start.setHours(start.getHours() + hours);
    start.setMinutes(start.getMinutes() + minutes);

    return start.toISOString(); // Return as ISO string
  };

  return (
    <ReuseableModal
      isOpen={isPollModalOpen}
      closeModal={() => {
        closePollModal();
        // Reset the form
        setQuestion("");
        setOptions([""]);
        setPollDays(0);
        setPollHours(0);
        setPollMinutes(0);
        setErrors({
          question: "",
          options: "",
          duration: "",
        });
      }}
      isDarkMode={isDarkMode}
    >
      <PollContainer isDarkMode={isDarkMode}>
        <PollHeader>Create a Poll</PollHeader>

        <p className="label">Question</p>
        <Input
          isDarkMode={isDarkMode}
          placeholder="Enter your question"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (errors.question) setErrors({ ...errors, question: "" });
          }}
          hasError={!!errors.question}
        />
        {errors.question && <p className="error">{errors.question}</p>}

        <div className="choices">
          <p className="label">Options</p>
          {options.map((option, index) => (
            <OptionContainer key={index}>
              <OptionInput
                isDarkMode={isDarkMode}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  updateOption(index, e.target.value);
                  if (errors.options) setErrors({ ...errors, options: "" });
                }}
                hasError={!!errors.options}
              />
              <AddButton onClick={addOption}>
                <MdAdd color="#097528" size={20} />
              </AddButton>
              {options.length > 1 && (
                <AddButton onClick={() => removeOption(index)}>
                  <FiMinus color="#e1491e" size={20} />
                </AddButton>
              )}
            </OptionContainer>
          ))}
          {errors.options && <p className="error">{errors.options}</p>}
        </div>

        <p className="poll-length">Length of poll</p>
        <div className="poll-duration flex">
          <div className="flex-1">
            <p className="title">Days</p>
            <Dropdown
              value={pollDays}
              isDarkMode={isDarkMode}
              onChange={(e) => {
                setPollDays(Number(e.target.value));
                if (errors.duration) setErrors({ ...errors, duration: "" });
              }}
            >
              {[...Array(8).keys()].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Dropdown>
          </div>
          <div className="flex-1">
            <p className="title">Hours</p>
            <Dropdown
              isDarkMode={isDarkMode}
              value={pollHours}
              onChange={(e) => {
                setPollHours(Number(e.target.value));
                if (errors.duration) setErrors({ ...errors, duration: "" });
              }}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Dropdown>
          </div>
          <div className="flex-1">
            <p className="title">Mins</p>
            <Dropdown
              isDarkMode={isDarkMode}
              value={pollMinutes}
              onChange={(e) => {
                setPollMinutes(Number(e.target.value));
                if (errors.duration) setErrors({ ...errors, duration: "" });
              }}
            >
              {[...Array(60).keys()].map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Dropdown>
          </div>
        </div>
        {errors.duration && <p className="error">{errors.duration}</p>}

        <SubmitButton onClick={handleSubmit}>
          {isLoading ? <Spinner size="20px" /> : "Create Poll"}
        </SubmitButton>
      </PollContainer>
    </ReuseableModal>
  );
};

export default Poll;
