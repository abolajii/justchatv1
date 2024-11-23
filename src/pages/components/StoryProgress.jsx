import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const fillProgress = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 20px;
  padding: 0 8px;
`;

const Progress = styled.div`
  height: 5px;
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background: ${({ isCompleted }) => (isCompleted ? "#0bdb8b" : "#ccc")};
`;

const FillBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #0bdb8b;
  width: ${({ isActive }) => (isActive ? "100%" : "0")};
  ${({ isActive, duration, isPlaying }) =>
    isActive &&
    css`
      animation: ${fillProgress} ${duration}s linear forwards;
      animation-play-state: ${isPlaying ? "running" : "paused"};
    `}
`;
const progress = [1, 2, 3, 4, 5];

const ProgressInnner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const elapsedTimeRef = useRef(0);
  const duration = 5000; // Duration in milliseconds

  const startProgress = React.useCallback(() => {
    cancelAnimationFrame(animationFrameRef.current);

    if (!isPlayingRef.current || activeIndex >= progress.length) return;

    startTimeRef.current = Date.now() - elapsedTimeRef.current;

    const animate = () => {
      const currentTime = Date.now();
      elapsedTimeRef.current = currentTime - startTimeRef.current;

      if (elapsedTimeRef.current >= duration) {
        // Immediately move to next progress
        setActiveIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= progress.length) {
            setIsCompleted(true);
            setIsPlaying(false);
            return prev;
          }
          return nextIndex;
        });

        // Reset elapsed time
        elapsedTimeRef.current = 0;

        // Immediately start next progress
        if (activeIndex + 1 < progress.length) {
          startTimeRef.current = Date.now();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [activeIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;

    if (isPlaying) {
      startProgress();
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, activeIndex, startProgress]);

  return (
    <div className="">
      <ProgressContainer>
        {progress.map((_, index) => (
          <Progress key={index} isCompleted={index < activeIndex}>
            <FillBackground
              isActive={index === activeIndex}
              isPlaying={isPlaying}
              duration={duration / 1000}
            />
          </Progress>
        ))}
      </ProgressContainer>
      {isCompleted ? (
        <div>Progress Completed!</div>
      ) : activeIndex < progress.length ? (
        <div>Current Progress: {progress[activeIndex]}</div>
      ) : null}

      <button
        onClick={() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        }}
        disabled={isPlaying || activeIndex >= progress.length}
      >
        Play
      </button>
      <button
        onClick={() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }}
        disabled={!isPlaying || isCompleted}
      >
        Pause
      </button>
    </div>
  );
};

export default ProgressInnner;
