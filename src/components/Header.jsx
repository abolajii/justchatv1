import React, { useState } from "react";

import styled from "styled-components";
import useUserStore from "../store/useUserStore";
import Drawer from "./Drawer";
import useThemeStore from "../store/useThemeStore";
import { useLocation } from "react-router-dom";
import Story from "../pages/components/Story";

const Top = styled.div`
  position: fixed;
  height: 55px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
  background-color: ${(props) => (props.isDarkMode ? "#1c1c1c" : "#f6f6f6")};
  padding: 0px 5px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Inner = styled.div`
  /* height: 100vh; */
  @media (max-width: 768px) {
    top: 55px;
    position: relative;
    height: calc(100vh - 100px);
  }
`;

const UserAvi = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
    opacity: ${(props) => (props.isDarkMode ? 0.7 : 0.85)};
    border: 2px solid
      ${(props) => (props.isDarkMode ? "#4a4a4a" : "transparent")};
  }
`;

const Header = ({ children }) => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore(); // Add dark mode state
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/dashboard") {
    return (
      <div>
        <Top>
          <div className="relative flex">
            <UserAvi onClick={() => setIsOpen(true)} isDarkMode={isDarkMode}>
              <img src={user.profilePic} alt="User Avatar" />
            </UserAvi>
            <div className="ml-2">
              <Story show />
            </div>
            <Drawer
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isDarkMode={isDarkMode}
            />
          </div>
        </Top>
        <Inner>{children}</Inner>
      </div>
    );
  }

  return (
    <div>
      <Top>
        <div className="relative">
          <UserAvi onClick={() => setIsOpen(true)} isDarkMode={isDarkMode}>
            <img src={user.profilePic} alt="User Avatar" />
          </UserAvi>
          <Drawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isDarkMode={isDarkMode}
          />
        </div>
      </Top>
      <Inner>{children}</Inner>
    </div>
  );
};

export default Header;
