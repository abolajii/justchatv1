import { format } from "date-fns";
import React from "react";

import styled from "styled-components";
import useSignalStore from "../store/useSignalStore";
import { create } from "zustand";

// const ItemsTable = styled.div`
//   margin-top: 1rem;
// `;

// const ItemsHeader = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   /* grid-template-columns: 2fr 1fr 1fr; */
//   padding: 0.5rem;
//   background-color: #374151;
//   border-radius: 4px;
//   margin-bottom: 0.5rem;
//   color: #d1d5db;
//   font-weight: 500;
// `;

// const ItemRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);

//   padding: 0.5rem;
//   border-bottom: 1px solid #374151;
//   color: #d1d5db;
// `;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

// const SummarySection = styled.div`
//   margin-top: 1.5rem;
//   padding-top: 1.5rem;
//   border-top: 1px solid #374151;
//   display: flex;
//   justify-content: space-between;
//   color: #d1d5db;
// `;

// const SummaryItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const SummaryLabel = styled.span`
//   font-size: 0.875rem;
//   color: #9ca3af;
// `;

// const SummaryValue = styled.span`
//   font-size: 1rem;
//   font-weight: bold;
//   color: #ffffff;
// `;
const calculateDaysFromNow = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// components/Calendar/utils/calculations.js
// const NGN_TO_USD_RATE = 1656.0;

const calculateDailyProfits = (initialCapital, numSignals) => {
  let currentCapital = initialCapital;
  const profits = [];

  for (let i = 0; i < numSignals; i++) {
    const tradeAmount = currentCapital * 0.01;
    const remainingBalance = currentCapital - tradeAmount;
    const tradeProfit = tradeAmount * 0.88;
    currentCapital = remainingBalance + tradeAmount + tradeProfit;
    profits.push({
      tradeNumber: `Signal ${i + 1}`,
      profit: tradeProfit,
      newCapital: currentCapital,
    });
  }

  return {
    finalCapital: currentCapital,
    totalProfit: currentCapital - initialCapital,
    trades: profits,
  };
};

const calculateDaysToTarget = (
  targetAmount,
  dailyCapitalInfo,
  currentCapital
) => {
  const dailyProfit = dailyCapitalInfo.totalProfit;
  const remainingAmount = targetAmount - currentCapital;

  if (remainingAmount <= 0) return 0;
  return Math.ceil(remainingAmount / dailyProfit);
};

// const calculateItemAffordability = (
//   item,
//   totalUserCapitalInDollars,
//   totalUserSignalsInADay
// ) => {
//   const itemPriceUSD =
//     item.currency === "NGN" ? item.price / NGN_TO_USD_RATE : item.price;

//   const dailyResults = calculateDailyProfits(
//     totalUserCapitalInDollars,
//     totalUserSignalsInADay
//   );

//   const canAfford = totalUserCapitalInDollars >= itemPriceUSD;

//   const daysNeeded = calculateDaysToTarget(
//     itemPriceUSD,
//     dailyResults,
//     totalUserCapitalInDollars
//   );

//   return {
//     canAfford,
//     daysNeeded,
//     shortfall: canAfford ? 0 : itemPriceUSD - totalUserCapitalInDollars,
//   };
// };

// const formatCurrency = (value, currency) => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency,
//     minimumFractionDigits: 2,
//   }).format(value);
// };

// import { format } from "date-fns";
// import React from "react";
// import { create } from "zustand";
// import styled from "styled-components";
// import useSignalStore from "../store/useSignalStore";

// Styled components remain the same...
const ItemsTable = styled.div`
  margin-top: 1rem;
`;

const ItemsHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.5rem;
  background-color: #374151;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #d1d5db;
  font-weight: 500;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0.5rem;
  border-bottom: 1px solid #374151;
  color: #d1d5db;
`;

const SummarySection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #374151;
  display: flex;
  justify-content: space-between;
  color: #d1d5db;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SummaryLabel = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const SummaryValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
`;

const CurrencyToggle = styled.button`
  padding: 0.5rem 1rem;
  background-color: #374151;
  color: #d1d5db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background-color: #4b5563;
  }
`;

// Constants
const NGN_TO_USD_RATE = 1656.0;

// Create currency store
const useCurrencyStore = create((set) => ({
  preferredCurrency: "₦",
  toggleCurrency: () =>
    set((state) => ({
      preferredCurrency: state.preferredCurrency === "₦" ? "USD" : "₦",
    })),
}));

// Utility functions
const formatCurrency = (value, originalCurrency) => {
  const { preferredCurrency } = useCurrencyStore.getState();
  let convertedValue = value;

  // Convert if currencies don't match
  if (originalCurrency !== preferredCurrency) {
    if (originalCurrency === "₦" && preferredCurrency === "USD") {
      convertedValue = value / NGN_TO_USD_RATE;
    } else if (originalCurrency === "USD" && preferredCurrency === "₦") {
      convertedValue = value * NGN_TO_USD_RATE;
    }
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: preferredCurrency,
    minimumFractionDigits: 2,
  }).format(convertedValue);
};

// // Other calculation functions remain the same...
const calculateItemAffordability = (
  item,
  totalUserCapitalInDollars,
  totalUserSignalsInADay
) => {
  const itemPriceUSD =
    item.currency === "₦" ? item.price / NGN_TO_USD_RATE : item.price;

  const dailyResults = calculateDailyProfits(
    totalUserCapitalInDollars,
    totalUserSignalsInADay
  );

  const canAfford = totalUserCapitalInDollars >= itemPriceUSD;

  const daysNeeded = calculateDaysToTarget(
    itemPriceUSD,
    dailyResults,
    totalUserCapitalInDollars
  );

  return {
    canAfford,
    daysNeeded,
    shortfall: canAfford ? 0 : itemPriceUSD - totalUserCapitalInDollars,
  };
};

const ViewListItem = ({ folders, viewingFolder }) => {
  const { defaultValue: totalUserCapitalInDollars } = useSignalStore();
  const totalUserSignalsInADay = 2;
  const preferredCurrency = useCurrencyStore(
    (state) => state.preferredCurrency
  );
  const toggleCurrency = useCurrencyStore((state) => state.toggleCurrency);

  // Calculate totals
  const totalDaysNeeded = folders[viewingFolder].items.reduce((sum, item) => {
    const affordability = calculateItemAffordability(
      item,
      totalUserCapitalInDollars,
      totalUserSignalsInADay
    );
    return sum + (affordability.canAfford ? 0 : affordability.daysNeeded);
  }, 0);

  const totalAmount = folders[viewingFolder].items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <CurrencyToggle onClick={toggleCurrency}>
          {preferredCurrency === "₦" ? "Switch to USD" : "Switch to NGN"}
        </CurrencyToggle>
      </div>
      <ItemsTable>
        <ItemsHeader>
          <span>Item Name</span>
          <span>Expected Date</span>
          <span>Days Needed</span>
          <span>Price</span>
          <span>Amount Needed</span>
        </ItemsHeader>
        {folders[viewingFolder].items.map((item, index) => {
          const affordability = calculateItemAffordability(
            item,
            totalUserCapitalInDollars,
            totalUserSignalsInADay
          );

          const price = affordability.shortfall * NGN_TO_USD_RATE;

          return (
            <ItemRow key={index}>
              <span>{item.name}</span>
              <span>{format(new Date(item.date), "MMM d, yyyy")}</span>
              <span>
                {affordability.canAfford
                  ? "Available now"
                  : `${affordability.daysNeeded} days`}
              </span>
              <span>{formatCurrency(item.price, item.currency)}</span>
              <span>
                {affordability.canAfford
                  ? "N/A"
                  : formatCurrency(price, item.currency)}
              </span>
            </ItemRow>
          );
        })}
      </ItemsTable>
      <SummarySection>
        <SummaryItem>
          <SummaryLabel>Total Items</SummaryLabel>
          <SummaryValue>{folders[viewingFolder].items.length}</SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>Total Amount</SummaryLabel>
          <SummaryValue>
            {formatCurrency(totalAmount, preferredCurrency)}
          </SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>Total Days Needed</SummaryLabel>
          <SummaryValue>
            {totalDaysNeeded} {totalDaysNeeded === 1 ? "day" : "days"}
          </SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>Total Shortfall</SummaryLabel>
          <SummaryValue>
            {formatCurrency(
              totalAmount - totalUserCapitalInDollars,
              preferredCurrency
            )}
          </SummaryValue>
        </SummaryItem>
      </SummarySection>
    </>
  );
};

export default ViewListItem;
