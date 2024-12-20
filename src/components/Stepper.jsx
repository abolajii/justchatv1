import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import useThemeStore, { darkTheme, lightTheme } from "../store/useThemeStore";
import Country from "../pages/trade/tabs/Country";

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
    props.isActive ? "#2563eb" : props.isCompleted ? "#22c55e" : "#d1d5db"};
  background-color: ${(props) =>
    props.isActive ? "#2563eb" : props.isCompleted ? "#22c55e" : "white"};
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
  background-color: ${(props) => (props.disabled ? "#d1d5db" : "#2563eb")};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const RateDisplay = styled.div`
  margin-top: 10px;
  padding: 15px;
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const currencyToCountry = {
  AED: "United Arab Emirates",
  AFN: "Afghanistan",
  ALL: "Albania",
  AMD: "Armenia",
  ANG: "Netherlands Antilles",
  AOA: "Angola",
  ARS: "Argentina",
  AUD: "Australia",
  AWG: "Aruba",
  AZN: "Azerbaijan",
  BAM: "Bosnia and Herzegovina",
  BBD: "Barbados",
  BDT: "Bangladesh",
  BGN: "Bulgaria",
  BHD: "Bahrain",
  BIF: "Burundi",
  BMD: "Bermuda",
  BND: "Brunei",
  BOB: "Bolivia",
  BRL: "Brazil",
  BSD: "Bahamas",
  BTC: "Bitcoin", // Special case
  BTN: "Bhutan",
  BWP: "Botswana",
  BYN: "Belarus",
  BYR: "Belarus",
  BZD: "Belize",
  CAD: "Canada",
  CDF: "Congo (Congo-Brazzaville)",
  CHF: "Switzerland",
  CLF: "Chile",
  CLP: "Chile",
  CNY: "China",
  CNH: " Chinese Yuan (Offshore)",
  COP: "Colombia",
  CRC: "Costa Rica",
  CUC: "Cuba",
  CUP: "Cuba",
  CVE: "Cape Verde",
  CZK: "Czech Republic",
  DJF: "Djibouti",
  DKK: "Denmark",
  DOP: "Dominican Republic",
  DZD: "Algeria",
  EGP: "Egypt",
  ERN: "Eritrea",
  ETB: "Ethiopia",
  EUR: "Eurozone",
  FJD: "Fiji",
  GBP: "United Kingdom",
  GGP: "Guernsey",
  GHS: "Ghana",
  GIP: "Gibraltar",
  GMD: "Gambia",
  GNF: "Guinea",
  GTQ: "Guatemala",
  GYD: "Guyana",
  HKD: "Hong Kong",
  HNL: "Honduras",
  HRK: "Croatia",
  HTG: "Haiti",
  HUF: "Hungary",
  IDR: "Indonesia",
  ILS: "Israel",
  IMP: "Isle of Man",
  INR: "India",
  IQD: "Iraq",
  IRR: "Iran",
  ISK: "Iceland",
  JEP: "Jersey",
  JMD: "Jamaica",
  JOD: "Jordan",
  JPY: "Japan",
  KES: "Kenya",
  KGS: "Kyrgyzstan",
  KHR: "Cambodia",
  KMF: "Comoros",
  KPW: "North Korea",
  KRW: "South Korea",
  KWD: "Kuwait",
  KYD: "Cayman Islands",
  KZT: "Kazakhstan",
  LAK: "Laos",
  LBP: "Lebanon",
  LKR: "Sri Lanka",
  LRD: "Liberia",
  LSL: "Lesotho",
  LTL: "Lithuania",
  LVL: "Latvia",
  LYD: "Libya",
  MAD: "Morocco",
  MDL: "Moldova",
  MGA: "Madagascar",
  MKD: "Macedonia",
  MMK: "Myanmar",
  MNT: "Mongolia",
  MOP: "Macau",
  MRU: "Mauritania",
  MUR: "Mauritius",
  MVR: "Maldives",
  MWK: "Malawi",
  MXN: "Mexico",
  MYR: "Malaysia",
  MZN: "Mozambique",
  NAD: "Namibia",
  NGN: "Nigeria",
  NIO: "Nicaragua",
  NOK: "Norway",
  NPR: "Nepal",
  NZD: "New Zealand",
  OMR: "Oman",
  PAB: "Panama",
  PEN: "Peru",
  PGK: "Papua New Guinea",
  PHP: "Philippines",
  PKR: "Pakistan",
  PLN: "Poland",
  PYG: "Paraguay",
  QAR: "Qatar",
  RON: "Romania",
  RSD: "Serbia",
  RUB: "Russia",
  RWF: "Rwanda",
  SAR: "Saudi Arabia",
  SBD: "Solomon Islands",
  SCR: "Seychelles",
  SDG: "Sudan",
  SEK: "Sweden",
  SGD: "Singapore",
  SHP: "Saint Helena",
  SLE: "Sierra Leone",
  SLL: "Sierra Leone",
  SOS: "Somalia",
  SRD: "Suriname",
  STD: "São Tomé and Príncipe",
  SVC: "El Salvador",
  SYP: "Syria",
  SZL: "Swaziland",
  THB: "Thailand",
  TJS: "Tajikistan",
  TMT: "Turkmenistan",
  TND: "Tunisia",
  TOP: "Tonga",
  TRY: "Turkey",
  TTD: "Trinidad and Tobago",
  TWD: "Taiwan",
  TZS: "Tanzania",
  UAH: "Ukraine",
  UGX: "Uganda",
  USD: "United States",
  UYU: "Uruguay",
  UZS: "Uzbekistan",
  VES: "Venezuela",
  VND: "Vietnam",
  VUV: "Vanuatu",
  WST: "Samoa",
  XAF: "Central African CFA",
  XAG: "Silver Ounce",
  XAU: "Gold Ounce",
  XCD: "East Caribbean Dollar",
  XDR: "Special Drawing Rights",
  XOF: "West African CFA",
  XPF: "CFP Franc",
  YER: "Yemen",
  ZAR: "South Africa",
  ZMK: "Zambia",
  ZMW: "Zambia",
  ZWL: "Zimbabwe",
};

const renderContent = (step) => {
  switch (step) {
    case 0:
      return <Country />;
    case 1:
      return "Number of signals in a day";
    case 2:
      return "Your Starting capital";
    case 3:
      return "Set the time of the signals";
    case 4:
      return "Reminder for signals";
    case 5:
      return "Review All Information";
    default:
      return null;
  }
};

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["1", "2", "3", "4", "5", "6"];
  const { isDarkMode } = useThemeStore();

  const theme = isDarkMode ? darkTheme : lightTheme;
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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

      <AnimatedContent key={currentStep} theme={theme}>
        {renderContent(currentStep)}
      </AnimatedContent>

      <StepperNavigation>
        <Button onClick={handlePrev} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </StepperNavigation>
    </div>
  );
};

export default Stepper;
