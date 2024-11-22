import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaUser,
  FaCog,
  FaBell,
  FaBookmark,
  FaCompass,
} from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* max-width: 300px; */
  background-color: var(--background-color);
`;

const Top = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Bottom = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e2e2e2;
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

  &:hover {
    background-color: #ededed;
    color: #333;
    border-right: 2px solid #6bc1b7;
  }

  &.active {
    color: #333;
    background-color: #ededed;
    border-right: 2px solid #6bc1b7;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 14px; /* Reduced icon size */
`;

const Label = styled.div`
  font-size: 14px;
  color: #fff;
`;

const Sidebar = () => {
  const location = useLocation(); // Get the current location object

  const routes = [
    { label: "Home", path: "/dashboard", icon: <FaHome /> },
    { label: "Discover", path: "/discover", icon: <FaCompass /> },
    { label: "Conversations", path: "/conversations", icon: <FaComments /> },
    { label: "Notifications", path: "/notifications", icon: <FaBell /> },
    { label: "Bookmarks", path: "/bookmarks", icon: <FaBookmark /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <Container>
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
        </SidebarMenu>
      </Top>
      <Bottom>
        <p>© 2024 Your Company</p>
      </Bottom>
    </Container>
  );
};

export default Sidebar;
