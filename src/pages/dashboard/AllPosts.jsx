import React, { useEffect, useRef, useState } from "react";
import { getFeeds } from "../../api/request";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";
import Post from "../components/Post";
import { Loader2 } from "lucide-react";
import useThemeStore from "../../store/useThemeStore";

const Container = styled.div`
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  padding-top: 30px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .animate-spin {
    animation: spin 0.5s linear infinite;
    transform: rotate(0deg);
    color: #ccc;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Text = styled.div`
  color: ${(props) => (props.isDarkMode ? "#a2a2a2" : "#555")};
`;

const AllPosts = ({ posts, full, bookmarks }) => {
  const { allPosts } = usePostStore();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const observerRef = useRef(null);
  const lastPostRef = useRef(null);

  const { isDarkMode } = useThemeStore();

  // const fetchPosts = async (pageNum) => {
  //   if (isLoading || !hasMore) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await getFeeds(pageNum);

  //     // Ensure posts is an array and contains valid items
  //     const validPosts = response.posts.filter(
  //       (post) => post && typeof post === "object"
  //     );

  //     // If no more posts, stop fetching
  //     if (validPosts.length === 0) {
  //       setHasMore(false);
  //       setIsLoading(false);
  //       return;
  //     }

  //     // For first page, replace posts. For subsequent pages, append
  //     setAllPosts(pageNum === 1 ? validPosts : [...allPosts, ...validPosts]);

  //     setPage(pageNum + 1);
  //   } catch (error) {
  //     console.error(error);
  //     setHasMore(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Initial fetch and observer setup
  // useEffect(() => {
  //   fetchPosts(1);
  // }, []); // Empty dependency array to run only once on mount

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

  if (bookmarks) {
    return (
      <div>
        {bookmarks.map((post, index) => {
          // Ensure post is valid before rendering
          if (!post || typeof post !== "object") {
            console.warn("Invalid post:", post);
            return null;
          }

          return (
            <div
              key={post._id || index}
              ref={index === bookmarks.length - 1 ? lastPostRef : null}
            >
              <Post post={post.post} full={full} bookmarks={bookmarks} />
            </div>
          );
        })}

        {isLoading && (
          <LoadingSpinner>
            <Loader2 className="animate-spin" size={24} />
          </LoadingSpinner>
        )}
      </div>
    );
  }

  if (posts) {
    return (
      <div>
        {posts.map((post, index) => {
          // Ensure post is valid before rendering
          if (!post || typeof post !== "object") {
            console.warn("Invalid post:", post);
            return null;
          }

          return (
            <div
              key={post._id || index}
              ref={index === allPosts.length - 1 ? lastPostRef : null}
            >
              <Post post={post} full={full} />
            </div>
          );
        })}

        {isLoading && (
          <LoadingSpinner>
            <Loader2 className="animate-spin" size={24} />
          </LoadingSpinner>
        )}
      </div>
    );
  }

  return (
    <Container>
      {allPosts.length === 0 && (
        <Text isDarkMode={isDarkMode}>
          Create a new post. "Hello World 🤖"{" "}
        </Text>
      )}
      {allPosts.map((post, index) => {
        // Ensure post is valid before rendering
        if (!post || typeof post !== "object") {
          console.warn("Invalid post:", post);
          return null;
        }

        return (
          <div
            key={post._id || index}
            ref={index === allPosts.length - 1 ? lastPostRef : null}
          >
            <Post post={post} full={full} />
          </div>
        );
      })}

      {isLoading && (
        <LoadingSpinner>
          <Loader2 className="animate-spin" size={24} />
        </LoadingSpinner>
      )}
    </Container>
  );
};

export default AllPosts;
