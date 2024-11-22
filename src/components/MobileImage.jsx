import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Full viewport height */
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; /* Ensures the image covers the container */
  object-position: center; /* Centers the image content */
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
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <ImageContainer>
      <StyledImage src={src} alt={alt} />
      {showDeviceIndicator && (
        <DeviceIndicator>
          {isSmallScreen ? "Mobile" : "Desktop"}
        </DeviceIndicator>
      )}
    </ImageContainer>
  );
};

export default ResponsiveImage;
