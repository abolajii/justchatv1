import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation for scaling the container
const scaleUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const scaleDown = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;    
  }
  100% {
    transform: scale(0);
    opacity: 0;    
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 38px;
  height: 400px;
  width: 400px;
  background-color: #525252;

  border-radius: 3px;
  transform-origin: bottom center;
  animation: ${(props) => (props.show ? scaleUp : scaleDown)} 0.25s ease
    forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EmojiDisplay = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  color: #fff;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #515151;
  gap: 10px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 3px 0;
  flex: 1;
  color: ${(props) => (props.active ? "#fff" : "#a0a0a0")};
  font-size: 18px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.active ? "2px solid #fff" : "2px solid transparent"};

  &:hover {
    color: #fff;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #515151;
  border-bottom: 1px solid #ccc;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  background-color: #515151;
  bo
`;

const emojiData = {
  "😊": "",
  "🏳️": "",
  "🏳️": "",
  "🐶": "",
  "💻": "",
  "💔": "",
  "🚂": "",
  "🍎": "",
};

const Emojis = ({ showEmoji }) => {
  const [activeTab, setActiveTab] = useState("smile");

  if (!showEmoji) return null;

  return (
    <Container show={showEmoji}>
      <Header>
        <SearchInput type="text" placeholder="Search emojis..." />
      </Header>

      {/* Emoji Display Section */}
      <EmojiDisplay>{emojiData[activeTab]}</EmojiDisplay>

      {/* Footer Tabs */}
      <Footer>
        {Object.keys(emojiData).map((category) => (
          <Tab
            key={category}
            active={activeTab === category}
            onClick={() => setActiveTab(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Tab>
        ))}
      </Footer>
    </Container>
  );
};

export default Emojis;
