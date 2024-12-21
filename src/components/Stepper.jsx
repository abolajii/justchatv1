import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";
import Country from "../pages/trade/tabs/Country";
import Signal from "../pages/trade/tabs/Signal";
import Capital from "../pages/trade/tabs/Capital";
import SignalTime from "../pages/trade/tabs/SignalTime";
import Reminder from "../pages/trade/tabs/Reminder";
import DetailsWidget from "../pages/trade/tabs/Details";
import LoadingPage from "../pages/trade/tabs/LoadingPage";
import useCbexStore from "../pages/store/useCbexStore";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
`;

const StepperItem = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid;
  border-color: ${(props) =>
    props.isActive ? "#8ad7a6" : props.isCompleted ? "#57b6a9" : "#d1d5db"};
  background-color: ${(props) =>
    props.isActive ? "transperent" : props.isCompleted ? "#57b6a9" : "white"};
  color: ${(props) =>
    props.isActive || props.isCompleted ? props.theme.textPrimary : "#6b7280"};
  font-weight: bold;
  transition: all 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${(props) => (props.isCompleted ? "#57b6a9" : "#d1d5db")};
  margin-right: 5px;
  margin-left: 5px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedContent = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  padding: 1rem;
  background-color: red;
  margin-top: 20px;

  background-color: ${({ theme }) => theme.inputBackground};

  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const StepperNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.disabled ? "#9cb9b5" : "#57b6a9")};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #3c9488;
  }
`;

const renderContent = (step) => {
  switch (step) {
    case 0:
      return <Country />;
    case 1:
      return <Signal />;
    case 2:
      return <Capital />;
    case 3:
      return <SignalTime />;
    case 4:
      return <Reminder />;
    case 5:
      return <DetailsWidget />;
    default:
      return null;
  }
};

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["1", "2", "3", "4", "5", "6"];
  const { isDarkMode } = useThemeStore();
  const { setNumberOfSignals, customTrades } = useCbexStore();

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === 1 && customTrades) {
      setNumberOfSignals(customTrades);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <Container>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <StepperItem
              theme={theme}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
            >
              {currentStep > index ? "✓" : index + 1}
            </StepperItem>
            {index < steps.length - 1 && (
              <Divider isCompleted={currentStep > index} />
            )}
          </React.Fragment>
        ))}
      </Container>

      {currentStep <= 5 && (
        <AnimatedContent key={currentStep} theme={theme}>
          {renderContent(currentStep)}
        </AnimatedContent>
      )}
      {currentStep <= 5 && (
        <StepperNavigation>
          {currentStep === 0 ? (
            <div></div>
          ) : (
            <Button onClick={handlePrev} disabled={currentStep === 0}>
              Previous
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep <= 4 ? "Next" : "Submit"}
          </Button>
        </StepperNavigation>
      )}
    </div>
  );
};

export default Stepper;
