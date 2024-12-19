import React, { useEffect, useRef, useState } from "react";
import StatusModal from "./StatusModal";
import useStoryStore from "../store/useStoryStore";
import styled, { css, keyframes } from "styled-components";
import { formatTimestamp } from "../../utils";
import { HiCheckBadge } from "react-icons/hi2";
import { FaPlay, FaSmile } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { MdClose, MdSend } from "react-icons/md";
import useModalStore from "../store/useModalStore";
import { viewStory } from "../../api/request";
import useUserStore from "../../store/useUserStore";
const emojis = [
  "😀",
  "😂",
  "😊",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😄",
  "😅",
  "😆",
  "🤣",
  "😇",
  "😉",
  "😌",
  "😋",
  "😘",
  "😗",
  "😙",
  "😚",
  "🥲",
  "🤗",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "😣",
  "😖",
];

const dropDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fillProgress = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const popUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalInner = styled.div`
  background: ${({ bgColor }) => (bgColor ? bgColor : "#272727")};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  animation: ${dropDown} 0.3s ease-in-out;
  color: #fff;
  position: relative;

  .footer {
    bottom: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 100;
  }

  .left-icons {
    top: 20px;
    position: absolute;
    left: 30px; /* Adjust for desired spacing from the left */
  }
`;

const InputContainer = styled.div`
  max-width: 650px;
  width: 100%;
  gap: 10px;
  .input-wrapper {
    flex: 1;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 8px 16px;

    textarea {
      width: 100%;
      background: transparent;
      border: none;
      color: white;
      outline: none;
      font-family: inherit;
      resize: none;
      padding-top: 2px;
      min-height: 24px;
      max-height: 80px;
      white-space: pre-wrap; /* Preserve line breaks */
      word-wrap: break-word; /* Break words to prevent overflow */
      overflow-wrap: break-word; /* Modern version of word-wrap */
      word-break: normal; /* Don't break words unless necessary */
      display: block;
      /* Custom scrollbar for webkit browsers */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 8px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Progress = styled.div`
  height: 7px;
  position: relative;
  flex: 1;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  background: ${({ isCompleted }) => (isCompleted ? "#5cf5b3" : "#a9a9a9")};
`;

const FillBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #5cf5b3;
  width: ${({ isActive }) => (isActive ? "100%" : "0")};
  ${({ isActive, duration, isPlaying }) =>
    isActive &&
    css`
      animation: ${fillProgress} ${duration}s linear forwards;
      animation-play-state: ${isPlaying ? "running" : "paused"};
    `}
`;

const MediaContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  height: calc(100% - 100px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SideControl = styled.div`
  position: absolute;
  top: 0;
  ${({ side }) => side}: 0;
  width: 50%;
  height: 100%;
  z-index: 20;
  cursor: pointer;
`;

const StatusInner = styled.div`
  height: 100%;
  max-width: 650px;
  width: 100%;
  margin: auto;
  margin-top: 20px;
`;

const UserDetails = styled.div`
  padding: 0 9px;
  padding-top: 14px;
  .details {
    gap: 10px;
  }

  .time {
    font-size: 13px;
  }

  .avi {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #c2c2c2;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Text = styled.div`
  font-family: ${({ fontFamily }) => fontFamily};
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 16px;
  background: #fff;
  width: 300px;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${popUp} 0.3s ease-out;
  overflow-y: auto;

  .emoji-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
    padding: 12px;
  }

  .emoji-item {
    cursor: pointer;
    text-align: center;
    padding: 4px;
    font-size: 20px;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }
  }
`;

const AbsoluteImage = styled.div`
  height: 100%;
  position: absolute;
  inset: 0;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Relative = styled.div`
  position: relative;
  height: 100%;
  background-color: red;
  width: 100%;
`;

const ViewStatus = () => {
  const { selectedStory, handleViewStory } = useStoryStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedTimeRef = useRef(0);
  const longPressTimeoutRef = useRef(null);
  const { closeModalStatus } = useModalStore();
  const { user } = useUserStore();
  const duration = 5000; // Duration in milliseconds

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const stories = selectedStory?.stories || [];
  const currentStory = stories[activeIndex] || {};

  const textareaRef = useRef(null);

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        80
      )}px`;
    }
  };

  const startProgress = React.useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);

    if (!isPlayingRef.current || activeIndex >= stories.length) return;

    startTimeRef.current = Date.now() - elapsedTimeRef.current;

    const storyId = currentStory._id;
    const hasViewed = currentStory?.views?.find(
      (v) => v.user === user._id || v.user === user.id
    );

    if (!hasViewed) {
      console.log("Viewing...");
      handleViewStory(storyId, user.id);
      viewStory(storyId);

      // add to user to views array
    }

    const animate = () => {
      const currentTime = Date.now();
      elapsedTimeRef.current = currentTime - startTimeRef.current;

      if (elapsedTimeRef.current >= duration) {
        setActiveIndex((prev) => {
          const nextIndex = prev + 1;

          if (nextIndex >= stories.length) {
            setIsCompleted(true);
            setIsPlaying(false);
            return prev;
          }
          return nextIndex;
        });

        elapsedTimeRef.current = 0;

        if (activeIndex + 1 < stories.length) {
          startTimeRef.current = Date.now();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [activeIndex, stories.length]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;

    if (isPlaying) {
      startProgress();
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, [isPlaying, activeIndex, startProgress]);

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      elapsedTimeRef.current = 0;
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIndex < stories.length - 1) {
      setActiveIndex((prev) => prev + 1);
      elapsedTimeRef.current = 0;
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  const handleTouchStart = () => {
    longPressTimeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }, 200);
  };

  const handleTouchEnd = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    setIsPlaying(true);
    isPlayingRef.current = true;
  };

  const handleMouseDown = () => {
    longPressTimeoutRef.current = setTimeout(() => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }, 200);
  };

  const handleMouseUp = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    setIsPlaying(true);
    isPlayingRef.current = true;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    autoResizeTextarea();
  };

  // Update the emoji click handler to trigger auto-resize
  const handleEmojiClick = (emoji) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    /*  */
    if (isCompleted) {
      closeModalStatus();
    }
  }, [isCompleted]);

  if (!selectedStory) return null;

  const renderEmojiPicker = () => {
    if (!showEmojiPicker) return null;

    return (
      <EmojiPickerContainer>
        <div className="emoji-grid">
          {emojis.map((emoji, index) => (
            <div
              key={index}
              className="emoji-item"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </div>
          ))}
        </div>
      </EmojiPickerContainer>
    );
  };

  const renderContent = () => {
    const { media } = currentStory;

    return (
      <MediaContainer
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {media?.type === "image" && (
          <AbsoluteImage>
            <img src={media.url} alt="Story" />
          </AbsoluteImage>
        )}
        {media?.type === "video" && (
          <video
            src={media.url}
            autoPlay={isPlaying}
            loop={false}
            playsInline
            muted
            controls={false}
            onEnded={handleNext}
          />
        )}
        {media.type == null && (
          <Text className="text-content" fontFamily={currentStory?.fontFamily}>
            {currentStory.text}
          </Text>
        )}
        <SideControl side="left" onClick={handlePrevious} />
        <SideControl side="right" onClick={handleNext} />
      </MediaContainer>
    );
  };

  return (
    <StatusModal>
      <ModalInner
        bgColor={currentStory?.media.type === null && currentStory?.bgColor}
      >
        <div className="icon-container left-icons">
          <div className="center icon" onClick={() => closeModalStatus()}>
            <MdClose size={25} color="#fff" />
          </div>
        </div>
        <Relative>
          <StatusInner>
            <ProgressContainer>
              {stories.map((_, index) => (
                <Progress key={index} isCompleted={index < activeIndex}>
                  <FillBackground
                    isActive={index === activeIndex}
                    isPlaying={isPlaying}
                    duration={duration / 1000}
                  />
                </Progress>
              ))}
            </ProgressContainer>
            <UserDetails className="flex justify-between">
              <div className="details flex">
                <div className="avi">
                  <img src={selectedStory?.user?.profilePic} />
                </div>
                <div>
                  <div className="name">
                    {selectedStory.user.name}
                    {selectedStory.user.isVerified && <HiCheckBadge />}
                  </div>
                  <div className="time">
                    {formatTimestamp(currentStory?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="cursor">
                {isPlaying ? (
                  <div
                    onClick={() => {
                      setIsPlaying(false);
                      isPlayingRef.current = false;
                    }}
                  >
                    <FaPause size={23} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setIsPlaying(true);
                      isPlayingRef.current = true;
                    }}
                  >
                    <FaPlay size={22} />
                  </div>
                )}
              </div>
            </UserDetails>
            <InputContainer className="footer flex">
              <div
                className="center cursor"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {renderEmojiPicker()}
                <FaSmile color="#fbfbfb" size={24} />
              </div>
              <div className="input-wrapper">
                <textarea
                  onFocus={() => {
                    setIsPlaying(false);
                    isPlayingRef.current = false;
                  }}
                  ref={textareaRef}
                  placeholder="Send message"
                  value={inputValue}
                  onChange={handleInputChange}
                  rows={1}
                />
              </div>
              <div className="center icon cursor">
                <MdSend color="#fbfbfb" size={24} />
              </div>
            </InputContainer>
          </StatusInner>
          {renderContent()}
        </Relative>
      </ModalInner>
    </StatusModal>
  );
};

export default ViewStatus;
