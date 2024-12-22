import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

const CardContainer = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem;
  color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  height: 300px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Welcome = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const DateDisplay = styled.p`
  color: #9ca3af;
  margin: 0;
  font-size: 0.875rem;
`;

const BalanceSection = styled.div`
  margin: 1.5rem 0;
`;

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const BalanceLabel = styled.span`
  color: #9ca3af;
  font-size: 0.875rem;
`;

const BalanceAmount = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffffff;
  }
`;

const ConversionRate = styled.div`
  background-color: #272727;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const AccountCard = ({ username = "User", balance = 5000 }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const nairaRate = 1500; // Example conversion rate (1 USD = 1500 NGN)
  const today = new Date();

  const formatBalance = (amount) => {
    return isBalanceVisible
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
      : "••••••";
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <CardContainer>
      <Header>
        <Welcome>Welcome back, {username}</Welcome>
        <DateDisplay>{format(today, "MMMM d, yyyy")}</DateDisplay>
      </Header>

      <BalanceSection>
        <BalanceRow>
          <BalanceLabel>Account Balance</BalanceLabel>
          <BalanceAmount>
            {formatBalance(balance)}
            <ToggleButton onClick={toggleBalanceVisibility}>
              {isBalanceVisible ? "👁️" : "👁️‍🗨️"}
            </ToggleButton>
          </BalanceAmount>
        </BalanceRow>

        <ConversionRate>
          {isBalanceVisible ? (
            <>
              Naira Equivalent: ₦
              {new Intl.NumberFormat().format(balance * nairaRate)}
              <br />
              <small>Rate: $1 = ₦{nairaRate}</small>
            </>
          ) : (
            "••••••"
          )}
        </ConversionRate>
      </BalanceSection>
    </CardContainer>
  );
};

export default AccountCard;
