import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import useThemeStore from "../store/useThemeStore";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${(props) => (props.isDarkMode ? "#333" : "#ccc")};
  border-radius: 8px;
  padding: 8px 12px;
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  box-shadow: 0 2px 4px
    ${(props) => (props.isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0, 0, 0, 0.1)")};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const Icon = styled.div`
  color: ${(props) => (props.isDarkMode ? "#6bc1b7" : "#36bbba")};
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#333")};

  &::placeholder {
    color: ${(props) => (props.isDarkMode ? "#666" : "#aaa")};
  }
`;

const CloseButton = styled.div`
  color: ${(props) => (props.isDarkMode ? "#888" : "#999")};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "#333")};
  }
`;

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { isDarkMode } = useThemeStore();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <SearchWrapper isDarkMode={isDarkMode}>
      <Icon isDarkMode={isDarkMode}>
        <FaSearch />
      </Icon>
      <Input
        type="text"
        placeholder="Search for users, trends, anything..."
        value={searchText}
        onChange={handleInputChange}
        isDarkMode={isDarkMode}
      />
      {searchText && (
        <CloseButton onClick={clearSearch} isDarkMode={isDarkMode}>
          <MdClose />
        </CloseButton>
      )}
    </SearchWrapper>
  );
};

export default Search;
