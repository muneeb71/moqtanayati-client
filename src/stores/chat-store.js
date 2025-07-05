import { createStore } from "zustand/vanilla";

export const initChatStore = () => {
  return {
    conversations: [],
    selectedChat: null,
    setConversations: (conversations) => set({ conversations }),
    setSelectedChat: (selectedChat) => set({ selectedChat }),
  };
};

export const defaultInitState = {};

export const createChatStore = (initState = defaultInitState) => {
  return createStore((set) => ({
    ...initState,
    conversations: [],
    selectedChat: null,
    setConversations: (conversations) => set({ conversations }),
    setSelectedChat: (selectedChat) => set({ selectedChat }),
  }));
};
