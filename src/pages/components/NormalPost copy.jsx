import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore from "../../store/useThemeStore";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { MdMoreHoriz } from "react-icons/md";

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

// Styled Components
const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 16px;
`;

const PostWrapper = styled.div`
  display: flex;
  padding: 15px;
  background-color: ${(props) => (props.$isDarkMode ? "#1e1e1e" : "#ffffff")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#484848" : "#e1e4e8")};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

const InteractionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InteractionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.$isDarkMode
      ? props.$isActive
        ? props.$activeColor
        : "#888888"
      : props.$isActive
      ? props.$activeColor
      : "#657786"};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.$hoverColor};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};

  &:hover {
    color: #1da1f2;
  }
`;

const NormalPost = ({ post }) => {
  const { isDarkMode } = useThemeStore();
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Default avatar if not provided
  const avatarSrc = post.user?.profilePic || "/default-avatar.png";

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const interactions = [
    {
      Icon: Heart,
      count: likes,
      onClick: toggleLike,
      isActive: isLiked,
      hoverColor: "#e0245e",
      activeColor: "#e0245e",
    },
    {
      Icon: MessageCircle,
      count: post.comments || 0,
      hoverColor: "#1da1f2",
    },
    {
      Icon: Share2,
      count: post.shares || 0,
      hoverColor: "#17bf63",
    },
    {
      Icon: Bookmark,
      onClick: toggleBookmark,
      isActive: isBookmarked,
      hoverColor: "#1da1f2",
      activeColor: "#1da1f2",
    },
  ];

  return (
    <Container>
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

          <InteractionContainer>
            {interactions.map((interaction, index) => (
              <InteractionButton
                key={index}
                $isDarkMode={isDarkMode}
                $isActive={interaction.isActive}
                $hoverColor={interaction.hoverColor}
                $activeColor={interaction.activeColor}
                onClick={interaction.onClick}
              >
                <interaction.Icon size={20} />
                <span>{interaction.count}</span>
              </InteractionButton>
            ))}
          </InteractionContainer>
        </PostContent>
      </PostWrapper>
    </Container>
  );
};

export default NormalPost;
