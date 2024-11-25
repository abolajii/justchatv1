import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* max-width: 400px; */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  color: #36bbba;
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
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const CloseButton = styled.div`
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #333;
  }
`;

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <SearchWrapper>
      <Icon>
        <FaSearch />
      </Icon>
      <Input
        type="text"
        placeholder="Search for users, trends, anything..."
        value={searchText}
        onChange={handleInputChange}
      />
      {searchText && (
        <CloseButton onClick={clearSearch}>
          <MdClose />
        </CloseButton>
      )}
    </SearchWrapper>
  );
};

export default Search;
