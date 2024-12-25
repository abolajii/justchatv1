import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CalendarGrid from "./Calendar";
import Account from "./Account";
import Upcoming from "./Upcoming";
import Sidebar from "./Sidebar";

const Container = styled.div`
  height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  color: #fff;
`;

const SidebarContainer = styled.div`
  height: 100%;
  position: sticky;
  background-color: #272727;
  background-color: #1a1a1a;
  width: 80px;
`;

const One = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MainContainer = ({ children }) => {
  //
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <div className="flex flex-1">{children}</div>
    </Container>
  );
};

export default MainContainer;
