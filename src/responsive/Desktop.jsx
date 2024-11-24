import React from "react";
import styled from "styled-components";

// Styled component for Desktop only view
const DesktopWrapper = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const Desktop = ({ children }) => {
  return <DesktopWrapper>{children}</DesktopWrapper>;
};

export default Desktop;
