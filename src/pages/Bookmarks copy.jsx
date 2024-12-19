import React, { useState } from "react";
import styled, { css } from "styled-components";
import { PiBookmarksSimpleFill } from "react-icons/pi";
import { MainContainer } from "../components";
import { BiSolidBookmarkAltPlus } from "react-icons/bi";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import useThemeStore from "../store/useThemeStore";
import useBookmarkStore from "./store/useBookmark";

// Reuse the existing theme definitions from the previous file

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

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  color: ${(props) => props.theme.textPrimary};
  transition: background-color 0.3s, color 0.3s;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Inner = styled.div`
  padding: 20px;

  width: 700px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.textPrimary};
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.3rem;
  color: ${(props) => props.theme.textPrimary};
`;

const CreateFolderButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.iconColor};
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(0.7);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props) =>
    props.isOpen &&
    css`
      transform: scale(1);
      opacity: 1;
    `}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.textPrimary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Input = styled.input`
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

const BookmarkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const BookmarkItem = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const NoBookmarksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
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

const BookmarkCategories = [
  "Sports",
  "Educational",
  "AI",
  "Technology",
  "News",
  "Entertainment",
  "Other",
];

const Bookmarks = () => {
  const { isDarkMode } = useThemeStore();
  const { bookmarks, addBookmark } = useBookmarkStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkData, setBookmarkData] = useState({
    title: "",
    url: "",
    category: "Other",
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleCreateBookmark = () => {
    if (bookmarkData.title.trim() && bookmarkData.url.trim()) {
      addBookmark({
        title: bookmarkData.title,
        url: bookmarkData.url,
        category: bookmarkData.category,
      });

      // Reset form
      setBookmarkData({ title: "", url: "", category: "Other" });
      setIsModalOpen(false);
    }
  };

  return (
    <MainContainer>
      <Container theme={theme}>
        <Inner theme={theme}>
          <Top>
            <div className="flex align-center gap-sm">
              <BackButton theme={theme}>
                <IoMdArrowBack size={24} />
              </BackButton>
              <PageTitle theme={theme}>Bookmarks</PageTitle>
            </div>

            <CreateFolderButton
              onClick={() => setIsModalOpen(true)}
              theme={theme}
            >
              <BiSolidBookmarkAltPlus size={24} />
            </CreateFolderButton>
          </Top>

          {bookmarks.length === 0 ? (
            <NoBookmarksContainer theme={theme}>
              <PiBookmarksSimpleFill size={64} color={theme.iconColor} />
              <h2>No Bookmarks Yet</h2>
              <p>
                Create bookmarks and organize them by categories like Sports,
                Educational, AI, Technology, and more. Click the plus button to
                get started!
              </p>
            </NoBookmarksContainer>
          ) : (
            <BookmarkList theme={theme}>
              {bookmarks.map((bookmark) => (
                <BookmarkItem key={bookmark.id} theme={theme}>
                  <h3>{bookmark.title}</h3>
                  <p>{bookmark.url}</p>
                  <small>Category: {bookmark.category}</small>
                </BookmarkItem>
              ))}
            </BookmarkList>
          )}

          {/* Modal for Creating Bookmark */}
          <ModalOverlay
            isOpen={isModalOpen}
            onClick={() => setIsModalOpen(false)}
          >
            <ModalContent
              theme={theme}
              isOpen={isModalOpen}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle theme={theme}>Create New Bookmark</ModalTitle>
                <CloseButton
                  onClick={() => setIsModalOpen(false)}
                  theme={theme}
                >
                  <IoMdClose />
                </CloseButton>
              </ModalHeader>
              <Input
                placeholder="Bookmark Title"
                value={bookmarkData.title}
                onChange={(e) =>
                  setBookmarkData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                theme={theme}
              />
              <Input
                placeholder="URL"
                value={bookmarkData.url}
                onChange={(e) =>
                  setBookmarkData((prev) => ({
                    ...prev,
                    url: e.target.value,
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
                onClick={handleCreateBookmark}
                disabled={
                  !bookmarkData.title.trim() || !bookmarkData.url.trim()
                }
                theme={theme}
              >
                Create Bookmark
              </Button>
            </ModalContent>
          </ModalOverlay>
        </Inner>
      </Container>
    </MainContainer>
  );
};

export default Bookmarks;
