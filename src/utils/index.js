export const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();

  // Get today's and yesterday's start
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Format time
  const timeString = date
    .toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
  // Determine output format
  if (date >= today) {
    return `Today at ${timeString}`;
  } else if (date >= yesterday) {
    return `Yesterday at ${timeString}`;
  } else {
    return (
      date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) + ` at ${timeString}`
    );
  }
};

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const timeDifference = now - date;

  // If more than 24 hours ago, use "MMM dd" format
  if (timeDifference > 24 * 60 * 60 * 1000) {
    const options = { month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Otherwise, use "hh:mm AM/PM" format
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Function to calculate profits based on initial balance
export const calculateDayProfits = (initialBalance) => {
  const firstTradeTotalAmount = initialBalance * 0.01;
  const firstTradeRemainingBalance = initialBalance - firstTradeTotalAmount;
  const firstTradeProfit = firstTradeTotalAmount * 0.88;
  const capitalAfterFirstTrade =
    firstTradeRemainingBalance + firstTradeTotalAmount + firstTradeProfit;

  const secondTradeTotalAmount = capitalAfterFirstTrade * 0.01;
  const secondTradeRemainingBalance =
    capitalAfterFirstTrade - secondTradeTotalAmount;
  const secondTradeProfit = secondTradeTotalAmount * 0.88;
  const finalBalance =
    secondTradeRemainingBalance + secondTradeTotalAmount + secondTradeProfit;

  return {
    signal1Capital: firstTradeTotalAmount,
    signal1Profit: firstTradeProfit,
    signal2Capital: secondTradeTotalAmount,
    signal2Profit: secondTradeProfit,
    totalProfit: finalBalance - initialBalance,
    finalBalance,
  };
};

export const generateWeeklyData = (
  weeklyCapital,
  signalsStatus,
  lastDayDate = null
) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const startDate = lastDayDate
    ? new Date(new Date(lastDayDate).getTime() + 24 * 60 * 60 * 1000)
    : new Date();

  // console.log(startDate, lastDayDate);
  const currentDay = new Date().getDay();

  // Get the date of the most recent Sunday for the new week
  const sundayDate = new Date(startDate);
  sundayDate.setDate(startDate.getDate() - currentDay);

  let runningCapital = weeklyCapital;
  let weeklyData = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(sundayDate);
    date.setDate(sundayDate.getDate() + i);

    const dayProfits = calculateDayProfits(runningCapital);

    // Default status logic
    let status;
    if (i < currentDay) {
      status = "completed";
    } else if (i === currentDay) {
      status = signalsStatus;
    } else {
      status = "pending";
    }

    const dayData = {
      day: `${days[i]}, ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
      startingCapital: runningCapital,
      totalProfit: dayProfits.totalProfit,
      finalCapital: dayProfits.finalBalance,
      status: status,
      date,
      firstSignalProfit: dayProfits.signal1Profit,
      secondSignalProfit: dayProfits.signal2Profit,
      differenceInProfit: dayProfits.signal2Profit - dayProfits.signal1Profit,
    };

    weeklyData.push(dayData);
    runningCapital = dayProfits.finalBalance;
  }

  return weeklyData;
};
