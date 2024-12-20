import React from "react";
import styled from "styled-components";
import {
  User,
  Globe,
  TrendingUp,
  Clock,
  Wallet,
  Bell,
  Mail,
  Settings,
  HelpCircle,
} from "lucide-react";
import useThemeStore from "../../store/useThemeStore";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => (props.isDarkMode ? "#0b0b0b" : "#ffffff")};
  transition: background-color 0.3s ease;
`;

const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
`;

const WelcomeBox = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1a1a1a" : "#f5f5f5")};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #ddd;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

const CountryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => (props.isDarkMode ? "#a0a0a0" : "#666666")};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const StatItem = styled.div`
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .icon {
    color: ${(props) => (props.isDarkMode ? "#a0a0a0" : "#666666")};
  }

  .content {
    flex: 1;
  }

  .label {
    font-size: 14px;
    color: ${(props) => (props.isDarkMode ? "#a0a0a0" : "#666666")};
    margin-bottom: 4px;
  }

  .value {
    font-size: 18px;
    font-weight: 500;
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => (props.isDarkMode ? "#333" : "#ddd")};
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${(props) => (props.isDarkMode ? "#a0a0a0" : "#666666")};
  cursor: pointer;
  padding: 8px;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  }
`;

const Trade = () => {
  const { isDarkMode } = useThemeStore();

  // Mock data - replace with actual data from your state management
  const userData = {
    name: "John Doe",
    avatar: "/path/to/avatar.jpg",
    country: "US",
    countryFlag: "🇺🇸",
    tradeCount: 156,
    lastTradeTime: "2024-12-20T10:30:00",
    startingCapital: "$10,000",
    reminderCount: 3,
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Inner>
        <WelcomeBox isDarkMode={isDarkMode}>
          <UserInfo>
            <Avatar>
              <img src={userData.avatar} alt={userData.name} />
            </Avatar>
            <UserDetails>
              <UserName isDarkMode={isDarkMode}>
                Welcome, {userData.name}
              </UserName>
              <CountryInfo isDarkMode={isDarkMode}>
                <Globe size={16} />
                <span>{userData.countryFlag}</span>
                <span>{userData.country}</span>
              </CountryInfo>
            </UserDetails>
          </UserInfo>

          <Stats>
            <StatItem isDarkMode={isDarkMode}>
              <TrendingUp size={20} className="icon" />
              <div className="content">
                <div className="label">Total Trades</div>
                <div className="value">{userData.tradeCount}</div>
              </div>
            </StatItem>
            <StatItem isDarkMode={isDarkMode}>
              <Clock size={20} className="icon" />
              <div className="content">
                <div className="label">Last Trade</div>
                <div className="value">
                  {new Date(userData.lastTradeTime).toLocaleTimeString()}
                </div>
              </div>
            </StatItem>
            <StatItem isDarkMode={isDarkMode}>
              <Wallet size={20} className="icon" />
              <div className="content">
                <div className="label">Starting Capital</div>
                <div className="value">{userData.startingCapital}</div>
              </div>
            </StatItem>
            <StatItem isDarkMode={isDarkMode}>
              <Bell size={20} className="icon" />
              <div className="content">
                <div className="label">Reminders</div>
                <div className="value">{userData.reminderCount}</div>
              </div>
            </StatItem>
          </Stats>

          <QuickActions isDarkMode={isDarkMode}>
            <ActionButton isDarkMode={isDarkMode}>
              <Mail size={20} />
              Messages
            </ActionButton>
            <ActionButton isDarkMode={isDarkMode}>
              <Settings size={20} />
              Settings
            </ActionButton>
            <ActionButton isDarkMode={isDarkMode}>
              <HelpCircle size={20} />
              Help
            </ActionButton>
          </QuickActions>
        </WelcomeBox>
      </Inner>
    </Container>
  );
};

export default Trade;
