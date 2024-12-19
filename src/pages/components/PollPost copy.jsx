import React from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";
import { IoTimeOutline } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import { votePoll } from "../../api/request";

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

const Option = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid ${(props) => props.theme.borderColor}; */
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

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${(props) =>
    props.$isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
  transition: width 0.3s ease;
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
  gap: 8px;
  margin-bottom: 4px;
`;

const VoteCount = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 4px;
`;

const CheckMark = styled.div`
  color: #28a69e;
  display: flex;
  align-items: center;
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

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
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

const getRandomColor = () => {
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
  return colors[Math.floor(Math.random() * colors.length)];
};

const PollPost = ({ post }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const endTime = new Date(post.pollId.endTime);
  const currentTime = new Date();
  const daysLeft = Math.ceil((endTime - currentTime) / (1000 * 60 * 60 * 24));

  const userVotePoll = async (id) => {
    const data = {
      pollId: post.pollId._id,
      optionId: id,
    };
    try {
      const response = await votePoll(data);
      console.log(response);
    } catch (error) {
      console.log("Error voting in poll:", error);
    }
  };

  return (
    <PostWrapper theme={theme}>
      <Question theme={theme}>{post.pollId.question}</Question>

      <OptionContainer>
        {post.pollId.options.map((option) => (
          <Option
            key={option._id}
            $isDarkMode={isDarkMode}
            theme={theme}
            onClick={() => userVotePoll(option._id)}
          >
            <OptionContent>
              <PercentageSection theme={theme}>
                {parseFloat(option.votePercentage).toFixed(0)}%
              </PercentageSection>
              <TextSection>
                <OptionText theme={theme}>
                  {option.optionText}
                  {option.hasVoted && (
                    <CheckMark>
                      <HiCheck size={18} />
                    </CheckMark>
                  )}
                </OptionText>
                <ProgressBarContainer $isDarkMode={isDarkMode}>
                  <ProgressBar
                    percentage={parseFloat(option.votePercentage)}
                    color={getRandomColor()}
                  />
                </ProgressBarContainer>
              </TextSection>
            </OptionContent>
          </Option>
        ))}
      </OptionContainer>

      <PollFooter theme={theme}>
        <div className="flex align-center gap-xs">
          {!post.pollId.totalVotes || post.pollId.totalVotes.count === 0 ? (
            <span>No votes yet</span>
          ) : (
            <div className="flex align-center">
              <VoterAvatars>
                {post.pollId.totalVotes.voters.map((voter, idx) => (
                  <Avatar key={idx}>
                    <img src={voter.profilePic} alt={voter.name} />
                  </Avatar>
                ))}
              </VoterAvatars>
              <div className="ml-1">
                <span>
                  {post.pollId.totalVotes.count} Total{" "}
                  {post.pollId.totalVotes.count === 1 ? "Vote" : "Votes"}
                </span>
              </div>
            </div>
          )}
        </div>

        {daysLeft > 0 && !post.pollId.hasEnded && (
          <div className="flex align-center gap-xs align-end">
            <IoTimeOutline />
            <div className="ml-1">
              <span>
                {daysLeft} {daysLeft === 1 ? "Day" : "Days"} Left
              </span>
            </div>
          </div>
        )}
        {post.pollId.hasEnded && (
          <div className="flex align-center gap-xs align-end">
            <span>Poll ended</span>
          </div>
        )}
      </PollFooter>
    </PostWrapper>
  );
};

export default PollPost;
