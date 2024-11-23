import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Container = styled.div`
  height: 100vh;
  display: flex; /* Show DesktopView on desktop */
  flex: 1;
`;

const A = styled.div`
  flex: 1.3;
  /* background-color: lightcoral; */
  /* width: 300px; */
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

  @media (max-width: 768px) {
    flex: 1; /* Show MobileView on desktop */
    display: none; /* Hide MobileView on desktop */
  }
`;

const MainContainer = ({ children }) => {
  return (
    <Container>
      <A>
        <Sidebar />
      </A>
      <B>{children}</B>
      <C>C </C>
    </Container>
  );
};

export default MainContainer;
