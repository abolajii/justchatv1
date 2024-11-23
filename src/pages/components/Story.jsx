import React, { useEffect } from "react";

import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import StoryCover from "./StoryCover";
import { userStory } from "../../api/request";
import useStoryStore from "../store/useStoryStore";
import OtherUserStory from "./OtherUserStory";

const Container = styled.div`
  position: sticky;
  top: 0;
  /* height: 90px; */
  width: 100%;
  display: flex;
  padding: 10px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
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

const Story = () => {
  const { user } = useUserStore();
  const { allStories, setAllStories } = useStoryStore();

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
  return (
    <Container>
      <A>
        <StoryCover user={user} />
      </A>
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
