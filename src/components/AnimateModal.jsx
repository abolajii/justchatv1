import React from "react";
import { IoMdClose } from "react-icons/io";
import styled, { css } from "styled-components";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.background};
  /* background-color: ${(props) => (props.isDarkMode ? "#333" : "#fff")}; */
  color: ${(props) => props.theme.text};
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(0.7);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props) =>
    props.isOpen &&
    css`
      transform: scale(1);
      opacity: 1;
    `}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.textPrimary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const AnimateModal = ({ closeModal, isOpen, body, title }) => {
  const { isDarkMode } = useThemeStore();

  const theme = isDarkMode ? darkTheme : lightTheme;
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={closeModal}>
      <ModalContent
        theme={theme}
        isDarkMode={isDarkMode}
        isOpen={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle theme={theme}>{title}</ModalTitle>
          <CloseButton onClick={closeModal} theme={theme}>
            <IoMdClose />
          </CloseButton>
        </ModalHeader>
        {body}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AnimateModal;
