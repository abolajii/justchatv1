import React from "react";

import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import StoryCover from "./StoryCover";

const Container = styled.div`
  position: sticky;
  top: 0;
  /* height: 90px; */
  width: 100%;
  display: flex;
  padding: 10px;
`;

const A = styled.div`
  flex: 0.4;
`;
const B = styled.div`
  flex: 2.6;
  display: flex;
  gap: 10px;
  overflow-x: scroll;
`;

const Story = () => {
  const { user } = useUserStore();
  return (
    <Container>
      <A>
        <StoryCover user={user} />
        {/* <UserAvi>
          <img src={user.profilePic} />
          <PlusIcon>
            <FaPlus />
          </PlusIcon>
        </UserAvi> */}
      </A>
      <B>
        {/* <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi>
        <UserAvi>
          <img src={user.profilePic} />
        </UserAvi> */}
      </B>
    </Container>
  );
};

export default Story;
