import React from "react";
import styled from "styled-components";
import Story from "./components/Story";

const Container = styled.div`
  display: flex;
  height: 100vh;
  border-right: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
`;

const MainDashboard = () => {
  return (
    <Container>
      <Story />
    </Container>
  );
};

export default MainDashboard;
