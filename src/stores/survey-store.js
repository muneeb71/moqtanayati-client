import { createStore } from "zustand/vanilla";

export const initSurveyStore = () => {
  return {
    sellerEntity: "",
    haveProducts: false,
    haveExperience: false,
    goal: "",
    productsAndServices: [],
    homeSupplies: [],
    consent: false,
    userData: null,
  };
};

export const defaultInitState = {
  sellerEntity: "",
  haveProducts: false,
  haveExperience: false,
  goal: "",
  productsAndServices: [],
  homeSupplies: [],
  consent: false,
  userData: null,
};

export const createSurveyStore = (initState = defaultInitState) => {
  return createStore((set, get) => ({
    ...initState,
    setSellerEntity: (sellerEntity) => set(() => ({ sellerEntity })),
    setHaveProducts: (haveProducts) => set(() => ({ haveProducts })),
    setHaveExperience: (haveExperience) => set(() => ({ haveExperience })),
    setGoal: (goal) => set(() => ({ goal })),
    setProductsAndServices: (productsAndServices) =>
      set(() => ({ productsAndServices })),
    toggleProductAndService: (item) => {
      const current = get().productsAndServices;
      const exists = current.includes(item);
      const updated = exists
        ? current.filter((i) => i !== item)
        : [...current, item];

      set(() => ({ productsAndServices: updated }));
    },
    setHomeSupplies: (homeSupplies) => set(() => ({ homeSupplies })),
    toggleHomeSupply: (item) => {
      const current = get().homeSupplies;
      const exists = current.includes(item);
      const updated = exists
        ? current.filter((i) => i !== item)
        : [...current, item];

      set(() => ({ homeSupplies: updated }));
    },
    setConsent: (consent) => set(() => ({ consent })),
    setUserData: (userData) => set(() => ({ userData })),
    clearUserData: () => set(() => ({ userData: null })),
  }));
};
