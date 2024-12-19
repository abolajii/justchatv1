import React, { useEffect, useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import Story from "./components/Story";
import AllPosts from "./dashboard/AllPosts";
import PostContainer from "./PostContainer";
import styled from "styled-components";
import usePostStore from "./store/usePostStore";
import { getFeeds } from "../api/request";

const Height = styled.div`
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const Dashboard = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { setAllPosts, allPosts } = usePostStore();

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

  return (
    <MainContainer>
      <Header>
        <Height>
          <Story show={!isMobileView} />
          <PostContainer />
          <AllPosts />
        </Height>

        {/*
         */}
      </Header>
    </MainContainer>
  );
};

export default Dashboard;
