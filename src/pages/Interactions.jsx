import React from "react";
import {
  ActionIcon,
  Avi,
  getActionIcon,
  Item,
  Name,
  PostInfo,
} from "./Notifications";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "./store/useNotification";
import { formatDate } from "../utils";

const Interaction = ({ notifications, isDarkMode }) => {
  const navigate = useNavigate();

  const { setSelectedNotification } = useNotificationStore();

  return (
    <div>
      {notifications.map((n) => {
        const { type, sender, createdAt, data, isRead } = n;

        // if (type === "follow") {
        //   return (
        //     <Item
        //       isDarkMode={isDarkMode}
        //       className="flex gap-sm pt-3 pb-3 pointer"
        //       key={n._id}
        //       onClick={() => {
        //         navigate(`/profile/${sender.username}`);
        //       }}
        //     >
        //       <Avi>
        //         {sender?.profilePic && (
        //           <img src={sender.profilePic} alt="User avatar" />
        //         )}
        //         <ActionIcon>{getActionIcon("connect")}</ActionIcon>
        //       </Avi>
        //       <div className="flex flex-1 flex-col">
        //         <div className="flex justify-between">
        //           <div className="flex">
        //             <Name isDarkMode={isDarkMode}>@{sender.username}</Name>
        //             <div className="faint">connected with you</div>
        //           </div>
        //         </div>
        //         <div className="time">{formatDate(createdAt)}</div>
        //       </div>
        //     </Item>
        //   );
        // }

        if (type === "like") {
          const { post } = data;

          return (
            <Item
              className="flex gap-sm pt-3 pb-3 pointer"
              key={n._id}
              onClick={() => {
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
                  <div>{!n.isRead && <div className="alert"></div>}</div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo className="mr-4" isDarkMode={isDarkMode}>
                  {post?.content}
                </PostInfo>
              </div>
            </Item>
          );
        }

        // if (n.type === "reply") {
        //   const { post, comment } = data;

        //   return (
        //     <Item
        //       className="flex gap-sm pt-3 pb-3 pointer"
        //       key={n._id}
        //       isDarkMode={isDarkMode}
        //       onClick={() => {}}
        //     >
        //       <Avi>
        //         {sender?.profilePic && (
        //           <img src={sender.profilePic} alt="User avatar" />
        //         )}
        //         <ActionIcon>{getActionIcon("replied")}</ActionIcon>
        //       </Avi>
        //       <div className="flex flex-1 flex-col">
        //         <div className="flex justify-between">
        //           <div className="flex">
        //             <Name isDarkMode={isDarkMode}>{sender.name}</Name>
        //             <div className="faint">replied your post</div>
        //           </div>
        //           <div>
        //             <div>{!n.isRead && <div className="alert"></div>}</div>
        //           </div>
        //         </div>
        //         <div className="time">{formatDate(createdAt)}</div>
        //         <PostInfo isDarkMode={isDarkMode}>
        //           <div>
        //             <div
        //               className="top_notify"
        //               style={{
        //                 color: isDarkMode ? "#e0e0e0" : "inherit",
        //               }}
        //             >
        //               {post.content}
        //             </div>
        //           </div>
        //           <div
        //             className="bottom flex justify-between"
        //             style={{
        //               color: isDarkMode ? "#c0c0c0" : "inherit",
        //             }}
        //           >
        //             <div>{comment.content}</div>
        //             <div>
        //               <button
        //                 style={{
        //                   color: "rgb(27, 157, 135)",
        //                   backgroundColor: isDarkMode
        //                     ? "transparent"
        //                     : "inherit",
        //                   padding: "4px 8px",
        //                   borderRadius: "4px",
        //                   transition: "background-color 0.3s ease",
        //                 }}
        //                 onMouseOver={(e) => {
        //                   e.target.style.backgroundColor = isDarkMode
        //                     ? "rgba(255,255,255,0.1)"
        //                     : "rgba(0,0,0,0.05)";
        //                 }}
        //                 onMouseOut={(e) => {
        //                   e.target.style.backgroundColor = "transparent";
        //                 }}
        //               >
        //                 Reply
        //               </button>
        //             </div>
        //           </div>
        //         </PostInfo>
        //       </div>
        //     </Item>
        //   );
        // }

        if (n.type === "share") {
          const { post, comment } = data;
          return (
            <Item
              className="flex gap-sm pt-4 pb-4 pointer"
              key={n._id}
              isDarkMode={isDarkMode}
              onClick={() => {}}
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
                  <div>{!n.isRead && <div className="alert"></div>}</div>
                </div>
                <div className="time">{formatDate(createdAt)}</div>
                <PostInfo isDarkMode={isDarkMode}>{post.content}</PostInfo>
              </div>
            </Item>
          );
        }

        // if (n.type === "mention") {
        //   const { post, comment } = data;

        //   return (
        //     <Item
        //       className="flex gap-sm pt-4 pb-4 pointer"
        //       key={n._id}
        //       isDarkMode={isDarkMode}
        //       onClick={() => {
        //         navigate(`/post/${data.post._id}`);
        //         setSelectedPost(data.post);
        //         handleRead(n?._id);
        //       }}
        //     >
        //       <Avi>
        //         {sender?.profilePic && (
        //           <img src={sender.profilePic} alt="User avatar" />
        //         )}
        //         <ActionIcon>{getActionIcon("mentioned")}</ActionIcon>
        //       </Avi>
        //       <div className="flex flex-1 flex-col">
        //         <div className="flex justify-between">
        //           <div className="flex">
        //             <Name isDarkMode={isDarkMode}>{sender.name}</Name>
        //             <div className="faint">mention you on a post</div>
        //           </div>
        //           <div>
        //             <div>{!isRead && <div className="alert"></div>}</div>
        //           </div>
        //         </div>
        //         <div className="time">{formatDate(createdAt)}</div>
        //         <PostInfo isDarkMode={isDarkMode}>{post?.content}</PostInfo>
        //       </div>
        //     </Item>
        //   );
        // }
      })}
    </div>
  );
};

export default Interaction;
