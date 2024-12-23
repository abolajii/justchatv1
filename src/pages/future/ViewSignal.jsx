import React, { useEffect } from "react";
import MainContainer from "./MainContainer";
import { FaArrowRightLong } from "react-icons/fa6";
import styled from "styled-components";
import useSignalStore from "./store/useSignalStore";
import { getUserSignal } from "../../api/request";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const IconWrapper = styled.div`
  height: ${(props) => (props.small ? "30px" : "40px")};
  width: ${(props) => (props.small ? "30px" : "40px")};
  border-radius: 50%;
  border: 1px solid rgba(34, 197, 94, 0.2);
  background-color: #272727;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: ${(props) => (props.small ? "14px" : "18px")};
  flex-shrink: 0;
`;

const Widget = styled.div`
  padding: 16px;
  gap: 10px;
  min-height: 100px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  width: 230px;
  border-radius: 9px;
  background-color: #151515;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 10px;
  font-size: 24px;
  color: #fff;
  font-weight: 500;
`;

const Duration = styled.div`
  color: #e0e0e0;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
`;

const WidgetTop = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const WidgetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.div`
  color: #999;
  font-size: 14px;
`;

const Value = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

const Balance = styled.div`
  color: #999;
  font-size: 14px;
`;

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(parseInt(number));
};

const formatCurrency = (number, includeSymbol = false) => {
  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return includeSymbol ? `₦${formatted}` : formatted;
};

const SignalWidget = ({ label, value, balance }) => (
  <Widget>
    <WidgetTop>
      <WidgetInfo>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </WidgetInfo>
      <IconWrapper small>$</IconWrapper>
    </WidgetTop>
    <Balance>
      {label === "To" ? "Est. return" : "Balance"}: {balance}
    </Balance>
  </Widget>
);

const ViewSignal = () => {
  const { defaultValue, setDefaultValue } = useSignalStore();

  const NGN_TO_USD_RATE = 1656.0;

  const navigate = useNavigate();

  const calculateSignalValues = (initialAmount) => {
    if (!initialAmount) return { current: 0, next: 0 };

    const tradingAmount = initialAmount * 0.01; // 1% of capital
    const remainingBalance = initialAmount - tradingAmount;
    const profitAmount = tradingAmount * 0.88; // 88% profit
    const totalAfterTrade = remainingBalance + tradingAmount + profitAmount;

    return {
      current: initialAmount,
      next: totalAfterTrade,
    };
  };

  const { current, next } = calculateSignalValues(defaultValue);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const response = await getUserSignal();
        if (response?.startingCapital) {
          setDefaultValue(response.startingCapital);
        }
      } catch (error) {
        console.error("Failed to fetch signal:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchSignal();
  }, [setDefaultValue]);

  return (
    <MainContainer>
      <div>
        <div
          className="flex text-sm align-center pointer mt-4 pt-4"
          onClick={() => navigate(-1)}
        >
          <MdChevronLeft size={20} />
        </div>
        <Title>Signal 1</Title>
        <Duration className="align-center">
          <div className="center">
            <IoTimeOutline />
          </div>
          <div className="ml-1">14:00 - 14:30</div>
        </Duration>
        <Container>
          <SignalWidget
            label="From"
            value={formatCurrency(current)}
            balance={formatCurrency(current * NGN_TO_USD_RATE, true)}
          />
          <IconWrapper>
            <FaArrowRightLong />
          </IconWrapper>
          <SignalWidget
            label="To"
            value={formatCurrency(next)}
            balance={formatCurrency(next * NGN_TO_USD_RATE, true)}
          />
        </Container>
      </div>
    </MainContainer>
  );
};

export default ViewSignal;
