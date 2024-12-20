import React, { useEffect, useState } from "react";
import { MainContainer } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import useThemeStore from "../../../store/useThemeStore";
import { getFolderById } from "../../../api/request";
import { MdChevronLeft, MdMoreVert } from "react-icons/md";
import AllPosts from "../../dashboard/AllPosts";

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
  padding: 8px;
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

const MoreFolderButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};

  transition: color 0.3s;
`;

const PageTitle = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  /* align-items: end; */

  .text-sm {
    margin-top: -6px;
    font-size: 12px;
    color: ${(props) => props.theme.textSecondary};
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
  border-radius: 3px;
  padding: 2px;
  font-size: 10px;
  margin-left: 4px;
  margin-bottom: 4px;
`;

const BookmarkFolder = () => {
  const { fid } = useParams();
  const { isDarkMode } = useThemeStore();
  const theme = !isDarkMode ? lightTheme : darkTheme;
  const [folder, setFolder] = useState(null);
  const [bookmarkPosts, setBookmarkPosts] = useState([]);

  const navigate = useNavigate();

  // Fetch bookmarks when component mounts
  useEffect(() => {
    const fetchFolder = async (id) => {
      try {
        const response = await getFolderById(id);
        console.log(response.data.bookmarks);
        setBookmarkPosts(response.data.bookmarks);
        setFolder(response.data.folder);
        // Set bookmarks state with fetched data
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchFolder(fid);
  }, [fid]);

  console.log(folder?.bookmarks);

  return (
    <MainContainer>
      <Container theme={theme}>
        <Inner theme={theme}>
          <Top theme={theme} className="flex align-center">
            <div className="flex align-center gap-sm">
              <BackButton theme={theme} onClick={() => navigate(-1)}>
                <MdChevronLeft size={24} />
              </BackButton>
              <PageTitle theme={theme} className="flex-col">
                <div>
                  {folder?.name}
                  <Tag isDarkMode={isDarkMode} category={folder?.category}>
                    {folder?.category}
                  </Tag>
                </div>
                {folder?.bookmarks?.length > 0 && (
                  <p className="text-sm">{folder?.bookmarks?.length} posts</p>
                )}
              </PageTitle>
            </div>
            <MoreFolderButton $isDarkMode={isDarkMode}>
              <MdMoreVert size={24} />
            </MoreFolderButton>
          </Top>
          <p className="pl-4 pr-4">
            <AllPosts bookmarks={bookmarkPosts} />
          </p>
        </Inner>
      </Container>
    </MainContainer>
  );
};

export default BookmarkFolder;
