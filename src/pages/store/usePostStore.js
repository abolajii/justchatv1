import { create } from "zustand";

// Define your state
const usePostStore = create((set) => ({
  content: "",
  setContent: (content) => set({ content }),

  // Add image and file states
  image: null,
  setImage: (image) => set({ image }),

  file: null,
  setFile: (file) => set({ file }),
}));

export default usePostStore;
