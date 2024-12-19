import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import styled from "styled-components";
import { FaBell, FaComments, FaCompass, FaHome, FaUser } from "react-icons/fa";
// import useAuthStore from "../store/useAuthStore";

const Bottom = styled.div`
  position: fixed;
  height: 55px;
  background-color: #f0eded;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 10;

  @media (min-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: ${({ isActive }) => (isActive ? "#36bbba" : "#929292")};
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: #36bbba;
  }
`;

const Label = styled.span`
  font-size: 10px;
  margin-top: 4px;
  color: ${({ isActive }) => (isActive ? "#36bbba" : "#929292")};
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #36bbba;
  color: white;
  font-size: 10px;
  border-radius: 50%;
  font-weight: bold;
  min-width: 16px;
  min-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const conversationCount = 0;

  const routes = [
    { label: "Home", path: "/dashboard", icon: <FaHome /> },
    { label: "Discover", path: "/discover", icon: <FaCompass /> },
    { label: "Conversations", path: "/conversations", icon: <FaComments /> },
    { label: "Notifications", path: "/notifications", icon: <FaBell /> },
    { label: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <Bottom>
      {routes.map((route) => (
        <IconWrapper
          key={route.path}
          isActive={location.pathname === route.path}
          onClick={() => navigate(route.path)}
        >
          {route.label === "Conversations" && conversationCount > 0 && (
            <Badge>{conversationCount}</Badge>
          )}
          {route.icon}
          <Label isActive={location.pathname === route.path}>
            {route.label}
          </Label>
        </IconWrapper>
      ))}
    </Bottom>
  );
};

export default MobileSidebar;
