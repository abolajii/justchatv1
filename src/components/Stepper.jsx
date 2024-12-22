import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { createFutureAccount } from "../api/request";
import { AlertProvider, useAlert } from "../context/AlertContext";

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
    props.$isActive ? "#8ad7a6" : props.$isCompleted ? "#57b6a9" : "#d1d5db"};
  background-color: ${(props) =>
    props.$isActive ? "transperent" : props.$isCompleted ? "#57b6a9" : "white"};
  color: ${(props) =>
    props.$isActive || props.$isCompleted
      ? props.theme.textPrimary
      : "#6b7280"};
  font-weight: bold;
  transition: all 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${(props) => (props.$isCompleted ? "#57b6a9" : "#d1d5db")};
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

const renderContent = (step, error) => {
  switch (step) {
    case 0:
      return <Country error={error} />;
    case 1:
      return <Signal />;
    case 2:
      return <Capital error={error} />;
    case 3:
      return <SignalTime error={error} />;
    case 4:
      return <Reminder error={error} />;
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
  const [error, setError] = useState("");
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [done, setDone] = useState(0);
  const {
    setNumberOfSignals,
    customTrades,
    country,
    startingCapital,
    signalTimeStartAndEndDate,
    numberOfSignals,
    tradeSchedule,
    reminder,
    reminderSettings,
    secCustomTrade,
  } = useCbexStore();

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (
      country ||
      startingCapital ||
      signalTimeStartAndEndDate.length > 0 ||
      reminder
    ) {
      setError("");
    }
  }, [
    country,
    startingCapital,
    signalTimeStartAndEndDate,
    numberOfSignals,
    reminder,
  ]);

  const newUserAccount = async (data) => {
    try {
      const response = await createFutureAccount(data);
      console.log(response);
      setDone(1);
      setTimeout(() => {
        navigate("/trade/view");
        showAlert("success", "Welcome to the future!🔮");
      }, 2000);
    } catch (error) {
      console.log(error);
      showAlert("error", error.response.data.message);
      setCurrentStep(5);
    }
  };

  const handleNext = () => {
    // setCurrentStep((prev) => prev + 1);

    // console.log(currentStep);
    if (currentStep === 0) {
      if (!country) {
        setError("Country can't be empty");
        return;
      }
      setCurrentStep((prev) => prev + 1);
      setError("");
    }

    if (currentStep === 1) {
      if (customTrades) {
        setNumberOfSignals(customTrades);
      }
      setCurrentStep((prev) => prev + 1);
    }

    if (currentStep === 2) {
      if (!startingCapital) {
        setError("Starting capital can't be empty");
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === 3) {
      if (signalTimeStartAndEndDate.length !== Number(numberOfSignals)) {
        setError(`Signal start time reqiured! (${numberOfSignals})`);
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }

    if (currentStep === 4) {
      if (!reminder) {
        setError("Kindly select one option");
        return;
      }

      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep === 5) {
      setCurrentStep((prev) => prev + 1);

      const data = {
        country: country.name,
        startingCapital: Number(startingCapital),
        signalTimeStartAndEndDate,
        numberOfSignals:
          tradeSchedule === "inbetween"
            ? Number(secCustomTrade)
            : Number(numberOfSignals),
        reminder,
        totalSignals: signalTimeStartAndEndDate.length,
        tradeSchedule,
        reminderSettings,
      };
      newUserAccount(data);
      // console.log(data);
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
              $isActive={currentStep === index}
              $isCompleted={currentStep > index}
            >
              {currentStep > index ? "✓" : index + 1}
            </StepperItem>
            {index < steps.length - 1 && (
              <Divider $isCompleted={currentStep > index} />
            )}
          </React.Fragment>
        ))}
      </Container>

      {currentStep <= 5 && (
        <AnimatedContent key={currentStep} theme={theme}>
          {renderContent(currentStep, error)}
        </AnimatedContent>
      )}
      {currentStep > 5 && <LoadingPage done={done} />}
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
