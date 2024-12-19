import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notifications: [],
  notification: null,
  setSelectedNotification: (notification) => set({ notification }),
  setNotifications: (notifications) => set({ notifications }),
}));

export default useNotificationStore;
