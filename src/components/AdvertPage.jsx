// ThemeConfig.js
import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  background: "#ffffff",
  text: "#1a1a1a",
  primary: "#3b82f6",
  secondary: "#64748b",
  border: "#e2e8f0",
  buttonText: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  background: "#1e293b",
  text: "#ffffff",
  primary: "#60a5fa",
  secondary: "#94a3b8",
  border: "#334155",
  buttonText: "#ffffff",
  shadow: "rgba(0, 0, 0, 0.3)",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

// BannerStyles.js
import styled, { keyframes } from "styled-components";

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-45deg); }
  100% { transform: rotate(0deg); }
`;

const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const BannerContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1.5rem;
  max-width: 24rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
  animation: ${scaleIn} 0.5s ease-out forwards;

  &.hide {
    animation: ${scaleIn} 0.5s ease-out reverse forwards;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const HandIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  animation: ${waveAnimation} 2s infinite;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);

    svg {
      transform: translateX(4px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

// Banner.jsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Hand, ArrowRight } from "lucide-react";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system dark mode preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for theme changes
    const listener = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(listener);

    // Hide banner after 2 minutes
    const timer = setTimeout(() => setIsVisible(false), 120000);

    return () => {
      darkModeMediaQuery.removeListener(listener);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BannerContainer className={!isVisible ? "hide" : ""}>
        <Header>
          <HandIcon>
            <Hand size={24} />
          </HandIcon>
          <Title>Learn Smart Financial Management</Title>
        </Header>

        <Description>
          Discover proven strategies for responsible financial planning,
          investment basics, and wealth building through education.
        </Description>

        <Button>
          <span>Start Learning Now</span>
          <ArrowRight size={18} />
        </Button>

        <CloseButton onClick={() => setIsVisible(false)}>✕</CloseButton>
      </BannerContainer>
    </ThemeProvider>
  );
};

export default Banner;
