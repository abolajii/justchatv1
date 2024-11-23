import { create } from "zustand";

const useStoryStore = create((set) => ({
  text: "",
  image: null,
  allStories: [],
  activeTab: "Text",
  bgColor: "#4D8456",
  fontFamily: "",
  selectedStory: null,

  setText: (newText) => set({ text: newText }),
  setImage: (imageData) => set({ image: imageData }),
  setFontFamily: (font) => set({ fontFamily: font }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setBgColor: (color) => set({ bgColor: color }),
  setAllStories: (stories) => set({ allStories: stories }),
  selectStory: (story) => set({ selectedStory: story }),
  handleViewStory: (storyId, userId) => {
    set((state) => {
      const updatedStories = state.allStories.map((storyGroup) => {
        const updatedGroupStories = storyGroup.stories.map((story) => {
          if (story._id === storyId) {
            // Check if the user has already viewed the story
            const alreadyViewed = story.views.some(
              (view) => view.user?._id === userId
            );

            if (!alreadyViewed) {
              // Add a new view object with userId and viewedAt
              return {
                ...story,
                views: [
                  ...story.views,
                  { user: userId, viewedAt: new Date().toISOString() },
                ],
              };
            }
          }
          return story;
        });
        return { ...storyGroup, stories: updatedGroupStories };
      });

      return { allStories: updatedStories };
    });
  },

  reset: () =>
    set({
      text: "",
      image: null,
      fontFamily: "Roboto",
      activeTab: "Text",
    }),
}));

export default useStoryStore;
