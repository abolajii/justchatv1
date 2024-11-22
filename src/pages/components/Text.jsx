import React, { useState } from "react";
import { BsFonts } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { Emojis } from "../../components";
import useModalStore from "../store/useModalStore";

const Background = styled.div`
  height: 100%;

  display: flex; /* Flexbox for centering */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */

  width: 100%;
  background: ${({ bgColor }) => bgColor}; /* Dynamic background color */
`;
const colors = [
  "#4D8456", // Darker Fresh Green
  "#298F89", // Darker Aquatic Blue
  "#CC462A", // Darker Vibrant Red-Orange
  "#CC9E00", // Darker Bright Yellow
  "#265ACC", // Darker Royal Blue
  "#6A27CC", // Darker Vibrant Purple
  "#B025CC", // Darker Neon Pink
  "#861E5B",
];

const fonts = [
  "Arial",
  "Helvetica Neue",
  "Helvetica",
  "Verdana",
  "Georgia",
  "Times New Roman",
  "Times",
  "Courier New",
  "Courier",
  "Palatino",
  "Garamond",
  "Bookman",
  "Didot",
  "Baskerville",
];

const TextArea = styled.textarea`
  color: #fff;
  min-width: 80%; /* Start small and expand */
  width: auto; /* Automatically adjust width */
  max-width: 90%; /* Restrict maximum width */
  padding: 10px;
  font-size: 1.2rem;
  font-family: ${({ fontFamily }) => fontFamily || "Roboto"}, sans-serif;
  outline: none;
  border: none;
  resize: none;
  border-radius: 10px;

  &::placeholder {
    color: #ccc;
  }

  transition: width 0.2s ease; /* Smooth width expansion */
`;

const Text = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [bgColorIndex, setBgColorIndex] = useState(0); // Index of the current background color
  const [fontFamily, setFontFamily] = useState("Roboto");
  const { closeModal } = useModalStore();

  const handleInput = (e) => {
    const target = e.target;

    e.target.style.height = "50px"; // Reset height to calculate new height
    e.target.style.height = `${e.target.scrollHeight}px`;

    target.style.width = "50%"; // Reset to minimum width
    const newWidth = Math.min(
      target.scrollWidth,
      target.parentElement.offsetWidth * 1
    ); // Ensure it doesn’t exceed 90% of the parent
    target.style.width = `${newWidth}px`; // Set the new width
  };

  const setBackgroundColor = () => {
    setBgColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <Background bgColor={colors[bgColorIndex]}>
      <div className="icon-container left-icons">
        <div className="center icon" onClick={() => closeModal()}>
          <MdClose size={25} color="#fff" />
        </div>
      </div>

      {/* Right Icons */}
      <div className="icon-container right-icons">
        <div className="center relative">
          <FaSmile
            color="#fff"
            size={25}
            onClick={() => setShowEmoji((prev) => !prev)}
          />
          <Emojis showEmoji={showEmoji} />
        </div>
        <div className="center">
          <BsFonts color="#fff" size={27} />
        </div>
        <div className="center" onClick={setBackgroundColor}>
          <IoColorPaletteSharp color="#fff" size={25} />
        </div>
      </div>
      <div className="textarea">
        <TextArea
          style={{
            backgroundColor: colors[bgColorIndex],
          }}
          fontFamily={fontFamily}
          placeholder="Type something..."
          onInput={handleInput}
        />
      </div>
    </Background>
  );
};

export default Text;
