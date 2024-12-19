import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";
import { IoTimeOutline, IoCheckmarkCircle } from "react-icons/io5";
import {
  Bookmark,
  Circle,
  Heart,
  MessageCircle,
  Share2Icon,
} from "lucide-react";
import {
  bookMarkPost,
  deletePost,
  likePost,
  votePoll,
} from "../../api/request";
import { HiCheck, HiCheckBadge } from "react-icons/hi2";
import { formatDate } from "../../utils";
import { MdMoreHoriz } from "react-icons/md";
import { Interaction } from "../../components";
import useUserStore from "../../store/useUserStore";
import AnimateModal from "../../components/AnimateModal";
import ModalChildren from "../bookmark/components/ModalChildren";
import Delete from "./Delete";
import DropdownWithIcons from "../../components/Dropdown";
import { useAlert } from "../../context/AlertContext";

const PostWrapper = styled.div`
  display: flex;
  padding: 15px;
  background-color: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 20px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UnvotedOption = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      props.$isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 6px;
  padding: 10px;
  position: relative;
  &:hover {
    background-color: ${(props) =>
      props.$isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"};
  }
`;

const IconContainer = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textSecondary};
`;

const VoteCount = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  z-index: 1;
`;

const PollFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
`;

const VoterAvatars = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarStack = styled.div`
  display: flex;
  margin-right: 10px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.inputBackground};
  background-color: #ccc;
  margin-left: -10px;
  overflow: hidden;
  &:first-child {
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OptionContent = styled.div`
  display: flex;
  width: 100%;
`;

const PercentageSection = styled.div`
  width: 60px;
  font-size: 0.8rem;

  color: ${(props) => props.theme.textPrimary};
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const OptionText = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: ${(props) => (props.$hasMargin ? "4px" : "0")};
`;

const CheckMark = styled.div`
  color: #28a69e;
  display: flex;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  /* background-color: ${(props) =>
    props.$isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}; */
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
  transition: width 0.3s ease;
  border-radius: 6px;
`;

// Cache colors for options to maintain consistency
const colorCache = {};

const getRandomColor = (optionId) => {
  if (colorCache[optionId]) {
    return colorCache[optionId];
  }

  const colors = [
    "#FF9999",
    "#99FF99",
    "#9999FF",
    "#FFB366",
    "#FF99CC",
    "#99FFCC",
    "#CC99FF",
    "#FFE666",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  colorCache[optionId] = color;
  return color;
};

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
`;

const BigAvatar = styled.img`
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
  margin-bottom: 2px;
  color: ${(props) => props.theme.textPrimary};
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

const dropdownAnimation = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 80%;
  right: 0;
  background: ${({ $isDarkMode }) => ($isDarkMode ? "#333" : "#fff")};
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? "#444" : "#ddd")};
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${dropdownAnimation} 0.3s ease-out;
  transform-origin: top center;
  overflow: hidden;
  width: 130px;
  z-index: 100;
  & > div {
    padding: 8px 16px;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#fff" : "#000")};
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;

    &:hover {
      background: ${({ $isDarkMode }) => ($isDarkMode ? "#444" : "#f0f0f0")};
    }
  }
`;

const PollPost = ({ post, share, bookmarks }) => {
  const { user } = useUserStore();

  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(post.pollId.hasVoted);
  const [isVoting, setIsVoting] = useState(false);
  const [pollData, setPollData] = useState(post.pollId);
  const [showTransition, setShowTransition] = useState(false);

  const [likes, setLikes] = useState(
    post?.engagementCounts?.likes || post?.likes?.length || 0
  );
  const [comments, setComments] = useState(
    post?.engagementCounts?.comments || post?.comments?.length || 0
  );
  const [shares, setShares] = useState(
    post?.engagementCounts?.shares || post?.shares?.length || 0
  );

  const [index, setIndex] = useState(0);
  // const [comments, setComments] = useState(post.comments.length || 0);
  // const [shares, setShares] = useState(post.shares.length || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks ? true : post.isBookmarked
  );
  const { showAlert } = useAlert();

  const avatarSrc = post.user?.profilePic;
  // Calculate days left
  const endTime = new Date(pollData.endTime);
  const currentTime = new Date();
  const daysLeft = Math.ceil((endTime - currentTime) / (1000 * 60 * 60 * 24));
  const [moveModal, setMoveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [isDropdownVisible, seIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    seIsDropdownVisible(!isDropdownVisible);
  };

  const calculateNewPercentages = (votedOptionId) => {
    const totalVotes = pollData.totalVotes.count + 1;
    return pollData.options.map((option) => ({
      ...option,
      votePercentage:
        option._id === votedOptionId
          ? ((option.votes + 1) / totalVotes) * 100
          : (option.votes / totalVotes) * 100,
      hasVoted: option._id === votedOptionId,
      votes: option._id === votedOptionId ? option.votes + 1 : option.votes,
    }));
  };

  useEffect(() => {
    if (post?.likes?.includes(user?.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [post?.likes, user?.id]);

  const toggleMessageModal = () => {
    //   openReplyModal();
    //   setSinglePost(post);
    // Implement message modal logic here
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
    } catch (error) {
      console.log("Error bookmarking post:", error);
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
      Icon: Share2Icon,
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

  const handleVote = async (optionId) => {
    setIsVoting(true);
    setSelectedOption(optionId);
    setShowTransition(true);

    try {
      const data = {
        pollId: pollData._id,
        optionId: optionId,
      };

      const response = await votePoll(data);
      setHasVoted(response.poll.hasVoted);
      setSelectedOption(null);

      console.log(response.poll);
      setPollData(response.poll);

      // Add small delay for smooth transition
      setTimeout(() => {
        setShowTransition(false);
      }, 300);
    } catch (error) {
      console.log("Error voting in poll:", error);
      setSelectedOption(null);
      // Revert optimistic update on error
      setPollData(post.pollId);
    } finally {
      setIsVoting(false);
    }
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

  const VotingOption = ({ option }) => (
    <UnvotedOption
      key={option._id}
      $isDarkMode={isDarkMode}
      theme={theme}
      onClick={() => handleVote(option._id)}
      style={{
        opacity: isVoting ? 0.7 : 1,
        cursor: isVoting ? "default" : "pointer",
        transform:
          showTransition && selectedOption === option._id
            ? "scale(1.005)"
            : "scale(1)",
        transition: "all 0.3s ease",
      }}
    >
      <IconContainer theme={theme}>
        {selectedOption === option._id ? (
          <IoCheckmarkCircle size={20} color={theme.primary} />
        ) : (
          <Circle size={20} />
        )}
      </IconContainer>
      <OptionText $hasMargin={false}>{option.optionText}</OptionText>
    </UnvotedOption>
  );

  const VotedOption = ({ option }) => (
    <Option
      key={option._id}
      $isDarkMode={isDarkMode}
      theme={theme}
      onClick={() => handleVote(option._id)}
    >
      <OptionContent>
        <PercentageSection theme={theme}>
          {parseFloat(option.votePercentage).toFixed(0)}%
        </PercentageSection>
        <TextSection>
          <OptionText theme={theme} $hasMargin={true}>
            {option.optionText}
            {option.hasVoted && (
              <CheckMark>
                <IoCheckmarkCircle size={18} />
              </CheckMark>
            )}
          </OptionText>
          <ProgressBarContainer $isDarkMode={isDarkMode}>
            <ProgressBar
              percentage={parseFloat(option.votePercentage)}
              color={getRandomColor(option._id)}
            />
          </ProgressBarContainer>
        </TextSection>
      </OptionContent>
    </Option>
  );

  return (
    <div>
      <PostWrapper theme={theme}>
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
        <AvatarContainer>
          <BigAvatar
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
              <MdMoreHoriz />
              <DropdownWithIcons
                index={index}
                post={post}
                setIsDropdownVisible={seIsDropdownVisible}
                isDarkMode={isDarkMode}
                isDropdownVisible={isDropdownVisible}
                onDelete={() => setDeleteModal(true)}
                setMoveModal={setMoveModal}
              />
            </MoreOptionsButton>
          </PostHeader>
          <PostText theme={theme}>{pollData.question}</PostText>

          <OptionContainer>
            {!hasVoted
              ? pollData.options.map((option) => (
                  <VotingOption key={option._id} option={option} />
                ))
              : pollData.options.map((option) => (
                  <VotedOption key={option._id} option={option} />
                ))}
          </OptionContainer>

          <PollFooter theme={theme}>
            <div className="flex align-center gap-xs">
              {pollData.totalVotes === 0 ? (
                <span className=""> </span>
              ) : (
                <div className="flex align-center">
                  <VoterAvatars>
                    <AvatarStack>
                      {pollData.totalVotes.voters?.map((voter, idx) => (
                        <Avatar key={idx} theme={theme}>
                          <img
                            src={voter.profilePic}
                            alt={`voter ${idx + 1}`}
                          />
                        </Avatar>
                      ))}
                    </AvatarStack>
                  </VoterAvatars>
                  <div className="ml-1">
                    <span>{pollData.totalVotes.count} Total Votes</span>
                  </div>
                </div>
              )}
            </div>

            {daysLeft > 0 && (
              <TimeContainer>
                <IoTimeOutline />
                <span>{daysLeft} Days Left</span>
              </TimeContainer>
            )}
          </PollFooter>
          <Interaction interactions={interactions} $isDarkMode={isDarkMode} />
        </PostContent>
      </PostWrapper>
    </div>
  );
};

export default PollPost;
