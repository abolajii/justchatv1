import React from "react";
import styled from "styled-components";
import StoryAvi from "./StoryAvi";
import useUserStore from "../../store/useUserStore";
import useModalStore from "../store/useModalStore";
import useStoryStore from "../store/useStoryStore";
import StatusModal from "./StatusModal";
import ViewStatus from "./ViewStatus";

const Container = styled.div``;

const Border = styled.div`
  border: 2px solid #0bdb8b;
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const UserAvi = styled.div`
  height: 54px;
  width: 54px;
  border-radius: 50%;
  position: relative; /* Allows positioning of the plus icon */
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const OtherUserStory = ({ stories, s }) => {
  const { user } = useUserStore();
  const { openModalStatus, isModalStatusOpen } = useModalStore();
  const { selectStory } = useStoryStore();

  if (stories.length === 1) {
    return (
      <Border className="center">
        <UserAvi
          onClick={() => {
            openModalStatus();
            selectStory(s);
          }}
        >
          <img src={stories[0].user.profilePic} alt={stories[0].user.name} />
        </UserAvi>
        {isModalStatusOpen && <ViewStatus />}
      </Border>
    );
  }

  return (
    <>
      <StoryAvi
        loggedInUserId={user.id} // Pass the logged-in user's ID
        stories={stories}
        segments={s.stories.length || 0}
        imageSrc={s.user.profilePic}
        onClick={() => {
          openModalStatus();
          selectStory(s);
        }}
      />
      {isModalStatusOpen && <ViewStatus />}
    </>
  );
};

export default OtherUserStory;
