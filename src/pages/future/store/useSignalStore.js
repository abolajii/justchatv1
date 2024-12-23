import { create } from "zustand";

const useSignalStore = create((set) => {
  return {
    defaultValue: 0,
    setDefaultValue: (defaultValue) => set({ defaultValue }),
  };
});

export default useSignalStore;
