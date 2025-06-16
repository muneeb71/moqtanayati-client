import { createStore } from "zustand/vanilla";

export const initAuctionStore = () => {
  return {
    auctionProducts: [],
  };
};

export const defaultInitState = {
  auctionProducts: [],
};

export const createAuctionStore = (
  initState = defaultInitState,
  auctionProducts,
) => {
  const store = createStore((set) => ({
    ...initState,
    setAuctionProducts: (auctionProducts) => set({ auctionProducts }),
  }));

  if (auctionProducts) {
    store.setState({ auctionProducts });
  }

  return store;
};
