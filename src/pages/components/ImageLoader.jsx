import styled, { keyframes } from "styled-components";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const PlaceholderImage = styled(BaseImage)`
  filter: blur(20px);
  transform: scale(1.1);
  opacity: ${(props) => (props.isMainLoaded ? 0 : 1)};
  transition: opacity 0.3s ease-out;
`;

const MainImage = styled(BaseImage)`
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in;
  animation: ${fadeIn} 0.3s ease-in;
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(18, 18, 18, 1);
  background-size: cover;
  background-position: center;
  z-index: 1;
  /* use the same image as background image then blur it is , then put the image on top of the blur*/
`;

const ImageLoader = ({ src, alt, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderSrc, setPlaceholderSrc] = useState("");

  useEffect(() => {
    const generatePlaceholder = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 40;
        canvas.height = 40;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const placeholderData = canvas.toDataURL("image/jpeg", 0.1);
        setPlaceholderSrc(placeholderData);
      } catch (error) {
        console.error("Error generating placeholder:", error);
      }
    };

    generatePlaceholder();
    setIsLoaded(false);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <ImageWrapper>
      {placeholderSrc && (
        <PlaceholderImage src={placeholderSrc} alt="" isMainLoaded={isLoaded} />
      )}

      <MainImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        onLoad={handleImageLoad}
      />
    </ImageWrapper>
  );
};

export default ImageLoader;
