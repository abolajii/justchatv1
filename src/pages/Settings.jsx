import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { MainContainer } from "../components";
import { IoChevronDown } from "react-icons/io5";
import useThemeStore from "../store/useThemeStore";
import {
  NotificationSettings,
  PasswordSettings,
  ProfileSettings,
} from "./SubtSettings";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";

// Theme definitions (similar to previous component)
const lightTheme = {
  background: "#fff",
  textPrimary: "#333",
  textSecondary: "#666",
  borderColor: "#e0e0e0",
  primaryColor: "#6bc1b7",
  iconColor: "#a2a2a2",
};

const darkTheme = {
  background: "#1e1e1e",
  textPrimary: "#e0e0e0",
  textSecondary: "#888",
  borderColor: "#333",
  primaryColor: "#6bc1b7",
  iconColor: "#a2a2a2",
};

// Animation keyframes
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  height: 100vh;
  width: 700px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.textPrimary};
`;

const PageTitle = styled.h1`
  margin: 0 0 0 15px;
  font-size: 1.3rem;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  cursor: pointer;
`;

const TabTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const TabContent = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.theme.background};

  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${slideDown} 0.3s ease-out;
    `}

  ${(props) =>
    !props.isOpen &&
    css`
      animation: ${slideUp} 0.3s ease-out;
    `}
`;

const Scrollable = styled.div`
  height: calc(100vh - 80px);
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const RotatingIcon = styled(IoChevronDown)`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
`;

const Settings = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [openTabs, setOpenTabs] = useState([0]); // Start with first tab open

  const tabs = [
    {
      label: "Profile",
      content: <ProfileSettings isDarkMode={isDarkMode} />,
    },
    {
      label: "Notifications",
      content: <NotificationSettings isDarkMode={isDarkMode} />,
    },
    {
      label: "Security",
      content: <PasswordSettings isDarkMode={isDarkMode} />,
    },
  ];

  const toggleTab = (index) => {
    setActiveTab(index);

    // If tab is already open, close it
    if (openTabs.includes(index)) {
      setOpenTabs(openTabs.filter((tab) => tab !== index));
    } else {
      // Open the tab
      setOpenTabs([...openTabs, index]);
    }
  };

  return (
    <MainContainer>
      <div className="flex">
        <div>
          <Container theme={theme}>
            {/* Top Section */}
            <Top theme={theme}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BackButton theme={theme} onClick={() => navigate(-1)}>
                  <MdChevronLeft size={24} />
                </BackButton>
                <PageTitle theme={theme}>Settings</PageTitle>
              </div>
            </Top>
            <Scrollable>
              {/* Tabs Section */}
              <TabContainer theme={theme}>
                {tabs.map((tab, index) => (
                  <React.Fragment key={tab.label}>
                    <TabHeader theme={theme} onClick={() => toggleTab(index)}>
                      <TabTitle theme={theme} active={activeTab === index}>
                        {tab.label}
                      </TabTitle>
                      <RotatingIcon
                        isOpen={openTabs.includes(index)}
                        color={
                          activeTab === index
                            ? theme.primaryColor
                            : theme.iconColor
                        }
                      />
                    </TabHeader>
                    <TabContent theme={theme} isOpen={openTabs.includes(index)}>
                      {tab.content}
                    </TabContent>
                  </React.Fragment>
                ))}
              </TabContainer>
            </Scrollable>
          </Container>
        </div>
        <div>B</div>
      </div>
    </MainContainer>
  );
};

export default Settings;
