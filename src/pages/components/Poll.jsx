import React, { useState } from "react";
import styled from "styled-components";
import ReuseableModal from "./ResuableModal";
import useModalStore from "../store/useModalStore";

const PollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

const PollHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 4px rgba(0, 123, 255, 0.5);
  }
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const OptionInput = styled(Input)`
  flex: 1;
`;

const AddOptionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled(AddOptionButton)`
  width: 100%;
  margin-top: 16px;
`;

const RemoveOptionButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #cc0000;
  }
`;

const PollLengthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeInput = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  input {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;

    &:focus {
      border-color: #007bff;
      box-shadow: 0px 0px 4px rgba(0, 123, 255, 0.5);
    }
  }
`;

const PollResults = styled.div`
  margin-top: 20px;
  text-align: center;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 8px 0;
      font-size: 1rem;
    }
  }
`;

const Poll = () => {
  const { isPollModalOpen, closePollModal } = useModalStore();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [pollLength, setPollLength] = useState(1); // Default poll length is 1 day
  const [pollHour, setPollHour] = useState("12"); // Default poll end hour
  const [pollMinute, setPollMinute] = useState("00"); // Default poll end minute
  const [isPollEnded, setPollEnded] = useState(false);
  const [pollEndDate, setPollEndDate] = useState(null);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const calculatePollEndDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + pollLength);
    currentDate.setHours(pollHour, pollMinute);
    return currentDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const submitPoll = () => {
    if (
      question.trim() === "" ||
      options.some((opt) => opt.trim() === "") ||
      pollHour === "" ||
      pollMinute === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }
    setPollEndDate(calculatePollEndDate());
    setPollEnded(true);
  };

  return (
    <ReuseableModal isOpen={isPollModalOpen} closeModal={closePollModal}>
      <PollContainer>
        {!isPollEnded ? (
          <>
            <PollHeader>Create a Poll</PollHeader>
            <Input
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
              <OptionContainer key={index}>
                <OptionInput
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                />
                {options.length > 1 && (
                  <RemoveOptionButton onClick={() => removeOption(index)}>
                    &times;
                  </RemoveOptionButton>
                )}
              </OptionContainer>
            ))}
            <AddOptionButton onClick={addOption}>+ Add Option</AddOptionButton>
            <PollLengthContainer>
              <label>Poll Length (days):</label>
              <Input
                type="number"
                min="1"
                value={pollLength}
                onChange={(e) => setPollLength(Number(e.target.value))}
              />
            </PollLengthContainer>
            <PollLengthContainer>
              <label>End Time:</label>
              <TimeInput>
                <input
                  type="number"
                  placeholder="HH"
                  min="0"
                  max="23"
                  value={pollHour}
                  onChange={(e) => setPollHour(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="MM"
                  min="0"
                  max="59"
                  value={pollMinute}
                  onChange={(e) => setPollMinute(e.target.value)}
                />
              </TimeInput>
            </PollLengthContainer>
            <SubmitButton onClick={submitPoll}>Submit Poll</SubmitButton>
          </>
        ) : (
          <PollResults>
            <h3>Poll Results</h3>
            <p>
              <strong>Question:</strong> {question}
            </p>
            <p>
              <strong>Poll Ends:</strong> {pollEndDate}
            </p>
            <ul>
              {options.map((option, index) => (
                <li key={index}>
                  {index + 1}. {option} - 0 votes (dummy data)
                </li>
              ))}
            </ul>
            <AddOptionButton onClick={() => setPollEnded(false)}>
              Restart Poll
            </AddOptionButton>
          </PollResults>
        )}
      </PollContainer>
    </ReuseableModal>
  );
};

export default Poll;
