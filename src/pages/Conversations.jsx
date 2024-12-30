import React, { useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import styled from "styled-components";
import useThemeStore from "../store/useThemeStore";

const Inner = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f5f5f5")};
  height: 100%;
`;

const DayCell = styled.div`
  padding: 9px;
`;

const Conversation = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <MainContainer>
      <Header>
        <Inner isDarkMode={isDarkMode}>
          {/* <div>Search</div> */}

          <DayCell>1</DayCell>
        </Inner>
      </Header>
    </MainContainer>
  );
};

export default Conversation;
