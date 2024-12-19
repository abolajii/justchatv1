import React from "react";
import { PiFolderFill } from "react-icons/pi";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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

const Tag = styled.span`
  background-color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category].dark
      : CategoryColors[props.category].light};
  color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category].text.dark
      : CategoryColors[props.category].text.light};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  width: fit-content;
`;

const BookmarkCount = styled.span`
  background-color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category].dark
      : CategoryColors[props.category].light};
  color: ${(props) =>
    props.isDarkMode
      ? CategoryColors[props.category].text.dark
      : CategoryColors[props.category].text.light};
  border-radius: 12px;
  font-size: 10px;
  width: 16px;
  height: 16px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const BookmarkItem = styled.div`
  background-color: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 212px;
  cursor: pointer;

  &:hover {
    /* color: ${(props) => props.theme.background};  */
  }
`;

const BookmarkTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  justify-content: space-between;
`;

const BookmarkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  h3 {
    margin-left: 3px;
  }
`;

const BookmarkFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  min-height: 20px;
`;

const RenderFolder = ({ folder }) => {
  const { isDarkMode } = useThemeStore();

  const theme = !isDarkMode ? lightTheme : darkTheme;
  const navigate = useNavigate();

  if (folder.length === 0) {
    return null;
  }
  return (
    <div className="mb-3">
      <BookmarkList theme={theme}>
        {folder.map((bookmark) => {
          console.log(bookmark);
          return (
            <BookmarkItem
              key={bookmark._id}
              theme={theme}
              onClick={() => navigate("/bookmarks/" + bookmark._id)}
            >
              <BookmarkTitle>
                <div className="flex align-center">
                  <PiFolderFill color={theme.iconColor} size={20} />
                  <h3>{bookmark.name}</h3>
                </div>
                <div className="center">
                  <MdMoreHoriz />
                </div>
              </BookmarkTitle>
              <BookmarkFooter>
                <Tag isDarkMode={isDarkMode} category={bookmark.category}>
                  {bookmark.category}
                </Tag>
                {bookmark.bookmarks.length > 0 && (
                  <BookmarkCount
                    isDarkMode={isDarkMode}
                    category={bookmark.category}
                  >
                    {bookmark.bookmarks.length}
                  </BookmarkCount>
                )}
              </BookmarkFooter>
            </BookmarkItem>
          );
        })}
      </BookmarkList>
    </div>
  );
};

export default RenderFolder;
