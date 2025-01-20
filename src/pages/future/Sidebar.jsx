import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import {
  RiDashboardFill,
  RiSignalTowerFill,
  RiSettings3Fill,
} from "react-icons/ri";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import { SiSignal } from "react-icons/si";

const Container = styled.div`
  background-color: #000000;
  width: 60px;
  height: 100vh;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 55px;
  border-right: 1px solid rgba(34, 197, 94, 0.4);
`;

const NavItem = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: ${(props) => (props.active ? "#4dc5b9" : "#666666")};
  background-color: ${(props) => (props.active ? "#272727" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    color: #4dc5b9;
    background-color: #272727;
  }
`;

const Sidebar = () => {
  const location = useLocation();

  const routes = [
    {
      path: "/trade/view",
      icon: RiDashboardFill,
      label: "Dashboard",
    },
    {
      path: "/trade/signal",
      icon: RiSignalTowerFill,
      label: "Signals",
    },
    {
      path: "/signal/all",
      icon: SiSignal,
      label: "All Signals",
    },

    {
      path: "/weekly",
      icon: BsCalendar2WeekFill,
      label: "Weekly",
    },
    {
      path: "/trade",
      // { label: "Trade", path: "/trade", icon: < /> },
      icon: FaHandHoldingUsd,
      label: "Trade",
    },
    {
      path: "/trade/settings",
      icon: RiSettings3Fill,
      label: "Settings",
    },
  ];

  return (
    <Container>
      {routes.map((route) => (
        <NavItem
          key={route.path}
          to={route.path}
          active={location.pathname === route.path ? 1 : 0}
          title={route.label}
        >
          <route.icon size={20} />
        </NavItem>
      ))}
    </Container>
  );
};

export default Sidebar;
