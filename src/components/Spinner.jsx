import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  border: 3px solid #f3f3f3; /* Light gray */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
`;

const Spinner = ({ size = "40px" }) => {
  return <SpinnerWrapper size={size} />;
};

export default Spinner;
