"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { createProductStore, initProductStore } from "@/stores/product-store";

// ✅ Create Context
export const ProductStoreContext = createContext(undefined);

export const ProductStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createProductStore(initProductStore());
  }

  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductStoreContext.Provider>
  );
};

// ✅ Update Hook to Work Without Selector
export const useProductStore = (selector = (state) => state) => {
  const productStoreContext = useContext(ProductStoreContext);

  if (!productStoreContext) {
    throw new Error("useProductStore must be used within ProductStoreProvider");
  }

  return useStore(productStoreContext, selector);
};
