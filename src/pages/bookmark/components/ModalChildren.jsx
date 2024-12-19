import React, { useState } from "react";
import { PiFolderFill } from "react-icons/pi";
import { MdArrowForward } from "react-icons/md";
import styled from "styled-components";
import useBookmarkStore from "../../store/useBookmark";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import { addBookmarkToFolder } from "../../../api/request";
import NoFolder from "./NoFolder";
import { Spinner } from "../../../components";
import { useAlert } from "../../../context/AlertContext";

const CategoryColors = {
  Sports: {
    light: "#e6f3e6",
    dark: "#004d00",
    text: { light: "#2e7d32", dark: "#4caf50" },
  },
  Educational: {
    light: "#e6f2ff",
    dark: "#00256c",
    text: { light: "#1565c0", dark: "#64b5f6" },
  },
  AI: {
    light: "#f3e5f5",
    dark: "#4a148c",
    text: { light: "#6a1b9a", dark: "#ad60bb" },
  },
  Technology: {
    light: "#e0f7fa",
    dark: "#006064",
    text: { light: "#00838f", dark: "#4dd0e1" },
  },
  News: {
    light: "#fff3e0",
    dark: "#bf360c",
    text: { light: "#eaa47e", dark: "#f3d2c8" },
  },
  Entertainment: {
    light: "#fce4ec",
    dark: "#880e4f",
    text: { light: "#ad1457", dark: "#f06292" },
  },
  Other: {
    light: "#f5f5f5",
    dark: "#212121",
    text: { light: "#616161", dark: "#9e9e9e" },
  },
};

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FolderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const FolderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FolderIcon = styled(PiFolderFill)`
  color: ${(props) => props.theme.iconColor};
`;

const FolderName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.textPrimary};
`;

const MoveButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.primaryColor};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  svg {
    font-size: 18px;
  }
`;

const Tag = styled.span`
  background-color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category]?.dark || "#333"
      : CategoryColors[props.category]?.light || "#f5f5f5"};
  color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category]?.text.dark || "#fff"
      : CategoryColors[props.category]?.text.light || "#000"};
  padding: 4px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
`;

const ModalChildren = ({ post, closeModal }) => {
  const { bookmarks } = useBookmarkStore();
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { showAlert } = useAlert();

  const moveBookmark = async (data) => {
    try {
      setIsLoading(true);
      const response = await addBookmarkToFolder(data);
      console.log(response);
      setIsLoading(false);
      showAlert("success", "Bookmark moved successfully!");
      closeModal();
    } catch (e) {
      console.error("Error moving bookmark:", e);
      showAlert("error", "Failed to move bookmark!");
      setIsLoading(false);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <Container>
        <NoFolder theme={theme} />
      </Container>
    );
  }

  return (
    <Container>
      <FolderList>
        {bookmarks.map((bookmark) => (
          <FolderItem key={bookmark._id} theme={theme}>
            <FolderInfo>
              <FolderIcon theme={theme} />
              <div>
                <FolderName theme={theme}>{bookmark.name}</FolderName>
                <Tag isDarkMode={isDarkMode} category={bookmark.category}>
                  {bookmark.category}
                </Tag>
              </div>
            </FolderInfo>
            {isLoading ? (
              <Spinner size="15px" />
            ) : (
              <MoveButton
                theme={theme}
                onClick={() => {
                  const data = {
                    postId: post._id,
                    folderId: bookmark._id,
                  };
                  moveBookmark(data);
                }}
              >
                <MdArrowForward />
                Move
              </MoveButton>
            )}
          </FolderItem>
        ))}
      </FolderList>
    </Container>
  );
};

export default ModalChildren;
