'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  createRegisterStore,
  initRegisterStore,
} from '@/stores/register-store';

export const RegisterStoreContext = createContext(undefined);

export const RegisterStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createRegisterStore(initRegisterStore());
  }

  return (
    <RegisterStoreContext.Provider value={storeRef.current}>
      {children}
    </RegisterStoreContext.Provider>
  );
};

export const useRegisterStore = (selector) => {
  const registerStoreContext = useContext(RegisterStoreContext);

  if (!registerStoreContext) {
    throw new Error('useRegisterStore must be used within RegisterStoreProvider');
  }

  return useStore(registerStoreContext, selector);
};
