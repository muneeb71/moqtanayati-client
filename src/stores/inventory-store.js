import { createStore } from "zustand/vanilla";
import { getProductsByStoreId } from "@/lib/api/product/getByStoreId";

export const initInventoryStore = () => {
  return {
    products: [],
    isLoadingProducts: false,
    productsError: null,
  };
};

export const defaultInitState = {
    products: [],
    isLoadingProducts: false,
    productsError: null,
};

export const createInventoryStore = (initState = defaultInitState) => {
  return createStore((set) => ({
    ...initState,
    fetchProducts: async (storeId) => {
      set({ isLoadingProducts: true, productsError: null });
      try {
        const products = await getProductsByStoreId(storeId);
        set({ products, isLoadingProducts: false });
      } catch (error) {
        set({ productsError: error.message, isLoadingProducts: false });
      }
    },
  }));
};
