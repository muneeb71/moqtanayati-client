import { addProduct } from "@/lib/api/product/add";
import { categories } from "@/lib/dummy-category";
import { createStore } from "zustand/vanilla";

export const initProductStore = () => {
  return {
    id: "",

    // Picture & Videos Form
    images: [],
    video: null,
    productTitle: "",
    productDescription: "",
    isLoading: false,

    // Units & Dimensions Form
    stock: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    conditionRating: "",
    productCategories: [],
    productCondition: "New",

    // Price & Shipping Form
    pricingFormat: "",
    price: "",
    quantity: "",
    shippingMethod: "",
    domesticShippingType: "",
    handlingTime: "",
    auctionDuration: 7,
    auctionLaunchDate: new Date(),
    startingBid: "",
    buyItNow: "",
    minimumOffer: "",
    autoAccept: "",
    selectedCountry: "",
    selectedCity: "",
    domesticReturns: false,
    internationalReturns: false,
    localPickup: false,
  };
};

export const createProductStore = (initState = initProductStore()) => {
  return createStore((set, get) => ({
    ...initState,
    reset: () => set(initProductStore()),
    setId: (id) => set({ id }),
    setImages: (images) => set({ images }),
    setVideo: (video) => set({ video }),
    setProductTitle: (title) => set({ productTitle: title }),
    setProductDescription: (description) =>
      set({ productDescription: description }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setStock: (units) => set({ stock: units }),
    setLength: (length) => set({ length }),
    setWidth: (width) => set({ width }),
    setHeight: (height) => set({ height }),
    setWeight: (weight) => set({ weight }),
    setConditionRating: (rating) => set({ conditionRating: rating }),
    setProductCategories: (categories) =>
      set({ productCategories: categories }),
    setProductCondition: (condition) => set({ productCondition: condition }),
    setPricingFormat: (format) => set({ pricingFormat: format }),
    setPrice: (price) => set({ price }),
    setQuantity: (quantity) => set({ quantity }),
    setShippingMethod: (method) => set({ shippingMethod: method }),
    setDomesticShippingType: (type) => set({ domesticShippingType: type }),
    setHandlingTime: (time) => set({ handlingTime: time }),
    setAuctionDuration: (duration) => set({ auctionDuration: duration }),
    setAuctionLaunchDate: (date) => set({ auctionLaunchDate: date }),
    setStartingBid: (bid) => set({ startingBid: bid }),
    setBuyItNow: (price) => set({ buyItNow: price }),
    setMinimumOffer: (offer) => set({ minimumOffer: offer }),
    setAutoAccept: (price) => set({ autoAccept: price }),
    setSelectedCountry: (country) => set({ selectedCountry: country }),
    setSelectedCity: (city) => set({ selectedCity: city }),
    setDomesticReturns: (value) => set({ domesticReturns: value }),
    setInternationalReturns: (value) => set({ internationalReturns: value }),
    setLocalPickup: (value) => set({ localPickup: value }),
  }));
};
