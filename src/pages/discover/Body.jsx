import React from "react";
import styled from "styled-components";
import settings from "./components/settings.png";
import logistics from "./components/logistics.jpg";
import real_estate from "./components/real_estate.jpg";
import love_birds from "./components/love_birds.jpg";
import useThemeStore from "../../store/useThemeStore";

const Container = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#1E1E1E" : "#FFFFFF")};
  color: ${(props) => (props.isDarkMode ? "#E0E0E0" : "#14171A")};

  @media screen and (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 500;
  white-space: inherit;
  word-wrap: break-word;
  color: ${(props) => (props.isDarkMode ? "#E0E0E0" : "#14171A")};
`;

const SubTitle = styled.div`
  font-size: 12px;
  opacity: 0.7;
  text-transform: uppercase;
  color: ${(props) => (props.isDarkMode ? "#A0A0A0" : "#6B7280")};
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  cursor: pointer;
  gap: 20px;

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 5px;
    color: ${(props) => (props.isDarkMode ? "#E0E0E0" : "#14171A")};
  }

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? "#2C2C2C" : "#EDEDED")};
  }

  &:first-child {
    margin-top: 15px;
  }

  @media screen and (max-width: 768px) {
    gap: 13px;
  }
`;

const MiniImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #dbd7d7;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserStack = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #c2c2c2;
  border: 2px solid white;
  margin-left: -10px;
  transition: transform 0.2s ease;

  &:first-child {
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MetadataContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.isDarkMode ? "#A0A0A0" : "#6B7280")};
  font-size: 13px;
  @media screen and (max-width: 768px) {
    gap: 3px;
    margin-top: 3px;
  }
`;

const MetadataDot = styled.span`
  width: 2px;
  height: 2px;
  background-color: ${(props) => (props.isDarkMode ? "#A0A0A0" : "#6B7280")};
  border-radius: 50%;
`;

const ImageDetails = styled.div`
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const users = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
];

const recommendations = [
  {
    title:
      "Logistics Manager: Your One-Stop AI Solution for Seamless Logistics Management",
    time: "2 hours ago",
    type: "Logistics",
    posts: 90000,
    img: logistics,
  },
  {
    title:
      "Application Logger: Track, Monitor, and Debug Your Applications with Ease",
    time: "5 hours ago",
    type: "Development Tools",
    posts: 1500,
    img: settings,
  },
  {
    title:
      "House Haven: Simplifying Real Estate Management and Finding Your Dream Home",
    time: "1 day ago",
    type: "Real Estate",
    posts: 2000,
    img: real_estate,
  },
  {
    title:
      "Lovebirdz: A Revolutionary Dating Platform to Find Love and Meaningful Connections",
    time: "3 days ago",
    type: "Social Media",
    posts: 25000,
    img: love_birds,
  },
];

const Body = () => {
  const visibleUsers = users.slice(0, 4);
  const { isDarkMode } = useThemeStore();

  return (
    <Container isDarkMode={isDarkMode}>
      <div className="pl-4 pt-4 pb-2">
        <Title isDarkMode={isDarkMode}>Recommended</Title>
        <SubTitle isDarkMode={isDarkMode}>based on your interest</SubTitle>
      </div>
      {recommendations.map((rec, index) => (
        <Inner key={index} isDarkMode={isDarkMode}>
          <MiniImage>
            <img src={rec.img} alt={rec.title} />
          </MiniImage>
          <div style={{ flex: 1 }}>
            <div className="title">{rec.title}</div>

            <ImageDetails className="flex">
              <UserStack>
                {visibleUsers.map((user, userIndex) => (
                  <UserImage key={userIndex}>
                    <img src={user} alt={`User ${userIndex + 1}`} />
                  </UserImage>
                ))}
              </UserStack>
              <MetadataContainer isDarkMode={isDarkMode}>
                {rec.time}
                <MetadataDot isDarkMode={isDarkMode} />
                {rec.type}
                <MetadataDot isDarkMode={isDarkMode} />
                {rec.posts.toLocaleString()} posts
              </MetadataContainer>
            </ImageDetails>
          </div>
        </Inner>
      ))}
    </Container>
  );
};

export default Body;
