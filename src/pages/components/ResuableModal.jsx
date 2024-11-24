import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -30px);
    opacity: 0;
  }
  to {
   transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideOut = keyframes`


    from {
    transform: translate(-50%, 0px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -30px);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 10px);
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
  z-index: 1100;
  margin-top: 29px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const ReusableModal = ({ isOpen, closeModal, children }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={closeModal} />
      {isOpen && (
        <ModalContainer isOpen={isOpen}>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          {children}
        </ModalContainer>
      )}
    </>
  );
};

export default ReusableModal;
