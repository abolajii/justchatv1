import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import {
  FaBell,
  FaBookmark,
  FaCog,
  FaComments,
  FaCompass,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import useUserStore from "../store/useUserStore";
import useThemeStore from "../store/useThemeStore";
import StoryCover from "../pages/components/StoryCover";
import { Link, useLocation } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-220px")};
  width: 220px;
  height: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#232323" : "#f9f9f9")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#e0e0e0" : "#333")};
  transition: left 0.3s ease-in-out;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6bc1b7;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  z-index: 10;

  &:hover {
    color: #4fa39a;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#232323" : "#f9f9f9")};
  color: ${({ isDarkMode }) => (isDarkMode ? "#e0e0e0" : "#333")};
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const StoryCoverWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

const SidebarMenu = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SiderLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 3px 0;
  color: ${({ isDarkMode }) => (isDarkMode ? "#c4c4c4" : "#333")};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-right: 2px solid transparent;

  &:hover {
    background-color: ${({ isDarkMode }) =>
      isDarkMode ? "rgba(85, 85, 85, 0.5)" : "#ededed"};
    border-right: 2px solid #6bc1b7;
  }

  svg {
    margin-right: 10px;
    color: #36bbba;
  }
`;

const Bottom = styled.div`
  height: 160px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const BottomInner = styled.div`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#3f3f3f" : "#fff")};
  height: 70px;
  width: 97%;
  padding: 10px;
  border-radius: 4px;
  color: ${({ isDarkMode }) => (isDarkMode ? "#c4c4c4" : "#333")};
  display: flex;
  align-items: center;
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  img {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ThemeSwitchContainer = styled.div`
  width: 97%;
  height: 50px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#3f3f3f" : "#fff")};
  border-radius: 4px;
  position: relative;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  color: ${({ isDarkMode }) => (isDarkMode ? "#c4c4c4" : "#333")};
`;

const ThemeToggle = styled.div`
  width: 48%;
  height: 40px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#5b5b5b" : "#ededed")};
  border-radius: 4px;
  position: absolute;
  cursor: pointer;
  top: 4px;
  left: ${({ isDarkMode }) => (isDarkMode ? "calc(50%)" : "5px")};
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 1;
`;

const Drawer = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isDarkMode, setTheme } = useThemeStore();
  const { user } = useUserStore();

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setTheme(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const routes = [
    { label: "Home", path: "/dashboard", icon: <FaHome /> },
    { label: "Discover", path: "/discover", icon: <FaCompass /> },
    { label: "Notifications", path: "/notifications", icon: <FaBell /> },
    { label: "Conversations", path: "/conversations", icon: <FaComments /> },
    { label: "Bookmarks", path: "/bookmarks", icon: <FaBookmark /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <OverlayContainer
      isOpen={isOpen}
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
    >
      <DrawerContainer isOpen={isOpen} isDarkMode={isDarkMode}>
        <CloseButton onClick={() => setIsOpen(false)}>
          <MdClose />
        </CloseButton>
        <Container isDarkMode={isDarkMode}>
          <Top>
            <StoryCoverWrapper>
              <StoryCover user={user} stories={user?.stories} />
            </StoryCoverWrapper>
            <SidebarMenu>
              {routes.map((route, index) => (
                <SiderLink
                  key={index}
                  to={route.path}
                  isDarkMode={isDarkMode}
                  onClick={() => setIsOpen(false)}
                  className={location.pathname === route.path ? "active" : ""}
                >
                  {route.icon}
                  {route.label}
                </SiderLink>
              ))}
            </SidebarMenu>
          </Top>
        </Container>
      </DrawerContainer>
    </OverlayContainer>
  );
};

export default Drawer;
