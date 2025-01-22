import React, { useEffect, useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import Story from "./components/Story";
import AllPosts from "./dashboard/AllPosts";
import PostContainer from "./PostContainer";
import styled from "styled-components";
import usePostStore from "./store/usePostStore";
import { getFeeds, getSuggestedUsers } from "../api/request";
import useThemeStore from "../store/useThemeStore";
import Widget from "./discover/components/Widget";

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

const Height = styled.div`
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const A = styled.div`
  flex: 1.5;
`;

const B = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
`;

const Double = styled.div`
  width: 100%;
`;

const Dashboard = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { setAllPosts, allPosts } = usePostStore();

  const { isDarkMode } = useThemeStore();

  // Add resize event listener

  useEffect(() => {
    // Detect mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView(); // Initial check
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView); // Cleanup
    };
  }, []);

  const fetchPosts = async (pageNum) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await getFeeds(pageNum);

      // Ensure posts is an array and contains valid items
      const validPosts = response.posts.filter(
        (post) => post && typeof post === "object"
      );

      // If no more posts, stop fetching
      if (validPosts.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      // For first page, replace posts. For subsequent pages, append
      setAllPosts(pageNum === 1 ? validPosts : [...allPosts, ...validPosts]);

      setPage(pageNum + 1);
    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []); // Empty dependency array to run only once on mount

  // Intersection Observer setup
  // useEffect(() => {
  //   // Only set up observer if we have posts
  //   if (allPosts.length === 0) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore && !isLoading) {
  //         fetchPosts(page);
  //       }
  //     },
  //     {
  //       threshold: 0.1, // Triggered when 10% of the target is visible
  //       rootMargin: "20px", // Start loading a bit before reaching the end
  //     }
  //   );

  //   // Observe the last post
  //   if (lastPostRef.current) {
  //     observer.observe(lastPostRef.current);
  //   }

  //   // Cleanup
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [allPosts, hasMore, isLoading, page]);

  const [suggestedUsers, setSuggestedUsers] = useState([]);

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
    <MainContainer>
      {/* <Header> */}
      <Double className="flex w-100">
        <A>
          <Height className="w-100">
            <Story show={!isMobileView} />
            <PostContainer />
            <AllPosts />
          </Height>
        </A>
        <B>
          <Widget />
        </B>
      </Double>
      {/* <div className="flex w-100"> */}
      {/* <Height className="w-100">
            <Story show={!isMobileView} />
            <PostContainer />
            <AllPosts />
          </Height> */}
      {/* <div>
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

            </WidgetSection>
          </div> */}
      {/* </div> */}
      {/*
       */}
      {/* </Header> */}
    </MainContainer>
  );
};

export default Dashboard;
