import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainContainer, Spinner } from "../components";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaReply } from "react-icons/fa";
import { GiRapidshareArrow } from "react-icons/gi";
import { RiUserFollowFill } from "react-icons/ri";
import { VscMention } from "react-icons/vsc";
import { getUserNotifications } from "../api/request";
import useNotificationStore from "./store/useNotification";
import { formatDate } from "../utils";
import useThemeStore from "../store/useThemeStore";
import SingleNotification from "./components/SingleNotification";

const Container = styled.div`
  display: flex;
  /* flex: 2; */
  .time {
    font-size: 12px;
    /* color: #999; */
    color: ${(props) => (props.isDarkMode ? "#aaa" : "#999")};
    margin-top: 3px;
  }

  .top {
    margin-top: 10px;
    margin-left: 10px;
  }

  .border-right {
    border-right: 1px solid
      ${(props) =>
        props.isDarkMode
          ? "rgba(100, 100, 100, 0.3)"
          : "rgba(204, 204, 204, 0.5)"};
  }
  /* padding-top: 80px; */
`;

const ActionIcon = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  height: 16px;
  width: 16px;
  color: rgb(27, 157, 135);
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const Avi = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  margin-left: 9px;
  background-color: rgba(49, 56, 56, 0.4);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const Item = styled.div`
  /* background-color: rgba(255, 255, 255, 0.4); */
  font-size: 14px;
  /* border-bottom: 1px solid rgba(210, 210, 210, 0.5); */
  cursor: pointer;
  display: flex;
  /* align-items: center; */

  .faint {
    color: #757575;
    color: ${(props) => (props.isDarkMode ? "#a0a0a0" : "#757575")};
    margin-left: 5px;
  }

  .alert {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #1b9d87;
    margin-right: 9px;
  }

  .info {
    display: flex;
    /* justify-content: space-between; */
    /* align-items: center; */
    /* flex: 1; */
    /* width: 100%; Allows content to stretch between the name and alert */
  }

  .details {
    display: flex;
    /* flex-direction: column; */
  }

  .name-message {
    display: flex;
    /* align-items: center; */
  }

  ${(props) =>
    props.isDarkMode
      ? `
      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
    `
      : `
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `}
`;

const Name = styled.div`
  font-weight: normal;
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "inherit")};
`;

const Tabs = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  width: 100%;
`;

const Tab = styled.div`
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  color: ${(props) =>
    props.active ? "#28a69e" : props.isDarkMode ? "#b0b0b0" : "#9b9b9b"};
  transition: color 0.3s ease;
  text-align: center;
  flex: 1;
  width: 100%;

  &:hover {
    color: #28a69e; /* Color on hover */
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  max-width: 570px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: ${(props) => (props.isDarkMode ? "#1c1c1c" : "#f6f6f6")};
  z-index: 10;
  border-bottom: 1px solid
    ${(props) =>
      props.isDarkMode
        ? "rgba(100, 100, 100, 0.3)"
        : "rgba(204, 204, 204, 0.5)"};

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Scrollable = styled.div`
  flex: 1;
  height: calc(100vh - 20px);
  overflow-y: scroll; /* Changed from hidden to auto to enable scrolling */
  box-sizing: border-box;
  /* margin-bottom: 60px; Height of MobileSidebar */
  margin-top: 10px;

  .top {
    margin-top: 30px;
  }

  .width {
    border: 1px solid #c8e2da;
    border-radius: 3px;
  }

  /* Optional: Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Content = styled.div`
  margin-top: 40px;
`;

const PostInfo = styled.div`
  padding: 6px;
  background-color: ${(props) =>
    props.isDarkMode ? "rgba(30, 30, 30, 0.6)" : "rgba(255, 255, 255, 0.8)"};
  border-radius: 4px;
  margin-top: 8px;
  font-size: 13px;
  margin-right: 10px;
  color: ${(props) => (props.isDarkMode ? "#e0e0e0" : "inherit")};
  border: 1px solid
    ${(props) =>
      props.isDarkMode ? "rgba(100, 100, 100, 0.2)" : "rgba(0, 0, 0, 0.1)"};

  .top_notify {
    padding: 9px 4px;
    border-left: 3px solid rgb(27, 157, 135);
    background-color: ${(props) =>
      props.isDarkMode ? "rgba(50, 50, 50, 0.5)" : "rgba(215, 212, 212, 0.5)"};
    border-radius: 4px;
    font-size: 12px;
    color: ${(props) => (props.isDarkMode ? "#c0c0c0" : "inherit")};
  }

  .bottom {
    margin-top: 5px;
    font-size: 13px;
    padding: 3px 0;
  }
`;

const tabs = ["All", "Mentions", "Interactions"];

const Notification = () => {
  const { notifications, setNotifications, setSelectedNotification } =
    useNotificationStore();
  const [isFetching, setIsFetching] = useState(true);
  const { isDarkMode } = useThemeStore();
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => setActiveTab(tab);
  const navigate = useNavigate();

  const getActionIcon = (action) => {
    switch (action) {
      case "liked":
        return <FaHeart color="#fe5050" />;
      case "shared":
        return <GiRapidshareArrow size={10} color="#57aa7a" />;
      case "replied":
        return <FaReply />;
      case "connect":
        return <RiUserFollowFill color="#145567" />;
      case "mentioned":
        return <VscMention size={20} color="#18639d" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const data = await getUserNotifications();
        setIsFetching(false);
        setNotifications(data.data.notifications);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
  }, []);

  if (isFetching) {
    return (
      <MainContainer>
        <Container isDarkMode={isDarkMode}>
          <Header isDarkMode={isDarkMode}>
            <Tabs>
              {tabs.map((tab, index) => (
                <Tab
                  key={tab}
                  // ref={(el) => (tabsRef.current[index] = el)}
                  active={activeTab === tab} // Pass active state to Tab
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </Tab>
              ))}
              {/* <Slider style={sliderStyle} /> */}
            </Tabs>
          </Header>
          <Scrollable>
            <div className="top pt-4 pl-2 mt-4">
              <Spinner size="20px" />
            </div>
          </Scrollable>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Container isDarkMode={isDarkMode}>
        <div className="flex-1 border-right">
          <Container isDarkMode={isDarkMode}>
            <Header isDarkMode={isDarkMode}>
              <Tabs>
                {tabs.map((tab, index) => (
                  <Tab
                    key={tab}
                    active={activeTab === tab} // Pass active state to Tab
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tabs>
            </Header>
            <Scrollable>
              <Content>
                {notifications.length === 0 && !isFetching && (
                  <p className="text-sm pl-2 pt-2">No notifications yet 📣</p>
                )}
                {notifications.map((n) => {
                  const { type, sender, createdAt, data, isRead } = n;

                  if (type === "follow") {
                    return (
                      <Item
                        isDarkMode={isDarkMode}
                        className="flex gap-sm pt-3 pb-3 pointer"
                        key={n._id}
                        onClick={() => {
                          navigate(`/post/${data.post._id}`);
                          // handleRead(n?._id);
                        }}
                      >
                        <Avi>
                          {sender?.profilePic && (
                            <img src={sender.profilePic} alt="User avatar" />
                          )}
                          <ActionIcon>{getActionIcon("connect")}</ActionIcon>
                        </Avi>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div className="flex">
                              <Name isDarkMode={isDarkMode}>
                                @{sender.username}
                              </Name>
                              <div className="faint">connected with you</div>
                            </div>
                          </div>
                          <div className="time">{formatDate(createdAt)}</div>
                        </div>
                      </Item>
                    );
                  }

                  if (type === "like") {
                    const { post } = data;

                    // console.log(n);
                    return (
                      <Item
                        className="flex gap-sm pt-3 pb-3 pointer"
                        key={n._id}
                        onClick={() => {
                          // navigate(`/post/${data.post._id}`);
                          // setSelectedPost(data.post);
                          // !n.isRead && handleRead(n?._id);
                          setSelectedNotification(data.post);
                        }}
                        isDarkMode={isDarkMode}
                      >
                        <Avi>
                          {sender?.profilePic && (
                            <img src={sender.profilePic} alt="User avatar" />
                          )}
                          <ActionIcon>{getActionIcon("liked")}</ActionIcon>
                        </Avi>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div className="flex">
                              <Name isDarkMode={isDarkMode}>{sender.name}</Name>
                              <div className="faint">liked your post</div>
                            </div>
                            <div>
                              {!n.isRead && <div className="alert"></div>}
                            </div>
                          </div>
                          <div className="time">{formatDate(createdAt)}</div>
                          <PostInfo className="mr-4" isDarkMode={isDarkMode}>
                            {post?.content}
                            {/* {formattedContent(post?.content || "")} */}
                          </PostInfo>
                        </div>
                      </Item>
                    );
                  }

                  if (n.type === "reply") {
                    const { post, comment } = data;

                    return (
                      <Item
                        className="flex gap-sm pt-3 pb-3 pointer"
                        key={n._id}
                        isDarkMode={isDarkMode}
                        onClick={() => {
                          //  navigate(`/post/${data.post._id}`);
                          //  handleRead(n?._id);
                        }}
                      >
                        <Avi>
                          {sender?.profilePic && (
                            <img src={sender.profilePic} alt="User avatar" />
                          )}
                          <ActionIcon>{getActionIcon("replied")}</ActionIcon>
                        </Avi>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div className="flex">
                              <Name isDarkMode={isDarkMode}>{sender.name}</Name>
                              <div className="faint">replied your post</div>
                            </div>
                            <div>
                              <div>
                                {!n.isRead && <div className="alert"></div>}
                              </div>
                            </div>
                          </div>
                          <div className="time">{formatDate(createdAt)}</div>
                          <PostInfo isDarkMode={isDarkMode}>
                            <div>
                              <div
                                className="top_notify"
                                style={{
                                  color: isDarkMode ? "#e0e0e0" : "inherit",
                                }}
                              >
                                {post.content}
                              </div>
                            </div>
                            <div
                              className="bottom flex justify-between"
                              style={{
                                color: isDarkMode ? "#c0c0c0" : "inherit",
                              }}
                            >
                              <div>{comment.content}</div>
                              <div>
                                <button
                                  style={{
                                    color: "rgb(27, 157, 135)",
                                    backgroundColor: isDarkMode
                                      ? "transparent"
                                      : "inherit",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.3s ease",
                                  }}
                                  onMouseOver={(e) => {
                                    e.target.style.backgroundColor = isDarkMode
                                      ? "rgba(255,255,255,0.1)"
                                      : "rgba(0,0,0,0.05)";
                                  }}
                                  onMouseOut={(e) => {
                                    e.target.style.backgroundColor =
                                      "transparent";
                                  }}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </PostInfo>
                        </div>
                      </Item>
                    );
                  }

                  if (n.type === "share") {
                    const { post, comment } = data;
                    return (
                      <Item
                        className="flex gap-sm pt-4 pb-4 pointer"
                        key={n._id}
                        isDarkMode={isDarkMode}
                        onClick={() => {
                          // navigate(`/post/${data.post._id}`);
                          // handleRead(n?._id);
                        }}
                      >
                        <Avi>
                          {sender?.profilePic && (
                            <img src={sender.profilePic} alt="User avatar" />
                          )}
                          <ActionIcon>{getActionIcon("shared")}</ActionIcon>
                        </Avi>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div className="flex">
                              <Name isDarkMode={isDarkMode}>{sender.name}</Name>
                              <div className="faint">shared your post</div>
                            </div>
                            <div>
                              {!n.isRead && <div className="alert"></div>}
                            </div>
                          </div>
                          <div className="time">{formatDate(createdAt)}</div>
                          <PostInfo isDarkMode={isDarkMode}>
                            {post.content}
                          </PostInfo>
                        </div>
                      </Item>
                    );
                  }

                  if (n.type === "mention") {
                    const { post, comment } = data;

                    return (
                      <Item
                        className="flex gap-sm pt-4 pb-4 pointer"
                        key={n._id}
                        isDarkMode={isDarkMode}
                        onClick={() => {
                          navigate(`/post/${data.post._id}`);
                          setSelectedPost(data.post);
                          handleRead(n?._id);
                        }}
                      >
                        <Avi>
                          {sender?.profilePic && (
                            <img src={sender.profilePic} alt="User avatar" />
                          )}
                          <ActionIcon>{getActionIcon("mentioned")}</ActionIcon>
                        </Avi>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div className="flex">
                              <Name isDarkMode={isDarkMode}>{sender.name}</Name>
                              <div className="faint">mention you on a post</div>
                            </div>
                            <div>
                              <div>
                                {!isRead && <div className="alert"></div>}
                              </div>
                            </div>
                          </div>
                          <div className="time">{formatDate(createdAt)}</div>
                          <PostInfo isDarkMode={isDarkMode}>
                            {post?.content}
                          </PostInfo>
                        </div>
                      </Item>
                    );
                  }
                })}
              </Content>
            </Scrollable>
          </Container>
        </div>
        <div className="flex-1">
          <SingleNotification />
        </div>
      </Container>
    </MainContainer>
  );
};

export default Notification;
