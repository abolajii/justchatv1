import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegSmile, FaTrashAlt } from "react-icons/fa"; // Smiley icon for interaction
import Emojis from "./Emojis";
import ResponsiveImage from "../../components/MobileImage";

const Background = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #272727;
`;

const ImageContainer = styled.div`
  height: auto;
  position: relative;
  width: ${(props) => (props.imageWidth ? `${props.imageWidth}px` : "550px")};
  img {
    height: auto;
    width: 100%;
    object-fit: cover;
  }
`;

const ReplyContainer = styled.div`
  position: absolute;
  bottom: 70px;
  max-width: 500px;
  width: 90%;
  background-color: transparent;
  border: 1px solid #838383;
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  max-height: 70px;
  border: none;
  outline: none;
  font-size: 14px;
  resize: none;
  padding: 5px;
  color: #fff;
  background-color: transparent;
  font-family: "Roboto";

  &::placeholder {
    font-family: "Roboto";
    color: #f6f6f6;
  }
`;

const SmileyIcon = styled(FaRegSmile)`
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  margin-right: 10px;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 90%;
  height: 100px;
  background-color: #3c3c3c;
  border: 2px dashed #838383;
  color: #838383;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const DeleteIcon = styled(FaTrashAlt)`
  position: absolute;
  top: 30px;
  right: 10px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;

const Image = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [imageWidth, setImageWidth] = useState(700); // Default width
  const [showEmoji, setShowEmoji] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Responsive state

  // Responsive check
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Add event listener

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Cleanup
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageSelected(reader.result); // Set the image for display
        const img = new window.Image(); // Create a new Image object
        img.src = reader.result;

        img.onload = () => {
          console.log(img.width);
          if (img.width !== undefined && img.width >= 700) {
            setImageWidth(img.width / 2.5); // Dynamically set the width
          } else {
            setImageWidth(img.width * 1.65); // Set the default width if image width is less than 700
          }
        };
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleDeleteImage = () => {
    setImageSelected(null);
  };

  return (
    <Background>
      {/* File upload section */}
      {imageSelected ? (
        isSmallScreen ? (
          <ResponsiveImage src={imageSelected} alt="Selected" isSmallScreen />
        ) : (
          <ImageContainer imageWidth={imageWidth}>
            <img src={imageSelected} alt="Selected" />
            <DeleteIcon onClick={handleDeleteImage} />
          </ImageContainer>
        )
      ) : (
        <FileUploadContainer
          onClick={() => document.getElementById("file-input").click()}
        >
          <span>Choose a file or drag a file to upload</span>
          <FileInput
            type="file"
            id="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FileUploadContainer>
      )}

      {/* Show footer once image is selected */}
      {imageSelected && (
        <ReplyContainer>
          <TextArea placeholder="Write a caption..." />
          <div className="center relative">
            <SmileyIcon
              color="#e3e3e3"
              onClick={() => setShowEmoji(!showEmoji)}
            />

            <Emojis showEmoji={showEmoji} />
          </div>
        </ReplyContainer>
      )}
    </Background>
  );
};

export default Image;
