import { create } from "zustand";

// Define your state
const usePostStore = create((set) => ({
  content: "",
  setContent: (content) => set({ content }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  // Add post state
  allPosts: [],
  setAllPosts: (posts) => set({ allPosts: posts }),
  page: 1,
  setPage: (page) => set({ page: page }),
  // Add image and file states
  image: null,
  setImage: (image) => set({ image }),

  file: null,
  setFile: (file) => set({ file }),
  singlePost: null,
  setSinglePost: (post) => set({ singlePost: post }),
}));

export default usePostStore;
