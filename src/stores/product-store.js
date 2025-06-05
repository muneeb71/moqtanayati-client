import { createStore } from "zustand/vanilla";

export const initProductStore = () => {
  return {
    // Picture & Videos Form
    images: [],
    video: null,
    productTitle: "",
    productDescription: "",

    // Units & Dimensions Form
    unitsAvailable: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    conditionRating: "",
    productCategories: "",
    productCondition: "New",

    // Price & Shipping Form
    pricingFormat: "",
    price: 0,
    quantity: 0,
    shippingMethod: "",
    shippingType: "",
    domesticShippingType: "",
    handlingTime: "",
    selectedCategories: [],
    auctionDuration: "7 Days",
    auctionLaunchDate: "",
    startingBid: "",
    buyItNow: "",
    minimumOffer: "",
    autoAccept: "",
    selectedCountry: "",
    selectedCity: "",
    domesticReturns: false,
    internationalReturns: false,
    domesticShipping: false,
    localPickup: false,
  };
};

export const createProductStore = (initState = initProductStore()) => {
  return createStore((set, get) => ({
    ...initState,
    setImages: (images) => set({ images }),
    setVideo: (video) => set({ video }),
    setProductTitle: (title) => set({ productTitle: title }),
    setProductDescription: (description) =>
      set({ productDescription: description }),
    setUnitsAvailable: (units) => set({ unitsAvailable: units }),
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
    setShippingType: (type) => set({ shippingType: type }),
    setDomesticShippingType: (type) => set({ domesticShippingType: type }),
    setHandlingTime: (time) => set({ handlingTime: time }),
    setSelectedCategories: (categories) =>
      set({ selectedCategories: categories }),
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
    setDomesticShipping: (value) => set({ domesticShipping: value }),
    setLocalPickup: (value) => set({ localPickup: value }),
    submitForm: () => {
      const state = get();
      console.log("Form Data:", {
        // Picture & Videos
        images: state.images,
        video: state.video,
        productTitle: state.productTitle,
        productDescription: state.productDescription,

        // Units & Dimensions
        unitsAvailable: state.unitsAvailable,
        length: state.length,
        width: state.width,
        height: state.height,
        weight: state.weight,
        conditionRating: state.conditionRating,
        productCategories: state.productCategories,
        productCondition: state.productCondition,

        // Price & Shipping
        pricingFormat: state.pricingFormat,
        price: state.price,
        quantity: state.quantity,
        shippingMethod: state.shippingMethod,
        shippingType: state.shippingType,
        domesticShippingType: state.domesticShippingType,
        handlingTime: state.handlingTime,
        selectedCategories: state.selectedCategories,
        auctionDuration: state.auctionDuration,
        auctionLaunchDate: state.auctionLaunchDate,
        startingBid: state.startingBid,
        buyItNow: state.buyItNow,
        minimumOffer: state.minimumOffer,
        autoAccept: state.autoAccept,
        selectedCountry: state.selectedCountry,
        selectedCity: state.selectedCity,
        domesticReturns: state.domesticReturns,
        internationalReturns: state.internationalReturns,
        domesticShipping: state.domesticShipping,
        localPickup: state.localPickup,
      });
    },
  }));
};
