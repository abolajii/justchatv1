import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(props) =>
    props.isSmallScreen ? "100%" : "72rem"}; // 72rem = 6xl
  margin: 0 auto;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.isSmallScreen ? "450px" : "500px")};
  transition: height 0.3s ease;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => (props.isSmallScreen ? "0" : "0.5rem")};
  transition: all 0.3s ease;
`;

const DeviceIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const ResponsiveImage = ({
  src = "/api/placeholder/400/300",
  alt = "Image",
  showDeviceIndicator = true,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Breakpoint for small screens
    };

    // Initial check
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ImageContainer isSmallScreen={isSmallScreen}>
      <ImageWrapper isSmallScreen={isSmallScreen}>
        <StyledImage src={src} alt={alt} isSmallScreen={isSmallScreen} />
      </ImageWrapper>
      {showDeviceIndicator && (
        <DeviceIndicator>
          {isSmallScreen ? "Mobile" : "Desktop"}
        </DeviceIndicator>
      )}
    </ImageContainer>
  );
};

export default ResponsiveImage;
