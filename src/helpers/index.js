const getPreviousCapital = (currentCapital) => {
  // This reverses one full day of trading (2 signals)

  // Working backwards from final balance to get capitalAfterFirstTrade
  // finalBalance = secondTradeRemainingBalance + secondTradeTotalAmount + secondTradeProfit
  // finalBalance = (capitalAfterFirstTrade - secondTradeTotalAmount) + secondTradeTotalAmount + (secondTradeTotalAmount * 0.88)
  // finalBalance = capitalAfterFirstTrade + (secondTradeTotalAmount * 0.88)
  // finalBalance = capitalAfterFirstTrade + (capitalAfterFirstTrade * 0.01 * 0.88)
  // finalBalance = capitalAfterFirstTrade * (1 + 0.01 * 0.88)
  const capitalAfterFirstTrade = currentCapital / (1 + 0.01 * 0.88);

  // Working backwards from capitalAfterFirstTrade to get initialBalance
  // capitalAfterFirstTrade = firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit
  // capitalAfterFirstTrade = (initialBalance - firstTradeTotalAmount) + firstTradeTotalAmount + (firstTradeTotalAmount * 0.88)
  // capitalAfterFirstTrade = initialBalance + (firstTradeTotalAmount * 0.88)
  // capitalAfterFirstTrade = initialBalance + (initialBalance * 0.01 * 0.88)
  // capitalAfterFirstTrade = initialBalance * (1 + 0.01 * 0.88)
  const initialBalance = capitalAfterFirstTrade / (1 + 0.01 * 0.88);

  return Number(initialBalance.toFixed(2));
};

const getCapitalForBeginningOfTheWeek = (
  presentCapital,
  completedSignalForTheDay
) => {
  const currentDate = new Date();
  const presentDay = currentDate.getDay();

  //   const dayToNumber = {
  //     sunday: 0,
  //     monday: 1,
  //     tuesday: 2,
  //     wednesday: 3,
  //     thursday: 4,
  //     friday: 5,
  //     saturday: 6,
  //   };

  const dayNumber = presentDay;

  if (dayNumber === 0) return presentCapital;

  let currentCapital = presentCapital;

  // First get to the start of the current day based on completed signals
  if (completedSignalForTheDay > 0) {
    // If 1 signal completed, reverse one signal to get start of day
    // If 2 signals completed, reverse both signals to get start of day
    for (let i = 0; i < completedSignalForTheDay; i++) {
      currentCapital = getPreviousCapital(currentCapital);
    }
  }

  // Now work backwards day by day
  for (let day = dayNumber - 1; day >= 0; day--) {
    currentCapital = getPreviousCapital(currentCapital);
  }

  return currentCapital;
};

export { getCapitalForBeginningOfTheWeek };

// Additional test cases
// const tests = [
//   {
//     scenario: "Tuesday to Sunday",
//     input: {
//       day: "tuesday",
//       capital: 991.12,
//       signals: 2,
//       completed: 0,
//     },
//     expectedOutput: 956.99,
//   },
//   {
//     scenario: "Monday to Sunday",
//     input: {
//       day: "monday",
//       capital: 973.91,
//       signals: 2,
//       completed: 0,
//     },
//     expectedOutput: 956.99,
//   },
// ];
