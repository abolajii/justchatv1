import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { RiLogoutCircleLine, RiSignalTowerFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaUser,
  FaCog,
  FaBell,
  FaBookmark,
  FaCompass,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import useUserStore from "../store/useUserStore";
import { HiCheckBadge } from "react-icons/hi2";
import useThemeStore from "../store/useThemeStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  /* Light Mode Styles */
  background-color: #f9f9f9;
  color: #333;

  /* Dark Mode Styles */
  &.dark-mode {
    background-color: #232323;
    color: #e0e0e0;
  }

  .divider {
    height: 14px;
    width: 1px;
    background: #9c9c9c;
    margin: 0 3px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
  }

  .username {
    font-size: 12px;
    /* color: #666; */

    /* Dark Mode */
    .dark-mode & {
      color: #ffffff;
    }
  }

  p {
    font-size: 12px;
  }

  svg {
    color: #36bbba;
  }
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Bottom = styled.div`
  height: 160px;
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-right: 2px solid transparent;

  /* Dark Mode */
  .dark-mode & {
    color: #c4c4c4;
  }

  &:hover {
    background-color: #ededed;
    color: #333;
    border-right: 2px solid #6bc1b7;

    /* Dark Mode */
    .dark-mode & {
      background-color: rgba(85, 85, 85, 0.5);
      color: #c4c4c4;
    }
  }

  &.active {
    background-color: #ededed;
    color: #333;
    border-right: 2px solid #6bc1b7;

    /* Dark Mode */
    .dark-mode & {
      background-color: rgba(85, 85, 85, 0.5);
      color: #c4c4c4;
    }
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 14px;
`;

const BottomInner = styled.div`
  background-color: #fff;
  height: 70px;
  width: 97%;
  padding: 10px;
  border-radius: 4px;
  color: #333;

  /* Dark Mode */
  .dark-mode & {
    background-color: #3f3f3f;
    color: #c4c4c4;
  }
`;

const UserAvi = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

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
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  color: #333;

  /* Dark Mode */
  .dark-mode & {
    background-color: #3f3f3f;
    color: #c4c4c4;
  }
`;

const ThemeToggle = styled.div`
  width: 48%;
  height: 40px;
  background-color: #ededed;
  border-radius: 4px;
  position: absolute;
  cursor: pointer;
  top: 4px;
  left: ${(props) => (props.isDarkMode ? "calc(50%)" : "5px")};
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  /* Dark Mode */
  .dark-mode & {
    background-color: #5b5b5b;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  z-index: 1;
`;

const Sidebar = () => {
  const location = useLocation();
  const { isDarkMode, setTheme } = useThemeStore();
  const { user, clearUser } = useUserStore();

  useEffect(() => {
    // Optional: Persist theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setTheme(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    // Optional: If you're using a global theme state management
    // dispatch(setTheme(newMode ? 'dark' : 'light'))
  };

  const routes = [
    { label: "Home", path: "/dashboard", icon: <FaHome /> },
    { label: "Discover", path: "/discover", icon: <FaCompass /> },
    { label: "Notifications", path: "/notifications", icon: <FaBell /> },
    { label: "Conversations", path: "/conversations", icon: <FaComments /> },
    { label: "Bookmarks", path: "/bookmarks", icon: <FaBookmark /> },
    { label: "Trade", path: "/trade", icon: <FaHandHoldingUsd /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <Container className={isDarkMode ? "dark-mode" : ""}>
      <Top>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <SidebarMenu>
          {routes.map((route, index) => (
            <SiderLink
              key={index}
              to={route.path}
              className={location.pathname === route.path ? "active" : ""}
            >
              <IconWrapper>{route.icon}</IconWrapper>
              {route.label}
            </SiderLink>
          ))}
          {user?.isUserSignal && (
            <SiderLink>
              <IconWrapper>
                <RiSignalTowerFill size={16} />
              </IconWrapper>
              Signal
            </SiderLink>
          )}
          <SiderLink onClick={clearUser}>
            <IconWrapper>
              <RiLogoutCircleLine size={16} />
            </IconWrapper>
            Logout
          </SiderLink>
        </SidebarMenu>
      </Top>
      <Bottom className="center">
        <BottomInner className="flex pl-2 pr-2 gap-sm">
          <div>
            <UserAvi>
              <img src={user?.profilePic} alt="User avatar" />
            </UserAvi>
          </div>
          <div>
            <div className="name flex">
              {user?.name}
              {user?.isVerified && (
                <div className="center">
                  <HiCheckBadge color="#1b9d87" />
                </div>
              )}
            </div>
            <div className="flex align-center">
              <div className="username">@{user?.username}</div>
              <div className="divider"></div>
              <div className="username">{user?.postCount} posts</div>
            </div>
          </div>
        </BottomInner>
        <ThemeSwitchContainer onClick={toggleTheme}>
          <IconContainer>
            <div
              className="flex-1 flex align-center gap-sm pointer pt-2 pb-2 pl-1 pr-1"
              onClick={toggleTheme}
            >
              <FiSun size={18} />
              <p>Light Mode</p>
            </div>
            <div
              className="flex-1 flex align-center gap-sm pointer"
              onClick={toggleTheme}
            >
              <FiMoon size={18} />
              <p>Dark Mode</p>
            </div>
          </IconContainer>
          <ThemeToggle isDarkMode={isDarkMode} />
        </ThemeSwitchContainer>
      </Bottom>
    </Container>
  );
};

export default Sidebar;
