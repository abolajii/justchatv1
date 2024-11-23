import React from "react";
import styled from "styled-components";
import { MainContainer } from "../components";
import MainDashboard from "./MainDashboard";

const MobileContainer = styled.div`
  height: 100svh;
  display: flex; /* Show DesktopView on desktop */
  flex: 1;
`;

const B = styled.div`
  flex: 2.5;
`;

const MobileView = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none; /* Hide MobileView on desktop */
  }
`;

const DesktopView = styled.div`
  display: block;
  /* Hide DesktopView on mobile */
`;

const Story = () => {
  return <div>Dashboard Page</div>;
};

const Dashboard = () => {
  return (
    <div>
      {/* <MobileView>
        <MobileContainer>
          <B>
            <MainDashboard />
          </B>
        </MobileContainer>
      </MobileView> */}
      <DesktopView>
        <MainContainer>
          <MainDashboard />
        </MainContainer>
      </DesktopView>
    </div>
  );
};

export default Dashboard;
