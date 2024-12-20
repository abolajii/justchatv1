import React from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";

const Container = styled.div`
  height: 100vh;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Inner = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: calc(100vh - 30px);
  max-width: 660px;
  width: 100%;
  padding: 10px;
`;

const Widgets = styled.div``;

const BigWidget = styled.div``;

const SmallWidget = styled.div``;

const TradeOnboarding = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <Container theme={theme}>
      <Inner theme={theme}>
        <Widgets></Widgets>
      </Inner>
    </Container>
  );
};

export default TradeOnboarding;
