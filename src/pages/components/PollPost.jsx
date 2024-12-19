import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";
import { IoTimeOutline, IoCheckmarkCircle } from "react-icons/io5";
import { Circle } from "lucide-react";
import { votePoll } from "../../api/request";
import { HiCheck } from "react-icons/hi2";

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: ${(props) => props.theme.inputBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 20px;
`;

const Question = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textPrimary};
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
  padding: 12px;
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
  margin-top: 15px;
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
  font-weight: 600;
  font-size: 0.95rem;
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
  border-radius: 3px;
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

const PollPost = ({ post }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(post.pollId.hasVoted);
  const [isVoting, setIsVoting] = useState(false);
  const [pollData, setPollData] = useState(post.pollId);
  const [showTransition, setShowTransition] = useState(false);

  // Calculate days left
  const endTime = new Date(pollData.endTime);
  const currentTime = new Date();
  const daysLeft = Math.ceil((endTime - currentTime) / (1000 * 60 * 60 * 24));

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
    <PostWrapper theme={theme}>
      <Question theme={theme}>{pollData.question}</Question>

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
                      <img src={voter.profilePic} alt={`voter ${idx + 1}`} />
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
    </PostWrapper>
  );
};

export default PollPost;
