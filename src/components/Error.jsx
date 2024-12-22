import { AlertCircle } from "lucide-react";
import React from "react";

import styled from "styled-components";

const ErrorAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 7px;
  border-radius: 8px;
  background-color: ${(props) => (props.isDarkMode ? "#4c1d1d" : "#fee2e2")};
  border: 1px solid #ef4444;
  color: ${(props) => (props.isDarkMode ? "#fca5a5" : "#991b1b")};
  font-size: 0.875rem;
  margin-bottom: 10px;
  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;

const ErrorMessage = ({ error, isDarkMode }) => {
  if (!error) {
    return;
  }
  return (
    error && (
      <ErrorAlert isDarkMode={isDarkMode}>
        <AlertCircle />
        {error}
      </ErrorAlert>
    )
  );
};

export default ErrorMessage;
