import React from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import { Bell, Clock, Globe, TrendingUp, Wallet } from "lucide-react";
import useUserStore from "../../../store/useUserStore";
import useCbexStore from "../../store/useCbexStore";

const Container = styled.div`
  /* background-color: ${(props) =>
    props.isDarkMode ? "#0b0b0b" : "#ffffff"}; */
  transition: background-color 0.3s ease;
  margin: auto;
  width: 90%;
  padding: 10px;
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
  grid-template-columns: repeat(3, 1fr);
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

const DetailsWidget = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { user } = useUserStore();
  const { country, numberOfSignals, reminderSettings, startingCapital } =
    useCbexStore();

  return (
    <Container>
      <UserInfo>
        <Avatar>
          <img src={user.profilePic} alt={user.name} />
        </Avatar>
        <UserDetails>
          <UserName isDarkMode={isDarkMode}>{user.name}</UserName>
          <CountryInfo isDarkMode={isDarkMode}>
            <Globe size={16} />
            {/* <span>{userData.countryFlag}</span> */}
            <span>{country.name}</span>
          </CountryInfo>
        </UserDetails>
      </UserInfo>
      <Stats>
        <StatItem isDarkMode={isDarkMode}>
          <Wallet size={20} className="icon" />
          <div className="content">
            <div className="label">Starting Capital</div>
            <div className="value">${startingCapital}</div>
          </div>
        </StatItem>
        <StatItem isDarkMode={isDarkMode}>
          <TrendingUp size={20} className="icon" />
          <div className="content">
            <div className="label">Number of Signals</div>
            <div className="value">{numberOfSignals}</div>
          </div>
        </StatItem>

        <StatItem isDarkMode={isDarkMode}>
          <Bell size={20} className="icon" />
          <div className="content">
            <div className="label">Reminders</div>
            <div className="value">
              {reminderSettings.filter((r) => r.isEnabled).length}
            </div>
          </div>
        </StatItem>
      </Stats>
    </Container>
  );
};

export default DetailsWidget;
