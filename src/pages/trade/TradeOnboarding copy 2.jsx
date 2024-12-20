import React, { useState, useEffect } from "react";
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

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBackground || "#4CAF50"};
  color: ${(props) => props.theme.buttonTextColor || "#fff"};
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
  }

  &:active {
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

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  // ccba9147fa5dd66672086ca0f1dc3659

  // Fetch Countries and Exchange Rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangeratesapi.io/v1/latest?access_key=ccba9147fa5dd66672086ca0f1dc3659`
        );
        const data = await response.json();
        const countryRates = Object.entries(data.rates).map(([code, rate]) => ({
          code,
          rate,
          name: currencyToCountry[code],
        }));
        setCountries(countryRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const selectedCurrencyData = countries.find((c) => c.code === country);
    setExchangeRate(selectedCurrencyData?.rate);
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
          <Label theme={theme}>Select Your Country</Label>
          <Select
            theme={theme}
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countries
              .filter((country) => country.code) // Filter out countries with no code
              .map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} - {country.name}
                </option>
              ))}
          </Select>

          {exchangeRate && (
            <RateDisplay theme={theme}>
              <p>Current Exchange Rate:</p>
              <p>
                1 USD = {exchangeRate} {selectedCountry}
              </p>
            </RateDisplay>
          )}
          <div className="flex justify-end mt-4">
            <Button theme={theme}>Continue</Button>
          </div>
        </FormGroup>

        <FormGroup>
          <Label theme={theme}>What is your starting capital?</Label>
          <Input
            theme={theme}
            value={startingCapital}
            onChange={handleCapitalChange}
            placeholder="Enter amount"
          />

          <div className="flex justify-end mt-4">
            <Button theme={theme}>Continue</Button>
          </div>
        </FormGroup>
      </Inner>
    </Container>
  );
};

export default TradeOnboarding;
