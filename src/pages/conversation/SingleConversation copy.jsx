import React, { useState } from "react";
import styled from "styled-components";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoEllipsisVerticalSharp,
  IoSendSharp,
  IoAttachOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
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
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
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
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
`;

const MessageGroup = styled.div`
  display: flex;
  /* margin-bottom: 15px; */
`;

const MessageContent = styled.div`
  max-width: 70%;
  border-radius: 12px;
  position: relative;
  display: flex;
  /* line-height: 1.3; */
`;

const SenderMessage = styled(MessageContent)`
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  margin-left: auto;
  border-bottom-right-radius: 4px;
`;

const ReceiverMessage = styled(MessageContent)`
  background-color: white;
  color: black;
  margin-right: auto;
  border-bottom-left-radius: 4px;
  /* background-color: red; */
`;

const ReceiverFirstMessage = styled(ReceiverMessage)`
  display: flex;
  align-items: flex-start;
`;

const ReceiverAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #888;
  /* margin-top: 5px; */
`;

const MessageTooltip = styled.div`
  position: absolute;
  bottom: -25px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;

  ${MessageContent}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
`;

const InputContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 10px 15px;
  margin-right: 15px;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  outline: none;
  margin-left: 10px;
`;

const SingleConversation = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "receiver",
      text: "Hey, how are you doing today?",
      time: "10:30 AM",
      isFirstMessage: true,
    },
    {
      id: 2,
      type: "sender",
      text: "I am good! Just finished a big project at work.",
      time: "10:31 AM",
    },
    {
      id: 3,
      type: "receiver",
      text: "That sounds exciting! Tell me more about it.",
      time: "10:32 AM",
      isFirstMessage: true,
    },
    {
      id: 4,
      type: "sender",
      text: "It was a challenging but rewarding experience.",
      time: "10:33 AM",
    },
  ]);

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt="User"
          />
          <UserDetails>
            <Username>Emma Johnson</Username>
            <UserStatus>Online</UserStatus>
          </UserDetails>
        </UserInfo>
        <HeaderIcons>
          <IoCallOutline size={22} color="#36bbba" />
          <IoVideocamOutline size={22} color="#36bbba" />
          <IoEllipsisVerticalSharp size={22} color="#36bbba" />
        </HeaderIcons>
      </Header>

      <ChatBody>
        {messages.map((msg) => (
          <MessageGroup key={msg.id}>
            {msg.type === "receiver" ? (
              msg.isFirstMessage ? (
                <ReceiverFirstMessage>
                  {/* <ReceiverAvatar
                    src="https://randomuser.me/api/portraits/women/50.jpg"
                    alt="Sender"
                  /> */}
                  <div>
                    <ReceiverMessage>
                      {msg.text}
                      {/* <MessageTooltip>Received at {msg.time}</MessageTooltip> */}
                    </ReceiverMessage>
                    {/* <MessageInfo>{msg.time}</MessageInfo> */}
                  </div>
                </ReceiverFirstMessage>
              ) : (
                <ReceiverMessage>
                  {msg.text}
                  <MessageTooltip>Received at {msg.time}</MessageTooltip>
                </ReceiverMessage>
              )
            ) : (
              <SenderMessage>
                {msg.text}
                <MessageInfo
                  style={{
                    justifyContent: "flex-end",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {msg.time}
                  <BsCheckAll
                    size={16}
                    color="white"
                    style={{ marginLeft: 5 }}
                  />
                </MessageInfo>
              </SenderMessage>
            )}
          </MessageGroup>
        ))}
      </ChatBody>

      <Footer>
        <IoAttachOutline
          size={24}
          color="#36bbba"
          style={{ marginRight: 15 }}
        />
        <IoHappyOutline size={24} color="#36bbba" style={{ marginRight: 15 }} />
        <InputContainer>
          <Input placeholder="Type a message" />
        </InputContainer>
        <IoSendSharp size={24} color="#36bbba" />
      </Footer>
    </Container>
  );
};

export default SingleConversation;
