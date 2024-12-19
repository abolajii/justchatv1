import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import StoryCover from "./StoryCover";
import { userStory } from "../../api/request";
import useStoryStore from "../store/useStoryStore";
import useThemeStore from "../../store/useThemeStore"; // Add theme store import
import OtherUserStory from "./OtherUserStory";
import Desktop from "../../responsive/Desktop";
import { Drawer } from "../../components";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#4a4a4a" : "#dbdbdb")};
  background-color: ${(props) => (props.isDarkMode ? "#2e2e2e" : "#f5f5f5")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  z-index: 1000;
`;

const A = styled.div`
  flex: 0.4;
`;

const B = styled.div`
  flex: 2.6;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  max-width: calc(100vw - 90px);

  .text-xs {
    font-size: 9px;
    text-align: center;
    color: ${(props) => (props.isDarkMode ? "#cccccc" : "#666666")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Scrollbar styling for dark mode */
  scrollbar-width: thin;
  scrollbar-color: ${(props) =>
    props.isDarkMode
      ? "rgba(255,255,255,0.2) transparent"
      : "rgba(0,0,0,0.2) transparent"};

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"};
    border-radius: 4px;
  }
`;

const UserAvi = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
    opacity: ${(props) => (props.isDarkMode ? 0.7 : 0.85)};
    border: 2px solid
      ${(props) => (props.isDarkMode ? "#4a4a4a" : "transparent")};
  }
`;

const Story = () => {
  const { user } = useUserStore();
  const { allStories, setAllStories } = useStoryStore();
  const { isDarkMode } = useThemeStore(); // Add dark mode state
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await userStory();
        setAllStories(response.stories);
      } catch (error) {
        console.error("Error fetching stories:", error.message);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Breakpoint for small screens
    };

    // Initial check
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Container isDarkMode={isDarkMode}>
      {!isSmallScreen ? (
        <A>
          <StoryCover user={user} />
        </A>
      ) : (
        <A>
          <div className="relative">
            <UserAvi onClick={() => setIsOpen(true)} isDarkMode={isDarkMode}>
              <img src={user.profilePic} alt="User Avatar" />
            </UserAvi>
            <Drawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isDarkMode={isDarkMode}
            />
          </div>
        </A>
      )}
      <B isDarkMode={isDarkMode}>
        {allStories.map((s, i) => {
          const stories = s.stories;
          return <OtherUserStory key={i} stories={stories} s={s} />;
        })}
      </B>
    </Container>
  );
};

export default Story;
