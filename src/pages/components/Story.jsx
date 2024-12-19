import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryCover from "./StoryCover";
import useUserStore from "../../store/useUserStore";
import useStoryStore from "../store/useStoryStore";
import { userStory } from "../../api/request";
import OtherUserStory from "./OtherUserStory";
import useThemeStore from "../../store/useThemeStore";

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

const Story = ({ show }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { user } = useUserStore();
  const { allStories, setAllStories } = useStoryStore();
  const { isDarkMode } = useThemeStore(); // Add dark mode state

  // Add resize event listener

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
    // Detect mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView(); // Initial check
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView); // Cleanup
    };
  }, []);

  if (show) {
    return (
      <div className="flex align-center gap-sm">
        {!isMobileView && (
          <div>
            <A>
              <StoryCover user={user} />
            </A>
          </div>
        )}
        <B isDarkMode={isDarkMode}>
          {allStories.map((s, i) => {
            const stories = s.stories;
            return <OtherUserStory key={i} stories={stories} s={s} />;
          })}
        </B>
      </div>
    );
  }
};

export default Story;
