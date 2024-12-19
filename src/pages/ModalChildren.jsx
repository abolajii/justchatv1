import React, { useState } from "react";
import { createFolder } from "../api/request";
import useBookmarkStore from "./store/useBookmark";
import useThemeStore from "../store/useThemeStore";

import styled from "styled-components";
const BookmarkCategories = [
  "Sports",
  "Educational",
  "AI",
  "Technology",
  "News",
  "Entertainment",
  "Other",
];

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 4px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: ${(props) => props.theme.disabledColor};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const lightTheme = {
  background: "#fff",
  textPrimary: "#333",
  textSecondary: "#666",
  inputBackground: "#f9f9f9",
  inputBorder: "#e0e0e0",
  borderColor: "#ebebeb",
  iconColor: "#a2a2a2",
  primaryColor: "#6bc1b7",
  disabledColor: "#ccc",
  avatarBorder: "rgba(0,0,0,0.1)",
};

const darkTheme = {
  background: "#1e1e1e",
  textPrimary: "#e0e0e0",
  textSecondary: "#888",
  inputBackground: "#1e1e1e",
  inputBorder: "#333",
  borderColor: "#333",
  iconColor: "#a2a2a2",
  primaryColor: "#6bc1b7",
  disabledColor: "#555",
  avatarBorder: "rgba(255,255,255,0.1)",
};

const ModalChildren = ({ closeModal }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [bookmarkData, setBookmarkData] = useState({
    name: "",
    category: "Other",
  });
  const { addBookmark } = useBookmarkStore();

  const handleCreateBookmarkFolder = async () => {
    try {
      if (bookmarkData.name.trim()) {
        const data = {
          name: bookmarkData.name,
          category: bookmarkData.category,
        };
        const response = await createFolder(data);

        console.log(response);

        addBookmark({
          name: bookmarkData.name,
          category: bookmarkData.category,
        });

        // Reset form
        setBookmarkData({ name: "", category: "Other" });
        closeModal();
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };
  return (
    <div>
      <Input
        placeholder="Bookmark Title"
        value={bookmarkData.name}
        onChange={(e) =>
          setBookmarkData((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        theme={theme}
      />
      <CategorySelect
        value={bookmarkData.category}
        onChange={(e) =>
          setBookmarkData((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
        theme={theme}
      >
        {BookmarkCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </CategorySelect>
      <Button
        onClick={handleCreateBookmarkFolder}
        disabled={!bookmarkData.name.trim()}
        theme={theme}
      >
        Create Bookmark
      </Button>
    </div>
  );
};

export default ModalChildren;
