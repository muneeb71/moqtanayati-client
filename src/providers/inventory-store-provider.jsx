'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  createInventoryStore,
  initInventoryStore,
} from '@/stores/inventory-store';

export const InventoryStoreContext = createContext(undefined);

export const InventoryStoreProvider = ({ children }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createInventoryStore(initInventoryStore());
  }

  return (
    <InventoryStoreContext.Provider value={storeRef.current}>
      {children}
    </InventoryStoreContext.Provider>
  );
};

export const useInventoryStore = (selector) => {
  const inventoryStoreContext = useContext(InventoryStoreContext);

  if (!inventoryStoreContext) {
    throw new Error('useInventoryStore must be used within InventoryStoreProvider');
  }

  return useStore(inventoryStoreContext, selector);
};
