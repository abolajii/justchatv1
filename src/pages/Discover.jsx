import React, { useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import styled from "styled-components";
import useThemeStore from "../store/useThemeStore";

const Inner = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#fff")};
  height: 100%;
`;

const Discover = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <MainContainer>
      <Header>
        <Inner isDarkMode={isDarkMode}>
          <div>Search</div>
        </Inner>
      </Header>
    </MainContainer>
  );
};

export default Discover;
