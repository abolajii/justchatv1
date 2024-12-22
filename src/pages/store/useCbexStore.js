import { create } from "zustand";

const useCbexStore = create((set) => {
  return {
    country: "",
    numberOfSignals: 2,
    selectedOption: "default",
    customTrades: "",
    exchangeRate: null,
    tradeSchedule: "before_after",
    secCustomTrade: "",
    startingCapital: "",
    reminder: "",
    signalTimeStartAndEndDate: [],
    reminderSettings: [],

    setCountry: (country) => set({ country }),
    setNumberOfSignals: (numberOfSignals) => set({ numberOfSignals }),
    setSelectedOption: (selectedOption) => set({ selectedOption }),
    setCustomTrades: (customTrades) => set({ customTrades }),
    setExchangeRate: (exchangeRate) => set({ exchangeRate }),
    setTradeSchedule: (tradeSchedule) => set({ tradeSchedule }),
    setSecCustomTrade: (secCustomTrade) => set({ secCustomTrade }),
    setStartingCapital: (startingCapital) => set({ startingCapital }),
    setSignalTimeStartAndEndDate: (signalTimeStartAndEndDate) =>
      set({ signalTimeStartAndEndDate }),
    setReminderSettings: (reminderSettings) => set({ reminderSettings }),
    setReminder: (reminder) => set({ reminder }),
  };
});

export default useCbexStore;
