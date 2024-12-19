import styled from "styled-components";
import { useEffect, useState } from "react";
import AllPosts from "./dashboard/AllPosts";
import { fetchUserActivity } from "../api/request";
import Media from "./profile/components/Media";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";

// Tab container and styles
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 15px;
  padding: 0 30px;
`;

const Tab = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${({ active, theme }) => (active ? "#28a69e" : theme.textSecondary)};
  cursor: pointer;
  padding: 5px 0;
  border-radius: 5px;
`;

const ContentContainer = styled.div`
  padding: 5px 15px;
  overflow-y: auto;
`;

const ProfileTab = ({ posts }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [activeTab, setActiveTab] = useState("posts");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const userActivity = async () => {
      setResults([]);
      const fetchedPosts = await fetchUserActivity(activeTab);
      console.log(fetchedPosts.activity);
      setResults(fetchedPosts.activity);
    };
    userActivity();
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <div className="mt-4">
            <AllPosts posts={results} full />
          </div>
        );
      case "media":
        return (
          <div className="mt-4">
            <AllPosts posts={results} full />
          </div>
        );
      case "likes":
        return (
          <div className="mt-4">
            <AllPosts posts={results} full />
          </div>
        );
      case "replies":
        return <div></div>;

      default:
        return null;
    }
  };

  return (
    <div>
      <TabContainer theme={theme}>
        <Tab
          theme={theme}
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </Tab>
        <Tab
          theme={theme}
          active={activeTab === "media"}
          onClick={() => setActiveTab("media")}
        >
          Media
        </Tab>
        <Tab
          theme={theme}
          active={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}
        >
          Likes
        </Tab>
        <Tab
          theme={theme}
          active={activeTab === "replies"}
          onClick={() => setActiveTab("replies")}
        >
          Replies
        </Tab>
      </TabContainer>

      <ContentContainer theme={theme}>{renderTabContent()}</ContentContainer>
    </div>
  );
};

export default ProfileTab;
