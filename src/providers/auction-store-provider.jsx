"use client";

import { createAuctionStore, initAuctionStore } from "@/stores/auction-store";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export const AuctionStoreContext = createContext(undefined);

export const AuctionStoreProvider = ({ children, auctionProducts }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createAuctionStore(initAuctionStore(), auctionProducts);
  }

  return (
    <AuctionStoreContext.Provider value={storeRef.current}>
      {children}
    </AuctionStoreContext.Provider>
  );
};

export const useAuctionStore = (selector) => {
  const auctionStoreContext = useContext(AuctionStoreContext);

  if (!auctionStoreContext) {
    throw new Error("useAuctionStore must be used within AuctionStoreProvider");
  }

  return useStore(auctionStoreContext, selector);
};
