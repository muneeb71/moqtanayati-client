"use client";

import { createContext, useContext } from "react";
import { createProductsStore } from "@/stores/products-store";

const ProductsStoreContext = createContext(null);

export const ProductsStoreProvider = ({ children }) => {
  const store = createProductsStore();
  return (
    <ProductsStoreContext.Provider value={store}>
      {children}
    </ProductsStoreContext.Provider>
  );
};

export const useProductsStore = () => {
  const store = useContext(ProductsStoreContext);
  if (!store) {
    throw new Error(
      "useProductsStore must be used within ProductsStoreProvider",
    );
  }
  return store;
};
