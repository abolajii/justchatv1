import React from "react";
import useUserStore from "../../store/useUserStore";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import useThemeStore from "../../store/useThemeStore";

// Add new styled component for date separator
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

const DateSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  position: relative;
`;

const DateLabel = styled.span`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#444" : "#e4e4e4")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#666")};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

// Previous styled components remain the same
// const Message = styled.div`
//   display: flex;
//   width: 100%;
//   margin-bottom: 5px;
//   align-items: center;
//   gap: 3px;
//   .time {
//     margin-left: 5px;
//     color: ${({ isDarkMode }) => (isDarkMode ? "#ccc" : "#333")};
//     font-size: 10px;
//     font-style: italic;
//   }
// `;

// ... (keep all other styled components the same)

const MessageBody = ({ messages }) => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore();

  // Helper function to format date for grouping
  const formatDateLabel = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format for comparing dates without time
    const formatDateOnly = (date) => date.toISOString().split("T")[0];

    if (formatDateOnly(date) === formatDateOnly(today)) {
      return "Today";
    } else if (formatDateOnly(date) === formatDateOnly(yesterday)) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = {};

    messages
      ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .forEach((message) => {
        const dateLabel = formatDateLabel(message.createdAt);
        if (!groups[dateLabel]) {
          groups[dateLabel] = [];
        }
        groups[dateLabel].push(message);
      });

    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <DateSeparator>
            <DateLabel isDarkMode={isDarkMode}>{date}</DateLabel>
          </DateSeparator>

          {dateMessages.map((m, index) => {
            const sender = m.sender._id === user.id;
            const showAvi =
              !sender &&
              (index === 0 ||
                dateMessages[index - 1].sender._id !== m.sender._id);

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
                <ReceiverMessageBody
                  hasAvatar={showAvi}
                  isDarkMode={isDarkMode}
                >
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
      ))}
    </div>
  );
};

export default MessageBody;
