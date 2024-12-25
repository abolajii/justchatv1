import React from "react";
import styled from "styled-components";

const ResultContainer = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #151515;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 9px;
  width: 450px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const HeaderText = styled.div`
  h3 {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    color: #e0e0e0;
    font-size: 14px;
  }
`;

const StatusBadge = styled.div`
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 14px;
  background-color: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Card = styled.div`
  padding: 16px;
  background-color: #272727;
  border-radius: 9px;
`;

const Label = styled.p`
  color: #e0e0e0;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Value = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

const NairaValue = styled.p`
  color: #22c55e;
  font-size: 12px;
  margin-top: 8px;
`;

const ProfitCard = styled(Card)`
  margin-top: 16px;
`;

const ProfitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfitPercentage = styled.span`
  color: #22c55e;
  font-size: 14px;
`;

const SignalResult = ({ signal }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#22c55e";
      case "failed":
        return "#dc2626";
      default:
        return "#e0e0e0";
    }
  };

  const NGN_TO_USD_RATE = 1656.0;

  // Correct calculation based on the provided formula
  const firstTradeTotalAmount = signal.capital * 0.01;
  const firstTradeRemainingBalance = signal.capital - firstTradeTotalAmount;
  const firstTradeProfit = firstTradeTotalAmount * 0.88;
  const finalAmount =
    firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit;
  const profitAmount = finalAmount - signal.capital;
  const profitPercentage = (
    ((finalAmount - signal.capital) / signal.capital) *
    100
  ).toFixed(2);

  return (
    <ResultContainer>
      <Header>
        <HeaderText>
          <h3>Signal Results</h3>
          <p>Completed today at {signal.time.split("-")[1]}</p>
        </HeaderText>
        <StatusBadge color={getStatusColor(signal.status)}>
          {signal.status === "completed" ? "Success" : "Failed"}
        </StatusBadge>
      </Header>

      <GridContainer>
        <Card>
          <Label>Initial Capital</Label>
          <Value>
            $
            {signal?.prevCapital.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Value>
          <NairaValue>
            ₦
            {(signal?.prevCapital * NGN_TO_USD_RATE).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </NairaValue>
        </Card>

        <Card>
          <Label>Final Amount</Label>
          <Value>
            $
            {signal.capital.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Value>
          <NairaValue>
            ₦
            {(signal.capital * NGN_TO_USD_RATE).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </NairaValue>
        </Card>
      </GridContainer>

      <ProfitCard>
        <ProfitHeader>
          <Label>Profit Generated</Label>
          <ProfitPercentage>+{profitPercentage}%</ProfitPercentage>
        </ProfitHeader>
        <Value>
          ${profitAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Value>
        <NairaValue>
          ₦
          {(profitAmount * NGN_TO_USD_RATE).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </NairaValue>
      </ProfitCard>
    </ResultContainer>
  );
};

export default SignalResult;
