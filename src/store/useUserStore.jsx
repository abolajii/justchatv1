import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Store user data (initially null)
      token: null, // Store the JWT token
      setCurrentUser: (userData) => set({ user: userData }), // Function to set user data
      setUser: (userData, token) => set({ user: userData, token }), // Function to set user and token
      clearUser: () => set({ user: null, token: null }), // Function to clear user data and token
    }),
    {
      name: "user-store", // Key for localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // Persist only user and token
    }
  )
);

export default useUserStore;
