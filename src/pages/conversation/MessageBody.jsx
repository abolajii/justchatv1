import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import useThemeStore from "../../store/useThemeStore";

const Message = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
  gap: 3px;
  .time {
    margin-left: 5px;
    color: ${({ isDarkMode }) => (isDarkMode ? "#ccc" : "#333")};
    font-size: 10px;
    font-style: italic;
  }
`;

const Receiver = styled(Message)`
  justify-content: flex-start;
  position: relative;
`;

const Sender = styled(Message)`
  justify-content: flex-end;
  position: relative;
`;

const HoverIcon = styled.div`
  visibility: hidden; /* Hide by default */
  cursor: pointer;
  position: relative;

  ${Message}:hover & {
    visibility: visible; /* Show on hover of the message */
  }
`;

const SenderMessageBody = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#376c6c" : "#aee9e9")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "black")};
  padding: 7px;
  border-radius: 10px;
  max-width: 70%;
  display: flex;
  font-size: 13px;
  align-items: end;
  position: relative;
`;

const ReceiverMessageBody = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#444" : "#dddddd")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "black")};
  padding: 7px;
  border-radius: 10px;
  max-width: 70%;
  display: flex;
  font-size: 13px;
  align-items: end;
  position: relative;

  ${({ hasAvatar }) =>
    !hasAvatar &&
    `
    margin-left: 40px; /* Adjust to align with messages that have an avatar */
  `}
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* Position below the hover icon */
  right: 0px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#555" : "white")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#333")};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 150px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.3s ease-in-out;
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ isDarkMode }) => (isDarkMode ? "#666" : "#f5f5f5")};
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
  object-fit: cover;
`;

const MessageBody = ({ messages }) => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore();

  const sortedMessages = messages?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div>
      {sortedMessages.map((m, index) => {
        const sender = m.sender._id === user.id;
        const showAvi =
          !sender &&
          (index === 0 ||
            sortedMessages[index - 1].sender._id !== m.sender._id);

        const isFirstMessageOfSender =
          index === 0 || sortedMessages[index - 1].sender._id !== m.sender._id;

        return sender ? (
          <Sender key={m._id} isDarkMode={isDarkMode}>
            <HoverIcon>
              <IoIosArrowDown onClick={() => {}} />
            </HoverIcon>
            <SenderMessageBody isDarkMode={isDarkMode}>
              <p>{m.content}</p>
              <p className="time">{formatTime(m.createdAt)}</p>
            </SenderMessageBody>
          </Sender>
        ) : (
          <Receiver key={m._id} isDarkMode={isDarkMode}>
            {showAvi && <Avatar src={m.sender.profilePic} />}
            <ReceiverMessageBody hasAvatar={showAvi} isDarkMode={isDarkMode}>
              <p>{m.content}</p>
              <p className="time">{formatTime(m.createdAt)}</p>
            </ReceiverMessageBody>
            <HoverIcon>
              <IoIosArrowDown onClick={() => {}} />
            </HoverIcon>
          </Receiver>
        );
      })}
    </div>
  );
};

export default MessageBody;
