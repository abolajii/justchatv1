import React from "react";
import styled from "styled-components";
import { TrendingUp, Clock, Wallet } from "lucide-react";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";

import cbex from "../../assets/cbex.png";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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

const Logo = styled.div`
  /* margin-bottom: 8px; */
  color: ${(props) => props.theme.primary};

  margin-left: 15px;
  img {
    /* width: 100%; */
    height: auto;
    width: 130px;
  }
`;

const Inner = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 40px 24px;
  height: calc(100vh - 20px);
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const InfoBox = styled.div`
  border-radius: 16px;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.cardBackground};
  font-size: 15px;

  /* margin-bottom: 32px; */
`;

const Heading = styled.h2`
  font-size: 23px;
  font-weight: 700;
  /* margin-bottom: 24px; */
  color: ${(props) => props.theme.primary};
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 24px;
  font-size: 15px;
  color: ${(props) => props.theme.text};
`;

const Highlight = styled.span`
  color: ${(props) => props.theme.primary};
  font-weight: 600;
`;

const LinkContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: -20px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const LinkButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* font-weight: 600; */
  font-size: 13px;
  transition: all 0.3s ease;
  color: ${(props) => props.theme.textPrimary};

  ${(props) =>
    props.primary
      ? `
    background-color: transparent;
    border: 2px solid ${props.theme.primaryColor};
    color: ${props.theme.primaryColor};
    
    &:hover {
    //   background-color: ${props.theme.primaryColor};
    //   color: ${props.theme.textPrimary};
    }
  `
      : `
    background-color: ${props.theme.primaryColor};
    // color: ${props.theme.textPrimary};
    
    &:hover {
    //   background-color: transparent;
    //   border: 2px solid ${props.theme.primaryColor};
    //   color: ${props.theme.primaryColor};
    }
  `}

  &:disabled {
    background-color: ${(props) => props.theme.disabledColor};
    border-color: ${(props) => props.theme.disabledColor};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin: 15px 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.cardBackgroundHover};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Scrollable = styled.div`
  height: 540px;
  background-color: ${(props) => props.theme.inputBackground};
  overflow: scroll;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Trade = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const navigate = useNavigate();
  return (
    <Container theme={theme}>
      <Inner theme={theme}>
        <Logo theme={theme}>
          <div
            className="flex align-center mb-2 pointer"
            onClick={() => navigate(-1)}
          >
            <MdChevronLeft size={30} />
            <p>Back to Dashboard</p>
          </div>
          <img src={cbex} />
        </Logo>
        <InfoBox theme={theme}>
          <Heading theme={theme}>Welcome to CBEX Trading</Heading>
          <Scrollable>
            <FeatureGrid>
              <FeatureItem theme={theme}>
                <TrendingUp size={24} />
                <span>Smart Trading</span>
              </FeatureItem>
              <FeatureItem theme={theme}>
                <Clock size={24} />
                <span>2x Daily Signals</span>
              </FeatureItem>
              <FeatureItem theme={theme}>
                <Wallet size={24} />
                <span>Compound Growth</span>
              </FeatureItem>
            </FeatureGrid>
            <Paragraph>
              Welcome to <Highlight theme={theme}>CBEX</Highlight> - your
              gateway to smart trading. We combine exchange capabilities with
              expert trading signals to help you grow your investments
              systematically.
            </Paragraph>

            <Paragraph>
              Our unique approach delivers{" "}
              <Highlight theme={theme}>
                two precise trading signals daily
              </Highlight>
              . Through our proven compound interest strategy, you can
              potentially double your investment within 35-40 days by
              consistently following these signals.
            </Paragraph>

            <Paragraph>
              Here's how it works: Start with any amount - let's say $100.
              Through careful compound growth, your balance increases steadily
              each day. For instance, $100 grows to $101, then $102, and
              continues this upward trajectory until reaching $200. You maintain
              full control, choosing to either withdraw or reinvest for
              continued growth.
            </Paragraph>

            <LinkContainer>
              <Paragraph
                style={{
                  textAlign: "center",
                }}
              >
                Ready to start your trading journey with CBEX?
              </Paragraph>
              <ButtonContainer>
                <LinkButton
                  theme={theme}
                  onClick={() => navigate("/trade/onboarding")}
                >
                  I'm Already a Member
                </LinkButton>
                <LinkButton primary theme={theme}>
                  Start Trading Now
                </LinkButton>
              </ButtonContainer>
            </LinkContainer>
          </Scrollable>
        </InfoBox>
      </Inner>
    </Container>
  );
};

export default Trade;
