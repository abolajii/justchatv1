import React, { useEffect, useState } from "react";

import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import StoryCover from "./StoryCover";
import { userStory } from "../../api/request";
import useStoryStore from "../store/useStoryStore";
import OtherUserStory from "./OtherUserStory";
import Desktop from "../../responsive/Desktop";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
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
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    opacity: 0.85;
  }
`;

const Story = () => {
  const { user } = useUserStore();
  const { allStories, setAllStories } = useStoryStore();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    <Container>
      {!isSmallScreen ? (
        <A>
          <StoryCover user={user} />
        </A>
      ) : (
        <A>
          <UserAvi>
            <img src={user.profilePic} alt="User Avatar" />
          </UserAvi>
        </A>
      )}
      <B>
        {allStories.map((s, i) => {
          const stories = s.stories;
          return <OtherUserStory key={i} stories={stories} s={s} />;
        })}
      </B>
    </Container>
  );
};

export default Story;
