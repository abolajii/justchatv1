import React, { useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../store/useThemeStore";
import useUserStore from "../../store/useUserStore";

const Container = styled.div`
  height: 100vh;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: calc(100vh - 30px);
  max-width: 660px;
  width: 100%;
  padding: 30px;

  h1 {
    font-size: 26px;
  }
`;

const FormGroup = styled.div`
  margin: 20px 0;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 14px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    border: 1px solid ${({ isBlue }) => (isBlue ? "#2196F3" : "#4CAF50")};
    position: relative;

    /* &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
    } */
  }
`;

const CustomInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textPrimary};
  margin-top: 10px;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Note = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBackground || "#4CAF50"};
  color: ${(props) => props.theme.buttonTextColor || "#fff"};
  border: none;
  padding: 9px 12px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.theme.buttonHoverBackground || "#45a049"};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.buttonDisabledBackground || "#cccccc"};
    cursor: not-allowed;
  }
`;

const TradeOnboarding = () => {
  const { user } = useUserStore();
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [selectedOption, setSelectedOption] = useState("default");
  const [customTrades, setCustomTrades] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "default") {
      setCustomTrades("");
    }
  };

  return (
    <Container theme={theme}>
      <Inner theme={theme}>
        <h1>Welcome, {user.name}!</h1>
        <p>See the Future of Your Investment</p>
        <p>
          Discover how your investment grows over time with our unique trading
          strategy
        </p>

        <FormGroup>
          <Label theme={theme}>How many times do you trade in a day?</Label>
          <Note theme={theme}>
            Default is 2 trades per day: 2:00-2:30PM, 7:00-7:30PM
          </Note>

          <RadioContainer>
            <RadioLabel>
              <RadioInput
                type="radio"
                name="trades"
                value="default"
                checked={selectedOption === "default"}
                onChange={handleOptionChange}
                isBlue={true}
              />
              2 trades
            </RadioLabel>

            <RadioLabel>
              <RadioInput
                type="radio"
                name="trades"
                value="custom"
                checked={selectedOption === "custom"}
                onChange={handleOptionChange}
                isBlue={false}
              />
              More
            </RadioLabel>
          </RadioContainer>

          {selectedOption === "custom" && (
            <CustomInput
              type="number"
              value={customTrades}
              onChange={(e) => setCustomTrades(e.target.value)}
              placeholder="Enter number of trades"
              min="3"
              theme={theme}
            />
          )}

          <ButtonContainer>
            <Button theme={theme}>Continue</Button>
          </ButtonContainer>
        </FormGroup>
      </Inner>
    </Container>
  );
};

export default TradeOnboarding;
