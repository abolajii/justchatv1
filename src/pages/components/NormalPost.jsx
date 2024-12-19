import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useThemeStore from "../../store/useThemeStore";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { MdMoreHoriz } from "react-icons/md";
import { bookMarkPost, deletePost, likePost } from "../../api/request";
import useUserStore from "../../store/useUserStore";
import { Interaction, ReuseableModal } from "../../components";
import useModalStore from "../store/useModalStore";
import ReplyPost from "../../components/ReplyPost";
import ReplyModal from "./ReplyModal";
import usePostStore from "../store/usePostStore";
import ModalChildren from "../bookmark/components/ModalChildren";
import AnimateModal from "../../components/AnimateModal";
import DropdownWithIcons from "../../components/Dropdown";
import Delete from "./Delete";
import { HiCheckBadge } from "react-icons/hi2";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";

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
  /* max-width: ${(props) => (props.full ? "auto" : "600px")}; */
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;

  cursor: pointer;
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
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AuthorName = styled.span`
  font-weight: 600;
  display: flex;
  align-items: center;
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
  margin-top: -4px;
  margin-bottom: 4px;
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.$isDarkMode ? "#888888" : "#657786")};

  cursor: pointer;
  font-size: 1.5rem;
  position: relative;

  &:hover {
    color: ${(props) => (props.$isDarkMode ? "#727272" : "#596e80")};
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

const NormalPost = ({ post, share, full, bookmarks }) => {
  const { user } = useUserStore();

  const { isDarkMode } = useThemeStore();
  const { setSelectedUser, setSinglePost } = usePostStore();
  const [index, setIndex] = useState(0);
  const { showAlert } = useAlert();

  const navigate = useNavigate();

  const [likes, setLikes] = useState(
    post?.engagementCounts?.likes || post?.likes?.length || 0
  );
  const [comments, setComments] = useState(
    post?.engagementCounts?.comments || post?.comments?.length || 0
  );
  const [shares, setShares] = useState(
    post?.engagementCounts?.shares || post?.shares?.length || 0
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks ? true : post.isBookmarked
  );

  const { isReplyModalOpen, closeReplyModal, openReplyModal } = useModalStore();

  const [moveModal, setMoveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (post?.likes?.includes(user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post?.likes, user?.id]);

  // Default avatar if not provided
  const avatarSrc = post.user?.profilePic;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

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
      showAlert(
        "success",
        isBookmarked ? "Removed from bookmark." : "Added to bookmark."
      );
    } catch (error) {
      console.log("Error bookmarking post:", error);
    }
  };

  const toggleMessageModal = () => {
    openReplyModal();
    setSinglePost(post);
    // Implement message modal logic here
  };

  const deletePostById = async () => {
    try {
      const response = await deletePost(post._id);
      console.log(response);
      setDeleteModal(false);
      showAlert("success", "Post deleted successfully.");

      // Update bookmarks state if post was bookmarked
      // if (isBookmarked) {
      //   setIsBookmarked(false);
      // }
      // Navigate back to feed
      // navigate("/feed");
    } catch (error) {
      console.log("Error deleting post:", error);
    }
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
    <Container full={full} onClick={() => {}}>
      <AnimateModal
        title={"Select Folder"}
        isOpen={moveModal}
        closeModal={() => setMoveModal(false)}
        body={
          <ModalChildren post={post} closeModal={() => setMoveModal(false)} />
        }
      />

      <AnimateModal
        title={"Delete Post"}
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        body={
          <Delete
            post={post}
            closeModal={() => setDeleteModal(false)}
            onCancel={() => setDeleteModal(false)}
            onDeleteConfirm={deletePostById}
          />
        }
      />
      {/* <ReuseableModal isOpen={isReplyModalOpen} closeModal={closeReplyModal}>
        <ReplyModal post={post} />
      </ReuseableModal> */}
      <PostWrapper $isDarkMode={isDarkMode}>
        <AvatarContainer
          onClick={() => {
            setSelectedUser(post.user);
            navigate(`/profile/${post.user.username}`);
          }}
        >
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
                {post.user?.isVerified && (
                  <div className="center">
                    <HiCheckBadge color="#1b9d87" />
                  </div>
                )}
              </AuthorName>
              <Username $isDarkMode={isDarkMode}>
                @{post.user?.username}
              </Username>
              <span>•</span>
              <Timestamp $isDarkMode={isDarkMode}>
                {formatDate(post.createdAt)}
              </Timestamp>
            </UserInfo>
            <MoreOptionsButton
              $isDarkMode={isDarkMode}
              onClick={() => {
                setIndex(post._id);
                toggleDropdown();
              }}
            >
              <MdMoreHoriz size={24} />
              <DropdownWithIcons
                index={index}
                post={post}
                isDarkMode={isDarkMode}
                isDropdownVisible={isDropdownVisible}
                onDelete={() => setDeleteModal(true)}
                setMoveModal={setMoveModal}
                setIsDropdownVisible={setIsDropdownVisible}
              />
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
