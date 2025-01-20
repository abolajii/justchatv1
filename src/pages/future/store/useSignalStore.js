import { create } from "zustand";

const useSignalStore = create((set) => {
  return {
    defaultValue: 0.0,
    setDefaultValue: (defaultValue) => set({ defaultValue }),
    weeklyCapital: 0.0,
    setWeeklyCapital: (weeklyCapital) => set({ weeklyCapital }),
    signals: [],
    setSignals: (signals) => set({ signals }),
    selectedSignal: null,
    setSelectedSignal: (selectedSignal) => set({ selectedSignal }),
    selectedOption: "default",
  };
});

export default useSignalStore;
