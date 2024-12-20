import React, { useState } from "react";
import styled from "styled-components";
import { MainContainer, Search, Tabs } from "../components";
import DiscoverScreen from "./discover/components/Discover";
import TrendingScreen from "./discover/components/Trending";
import Connect from "./discover/components/Connect";
import Sports from "./discover/components/Sports";
import useThemeStore from "../store/useThemeStore";

const Top = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  flex-direction: column;
`;

const Inner = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f5f5f5")};
`;

const Discover = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { isDarkMode } = useThemeStore();
  // const tabs = ["Discover", "Trending", "Connects", "Sports"];
  return (
    <MainContainer>
      <Inner isDarkMode={isDarkMode}>
        {activeTab === 0 && <DiscoverScreen />}
        {activeTab === 1 && <TrendingScreen />}
        {activeTab === 2 && <Connect />}
        {activeTab === 3 && <Sports />}
      </Inner>
    </MainContainer>
  );
};

export default Discover;
