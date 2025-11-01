import { createStore } from "zustand/vanilla";

export const defaultInitState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  address: "",
  nationalId: "",
  iban: "",
  crNumber: "",
  vatNumber: "",
  password: "",
  confirmPassword: "",
  latitude: null,
  longitude: null,
  sellerType: "",
  isVerified: false,
};

export const initRegisterStore = () => ({
  ...defaultInitState,
});

export const createRegisterStore = (initState = defaultInitState) => {
  return createStore((set) => ({
    ...initState,

    // ========= Setters =========
    setName: (name) => set({ name }),
    setBusinessName: (businessName) => set({ businessName }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setAddress: (address) => set({ address }),
    setNationalId: (nationalId) => set({ nationalId }),
    setIban: (iban) => set({ iban }),
    setCrNumber: (crNumber) => set({ crNumber }),
    setVatNumber: (vatNumber) => set({ vatNumber }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
    setSellerType: (sellerType) => set({ sellerType }),
    setIsVerified: (isVerified) => set({ isVerified }),

    // ========= Helpers =========
    reset: () => set({ ...defaultInitState }),
  }));
};
