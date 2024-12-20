import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setTheme: (mode) => set({ isDarkMode: mode }),
    }),
    {
      name: "theme-storage", // name of the item in localStorage
      getStorage: () => localStorage,
    }
  )
);

export default useThemeStore;

export const lightTheme = {
  background: "#fff",
  textPrimary: "#333",
  textSecondary: "#666",
  inputBackground: "#f9f9f9",
  inputBorder: "#e0e0e0",
  borderColor: "#ebebeb",
  iconColor: "#a2a2a2",
  primaryColor: "#43ddcd",
  secondaryPrimary: "#ff8a65", // A complementary secondary primary color
  btnColor: "#43ddcd", // Matches the primary color for buttons
  disabledColor: "#ccc",
  avatarBorder: "rgba(0,0,0,0.1)",
};

export const darkTheme = {
  background: "#121212",
  textPrimary: "#e0e0e0",
  textSecondary: "#888",
  inputBackground: "#1e1e1e",
  inputBorder: "#333",
  borderColor: "#333",
  iconColor: "#a2a2a2",
  primaryColor: "#3a8179",
  secondaryPrimary: "#ff8a65", // Matches with lightTheme for consistency
  btnColor: "#3a8179", // Matches the primary color for buttons
  disabledColor: "#555",
  avatarBorder: "rgba(255,255,255,0.1)",
};
