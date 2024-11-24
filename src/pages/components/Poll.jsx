import React, { useState } from "react";
import styled from "styled-components";
import ReuseableModal from "./ResuableModal";
import useModalStore from "../store/useModalStore";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";

const PollContainer = styled.div`
  display: flex;
  flex-direction: column;

  .label {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 500;
    color: #000;
  }

  .poll-length {
    font-size: 14px;
    font-weight: 500;
    color: #000;
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
  }

  .flex-1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
`;

const PollHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #097528; /* Green focus border */
    box-shadow: 0px 0px 4px rgba(9, 117, 40, 0.5); /* Green shadow */
  }
`;

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
  border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 8px;
  outline: none;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
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
  width: 100px;
  border-radius: 5px;
  font-size: 14px;
  background-color: transparent;
  border: 1px solid #1d7937;
  cursor: pointer;
  &:hover {
    background-color: #b9f2c9;
  }
`;

const Poll = () => {
  const { isPollModalOpen, closePollModal } = useModalStore();
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

  const handleSubmit = () => {
    if (validatePoll()) {
      console.log({
        question,
        options,
        pollDuration: {
          days: pollDays,
          hours: pollHours,
          minutes: pollMinutes,
        },
      });
      // closePollModal();

      // Validate poll duration (ensure it's at least 5 minutes from now if pollDays is 0)
      const pollEndTime = new Date();

      // If validation passes, log the data
      console.log({
        question,
        options,
        pollDuration: `${pollDays} days, ${pollHours} hours, ${pollMinutes} minutes`,
        pollEndTime: pollEndTime.toLocaleString(),
      });

      // Reset the form
      setQuestion("");
      setOptions([""]);
      setPollDays(0);
      setPollHours(0);
      setPollMinutes(0);
    }
  };

  return (
    <ReuseableModal isOpen={isPollModalOpen} closeModal={closePollModal}>
      <PollContainer>
        <PollHeader>Create a Poll</PollHeader>

        <p className="label">Question</p>
        <Input
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

        <SubmitButton onClick={handleSubmit}>Create Poll</SubmitButton>
      </PollContainer>
    </ReuseableModal>
  );
};

export default Poll;