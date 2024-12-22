import React from "react";
import styled, { keyframes } from "styled-components";
import { FaRobot } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const LoaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;

const swing = keyframes`
  0% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(-45deg);
  }
`;

const Dot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#57b6a9"};
  animation: ${pulse} 1s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const LoadingText = styled.div`
  color: ${(props) => props.theme.textPrimary || ""};
`;

const RobotContainer = styled.div`
  animation: ${swing} 2s ease-in-out infinite;
  transform-origin: center;
  margin-left: 4px;
`;

const FadeLoader = ({ color = "#57b6a9" }) => {
  return (
    <LoaderContainer>
      {[...Array(3)].map((_, i) => (
        <Dot key={i} color={color} delay={i * 0.15} />
      ))}
    </LoaderContainer>
  );
};

const stages = [
  {
    text: "Please wait while we set up your account...",
    icon: <FaRobot color="#57b6a9" size={20} />,
  },
  {
    text: "Almost done...⏰",
    icon: <ImProfile color="#57b6a9" />,
  },
];

const LoadingPage = ({ done }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <Container>
      <div className="flex flex-col align-center">
        <FadeLoader color="#57b6a9" />

        <LoadingText className="flex align-center" theme={theme}>
          {stages[done].text}
          {done !== 1 && <RobotContainer>{stages[done].icon}</RobotContainer>}
        </LoadingText>
      </div>
    </Container>
  );
};

export default LoadingPage;
