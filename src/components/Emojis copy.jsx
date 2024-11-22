import React, { useState } from "react";
import styled from "styled-components";
import { emojiList } from "./emojiData";

const PickerContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 300px;
  max-height: 300px;
  overflow: scroll;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
`;

const EmojiList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

const EmojiItem = styled.span`
  font-size: 1rem;
  cursor: pointer;
  margin: 0 2px;

  &:hover {
    transform: scale(1.2);
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

const Emojis = ({ showEmoji }) => {
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
    <PickerContainer>
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
    </PickerContainer>
  );
};

export default Emojis;
