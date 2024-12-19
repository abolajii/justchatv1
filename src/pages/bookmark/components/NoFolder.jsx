import React, { useState } from "react";
import styled from "styled-components";
import BookmarkModal from "../../BookmarkModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  padding: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textPrimary};
`;

const CreateButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.theme.primaryColor};

  &:hover {
    opacity: 0.95;
  }
`;

const NoFolder = ({ onCreate, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container theme={theme}>
      <Message theme={theme}>No Folder, Create One?</Message>
      <CreateButton
        theme={theme}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create
      </CreateButton>
      <BookmarkModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </Container>
  );
};

export default NoFolder;
