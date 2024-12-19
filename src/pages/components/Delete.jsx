import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textSecondary};
  border-radius: 8px;
  padding: 20px;
  text-align: center;

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:disabled {
      background-color: #d3d3d3;
      color: #666;
      cursor: not-allowed;
    }

    &.delete {
      background-color: #ea1d1d;
      color: #fff;

      &:hover:not(:disabled) {
        background-color: #ad1515;
      }
    }

    &.cancel {
      background-color: #ccc;
      color: #000;

      &:hover:not(:disabled) {
        background-color: #bbb;
      }
    }
  }
`;

const Delete = ({ onDeleteConfirm, onCancel }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true); // Disable the delete button
    onDeleteConfirm(); // Call the delete confirmation function
  };

  return (
    <ModalContent theme={theme}>
      <p>
        This can’t be undone and it will be removed from your profile, the
        timeline of any accounts that follow you, and from search results.
      </p>
      <ButtonGroup>
        <button
          className="delete"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        <button className="cancel" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </button>
      </ButtonGroup>
    </ModalContent>
  );
};

export default Delete;
