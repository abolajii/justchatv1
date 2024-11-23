import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { emojiList } from "./emojiData";

// Keyframe animation for scaling
const scaleOut = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled container for emojis
const Container = styled.div`
  position: absolute; /* Position relative to parent */
  top: 30px; /* Adjust the vertical position */
  right: 0px; /* Align it to the right */
  transform-origin: top right; /* Scale origin from the right */
  animation: ${scaleOut} 0.3s ease-out; /* Apply animation */
  background: #fff;
  border-radius: 8px; /* Rounded corners */
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); Add shadow */
  padding: 5px; /* Padding inside the container */
  z-index: 1000; /* Ensure it's above other elements */
  max-height: 300px;
  width: 350px;

  overflow: scroll;
`;

const Emoji = styled.span`
  font-size: 1.5rem; /* Size of each emoji */
  cursor: pointer;
  height: 30px;
  width: 30px;
  &:hover {
    transform: scale(1.2); /* Slightly enlarge on hover */
    transition: transform 0.2s ease-in-out;
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 0.7rem;
  outline: none;
  width: 100%;
`;

const EmojiList = styled.div`
  flex: 1;
  overflow-y: auto;
  /* padding: 5px; */
  display: flex;
  flex-direction: column;
`;

const EmojiItem = styled.span`
  font-size: 1.15rem;
  cursor: pointer;
  margin: 0 2px;

  &:hover {
    transform: scale(1.7);
    transition: transform 0.2s ease-in-out;
  }
`;

const CategoryHeader = styled.div`
  width: 100%;
  font-size: 0.9rem;
  color: #555;
  font-weight: bold;
  text-align: left;
`;

const Emojis = ({ showEmoji, onSelectEmoji }) => {
  const [search, setSearch] = useState("");
  const filteredEmojis = emojiList.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(search.toLowerCase()) ||
      emoji.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Group emojis by category
  const groupedEmojis = filteredEmojis.reduce((acc, emoji) => {
    acc[emoji.category] = acc[emoji.category] || [];
    acc[emoji.category].push(emoji);
    return acc;
  }, {});

  if (!showEmoji) return null;

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search emoji..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <EmojiList>
        {Object.keys(groupedEmojis).map((category) => (
          <div key={category}>
            <CategoryHeader>{category}</CategoryHeader>
            <div>
              {groupedEmojis[category].map((emoji) => (
                <EmojiItem
                  key={emoji.name}
                  onClick={() => onSelectEmoji(emoji)}
                >
                  {emoji.emoji}
                </EmojiItem>
              ))}
            </div>
          </div>
        ))}
      </EmojiList>
    </Container>
  );
};

export default Emojis;
