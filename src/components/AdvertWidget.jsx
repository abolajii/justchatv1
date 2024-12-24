import React, { useState } from "react";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { ArrowRight, Hand } from "lucide-react";
import icon from "../assets/invest.svg";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const waveAnimation = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-45deg); }
  100% { transform: rotate(0deg); }
`;

const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Padding = styled.div`
  padding: 20px;
`;

const BannerContainer = styled.div`
  padding: 1.5rem;
  max-width: 24rem;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 6px ${({ theme }) => theme.shadow}; */
  animation: ${scaleIn} 0.5s ease-out forwards;

  &.hide {
    animation: ${scaleIn} 0.5s ease-out reverse forwards;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const HandIcon = styled.div`
  color: ${({ theme }) => theme.primaryColor};
  animation: ${waveAnimation} 2s infinite;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.textPrimary};

  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(110%);

    svg {
      transform: translateX(4px);
    }
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const InvestIconWrapper = styled.div`
  img {
    width: 107px;
    height: 107px;
    fill: ${({ theme }) => theme.primaryColor};
  }
`;

const AdvertWidget = () => {
  const [isVisible, setIsVisible] = useState(true);

  const navigate = useNavigate();

  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { user } = useUserStore();

  if (!isVisible || user.isUserSignal) return null;

  return (
    <Padding>
      <BannerContainer theme={theme}>
        <Header theme={theme}>
          <HandIcon theme={theme}>
            <Hand size={24} />
          </HandIcon>
          <Title theme={theme}>Learn Smart Financial Management</Title>
        </Header>
        <Description theme={theme}>
          Would you like to learn how to grow your money daily ?
        </Description>

        {/* <InvestIconWrapper>{<img src={icon} />}</InvestIconWrapper> */}

        <Button theme={theme} onClick={() => navigate("/setup")}>
          <span>Click here to Learn now</span>
          <ArrowRight size={18} />
        </Button>
        <CloseButton onClick={() => setIsVisible(false)} theme={theme}>
          ✕
        </CloseButton>
      </BannerContainer>
    </Padding>
  );
};

export default AdvertWidget;
