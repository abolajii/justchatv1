import React, { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.active ? "#36bbba" : "#ccc")};
  border-bottom: ${(props) =>
    props.active ? "2px solid #36bbba" : "2px solid transparent"};
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: ${(props) => (props.active ? "#36bbba" : "#999")};
  }
`;

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={activeTab === index}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default Tabs;
