import { getUserProfile } from "@/lib/api/profile/getProfile";
import { createStore } from "zustand/vanilla";

export const initProfileStore = () => ({
  id: null,
  name: "",
  email: "",
  phone: "",
  avatar: null,
  password: "",
  nationalId: "",
  address: "",
  addresses: [],
  latitude: null,
  longitude: null,

  accountStatus: "",
  verificationStatus: "",
  isVerified: false,
  registrationDate: "",
  lastActive: "",
  createdAt: "",
  updatedAt: "",

  role: "",
  sellerType: "",
  businessName: null,
  description: null,
  joinedDate: "",
  averageRating: "",

  store: {},

  sellerSurvey: {},
  preferences: [],
  orders: [],
  sellerOrders: [],
  carts: [],
  reviews: [],
  reviewsGiven: [],
  feedbacks: [],
  paymentMethods: [],
  payments: [],
  bids: [],
  auctions: [],
  watchlists: [],
  notifications: [],
  messages: [],
  chatsA: [],
  chatsB: [],
});

export const defaultInitState = initProfileStore();

export const createProfileStore = (initState = defaultInitState, profile) => {
  const store = createStore((set) => ({
    ...initState,

    fetchUserProfile: async (uid) => {
      const response = await getUserProfile(uid);
      console.log("user profile 1 : ", response);
      console.log("user profile 2 : ", response.data);
      console.log("user profile 3 : ", response.data.data);
      if (response && response.success !== false) {
        set({ ...response.data });
      }
      return response;
    },
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setPhone: (phone) => set({ phone }),
    setAvatar: (avatar) => set({ avatar }),
    setPassword: (password) => set({ password }),
    setNationalId: (nationalId) => set({ nationalId }),
    setAddress: (address) => set({ address }),
    setAddresses: (addresses) => set({ addresses }),
    setLatitude: (latitude) => set({ latitude }),
    setLongitude: (longitude) => set({ longitude }),
    setAccountStatus: (accountStatus) => set({ accountStatus }),
    setVerificationStatus: (verificationStatus) => set({ verificationStatus }),
    setIsVerified: (isVerified) => set({ isVerified }),
    setRegistrationDate: (registrationDate) => set({ registrationDate }),
    setLastActive: (lastActive) => set({ lastActive }),
    setCreatedAt: (createdAt) => set({ createdAt }),
    setUpdatedAt: (updatedAt) => set({ updatedAt }),
    setRole: (role) => set({ role }),
    setSellerType: (sellerType) => set({ sellerType }),
    setBusinessName: (businessName) => set({ businessName }),
    setDescription: (description) => set({ description }),
    setJoinedDate: (joinedDate) => set({ joinedDate }),
    setAverageRating: (averageRating) => set({ averageRating }),
    setStore: (store) => set({ store }),
    setSellerSurvey: (sellerSurvey) => set({ sellerSurvey }),
    setPreferences: (preferences) => set({ preferences }),
    setOrders: (orders) => set({ orders }),
    setSellerOrders: (sellerOrders) => set({ sellerOrders }),
    setCarts: (carts) => set({ carts }),
    setReviews: (reviews) => set({ reviews }),
    setReviewsGiven: (reviewsGiven) => set({ reviewsGiven }),
    setFeedbacks: (feedbacks) => set({ feedbacks }),
    setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
    setPayments: (payments) => set({ payments }),
    setBids: (bids) => set({ bids }),
    setAuctions: (auctions) => set({ auctions }),
    setWatchlists: (watchlists) => set({ watchlists }),
    setNotifications: (notifications) => set({ notifications }),
    setMessages: (messages) => set({ messages }),
    setChatsA: (chatsA) => set({ chatsA }),
    setChatsB: (chatsB) => set({ chatsB }),
  }));

  if (profile?.success && profile?.data) {
    store.setState({ ...profile.data });
  }
  return store;
};
