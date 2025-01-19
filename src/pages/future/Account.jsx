import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { GoArrowSwitch } from "react-icons/go";
import { PiApproximateEqualsBold } from "react-icons/pi";
import { Eye, EyeOff, X } from "lucide-react";
import { getUserSignal } from "../../api/request";
import useUserStore from "../../store/useUserStore";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSignalStore from "./store/useSignalStore";
import CountDown from "./CountDown";

const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin-top: 60px;
  color: #abb3c0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 340px;
  position: relative;
  border-radius: 8px;
`;

const Inner = styled.div`
  background-color: #151515;
  height: 100%;
  padding: 20px;
`;

const Welcome = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

const Balance = styled.h1`
  margin-top: -5px;
  font-weight: normal;
`;

const SmallBalance = styled.div`
  margin-bottom: 6px;
  font-size: 18px;
  margin-left: 1px;
  margin-right: 3px;
`;

const ExchangeRate = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 15px;
`;

const Toggle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #181818;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #202020;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 5px;
  color: #22c55e;
`;

const MaskToggle = styled(Toggle)`
  margin-left: 0;
`;

const DateDisplay = styled.div`
  position: absolute;
  bottom: 0px;
  left: 20px;
  font-size: 14px;
  color: #9ca3af;
`;

const LoadingPlaceholder = styled.div`
  height: 24px;
  width: 120px;
  background-color: #202020;
  border-radius: 4px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffffff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #272727;

  color: white;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid rgba(34, 197, 94, 0.2);

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: #1e1e1e;
  border: 1px solid #2d2d2d;
  border-radius: 6px;
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 16px;

  &:focus {
    outline: none;
    /* border-color: #22c55e; */

    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const ModalContent = styled.div`
  background-color: #151515;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
  animation: ${slideIn} 0.3s ease;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const AddFundsButton = styled.button`
  background-color: #272727;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  .title {
    font-size: 14px;
    /* font-weight: 600; */
    color: #e9e9e9;
  }

  &:hover {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.1);
  }
`;

const Account = () => {
  const countryValue = 1656.0; // NGN to USD rate
  const { defaultValue, setDefaultValue } = useSignalStore();

  const [currencyValue, setCurrencyValue] = useState(0);
  const [isNaira, setIsNaira] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { user } = useUserStore();

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const handleAddFunds = () => {
    // Handle the add funds logic here
    console.log("Adding funds:", amount);
    setShowModal(false);
    setAmount("");
  };

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        setIsLoading(true);
        const response = await getUserSignal();
        if (response?.startingCapital) {
          const dollarAmount = response.startingCapital;
          const nairaAmount = dollarAmount * countryValue;

          // Initially show Naira as primary currency
          setCurrencyValue(nairaAmount);
          setDefaultValue(dollarAmount);
          // setBalance(dollarAmount);
        }
      } catch (error) {
        console.error("Failed to fetch signal:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignal();
  }, []);

  const formatNumber = (number) => {
    const [integerPart, decimalPart] = number?.toFixed(2).split(".");
    return {
      integerPart: new Intl.NumberFormat().format(parseInt(integerPart)),
      decimalPart,
    };
  };

  const toggleValue = () => {
    setCurrencyValue(defaultValue);
    setDefaultValue(currencyValue);
    setIsNaira(!isNaira);
  };

  const getMaskedValue = () => "****";

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Container>
        <div>
          {/* <SubmitButton>delete</SubmitButton> */}

          <div
            className="flex text-sm align-center mb-3 pointer"
            onClick={() => navigate("/dashboard")}
          >
            <MdChevronLeft size={20} />
            Back to JustChat
          </div>
        </div>
        <Inner>
          <div className="flex items-center justify-between">
            <Welcome>Welcome, {user.username}</Welcome>
            <IconContainer>
              <MaskToggle onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
              </MaskToggle>
              <Toggle onClick={toggleValue}>
                <GoArrowSwitch size={14} />
              </Toggle>
            </IconContainer>
          </div>
          {isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <div className="flex align-end">
              <Balance>
                {isNaira ? "₦" : "$"}
                {showBalance
                  ? formatNumber(currencyValue).integerPart
                  : getMaskedValue()}
                .
              </Balance>
              <div className="flex align-center">
                <SmallBalance>
                  {showBalance ? formatNumber(currencyValue).decimalPart : "**"}
                </SmallBalance>
                {showBalance && (
                  <ExchangeRate>
                    <PiApproximateEqualsBold />
                    {isNaira ? "$" : "₦"}
                    {formatNumber(defaultValue).integerPart}.
                    {formatNumber(defaultValue).decimalPart}
                  </ExchangeRate>
                )}
              </div>
            </div>
          )}
          {!isLoading && (
            <AddFundsButton onClick={() => setShowModal(true)}>
              Deposit
            </AddFundsButton>
          )}
        </Inner>

        <DateDisplay>{formatDate()}</DateDisplay>
      </Container>

      {showModal && (
        <ModalOverlay
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>
              <X size={20} />
            </CloseButton>
            <ModalTitle>Add Funds</ModalTitle>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
            <SubmitButton onClick={handleAddFunds}>Add Funds</SubmitButton>
          </ModalContent>
        </ModalOverlay>
      )}
      {/* <CountDown /> */}
    </>
  );
};

export default Account;
