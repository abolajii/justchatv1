import React, { useState } from "react";
import styled from "styled-components";
import MainContainer from "./MainContainer";
import { Bell, Calculator, DollarSign } from "lucide-react";

// Styled Components

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #22c55e;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #374151;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Switch = ({ checked, onChange }) => (
  <SwitchWrapper>
    <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
    <SwitchSlider />
  </SwitchWrapper>
);

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  background-color: #1f1f1f;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 0.375rem;
  outline: none;
  transition: all 0.2s;
  color: #ffffff;

  &:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Card = styled.div`
  background-color: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 0.5rem;
  overflow: hidden;
  width: 32%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  justify-content: space-between;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(34, 197, 94, 0.2);
  background-color: rgba(34, 197, 94, 0.05);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #22c55e;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardFooter = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
  &:hover {
    background-color: #1eb458;
  }
`;

const SettingsContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
`;

const SettingsTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
  padding-left: 0.5rem;
  border-left: 4px solid #22c55e;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(34, 197, 94, 0.1);
  }
`;

const SettingLabel = styled.label`
  font-size: 0.875rem;
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
  color: ${(props) => (props.$bold ? "#ffffff" : "#9ca3af")};
`;

const NestedSettings = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(34, 197, 94, 0.2);
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
`;

// Main Component
const Settings = () => {
  const [settings, setSettings] = useState({
    capital: 1000,
    signalReminder: true,
    dailySignals: [
      { id: 1, name: "Morning Signal", enabled: true },
      { id: 2, name: "Afternoon Signal", enabled: true },
      { id: 3, name: "Evening Signal", enabled: false },
    ],
    autoCalculate: true,
    calculateAfter5Min: true,
    calculateEndOfDay: false,
  });

  const handleCapitalChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      capital: parseFloat(e.target.value) || 0,
    }));
  };

  const toggleSignalReminder = () => {
    setSettings((prev) => ({
      ...prev,
      signalReminder: !prev.signalReminder,
    }));
  };

  const toggleDailySignal = (id) => {
    setSettings((prev) => ({
      ...prev,
      dailySignals: prev.dailySignals.map((signal) =>
        signal.id === id ? { ...signal, enabled: !signal.enabled } : signal
      ),
    }));
  };

  const toggleAutoCalculate = () => {
    setSettings((prev) => ({
      ...prev,
      autoCalculate: !prev.autoCalculate,
    }));
  };

  return (
    <MainContainer>
      <SettingsContainer>
        <SettingsTitle>Settings</SettingsTitle>
        <div className="flex flex-1 justify-between">
          <Card>
            <CardHeader>
              <CardTitle>
                <DollarSign size={20} />
                Capital Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingRow>
                <SettingLabel $bold>Trading Capital:</SettingLabel>
                <StyledInput
                  type="number"
                  value={settings.capital}
                  onChange={handleCapitalChange}
                  style={{ width: "8rem" }}
                />
              </SettingRow>
            </CardContent>
            <CardFooter>
              <SaveButton>Save</SaveButton>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Bell size={20} />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingRow>
                <SettingLabel $bold>Signal Reminders</SettingLabel>
                <Switch
                  checked={settings.signalReminder}
                  onChange={toggleSignalReminder}
                />
              </SettingRow>

              {settings.signalReminder && (
                <NestedSettings>
                  {settings.dailySignals.map((signal) => (
                    <SettingRow key={signal.id}>
                      <SettingLabel>{signal.name}</SettingLabel>
                      <Switch
                        checked={signal.enabled}
                        onChange={() => toggleDailySignal(signal.id)}
                      />
                    </SettingRow>
                  ))}
                </NestedSettings>
              )}
            </CardContent>
            <CardFooter>
              <SaveButton>Save</SaveButton>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Calculator size={20} />
                Calculation Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingRow>
                <SettingLabel $bold>Auto Calculate Outcome</SettingLabel>
                <Switch
                  checked={settings.autoCalculate}
                  onChange={toggleAutoCalculate}
                />
              </SettingRow>

              {settings.autoCalculate && (
                <NestedSettings>
                  <SettingRow>
                    <SettingLabel>
                      Calculate 5 minutes after signal end
                    </SettingLabel>
                    <Switch
                      checked={settings.calculateAfter5Min}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          calculateAfter5Min: !prev.calculateAfter5Min,
                          calculateEndOfDay: false,
                        }))
                      }
                    />
                  </SettingRow>
                  <SettingRow>
                    <SettingLabel>Calculate at end of day</SettingLabel>
                    <Switch
                      checked={settings.calculateEndOfDay}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          calculateEndOfDay: !prev.calculateEndOfDay,
                          calculateAfter5Min: false,
                        }))
                      }
                    />
                  </SettingRow>
                </NestedSettings>
              )}
            </CardContent>
            <CardFooter>
              <SaveButton>Save</SaveButton>
            </CardFooter>
          </Card>
        </div>
      </SettingsContainer>
    </MainContainer>
  );
};

export default Settings;
