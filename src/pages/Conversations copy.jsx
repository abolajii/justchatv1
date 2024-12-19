import React from "react";
import styled from "styled-components";
import { MainContainer, Search, Spinner } from "../components";
import Desktop from "../responsive/Desktop";
import { RiPushpinFill } from "react-icons/ri";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { getUserConversation } from "../api/request";
import ChatItem from "./conversation/ChatItem";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoFilterSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import SingleConversation from "./conversation/SingleConversation";
import useThemeStore from "../store/useThemeStore";

const lightTheme = {
  background: "#fff",
  textPrimary: "#333",
  textSecondary: "#666",
  inputBackground: "#f9f9f9",
  inputBorder: "#e0e0e0",
  borderColor: "#ebebeb",
  iconColor: "#a2a2a2",
  primaryColor: "#6bc1b7",
  disabledColor: "#ccc",
  avatarBorder: "rgba(0,0,0,0.1)",
};

const darkTheme = {
  background: "#1e1e1e",
  textPrimary: "#e0e0e0",
  textSecondary: "#888",
  inputBackground: "#1e1e1e",
  inputBorder: "#333",
  borderColor: "#333",
  iconColor: "#a2a2a2",
  primaryColor: "#6bc1b7",
  disabledColor: "#555",
  avatarBorder: "rgba(255,255,255,0.1)",
};

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
`;

const One = styled.div`
  flex: 1.2;
  height: 100vh;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.background};
`;

const Two = styled.div`
  flex: 1.8;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background};
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.background};

  .search-container {
    flex-grow: 1;
    margin-right: 16px;
  }

  .icon-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(107, 193, 183, 0.1);
    }
  }

  .pointer {
    cursor: pointer;
  }
`;

const ChatMenu = styled.div`
  .mute {
    color: ${(props) => props.theme.textSecondary};
    margin-left: 6px;
    font-size: 16px;
  }

  .small {
    font-size: 13px;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
    padding: 0 12px;
  }
`;

const Scrollable = styled.div`
  height: calc(100vh - 163px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.borderColor};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.iconColor};
    border-radius: 3px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${(props) => props.theme.textSecondary};
  text-align: center;
`;

const RightPanel = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${(props) => props.theme.background};

  h2 {
    color: ${(props) => props.theme.textPrimary};
    margin-bottom: 10px;
  }

  p {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const Conversations = () => {
  const [loading, setLoading] = React.useState(true);
  const [conversations, setConversations] = React.useState([]);
  const { isDarkMode } = useThemeStore();

  const { id } = useParams();

  const pinnedMessages = conversations.filter((chat) => chat.pinned);
  const allMessages = conversations.filter((chat) => !chat.pinned);

  const theme = isDarkMode ? darkTheme : lightTheme;

  React.useEffect(() => {
    const fetchConvo = async () => {
      try {
        const response = await getUserConversation();
        setConversations(response);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setLoading(false);
      }
    };
    fetchConvo();
  }, []);

  const handleAddGroup = () => {
    // TODO: Implement add group functionality
    console.log("Add group clicked");
  };

  const handleFilter = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked");
  };

  if (loading) {
    return (
      <MainContainer className={isDarkMode ? "dark-mode" : ""}>
        <Desktop>
          <One theme={theme}>
            <div className="pl-2 pt-2">
              <Spinner size="20px" />
            </div>
          </One>
        </Desktop>
      </MainContainer>
    );
  }

  return (
    <MainContainer theme={theme}>
      <Desktop>
        <div className="flex">
          <One theme={theme}>
            <Top theme={theme}>
              <div className="search-container">
                <Search />
              </div>

              <div className="icon-container">
                <div
                  className="pointer box"
                  onClick={handleAddGroup}
                  title="Add Group"
                >
                  <AiOutlineUsergroupAdd color={theme.primaryColor} size={22} />
                </div>
                <div
                  className="pointer box"
                  onClick={handleFilter}
                  title="Filter"
                >
                  <IoFilterSharp color={theme.primaryColor} size={20} />
                </div>
              </div>
            </Top>

            <ChatMenu theme={theme}>
              {pinnedMessages.length > 0 && (
                <>
                  <div className="small">
                    <RiPushpinFill color={theme.iconColor} size={22} />
                    <p className="mute">Pinned</p>
                  </div>
                  {pinnedMessages.map((chat) => (
                    <ChatItem key={chat.id} {...chat} />
                  ))}
                </>
              )}

              <div className="small">
                <BiSolidMessageSquareDetail color={theme.iconColor} size={20} />
                <p className="mute">All Messages</p>
              </div>
            </ChatMenu>

            <Scrollable theme={theme}>
              {allMessages.length > 0 ? (
                allMessages.map((chat) => <ChatItem key={chat.id} {...chat} />)
              ) : (
                <EmptyState theme={theme}>
                  <p>No messages yet. Start a conversation!</p>
                </EmptyState>
              )}
            </Scrollable>
          </One>
          <Two theme={theme}>
            {id ? (
              <SingleConversation />
            ) : (
              <RightPanel theme={theme}>
                <h2>Select a conversation to start chatting</h2>
                <p>
                  Choose a contact or group from the list on the left to view
                  your conversation.
                </p>
              </RightPanel>
            )}
          </Two>
        </div>
      </Desktop>
    </MainContainer>
  );
};

export default Conversations;
