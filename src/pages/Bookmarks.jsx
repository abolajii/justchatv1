import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PiBookmarksSimpleFill } from "react-icons/pi";
import { MainContainer } from "../components";
import { BiSolidBookmarkAltPlus } from "react-icons/bi";
import useThemeStore from "../store/useThemeStore";
import useBookmarkStore from "./store/useBookmark";
import { createFolder, getUserBookmark } from "../api/request";
import AllPosts from "./dashboard/AllPosts";
import RenderFolder from "./bookmark/components/RenderFolder";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BookmarkModal from "./BookmarkModal";

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
  position: sticky;
  top: -0px;
  padding: 10px;
  width: 100%;
  z-index: 100;
  background-color: ${(props) => props.theme.background};
`;

const Inner = styled.div`
  width: 700px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.borderColor};

  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
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

const Padding = styled.div`
  padding: 0 20px 20px;
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

const Bookmarks = () => {
  const { isDarkMode } = useThemeStore();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { bookmarks, addBookmark, setBookmarks } = useBookmarkStore();
  const [bookmark, setBookmark] = useState([]);
  const [bookmarkData, setBookmarkData] = useState({
    name: "",
    category: "Other",
  });

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await getUserBookmark();
        setBookmarks(response.data.folders);
        setBookmark(response.data.bookmarks);
      } catch (e) {
        console.error("Error fetching bookmarks:", e);
      }
    };

    fetchBookmark();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

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
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  return (
    <MainContainer>
      <Container theme={theme}>
        <Inner theme={theme}>
          <Top theme={theme}>
            <div className="flex align-center gap-sm">
              <BackButton theme={theme} onClick={() => navigate(-1)}>
                <MdChevronLeft size={24} />
              </BackButton>
              <PageTitle theme={theme}>Bookmarks</PageTitle>
            </div>

            <CreateFolderButton
              theme={theme}
              onClick={() => setIsModalOpen(true)}
            >
              <BiSolidBookmarkAltPlus size={24} />
            </CreateFolderButton>
          </Top>

          {bookmarks.length === 0 && bookmark.length === 0 ? (
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
            <Padding theme={theme}>
              <RenderFolder folder={bookmarks} />
              <AllPosts bookmarks={bookmark} full />
            </Padding>
          )}

          <BookmarkModal
            closeModal={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
          />
        </Inner>
      </Container>
    </MainContainer>
  );
};

export default Bookmarks;
