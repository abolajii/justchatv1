import React from "react";
import styled, { keyframes } from "styled-components";
import { FolderPlus } from "lucide-react";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background: ${(props) => props.theme.inputBackground};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.borderColor};
  animation: ${fadeIn} 0.6s ease-out;
`;

const IconWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  &::before {
    content: "";
    position: absolute;
    inset: -4px;
    background: linear-gradient(45deg, #6bc1b7, #4ca69d);
    border-radius: 50%;
    opacity: 0.15;
    filter: blur(8px);
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.25;
  }
`;

const IconCircle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: ${(props) => props.theme.background};
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  svg {
    width: 40px;
    height: 40px;
    color: #6bc1b7;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.primaryText};
`;

const Description = styled.p`
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
  max-width: 24rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const CreateButton = styled.button`
  position: relative;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  overflow: hidden;
  background: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transition: transform 0.3s ease;
  }

  &::before {
    background: #6bc1b7;
    transform: translate(2px, 2px);
  }

  &::after {
    background: #4ca69d;
    border: 2px solid #6bc1b7;
  }

  &:hover::before {
    transform: translate(0, 0);
  }

  &:hover::after {
    background: #5ab3aa;
  }

  span {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
  }
`;

const ButtonIcon = styled(FolderPlus)`
  width: 20px;
  height: 20px;
`;

const EmptyState = () => {
  const { isDarkMode } = useThemeStore();

  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <Container theme={theme}>
      <IconWrapper theme={theme}>
        <IconCircle theme={theme}>
          <FolderPlus />
        </IconCircle>
      </IconWrapper>

      <Title theme={theme}>No Folders Yet</Title>

      <Description theme={theme}>
        Create your first folder to start organizing your bookmarks in a way
        that works for you
      </Description>

      <CreateButton theme={theme}>
        <span>
          <ButtonIcon theme={theme} />
          Create New Folder
        </span>
      </CreateButton>
    </Container>
  );
};

export default EmptyState;
