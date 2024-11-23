// store/useModalStore.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  isModalStatusOpen: false,
  openModalStatus: () => set({ isModalStatusOpen: true }),
  closeModalStatus: () => set({ isModalStatusOpen: false }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
