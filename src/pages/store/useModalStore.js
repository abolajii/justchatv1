import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  isModalStatusOpen: false,
  isReuseableModalOpen: false,
  isPollModalOpen: false, // State for Poll Modal
  isScheduleModalOpen: false, // State for Schedule Modal

  // Status Modal Actions
  openModalStatus: () => set({ isModalStatusOpen: true }),
  closeModalStatus: () => set({ isModalStatusOpen: false }),

  // General Modal Actions
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),

  // Reusable Modal Actions
  openReuseableModal: () => set({ isReuseableModalOpen: true }),
  closeReuseableModal: () => set({ isReuseableModalOpen: false }),

  // Poll Modal Actions
  openPollModal: () => set({ isPollModalOpen: true }),
  closePollModal: () => set({ isPollModalOpen: false }),

  // Schedule Modal Actions
  openScheduleModal: () => set({ isScheduleModalOpen: true }),
  closeScheduleModal: () => set({ isScheduleModalOpen: false }),
}));

export default useModalStore;
