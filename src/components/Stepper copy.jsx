import React, { useState } from "react";
import styled from "styled-components";

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
    props.isActive ? "#3c76f2" : props.isCompleted ? "#22c55e" : "#d1d5db"};
  background-color: ${(props) =>
    props.isActive ? "#3c76f2" : props.isCompleted ? "#22c55e" : "white"};
  color: ${(props) =>
    props.isActive || props.isCompleted ? "white" : "#6b7280"};
  font-weight: bold;
  transition: all 0.2s ease-in-out;
`;

const Divider = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${(props) => (props.isCompleted ? "#22c55e" : "#d1d5db")};
  margin-right: 5px;
  margin-left: 5px;
`;

const StepperRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 30px;
`;

const StepperNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#2563eb")};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
`;

const renderContent = (step) => {
  switch (step) {
    case 0:
      return <Content>Personal Information Form</Content>;
    case 1:
      return <Content>Contact Details Form</Content>;
    case 2:
      return <Content>Education History Form</Content>;
    case 3:
      return <Content>Work Experience Form</Content>;
    case 4:
      return <Content>Skills Assessment Form</Content>;
    case 5:
      return <Content>Review All Information</Content>;
    default:
      return null;
  }
};

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["1", "2"];

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
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
      {renderContent(currentStep)}

      {/* 
      <StepperNavigation>
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </StepperNavigation> */}
    </div>
  );
};

export default Stepper;
