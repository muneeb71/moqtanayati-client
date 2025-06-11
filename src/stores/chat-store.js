import { createStore } from "zustand/vanilla";

export const initChatStore = () => {
  return {};
};

export const defaultInitState = {};

export const createChatStore = (initState = defaultInitState) => {
  return createStore((set) => ({
    ...initState,
  }));
};
