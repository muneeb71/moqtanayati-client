"use client";

import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { createProfileStore, initProfileStore } from "@/stores/profile-store";

export const ProfileStoreContext = createContext(undefined);

export const ProfileStoreProvider = ({ children, profile }) => {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = createProfileStore(initProfileStore(), profile);
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  );
};

export const useProfileStore = (selector) => {
  const profileStoreContext = useContext(ProfileStoreContext);

  if (!profileStoreContext) {
    throw new Error("useProfileStore must be used within ProfileStoreProvider");
  }

  return useStore(profileStoreContext, selector);
};
