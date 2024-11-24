import React from "react";
import styled from "styled-components";
import Story from "./components/Story";
import PostContainer from "./PostContainer";

const Container = styled.div`
  display: flex;
  height: 100vh;
  border-right: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  flex-direction: column;
`;

const MainDashboard = () => {
  return (
    <Container>
      <Story />
      <PostContainer />
    </Container>
  );
};

export default MainDashboard;
