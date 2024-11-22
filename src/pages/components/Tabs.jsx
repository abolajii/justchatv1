import React, { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  border-radius: 4px;
`;

const Tab = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: border-bottom 0.3s ease;
  border-bottom: ${(props) => props.active && "1px solid #6bc1b7"};

  color: ${(props) => (props.active ? "#6bc1b7" : "#666")};

  &:hover {
    border-bottom: ${(props) => props.active && "1px solid #6bc1b7"};
  }
`;

const ContentContainer = styled.div`
  background: white;
  border-radius: 4px;
  min-height: 100px; /* Adjust as needed */
`;

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key); // Default to the first tab

  const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content;

  return (
    <div>
      <TabsContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>
      <ContentContainer>{activeTabContent}</ContentContainer>
    </div>
  );
};

export default Tabs;
