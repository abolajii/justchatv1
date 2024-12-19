import React, { useEffect, useState } from "react";
import { MainContainer } from "../components";
import Header from "../components/Header";
import Story from "./components/Story";
import AllPosts from "./dashboard/AllPosts";
import PostContainer from "./PostContainer";

const Dashboard = () => {
  const [isMobileView, setIsMobileView] = useState(false);

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

  return (
    <MainContainer>
      <Header>
        <div>
          <Story show={!isMobileView} />
          <PostContainer />
          <AllPosts />
        </div>
      </Header>
    </MainContainer>
  );
};

export default Dashboard;
