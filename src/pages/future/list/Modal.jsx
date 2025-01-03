import React from "react";
import styled from "styled-components";
const Modal = styled.div`
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
`;

const ModalContent = styled.div`
  background-color: #1f1f1f;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ReuseableModal = ({ onClose, title, body, footer }) => {
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        {body}
        <ModalActions>{footer}</ModalActions>
      </ModalContent>
    </Modal>
  );
};

export default ReuseableModal;
