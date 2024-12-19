import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Widget from "../pages/discover/components/Widget";
import useThemeStore from "../store/useThemeStore";
import { useLocation } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";

const Container = styled.div`
  height: 100vh;
  display: flex; /* Show DesktopView on desktop */
  flex: 1;

  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};
`;

const A = styled.div`
  flex: 1.2;
  /* background-color: lightcoral; */
  max-width: 300px;
  @media (max-width: 768px) {
    flex: 1; /* Show MobileView on desktop */
    display: none; /* Hide MobileView on desktop */
  }
`;

const B = styled.div`
  flex: 2.5;
  /* background-color: lightblue; */
`;

const C = styled.div`
  flex: 1.6;
  /* background-color: lightgreen; */
  /* background-color: #2e2e2e; */

  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#ffffff")};

  @media (max-width: 768px) {
    flex: 1; /* Show MobileView on desktop */
    display: none; /* Hide MobileView on desktop */
  }
`;

const MainContainer = ({ children }) => {
  const { isDarkMode } = useThemeStore();

  const location = useLocation();

  if (
    location.pathname !== "/dashboard"
    // location.pathname === "/discover" ||
    // location.pathname === "/conversations" ||
    // location.pathname === "/notifications" ||
    // location.pathname.includes("/conversation")
  ) {
    return (
      <Container isDarkMode={isDarkMode}>
        <MobileSidebar />

        <A>
          <Sidebar />
        </A>
        <B>{children}</B>
      </Container>
    );
  }

  return (
    <Container isDarkMode={isDarkMode}>
      <MobileSidebar />
      <A>
        <Sidebar />
      </A>
      <B>{children}</B>
      <C isDarkMode={isDarkMode}>
        <Widget />
      </C>
    </Container>
  );
};

export default MainContainer;
