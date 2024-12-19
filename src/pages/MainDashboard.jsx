import React from "react";
import styled from "styled-components";
import Story from "./components/Story";
import PostContainer from "./PostContainer";
import useThemeStore from "../store/useThemeStore"; // Adjust import path as needed
import Post from "./components/Post";
import AllPosts from "./dashboard/AllPosts";

const Container = styled.div`
  display: flex;
  height: 100vh;
  border-right: 1px solid
    ${(props) => (props.isDarkMode ? "#4a4a4a" : "#ebebeb")};
  border-left: 1px solid
    ${(props) => (props.isDarkMode ? "#4a4a4a" : "#ebebeb")};
  flex-direction: column;
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
`;

const MainDashboard = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <Container isDarkMode={isDarkMode}>
      <Story />
      <PostContainer />
      <AllPosts />
    </Container>
  );
};

export default MainDashboard;
