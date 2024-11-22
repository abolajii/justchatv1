import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: false, // Initial authentication state
  login: () => set({ isAuthenticated: true }), // Simulate login
  logout: () => set({ isAuthenticated: false }), // Simulate logout
}));

export default useAuthStore;
