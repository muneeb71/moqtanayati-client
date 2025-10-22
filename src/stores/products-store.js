import { createStore } from "zustand/vanilla";

export const initProductsStore = () => {
  return {
    products: [],
    loading: false,
    error: null,
  };
};

export const createProductsStore = (initState = initProductsStore()) =>
  createStore((set, get) => ({
    ...initState,
    setProducts: (products) => set({ products }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    getProductsByCategory: (categoryName) => {
      const { products } = get();
      return products.filter((product) => {
        const productCategories =
          product.categories || product.productCategories || [];
        return productCategories.some(
          (cat) =>
            cat.toLowerCase().includes(categoryName.toLowerCase()) ||
            categoryName.toLowerCase().includes(cat.toLowerCase()),
        );
      });
    },
    searchProducts: (searchTerm) => {
      const { products } = get();
      return products.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (product.categories || []).some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    },
    reset: () => set(initProductsStore()),
  }));
