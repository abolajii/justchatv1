import React from "react";
import useNotificationStore from "../store/useNotification";
import Post from "./Post";
import styled from "styled-components";

const Notification = styled.div`
  width: 100%;
  padding: 10px;
`;

const SingleNotification = () => {
  const { notification } = useNotificationStore();
  console.log(notification);
  return (
    <Notification>
      {notification !== null && <Post post={notification} />}
    </Notification>
  );
};

export default SingleNotification;
