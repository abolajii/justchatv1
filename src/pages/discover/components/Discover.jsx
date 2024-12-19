import React, { useState } from "react";
import styled from "styled-components";
import { Search, Tabs } from "../../../components";
import bg from "./bg.jpg";
import { renderLarge } from "../Widget";
import Body from "../Body";
import Desktop from "../../../responsive/Desktop";
import useThemeStore from "../../../store/useThemeStore";

const Container = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};
`;

const Inner = styled.div`
  display: flex;
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f5f5f5")};
`;

const A = styled.div`
  flex: 2;
`;

const B = styled.div`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  position: sticky;
  top: 0;
  /* background-color: #f5f5f5; */
  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f5f5f5")};
`;

const InnerDiscover = styled.div`
  position: relative;
  height: 200px;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const OverlayTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const OverlayDescription = styled.p`
  /* margin: 10px 0 0; */
  font-size: 16px;
  opacity: 0.8;
`;

const Scrollable = styled.div`
  overflow-y: scroll;
  /* padding: 20px; */
  /* padding-bottom: 70px; */
  /* margin-top: 20px; */
  /* border-radius: 8px; */
  /* height: calc(90vh); */

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const DiscoverScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Discover", "Trending", "Connects", "Sports"];
  const { isDarkMode } = useThemeStore();

  return (
    <Container isDarkMode={isDarkMode}>
      <Inner isDarkMode={isDarkMode}>
        <A>
          <Top isDarkMode={isDarkMode}>
            <Search />
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Top>
          <Scrollable isDarkMode={isDarkMode}>
            <InnerDiscover>
              <ImageOverlay>
                <OverlayTitle>Discover Amazing Stories</OverlayTitle>
                <OverlayDescription>
                  Explore the latest trends and connect with incredible content
                </OverlayDescription>
              </ImageOverlay>
            </InnerDiscover>
            <div>
              <Body />
            </div>
          </Scrollable>
        </A>
        <Desktop>
          <B>{renderLarge(isDarkMode)}</B>
        </Desktop>
      </Inner>
    </Container>
  );
};

export default DiscoverScreen;
