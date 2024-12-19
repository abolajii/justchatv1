import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "../../../components";
import { getSuggestedUsers } from "../../../api/request";
import useThemeStore from "../../../store/useThemeStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  background-color: ${(props) => (props.isDarkMode ? "#1e1e1e" : "#f9f9f9")};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#333333")};
`;

const WidgetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.isDarkMode ? "rgba(85, 85, 85, 0.3)" : "white"};
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  font-size: 16px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#333333")};
`;

const TrendingWordItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#747474" : "#f4f4f4")};
  cursor: pointer;

  .word {
    font-size: 12px;
    color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
  }
`;

const WordInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 12px;
    color: ${(props) => (props.isDarkMode ? "#ffffff" : "#999999")};
  }
`;

const Tag = styled.span`
  background-color: ${(props) => (props.isDarkMode ? "#005c46" : "#e6fff9")};
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#059054")};
  padding: 2px;
  border-radius: 4px;
  font-size: 10px;
  width: fit-content;
`;

const UserCard = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.isDarkMode ? "#3a3a3a" : "transparent"};
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 15px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#333333")};
`;

const UserBio = styled.p`
  margin: 5px 0;
  font-size: 13px;
  color: ${(props) => (props.isDarkMode ? "#cccccc" : "#666666")};
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #6bc1b7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5aa69d;
  }

  &:active {
    background-color: #003f7f;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ViewMoreButton = styled(Button)`
  width: 100%;
  background-color: transparent;
  color: #6bc1b7;
  border: 1px solid #6bc1b7;

  &:hover {
    text-decoration: underline;
    background-color: rgba(107, 193, 183, 0.1);
  }
`;

const Count = styled.div`
  font-size: 13px;
  color: ${(props) => (props.isDarkMode ? "#cccccc" : "#666666")};
`;

const trendingWords = [
  { word: "Artificial Intelligence", count: 1000, tag: "Technology" },
  { word: "Blockchain", count: 800, tag: "Technology" },
  { word: "AI Ethics", count: 700, tag: "Science/Tech" },
  { word: "Quantum Computing", count: 600, tag: "Science/Tech" },
  { word: "AI Safety", count: 500, tag: "Science/Tech" },
  { word: "AI in Healthcare", count: 400, tag: "Science/Tech" },
];

const Widget = () => {
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const [showMoreUsers, setShowMoreUsers] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { isDarkMode } = useThemeStore();

  const displayedTrendingWords = showMoreTrending
    ? trendingWords
    : trendingWords.slice(0, 5);

  const displayedUsers = showMoreUsers
    ? suggestedUsers
    : suggestedUsers.slice(0, 5);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestions = await getSuggestedUsers();
        setSuggestedUsers(suggestions.data.suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <Container isDarkMode={isDarkMode}>
      <WidgetSection isDarkMode={isDarkMode}>
        <Search />
        <Title isDarkMode={isDarkMode}>Trending Words</Title>
        {displayedTrendingWords.map((item, index) => (
          <TrendingWordItem key={index} isDarkMode={isDarkMode}>
            <Tag isDarkMode={isDarkMode}>{item.tag}</Tag>
            <div className="word">{item.word}</div>
            <WordInfo isDarkMode={isDarkMode}>
              <span>{item.count} posts</span>
            </WordInfo>
          </TrendingWordItem>
        ))}
        {trendingWords.length > 5 && (
          <ViewMoreButton
            onClick={() => setShowMoreTrending(!showMoreTrending)}
          >
            View More
          </ViewMoreButton>
        )}
      </WidgetSection>

      <WidgetSection isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>Relevant Connects</Title>
        {suggestedUsers.map((user, index) => (
          <UserCard key={index} isDarkMode={isDarkMode}>
            <ProfilePic src={user.profilePic} alt={user.name} />
            <UserInfo className="flex justify-between">
              <div>
                <UserName isDarkMode={isDarkMode}>{user.name}</UserName>
                <Count isDarkMode={isDarkMode}>
                  {user.postCount === 0
                    ? "No post yet"
                    : `${user.postCount} posts`}
                </Count>
                <UserBio isDarkMode={isDarkMode}>{user.bio}</UserBio>
              </div>
              <div>
                <Button>Connect</Button>
              </div>
            </UserInfo>
          </UserCard>
        ))}
        {suggestedUsers.length > 5 && (
          <ViewMoreButton onClick={() => setShowMoreUsers(!showMoreUsers)}>
            {showMoreUsers ? "Show Less" : "View More"}
          </ViewMoreButton>
        )}
      </WidgetSection>
    </Container>
  );
};

export default Widget;
