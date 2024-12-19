import React from "react";
import styled from "styled-components";
import StoryAvi from "./StoryAvi";
import useUserStore from "../../store/useUserStore";
import useModalStore from "../store/useModalStore";
import useStoryStore from "../store/useStoryStore";
import StatusModal from "./StatusModal";
import ViewStatus from "./ViewStatus";

const Border = styled.div`
  border: ${(props) =>
    props.isViewed ? "2px solid #0bdb8b" : "2px solid #ccc"};
  height: 56px;
  width: 56px;
  border-radius: 50%;
`;

const UserAvi = styled.div`
  height: 48px;
  width: 48px;
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
    const story = stories[0];
    // If there is only one story, show it in a bordered circle
    const isViewed = story.views?.find(
      (v) => v.user?._id === user.id || v.user?._id === user.id
    );

    return (
      <Border className="center" isViewed={isViewed}>
        <UserAvi
          onClick={() => {
            openModalStatus();
            selectStory(s);
          }}
        >
          <img src={stories[0].user.profilePic} alt={stories[0].user.name} />
        </UserAvi>
        {isModalStatusOpen && <ViewStatus />}
        {/* <ViewStatus /> */}
      </Border>
    );
  }

  return (
    <>
      <StoryAvi
        loggedInUserId={user?.id || user?._id} // Pass the logged-in user's ID
        stories={stories}
        segments={s.stories.length || 0}
        imageSrc={s.user.profilePic}
        onClick={() => {
          openModalStatus();
          selectStory(s);
        }}
      />
      {isModalStatusOpen && <ViewStatus />}
      {/* <ViewStatus /> */}
    </>
  );
};

export default OtherUserStory;
