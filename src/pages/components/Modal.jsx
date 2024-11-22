import React from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import useModalStore from "../store/useModalStore";

// Overlay animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  z-index: 1000;
`;

const Modal = ({ children }) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={closeModal}>{children}</Overlay>,
    document.body
  );
};

export default Modal;
