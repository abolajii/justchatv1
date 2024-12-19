import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useThemeStore from "../../store/useThemeStore";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { MdMoreHoriz } from "react-icons/md";
import { bookMarkPost, likePost } from "../../api/request";
import useUserStore from "../../store/useUserStore";
import { BottomIcons, Interaction, ReuseableModal } from "../../components";
import useModalStore from "../store/useModalStore";
import ReplyPost from "../../components/ReplyPost";
import ReplyModal from "./ReplyModal";
import usePostStore from "../store/usePostStore";

// Utility function for date formatting
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const Container = styled.div`
  max-width: ${(props) => (props.full ? "auto" : "600px")};
  width: 100%;
  margin: 0 auto;
  margin-bottom: 16px;

  .action-icons {
    display: flex;
    gap: 10px;
    color: ${(props) => (props.isDarkMode ? "#a2a2a2" : "#555")};
    cursor: pointer;
    font-size: 18px;
    align-items: center;

    .disabled {
      color: ${(props) => (props.isDarkMode ? "#555" : "#ccc")};
      cursor: not-allowed;
    }
  }

  .send-icon {
    color: #6bc1b7;
    cursor: pointer;
    font-size: 20px;

    &.disabled {
      color: ${(props) => (props.isDarkMode ? "#555" : "#ccc")};
      cursor: not-allowed;
    }
  }

  svg {
    color: ${(props) => (props.isDarkMode ? "#a2a2a2" : "#a2a2a2")};

    &:hover {
      color: #6bc1b7;
    }
  }
`;

const PostWrapper = styled.div`
  display: flex;
  padding: 15px;
  background-color: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#333" : "#ebebeb")};
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */
`;

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 8px; */
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AuthorName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => (props.$isDarkMode ? "#e0e0e0" : "#14171a")};
`;

const Username = styled.span`
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};
  font-size: 14px;
`;

const Timestamp = styled.span`
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};
  font-size: 13px;
`;

const PostText = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: ${(props) => (props.$isDarkMode ? "#e0e0e0" : "#14171a")};
  margin-bottom: 2px;
`;

// const InteractionContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const InteractionButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: ${(props) =>
//     props.$isDarkMode
//       ? props.$isActive
//         ? props.$activeColor
//         : "#888888"
//       : props.$isActive
//       ? props.$activeColor
//       : "#657786"};
//   transition: color 0.2s ease;

//   &:hover {
//     color: ${(props) => props.$hoverColor};
//   }

//   svg {
//     transition: transform 0.2s ease;
//   }

//   &:hover svg {
//     transform: scale(1.1);
//   }
// `;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};

  &:hover {
    color: #1da1f2;
  }
`;

const ImageContainer = styled.div`
  height: 600px;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const NormalPost = ({ post, share, full }) => {
  const { user } = useUserStore();

  const { isDarkMode } = useThemeStore();
  const { setSinglePost } = usePostStore();
  const [likes, setLikes] = useState(post.likes.length || 0);
  const [comments, setComments] = useState(post.comments.length || 0);
  const [shares, setShares] = useState(post.shares.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const { isReplyModalOpen, closeReplyModal, openReplyModal } = useModalStore();

  useEffect(() => {
    if (post?.likes?.includes(user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post?.likes, user?.id]);

  // Default avatar if not provided
  const avatarSrc = post.user?.profilePic || "/default-avatar.png";

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));

    try {
      await likePost(share ? post?.originalPost._id : post?._id);
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);

    try {
      await bookMarkPost(post._id);
    } catch (error) {
      console.log("Error bookmarking post:", error);
    }
  };

  const toggleMessageModal = () => {
    openReplyModal();
    setSinglePost(post);
    // Implement message modal logic here
  };

  const interactions = [
    {
      Icon: Heart,
      count: likes || 0,
      onClick: toggleLike,
      isActive: isLiked,
      fill: "#e0245e",
      hoverColor: "#e0245e",
      activeColor: "#e0245e",
    },
    {
      Icon: MessageCircle,
      count: comments || 0,
      hoverColor: "#1da1f2",
      onClick: toggleMessageModal,
    },
    {
      Icon: Share2,
      count: shares || 0,
      hoverColor: "#17bf63",
      tag: "share",
    },
    {
      Icon: Bookmark,
      onClick: toggleBookmark,
      isActive: isBookmarked,
      hoverColor: "#1da1f2",
      fill: "#1da1f2",
      activeColor: "#1da1f2",
    },
  ];

  return (
    <Container full={full}>
      <ReuseableModal isOpen={isReplyModalOpen} closeModal={closeReplyModal}>
        <ReplyModal post={post} />
      </ReuseableModal>
      <PostWrapper $isDarkMode={isDarkMode}>
        <AvatarContainer>
          <Avatar
            src={avatarSrc}
            alt={`${post.user?.name || "User"}'s profile`}
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
        </AvatarContainer>
        <PostContent>
          <PostHeader>
            <UserInfo>
              <AuthorName $isDarkMode={isDarkMode}>
                {post.user?.name}
              </AuthorName>
              <Username $isDarkMode={isDarkMode}>
                @{post.user?.username}
              </Username>
              <span>•</span>
              <Timestamp $isDarkMode={isDarkMode}>
                {formatDate(post.createdAt)}
              </Timestamp>
            </UserInfo>
            <MoreOptionsButton $isDarkMode={isDarkMode}>
              <MdMoreHoriz />
            </MoreOptionsButton>
          </PostHeader>
          <PostText $isDarkMode={isDarkMode}>{post.content}</PostText>
          {post?.imageUrl && (
            <ImageContainer>
              <img src={post?.imageUrl} alt="Selected" />
            </ImageContainer>
          )}
          <Interaction interactions={interactions} $isDarkMode={isDarkMode} />
        </PostContent>
      </PostWrapper>
    </Container>
  );
};

export default NormalPost;
