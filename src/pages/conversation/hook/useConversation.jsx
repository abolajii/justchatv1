import { create } from "zustand";

const useConversation = create((set) => {
  return {
    conversations: [],
    setConversations: (conversations) => set({ conversations }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
    currentMessage: "",
    setCurrentMessage: (message) => set({ currentMessage }),
    sendMessage: () => {
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9),
        text: currentMessage,
        timestamp: new Date().toISOString(),
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    },
  };
});

export default useConversation;
