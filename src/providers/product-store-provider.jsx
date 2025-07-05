'use client';

import { createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  createProductStore,
  initProductStore,
} from '@/stores/product-store';

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

export const useProductStore = (selector) => {
  const productStoreContext = useContext(ProductStoreContext);

  if (!productStoreContext) {
    throw new Error('useProductStore must be used within ProductStoreProvider');
  }

  return useStore(productStoreContext, selector);
};
