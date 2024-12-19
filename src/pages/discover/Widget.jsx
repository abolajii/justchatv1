import React from "react";
import styled from "styled-components";
import { FaFire } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import useThemeStore from "../../store/useThemeStore";
import abolaji from "./components/abolaji.jpeg";

const Container = styled.div`
  padding: 20px;

  .item {
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${({ isDarkMode }) =>
        isDarkMode ? "#555" : "#f0f0f0"};
    }
  }

  .widget {
    background: ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ffffff")};
    border-radius: 15px;
    overflow: hidden;
  }

  .header {
    background-color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#f7f7f8")};
    border-radius: 0 0 15px 15px;
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 6px;
    padding-right: 10px;
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 13px;
    margin-left: 4px;
    text-transform: capitalize;
    color: ${({ isDarkMode }) => (isDarkMode ? "#ccc" : "#79828d")};
  }

  .top {
    padding: 10px 20px 0;
  }
`;

const Label = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#f5a623" : "#ec5d3d")};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 5px;
  svg {
    margin-right: 2px;
  }
`;

const Image = styled.div`
  width: 79px;
  height: 79px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#555" : "#cdd6d3")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#aaa" : "#79828d")};
  text-transform: uppercase;
  font-size: 12px;
`;

const SubTitle = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#303e4e")};
  font-size: 14px;
  font-weight: 500;
`;

const Details = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#ddd" : "#79828d")};
  font-size: 13px;
  width: 345px;
`;

const SmallImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 8px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#555" : "#cdd6d3")};
`;

const SmallTtle = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#303e4e")};
  font-size: 14px;
`;

const Tag = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#bbb" : "#7a838e")};
  font-size: 13px;
`;
const articles = [
  {
    id: 1,
    title: "Revolutionizing AI in Web Development",
    tag: "Technology",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Future of Machine Learning Frameworks",
    tag: "Software Engineering",
    image: "https://randomuser.me/api/portraits/lego/2.jpg",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Sustainable Tech Innovations",
    tag: "Green Technology",
    image: "https://randomuser.me/api/portraits/lego/3.jpg",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "Cybersecurity Trends in 2024",
    tag: "Security",
    image: "https://randomuser.me/api/portraits/lego/4.jpg",
    time: "3 days ago",
  },
  {
    id: 5,
    title: "Cloud Computing Breakthroughs",
    tag: "Cloud Technology",
    image: "https://randomuser.me/api/portraits/lego/5.jpg",
    time: "1 week ago",
  },
];

export const renderLarge = (isDarkMode) => {
  console.log({ isDarkMode });
  return (
    <Container isDarkMode={isDarkMode}>
      <div className="widget">
        <div className="header">
          <div>
            <Label isDarkMode={isDarkMode} className="flex align-center">
              <div>
                <FaFire size={16} />
              </div>
              Trending right now
            </Label>
          </div>
          <div className="flex mb-4">
            <div>
              <Image isDarkMode={isDarkMode}>
                <img src={abolaji} alt="Image" />
              </Image>
            </div>
            <div>
              <Title isDarkMode={isDarkMode}>Abolaji Ade-Ajayi</Title>
              <SubTitle isDarkMode={isDarkMode}>Full Stack Developer</SubTitle>
              <Details isDarkMode={isDarkMode}>
                Abolaji is a full stack developer with six years of experience
                with programming
              </Details>
            </div>
          </div>
        </div>
        <div className="article">
          <div className="flex align-center mb-3 top">
            <IoNewspaperSharp size={13} color="#79828d" />
            <div className="subtitle">new article</div>
          </div>

          {articles.map((article) => (
            <div key={article.id} className="flex mb-3 item">
              <SmallImage isDarkMode={isDarkMode}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </SmallImage>
              <div>
                <SmallTtle isDarkMode={isDarkMode}>{article.title}</SmallTtle>
                <Tag isDarkMode={isDarkMode}>{article.tag}</Tag>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

const Widget = () => {
  const { isDarkMode } = useThemeStore();
  return <div>{renderLarge(isDarkMode)}</div>;
};

export default Widget;
