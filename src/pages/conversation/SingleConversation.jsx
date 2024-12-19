import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoEllipsisVerticalSharp,
  IoSendSharp,
  IoAttachOutline,
  IoHappyOutline,
} from "react-icons/io5";
import {
  getConversation,
  getUserConversationMessages,
} from "../../api/request";
import { useParams } from "react-router-dom";
import MessageBody from "./MessageBody";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid ${(props) => props.theme.avatarBorder};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textPrimary};
`;

const UserStatus = styled.p`
  margin: 0;
  font-size: 12px;
  color: #888;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ChatBody = styled.div`
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => props.theme.background};
  border-top: 1px solid ${(props) => props.theme.inputBorder};
`;

const InputContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.inputBackground};
  border-radius: 25px;
  padding: 10px 15px;
  margin-right: 15px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  color: ${(props) => props.theme.textPrimary};
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  margin-left: 10px;
  color: ${(props) => props.theme.textPrimary};
`;

const Message = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;
  gap: 3px;
  .time {
    margin-left: 5px;
    color: #333;
    font-size: 11px;
  }
`;

const SingleConversation = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatBodyRef = useRef(null);

  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { id } = useParams();

  // Fetch messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getUserConversationMessages(id);
        setMessages(response.messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    // Optional: Set up polling to fetch new messages periodically
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [id]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await getConversation(id);
        setSelectedUser(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchConversation();
  }, [id, setSelectedUser]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      // TODO: Implement actual message sending API call
      // const newMessage = await sendMessage(id, inputMessage);

      // Temporary client-side message addition
      const newMessage = {
        _id: Date.now().toString(),
        sender: {
          _id: "current_user_id", // Replace with actual current user ID
          name: "Current User",
        },
        content: inputMessage,
        createdAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const optionsDate = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", optionsDate);

    const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} | ${formattedTime}`;
  }

  if (loading) {
    return null;
  }

  return (
    <Container theme={theme}>
      <Header theme={theme}>
        <UserInfo>
          <Avatar src={selectedUser?.profilePic} alt="User" />
          <UserDetails>
            <Username>{selectedUser?.name}</Username>
            <UserStatus>
              Last Seen {formatDate(selectedUser?.lastLogin)}
            </UserStatus>
          </UserDetails>
        </UserInfo>
        <HeaderIcons>
          <IoCallOutline size={22} color="#36bbba" />
          <IoVideocamOutline size={22} color="#36bbba" />
          <IoEllipsisVerticalSharp size={22} color="#36bbba" />
        </HeaderIcons>
      </Header>

      <ChatBody ref={chatBodyRef}>
        <MessageBody messages={messages} />
      </ChatBody>

      <Footer theme={theme}>
        <IoAttachOutline
          size={24}
          color="#36bbba"
          style={{ marginRight: 15 }}
        />
        <IoHappyOutline size={24} color="#36bbba" style={{ marginRight: 15 }} />
        <InputContainer theme={theme}>
          <Input
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </InputContainer>
        <IoSendSharp
          size={24}
          color="#36bbba"
          onClick={handleSendMessage}
          style={{ cursor: "pointer" }}
        />
      </Footer>
    </Container>
  );
};

export default SingleConversation;
