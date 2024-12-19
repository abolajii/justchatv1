import { create } from "zustand";

const useBookmarkStore = create((set) => ({
  bookmarks: [],
  selectedBookmark: null,
  setSelectedBookmark: (bookmark) => set({ selectedBookmark: bookmark }),
  setBookmarks: (bookmarks) => set({ bookmarks }),
  addBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: [
        ...state.bookmarks,
        {
          ...bookmark,
          _id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ],
    })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    })),
  updateBookmark: (id, updates) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      ),
    })),
}));

export default useBookmarkStore;
