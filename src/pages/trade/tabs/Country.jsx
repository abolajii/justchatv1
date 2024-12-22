import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useThemeStore, {
  darkTheme,
  lightTheme,
} from "../../../store/useThemeStore";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

import data from "../../../data/rate.json";
import useCbexStore from "../../store/useCbexStore";
import { AlertCircle } from "lucide-react";
import ErrorMessage from "../../../components/Error";

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

const FormGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Select = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 10px;
`;

const DropDownItem = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.borderColor};
  }
`;

const RateDisplay = styled.div`
  margin-top: 10px;
  padding: 15px;
  background: ${({ theme }) => theme.backgroundSecondary || theme.background};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const Country = ({ error }) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  const { setCountry, country, exchangeRate, setExchangeRate } = useCbexStore();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (country) => {
    setCountry(country);
    const selectedCurrencyData = countries.find((c) => c.code === country.code);
    setIsOpen(false);
    setExchangeRate(selectedCurrencyData?.rate);
  };

  // Fetch Countries and Exchange Rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
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

  return (
    <FormGroup>
      <ErrorMessage error={error} />
      <Label theme={theme}>Select Your Country</Label>
      <Select theme={theme} onClick={toggleDropdown}>
        <div>
          {country
            ? `${country?.name} (${country?.code})`
            : "Select your country..."}
        </div>
        <div>
          {isOpen ? <MdArrowDropUp size={25} /> : <MdArrowDropDown size={25} />}
        </div>
      </Select>
      {isOpen && (
        <DropDown theme={theme}>
          {countries
            .filter((c) => c.country !== "" && c.code !== "BTC")
            .map((country, index) => (
              <DropDownItem
                key={index}
                theme={theme}
                onClick={() => handleSelect(country)}
              >
                {country.name} ({country.code})
              </DropDownItem>
            ))}
        </DropDown>
      )}

      {exchangeRate && (
        <RateDisplay theme={theme}>
          <p>Current Exchange Rate:</p>
          <p>
            1 USD = {exchangeRate} {country?.code}
          </p>
        </RateDisplay>
      )}
    </FormGroup>
  );
};

export default Country;
