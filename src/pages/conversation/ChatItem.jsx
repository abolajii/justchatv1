import group from "./group.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils";
import useThemeStore from "../../store/useThemeStore"; // Import the theme store
import useConversation from "./hook/useConversation";

const Container = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 9px;
  position: relative;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  flex: 1;

  &:hover {
    background: ${(props) => props.theme.hoverBackground};
  }

  &.active {
    background: ${(props) => props.theme.activeBackground};
  }

  strong {
    margin-right: 3px;
  }
`;

const Box = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  background: ${(props) => props.theme.avatarBackground};
  border-radius: 50%;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const StatusIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 8px;
  width: 8px;
  background-color: ${(props) => props.statusColor || "#4caf50"};
  border: 2px solid ${(props) => props.theme.background};
  border-radius: 50%;
`;

const MessageText = styled.p`
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  margin: 0;
  color: ${(props) => props.theme.textSecondary};
`;

const NameText = styled.p`
  font-weight: 550;
  font-size: 15px;
  color: ${(props) => props.theme.textPrimary};
`;

const TimeText = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.textSecondary};
`;

const AlertBox = styled.div`
  background-color: ${(props) => props.theme.alertBackground};
  height: 8px;
  width: 8px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.theme.alertText};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatItem = ({
  name,
  message,
  time,
  status,
  profilePic,
  isGroup,
  id,
  isSelected,
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const { sentMessage } = useConversation();

  const theme = isDarkMode
    ? {
        background: "#121212",
        textPrimary: "#e0e0e0",
        textSecondary: "#888",
        hoverBackground: "#333",
        activeBackground: "#333333",
        borderColor: "#333",
        avatarBackground: "#444",
        alertBackground: "#6bc1b7",
        alertText: "#fff",
      }
    : {
        background: "#fff",
        textPrimary: "#333",
        textSecondary: "#666",
        hoverBackground: "#f0f0f0",
        activeBackground: "#b2e8e8",
        borderColor: "rgba(54, 187, 186, 0.2)",
        avatarBackground: "#a8c7c7",
        alertBackground: "#1b9d87",
        alertText: "#161515",
      };

  return (
    <Container
      theme={theme}
      className={isSelected ? "active" : ""}
      onClick={() => navigate("/conversation/" + id)}
    >
      <Box theme={theme}>
        {profilePic ? (
          <img src={profilePic} alt={name} />
        ) : (
          <img src={group} alt="group" />
        )}
        {status && <StatusIcon statusColor={status} theme={theme} />}
      </Box>
      <div style={{ flex: 1 }}>
        <NameText theme={theme}>{name}</NameText>
        <MessageText theme={theme}>{message}</MessageText>
      </div>
      <div>
        <TimeText theme={theme}>{time ? formatDate(time) : ""}</TimeText>
      </div>
    </Container>
  );
};

export default ChatItem;
