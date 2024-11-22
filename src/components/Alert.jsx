import React from "react";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
`;

const AlertWrapper = styled.div`
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 9999;
  animation: ${slideDown} 0.5s ease-out;

  ${({ type }) =>
    type === "success"
      ? `
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `
      : type === "error"
      ? `
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `
      : `
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
  `}

  .message {
    flex-grow: 1;
    padding-left: 10px;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Alert = ({ type, message, onClose }) => {
  return (
    <AlertWrapper type={type}>
      <div className="message">{message}</div>
      {/* <button onClick={onClose}>&times;</button> */}
    </AlertWrapper>
  );
};

export default Alert;
