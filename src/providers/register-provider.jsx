"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import {
  createRegisterStore,
  initRegisterStore,
} from "@/stores/register-store";

const RegisterStoreContext = createContext(undefined);

export const RegisterStoreProvider = ({ children }) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = createRegisterStore(initRegisterStore());
  }

  return (
    <RegisterStoreContext.Provider value={storeRef.current}>
      {children}
    </RegisterStoreContext.Provider>
  );
};

export const useRegisterStore = (selector) => {
  const store = useContext(RegisterStoreContext);
  if (!store)
    throw new Error(
      "useRegisterStore must be used within RegisterStoreProvider",
    );

  return useStore(store, selector);
};
